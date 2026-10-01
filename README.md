# API Ordini

API REST in Node.js + Express per la gestione di ordini e-commerce.

## Funzionalità
- `GET /ordini` – lista ordini (filtro `?pagato=true/false`)
- `GET /ordini/:id` – dettaglio ordine (404 se non esiste)
- `POST /ordini` – crea ordine con validazione dei dati (400 se non validi)
- `DELETE /ordini/:id` – elimina ordine
- `GET /fatturato` – totale fatturato

## Avvio
npm install
node server.js

   ## Avvio con Docker
   docker compose up -d --build

   L'API è disponibile su http://localhost:3000