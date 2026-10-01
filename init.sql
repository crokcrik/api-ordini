CREATE TABLE ordini(
    id SERIAL PRIMARY KEY,
    cliente TEXT NOT NULL, 
    totale INTEGER NOT NULL, 
    pagato BOOLEAN DEFAULT false
); 

INSERT INTO ordini(cliente, totale, pagato) VALUES
  ('Ana', 45, true),
  ('João', 120, false),
  ('Marco', 80, true),
  ('Sofia', 15, true);