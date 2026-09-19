FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g supergateway@3.4.3 && npm cache clean --force
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist

USER node
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8000/healthz || exit 1

# exec so supergateway's kill() reaches node, not the wrapping shell
CMD ["supergateway", "--stdio", "exec node /app/dist/index.js", "--outputTransport", "streamableHttp", "--port", "8000", "--healthEndpoint", "/healthz"]
