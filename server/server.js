const express = require(`express`);
const app = express();

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.use(express.static(`server/public`));

app.listen(PORT, () => {
    console.log(`app running on PORT`, PORT);
});

let listOfCalc = [{calculation: `8 * 25`}];

app.get(`/calculate`, (req, res) => {
    console.log(`/calculate GET`);

    res.send(listOfCalc);
});