FROM node:alpine3.18
WORKDIR /usr/src/app
COPY . .
ADD ./resources/ .
RUN chmod +x entrypoint.sh
RUN rm -rf node_modules
RUN npm i 
RUN apk add mongodb-tools
RUN apk add --no-cache netcat-openbsd
ENTRYPOINT ["./entrypoint.sh"]