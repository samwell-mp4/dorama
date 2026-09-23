# Ambiente de Produção com Python 3.11 e Node.js 20
FROM python:3.11-slim
WORKDIR /app

# Instalar Node.js 20
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

# Copiar código do backend, servidor Express e frontend pré-compilado
COPY reelshort-api/ ./reelshort-api/
COPY dist/ ./dist/
COPY reelshort-web/dist/ ./reelshort-web/dist/
COPY server.js ./
COPY google_index_submit.js ./
COPY build_full_sitemaps.js ./

ENV PORT=5000
EXPOSE 5000 3000

CMD ["node", "server.js"]
