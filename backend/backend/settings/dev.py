from .base import *

MIDDLEWARE = ["backend.middleware.CORSMiddleware"] + MIDDLEWARE

ALLOWED_HOSTS = ["localhost", "backend"]
