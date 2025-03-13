const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(__dirname + '/dist/vialidad-puebla1'));
// Redirige todas las solicitudes al archivo index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/vialidad-puebla1/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
