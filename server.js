const express = require('express');
const path = require('path');
const app = express();

// Verifica si la carpeta de distribución existe antes de servir archivos estáticos
const distFolder = path.join(__dirname, 'dist', 'vialidad-puebla1');

app.use(express.static(distFolder));

app.get('/*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'), (err) => {
    if (err) {
      console.error("Error enviando index.html:", err);
      res.status(500).send("Error interno del servidor");
    }
  });
});

// Puerto dinámico para Railway
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
