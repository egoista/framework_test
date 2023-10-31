FROM node:21-slim

RUN apt install bash
WORKDIR /home/node/app
COPY package.json package-lock.json /home/node/app/
RUN npm install
USER node

CMD ["npm", "start"]