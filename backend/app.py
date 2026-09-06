from fastapi import FastAPI
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator


import socket
import time

app = FastAPI(title="todo API")


class Todo(BaseModel):
    title: str


todos = []


@app.get("/")
def home():
    return {
        "message": "Todo APP!",
        "hostname": socket.gethostname(),
        "timestamp": time.time()
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/todos")
def get_todos():
    return todos



@app.post("/todos")
def create_todo(todo:Todo):
    new_todo = {
        "id": len(todo) + 1,
        "title": todo.title
    }

    todos.append(new_todo)

    return new_todo

Instrumentator().instrument(app).expose(app)