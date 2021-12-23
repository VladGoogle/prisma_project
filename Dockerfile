FROM node:16

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

CMD npm run build