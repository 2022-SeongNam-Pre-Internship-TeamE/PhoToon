# frontend

FROM node:16.17.0-alpine

WORKDIR /frontend
COPY . /frontend

ENV REACT_APP_HOST_IP_ADDRESS $API_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

RUN npm install

RUN npm run build