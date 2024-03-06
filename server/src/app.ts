import { Express } from 'express';

const express = require('express');

const app: Express = express();

app.get('/', (req, res) => {
	res.send('Home page');
});

app.listen(4000);
