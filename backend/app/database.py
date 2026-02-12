import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Defaults to localhost for dev, but will use Env Var in Prod
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "minitasks")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Collections
user_collection = db.get_collection("users")
task_collection = db.get_collection("tasks")