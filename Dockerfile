FROM node:24.14.1

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start" ]