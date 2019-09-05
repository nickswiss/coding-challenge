# Ambassador Coding Challenge

### Running Locally:

Install the python dependencies for this project:
```bash
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

You can avoid the `pipenv run` piece by first activating virtualenv
```bash
pipenv shell
```


### Adding a new dependency:
If you've added a dependency, upgrade the lock:
(the lock is a pinned and deterministic view of your dependencies)
```
pipenv lock
```
