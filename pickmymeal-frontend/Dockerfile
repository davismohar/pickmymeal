FROM node:12.7-alpine AS build
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
RUN npm install -g @angular/cli
CMD ["npm", "start"]