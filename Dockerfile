FROM node:18.11.0

WORKDIR ./app

COPY package*.json .

RUN npm install -g npm@9.6.5

RUN npm config set registry http://registry.npmjs.org/

#RUN npm config set timeout 6000000

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
