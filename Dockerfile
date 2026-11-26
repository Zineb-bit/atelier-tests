
# Étape 1 : Installation des dépendances
FROM node:24-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# Étape 2 : Image finale sécurisée
FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public

USER node

EXPOSE 3000

CMD ["node", "src/server.js"]
