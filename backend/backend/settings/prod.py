from .base import *

# Should typically set secret key here, but we aren't doing anything requiring security
ALLOWED_HOSTS = ["challenge-backend-prod.us-east-2.elasticbeanstalk.com"]
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ["RDS_DB_NAME"],
        "USER": os.environ["RDS_USERNAME"],
        "PASSWORD": os.environ["RDS_PASSWORD"],
        "HOST": os.environ["RDS_HOSTNAME"],
        "PORT": os.environ["RDS_PORT"],
    }
}
