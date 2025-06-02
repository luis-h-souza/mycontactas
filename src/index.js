const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

// Registra as rotas
app.use(routes);

// Error Handler (Middleware express) -> Manipulador de error
app.use((error, request, response, next) => {
  console.error(' capturado: ',error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('🚀 Servidor online em http://localhost:3000'));
