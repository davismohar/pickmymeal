# base image
FROM node:latest

# set working directory
WORKDIR /app

# install app dependencies
COPY ./package*.json /app/
COPY ./app.js /app/
RUN npm install
EXPOSE 4000
# start app
CMD ["npm","start"]