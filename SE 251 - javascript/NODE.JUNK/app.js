const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

const path = require('path');

app.get('/page', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/data", (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
})

app.listen(3000, (e) => {
    console.log('Server is running on port:3000')
})