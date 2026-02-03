FROM node:25-alpine
COPY dist/ ./
EXPOSE 4321
ENV HOST=0.0.0.0
CMD ["node", "./server/entry.mjs"]