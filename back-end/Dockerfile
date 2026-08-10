FROM node:20-alpine

# Install OpenSSL, libc6-compat and build tools for native packages
RUN apk add --no-cache openssl libc6-compat python3 make g++

WORKDIR /usr/src

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate && npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
