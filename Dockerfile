FROM node:10
COPY package.json /src/package.json
RUN  cd /src; npm install
RUN npm install -g nodemon
COPY . /src
EXPOSE 3000
WORKDIR /src
CMD nodemon server.js
