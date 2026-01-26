FROM hub.docker.com/node:25-alpine
WORKDIR /app
COPY package*.json ./
COPY *config.js ./
RUN npm install
COPY . ./
EXPOSE 4321
RUN npm run build
ENV HOST=0.0.0.0
CMD ["node", "./dist/server/entry.mjs"]