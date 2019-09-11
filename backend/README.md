
### Running Locally with manage.py:

Install the python dependencies for this project:
```bash
pip install pipenv
pipenv install --dev --three
```

Make required database migrations:
```bash
pipenv run python3 manage.py makemigrations
pipenv run python3 manage.py migrate
```

Run the server
```bash
pipenv run python3 manage.py runserver
```

You can avoid the `pipenv run` piece by activating virtualenv before running commands
```bash
pipenv shell
```

### Run locally with docker and gunicorn
```bash
docker build .  # outputs image ID
docker run -e DJANGO_SETTINGS_MODULE=backend.settings.dev <image-id>
```

### Adding a new dependency: ###
Add your dependency to the Pipfile and upgrade the lock:
(the lock is a pinned and deterministic view of your dependencies)
```bash
pipenv lock
```

### Running backend tests ###

```bash
cd backend
export DJANGO_SETTINGS_MODULE=backend.settings.dev
pipenv run python3 manage.py test
```


### Deploy backend and static ###
```bash
eb deploy
```