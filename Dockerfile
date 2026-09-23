# Estágio 1: Build do Frontend Vite / React
FROM node:20-alpine AS builder
WORKDIR /app/reelshort-web
COPY reelshort-web/package*.json ./
RUN npm install
COPY reelshort-web/ ./
RUN npm run build

# Estágio 2: Ambiente de Produção com Python e Node.js
FROM python:3.11-slim
WORKDIR /app

# Instalar Node.js
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar dependências Python
COPY reelshort-api/requirements.txt ./reelshort-api/
RUN pip install --no-cache-dir -r ./reelshort-api/requirements.txt

# Instalar dependências do servidor Node
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar código do backend e servidor Express
COPY reelshort-api/ ./reelshort-api/
COPY server.js ./
COPY google_index_submit.js ./
COPY build_full_sitemaps.js ./

# Copiar build gerado do frontend
COPY --from=builder /app/reelshort-web/dist ./reelshort-web/dist

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
