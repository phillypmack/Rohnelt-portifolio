FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PROJECTS_DIR=/projects

CMD ["node", "src/index.js"]
