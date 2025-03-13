const express = require('express');
const path = require('path');
const app = express();

// Ruta correcta para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist', 'vialidad-puebla1')));

// Redirige todas las solicitudes al archivo index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'vialidad-puebla1', 'index.html'));
});

// Puerto dinámico para Railway
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
