FROM node:22-alpine

WORKDIR /app


COPY package.json .

RUN npm cache clean --force

RUN npm install

#RUN npm i -g serve

COPY . .

ENV NODE_ENV=development

EXPOSE 3001

CMD ["npm", "run", "dev"]