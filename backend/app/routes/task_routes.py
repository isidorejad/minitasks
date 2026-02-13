import os
import random
import google.generativeai as genai
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from app.database import task_collection
from app.models import TaskCreate, TaskUpdate, TaskInDB, UserInDB, AIRequest
from app.routes.auth_routes import get_current_user
from bson import ObjectId
from datetime import datetime, timedelta

router = APIRouter()

# --- CRUD OPERATIONS ---

@router.post("/", response_model=TaskInDB)
async def create_task(task: TaskCreate, current_user: UserInDB = Depends(get_current_user)):
    task_dict = task.dict()
    task_dict["user_id"] = str(current_user.id) 
    task_dict["created_at"] = datetime.utcnow()
    
    new_task = await task_collection.insert_one(task_dict)
    created_task = await task_collection.find_one({"_id": new_task.inserted_id})
    return TaskInDB(**created_task)

@router.get("/", response_model=List[TaskInDB])
async def get_tasks(
    status_filter: Optional[str] = None, 
    due_week: bool = False, 
    current_user: UserInDB = Depends(get_current_user)
):
    query = {"user_id": str(current_user.id)}
    
    if status_filter and status_filter != "":
        query["status"] = status_filter
        
    if due_week:
        today = datetime.utcnow()
        next_week = today + timedelta(days=7)
        query["due_date"] = {"$gte": today, "$lte": next_week}

    tasks = await task_collection.find(query).to_list(100)
    return [TaskInDB(**task) for task in tasks]

@router.put("/{task_id}", response_model=TaskInDB)
async def update_task(task_id: str, task_update: TaskUpdate, current_user: UserInDB = Depends(get_current_user)):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    update_data = {k: v for k, v in task_update.dict().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")

    result = await task_collection.update_one(
        {"_id": ObjectId(task_id), "user_id": str(current_user.id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found or not authorized")
        
    updated_task = await task_collection.find_one({"_id": ObjectId(task_id)})
    return TaskInDB(**updated_task)

@router.delete("/{task_id}")
async def delete_task(task_id: str, current_user: UserInDB = Depends(get_current_user)):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    result = await task_collection.delete_one({"_id": ObjectId(task_id), "user_id": str(current_user.id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task deleted"}

# --- AI BONUS WITH GEMINI & FALLBACK ---

@router.post("/suggest-due-date")
async def suggest_due_date(request: AIRequest, current_user: UserInDB = Depends(get_current_user)):
    api_key = os.getenv("GOOGLE_API_KEY")
    
    # Helper for the random fallback (1-5 days)
    def get_random_fallback():
        random_days = random.randint(1, 5)
        return (datetime.utcnow() + timedelta(days=random_days)).date().isoformat()

    # Fallback if no key is provided
    if not api_key:
        return {"suggested_date": get_random_fallback()}

    try:
        genai.configure(api_key=api_key)
        # Using Gemini 2.5 Flash as preferred in 2026
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = (
            f"Analyze this task description and suggest a due date (YYYY-MM-DD) "
            f"relative to today ({datetime.utcnow().date()}). "
            f"Return ONLY the date string, nothing else. "
            f"Description: {request.description}"
        )
        
        response = model.generate_content(prompt)
        date_str = response.text.strip()
        
        # Basic validation to ensure the AI returned a string that looks like a date
        if len(date_str) > 12:  # YYYY-MM-DD is 10 chars, allowing for small variance
             print(f"AI returned invalid format: {date_str}")
             return {"suggested_date": get_random_fallback()}
             
        return {"suggested_date": date_str}
    except Exception as e:
        print(f"Gemini AI Error: {e}")
        return {"suggested_date": get_random_fallback()}