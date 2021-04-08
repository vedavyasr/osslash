FROM node:latest
WORKDIR /Users/vedavyasr/Documents/oslash
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8001
CMD ["npm", "start"]
