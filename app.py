from fastapi import FastAPI
import socket
import time

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Hello from AWS EC2!",
        "hostname": socket.gethostname(),
        "timestamp": time.time()
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
