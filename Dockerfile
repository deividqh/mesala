FROM node:latest

WORKDIR /the/workdir/path

COPY . .

EXPOSE 3000

CMD [ "node" , "start"]


