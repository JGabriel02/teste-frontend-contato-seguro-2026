# Etapa 1 - Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

RUN npm install

# Copia todo o projeto
COPY . .

# Builda o projeto
RUN npm run build


# Etapa 2 - Servidor Nginx
FROM nginx:stable-alpine

# Copia o build para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]