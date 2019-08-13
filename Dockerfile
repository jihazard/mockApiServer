FROM node:10
RUN mkdir /app
ADD . /app
WORKDIR /app

CMD ["nodemon", "sever.js"]