import pytest
from httpx import AsyncClient
from app.main import app
from app.database import user_collection, task_collection

# To run: pytest

@pytest.mark.asyncio
async def test_signup():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Cleanup before test
        await user_collection.delete_many({"email": "test@example.com"})
        
        response = await ac.post("/auth/signup", json={
            "email": "test@example.com",
            "password": "password123"
        })
    assert response.status_code == 200
    assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_create_task():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        # Login first
        login_res = await ac.post("/auth/login", data={
            "username": "test@example.com", 
            "password": "password123"
        })
        token = login_res.json()["access_token"]
        
        # Create Task
        response = await ac.post("/tasks/", json={
            "title": "Test Task",
            "priority": "High"
        }, headers={"Authorization": f"Bearer {token}"})
        
    assert response.status_code == 200
    assert response.json()["title"] == "Test Task"

@pytest.mark.asyncio
async def test_get_tasks():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        login_res = await ac.post("/auth/login", data={
            "username": "test@example.com", 
            "password": "password123"
        })
        token = login_res.json()["access_token"]
        
        response = await ac.get("/tasks/", headers={"Authorization": f"Bearer {token}"})
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)