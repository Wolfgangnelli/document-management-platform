FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
ADD requirements /code/requirements
RUN pip install -r requirements/local.txt

COPY . /code/
ENV DJANGODIR=/code/backend
ENV PYTHONPATH=$DJANGODIR:$PYTHONPATH

WORKDIR /code/backend