const express = require('express');
const cors = require('cors');
require('dotenv').config();
const eurekaService = require('./eurekaServer');
const proxyService = require('./setupProxy');

const PORT = (process.env.PORT || 3000);
const APP_NAME = (process.env.APP_NAME || 'order-product-ui');

const app = express();
app.use(express.static('./build'));
app.use(cors());
proxyService.setupProxy(app);

const client = eurekaService.registerWithEureka(APP_NAME, PORT);

client.logger.level('debug')

client.start( error => {
    console.log(error || `${APP_NAME} registered`);

    app.get('/*', function (req, res) {
      res.sendFile('index.html', { root: 'build' }
      );
    });
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);