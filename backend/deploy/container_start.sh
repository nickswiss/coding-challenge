#!/bin/sh
cd /www && python manage.py migrate --noinput
python manage.py collectstatic --noinput
supervisord -n -c /etc/supervisor/supervisord.conf
