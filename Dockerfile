FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm && pnpm i

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["pnpm", "dev"]