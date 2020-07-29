FROM node:12.16-alpine

WORKDIR /app

COPY src ./src
COPY index.js .
COPY package*.json ./
RUN npm i

ENV PROJECT_PATH=""
ENV CHANGED_FILE_PATH=""

CMD ["sh", "-c", "node index.js \
project_path=${PROJECT_PATH} \
changed_file_path=${CHANGED_FILE_PATH}"]