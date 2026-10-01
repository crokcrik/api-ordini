const express = require("express");  //importa Express
const app = express();               //crea l'applicazione
app.use(express.json());

const PORT = 3000;

//una "rotta": quando qualcuno visita /. rispondi cosi
/*
app.get("/", (req, res) =>{
    res.send("Ciao il server funziona!");
});
*/
/*
//prodotti/5 -> req.params.id vale "5" (ATTENZIONE: è una stringa)
app.get("/prodotti/:id", (req, res) => {
    const id = Number(req.params.id);  //conversione in numero
    res.json({idRicevuto: id});
});

// /prodotti?categoria=poster -> req.query.categoria vale "poster"
app.get("/prodotti", (req, res) =>{
    res.json({filtro: req.query.categoria});
});

*/

let ordini = [
    {id: 1, cliente: "Ana", totale: 45, pagato: true},
    { id: 2, cliente: "João", totale: 120, pagato: false },
    { id: 3, cliente: "Marco", totale: 80, pagato: true },
    { id: 4, cliente: "Sofia", totale: 15, pagato: true },
]
/*
app.get("/ordini", (req, res) =>{
    res.json(ordini);
});
*/
app.get("/ordini/:id", (req, res) => {
    const id = Number(req.params.id);
    const ordine = ordini.find(o => o.id === id); 
    if(!ordine){
        return res.status(404).json({errore: "Ordine non trovato"});
    }
    res.json(ordine);
    
});

app.get("/fatturato", (req, res) => {
    const fatturato = ordini.reduce((acc, o) => acc + o.totale, 0);
    res.json({fatturato});
})

app.get("/ordini", (req, res) =>{
    if(req.query.pagato === "true"){
        const pagati =ordini.filter(o => o.pagato);
        return res.json(pagati);
    }else if(req.query.pagato === "false"){
        const nonPagati = ordini.filter(o => !o.pagato);
        return res.json(nonPagati);
    }else{
        res.json(ordini);
    }
});

app.get("/",(req, res) =>{
    res.send("API ordini v1");
});

app.post("/ordini", (req, res) =>{
    const cliente = req.body.cliente;
    const totale = req.body.totale;

    if(!cliente || typeof totale !== "number" || totale <= 0){
        return res.status(400).json({errore: "Dati non validi"});
    }

    const nuovoOrdine ={
        id: ordini.length + 1,
        cliente,
        totale,
        pagato: false
    };

    ordini.push(nuovoOrdine);
    res.status(201).json(nuovoOrdine);
});

app.delete("/ordini/:id", (req, res) =>{
    const identificativo = Number(req.params.id);
    const ordine = ordini.find(o => o.id === identificativo);
    if(!ordine){
        return res.status(404).json({errore: "Ordine non trovato"});
    }

    ordini = ordini.filter(o => o.id !== identificativo);

    res.json({messaggio: "Ordine eliminato"})
});

//avvia il server
app.listen(PORT, () => {
    console.log(`server attivo su http://localhost:${PORT}`)
});

