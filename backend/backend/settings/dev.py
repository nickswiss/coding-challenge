from .base import *

DEBUG = False
MIDDLEWARE = ["backend.middleware.CORSMiddleware"] + MIDDLEWARE

ALLOWED_HOSTS = ["localhost", "backend"]
