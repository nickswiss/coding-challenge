# Ambassador Coding Challenge

### Track

Full Stack

### Application links:
[Referral App](http://challenge-backend-prod.us-east-2.elasticbeanstalk.com/)
[CSS Exercise](http://challenge-backend-prod.us-east-2.elasticbeanstalk.com/css-exercise)


### Problem/Solution

**Problem: Create a list page**

List page will have input for creating new referral links, as well as a table for displaying links.
Each link should be clickable, and clicking that link should take you to a landing page for the link
(described below). Each link should also have an edit button, as well as a delete button which perform
their implied duties.

**Solution:** 

A frontend react application, and a backend REST server for the links.

- React application will be served by django at root url
- When the page loads, a GET request to the REST list route will return all links that have been previously created.
- When a link is submitted a POST request will be sent to backend server, and create a link.
- When a link is edited, a popover will open with the links existing information (at this point only title). When finished editing the frontend will make a PATCH request to the links REST endpoint and update the title.
- When a link is deleted, a DEL request will be sent to backend server with the links id in URL

**Problem: Display clicked link in landing**

**Solution:**

When a link is clicked redirect to django rendered landing page. (see more information below in Considerations::Manual Redirect)
The title in the URL will be used to query the link db for a link with this title. This implies that the link title must be unique.  The landing page is basic, and displays some text with a link's title (using Template to render title in html) and an ambassador image located in apps static directory.

### Considerations

##### Deploying with AWS
Have worked a small amount with AWS, and wanted to get some more experience with using it. 
We are deploying the project with:

 - Elastic beanstalk - supports auto scaling and load balancing
 - A postgres RDS - connections are passed to docker container
 - The single docker container solution provided by AWS
 - Using AWS provided nginx server to route requests with custom nginx conf (see below Custom Nginx Conf)
 - Serving static files from django application (including react app) with whitenoise
 - Endpoint in django app for load balance request `/api/health-check`

##### Custom Nginx Conf

We are deploying with elastic beanstalk single container solution.
The EB instance runs nginx by default but does not handle the requests from the load balancer
The custom implementation forwards an additional route `/api/healthcheck` with the instances
host variable. This avoids having to do any configuration in the app to alter `ALLOWED_HOSTS`.

#### Frontend:

##### Where to sort?

As the spec does not have pagination, we will do the sorting of all the links on the client side.
We could do the sorting by simply adding query parameters to the REST endpoint. This will result in
a service call whenever we sort the data. It may be optimal to do this if data gets large.

##### Manual Redirect

A link infers a GET request. The problem here is that GET requests should not modify any data on the
server. Django will allow you to save information on a GET but this does not conform to correct practices.
I have chosen to redirect on the frontend, following a post request to `api/links/{id}/click/`, which returns
the server side url to redirect to after a click. The downside with this, is an inability to provide a url
to the link or `Open in new tab`. We could alternatively submit an invisible form, and return a server
side redirect response, but this would have the same problem as above.

### Given more time
- Move EditLinkPopover out of generic table class
- Support pagination in UI powered by backend rest pages.
- More frontend tests
- Refresh links button (for retrieving edits/creations made in another session without full page reload)
- Search box using query string 
- Function tests (UI automation)

## Deploying the code

Place a valid .elasticbeanstalk configuration in `./backend`
Run `make deploy`


## Run locally with docker and nginx

```bash
docker-compose up
```


##### Additional docs:

Find additional information in README's located in 
[backend/README.md](./backend/README.md) and [frontend/README.md](./frontend/README.md) 
