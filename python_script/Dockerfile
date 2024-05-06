FROM python:3.8-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# define environment variable
ENV HOST=iotdev.snu.ac.kr
ENV PORT=58132

CMD python3 ./src/crawler.py --host ${HOST} --port ${PORT}