const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express();
const route = require('./routes/route')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, '../public')));


app.use('/', route)

app.use(function (req, res, next) {
    const error404 = new Error("You have entered a wrong Route")
    error404.status = 404
    next(error404)
})

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`)
});