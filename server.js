const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());
const PORT = 3000;

// GET / → messaggio di benvenuto
app.get("/", (req, res) => {
  res.send("API Ordini v2 🐳");
});

// GET /ordini → tutti gli ordini (filtro opzionale ?pagato=true/false)
app.get("/ordini", async (req, res) => {
  try {
    const { pagato } = req.query;
    let result;

    if (pagato === "true" || pagato === "false") {
      result = await pool.query(
        "SELECT * FROM ordini WHERE pagato = $1 ORDER BY id",
        [pagato === "true"]
      );
    } else {
      result = await pool.query("SELECT * FROM ordini ORDER BY id");
    }

    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ errore: "Errore del database" });
  }
});

// GET /ordini/:id → un solo ordine
app.get("/ordini/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ errore: "Id non valido" });
    }

    const result = await pool.query("SELECT * FROM ordini WHERE id = $1", [id]);
    const ordine = result.rows[0];

    if (!ordine) {
      return res.status(404).json({ errore: "Ordine non trovato" });
    }

    res.json(ordine);
  } catch (e) {
    console.log(e);
    res.status(500).json({ errore: "Errore del database" });
  }
});

// GET /fatturato → somma dei totali
app.get("/fatturato", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COALESCE(SUM(totale), 0) AS fatturato FROM ordini"
    );
    res.json({ fatturato: Number(result.rows[0].fatturato) });
  } catch (e) {
    console.log(e);
    res.status(500).json({ errore: "Errore del database" });
  }
});

// POST /ordini → crea un nuovo ordine
app.post("/ordini", async (req, res) => {
  try {
    const { cliente, totale } = req.body;

    if (!cliente || typeof totale !== "number" || totale <= 0) {
      return res.status(400).json({ errore: "Dati non validi" });
    }

    const result = await pool.query(
      "INSERT INTO ordini (cliente, totale) VALUES ($1, $2) RETURNING *",
      [cliente, totale]
    );

    res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ errore: "Errore del database" });
  }
});

// DELETE /ordini/:id → elimina un ordine
app.delete("/ordini/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ errore: "Id non valido" });
    }

    const result = await pool.query(
      "DELETE FROM ordini WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ errore: "Ordine non trovato" });
    }

    res.json({ messaggio: "Ordine eliminato", ordine: result.rows[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ errore: "Errore del database" });
  }
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});