#!/bin/bash
cd backend
pip install -r requirements.txt
python manage.py migrate --noinput
exec gunicorn config.asgi:application --workers 4 --bind 0.0.0.0:$PORT