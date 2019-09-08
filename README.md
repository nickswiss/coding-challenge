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

### Considerations

#### Frontend: ####

##### How to edit an existing link? #####

Editing in the existing columns of the table, using react:
I have made the choice to reuse the text box to edit an existing element. Editing in place of the table ends up
down a path of creating a pretty complex react widget, and a ton more to manage with redux. 

##### Where to sort? #####
As the spec does not have pagination, we will do the sorting of all the links on the client side.
We could do the sorting by simply adding query parameters to the REST endpoint, but no need to 
as spec does not have many links.

##### Intentionally avoiding #####
Pagination
Query String filtering


#### Backend: ####

##### Custom Nginx Conf #####
We are deploying with elastic beanstalk single container solution.
The EB instance runs nginx by default but does not handle the requests from the load balancer
The custom implementation forwards an additional route `/api/healthcheck` with the instances
host variable. This avoids having to do any configuration in the app to alter `ALLOWED_HOSTS`
