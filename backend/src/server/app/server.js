
const setup = {port:8000}
const express = require ('express');
const app = express ();
app.get('', (req, res) => {
    res.send('Hi!');
});
app.listen(setup.port, () => {
    console.log('Server start on port %s...', setup.port);
});