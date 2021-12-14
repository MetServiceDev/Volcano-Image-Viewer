FROM node:12.6.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3200

CMD ["npm", "start"]