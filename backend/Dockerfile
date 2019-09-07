FROM python:3

# Update OS
RUN apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y
RUN apt-get install -y apt-utils

RUN apt-get install -y wget

# setup startup script for gunicord WSGI service
RUN groupadd webapps
RUN useradd webapp -G webapps
RUN mkdir -p /var/log/webapp/ && chown -R webapp /var/log/webapp/ && chmod -R u+rX /var/log/webapp/
RUN mkdir -p /var/run/webapp/ && chown -R webapp /var/run/webapp/ && chmod -R u+rX /var/run/webapp/

RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
ADD deploy/supervisor/webapp.conf /etc/supervisor/conf.d/webapp.conf

RUN mkdir www
ADD . /www
WORKDIR /www

# Python Dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --system --deploy --three

CMD ["sh", "./deploy/container_start.sh"]

# Expose listen ports
EXPOSE 8000
