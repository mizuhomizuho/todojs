
const setup = {port:8000}
const express = require ('express');
const xxx = require("./test");
const app = express ();
app.get('/test', (req, res) => {
    // res.send('Тест7');
    xxx(res);
});
app.listen(setup.port, () => {
    console.log('Сервер: порт %s - старт!', setup.port);
});