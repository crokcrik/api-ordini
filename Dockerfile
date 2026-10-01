#Immagine con Node già installato
FROM node:24-alpine

#Cartella di lavoro dentro il container
WORKDIR /app

#COPIA I file delle dipendenze e installale
COPY package*.json ./
RUN npm install

#Copia il resto del codice
COPY . .

#La porta usata dall'app
EXPOSE 3000

#Comando di avvio
CMD ["node", "server.js"]