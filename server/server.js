const express = require(`express`);
const app = express();

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.use(express.static(`server/public`));

app.listen(PORT, () => {
    console.log(`app running on PORT`, PORT);
});

let listOfCalc = [];

app.get(`/calculate`, (req, res) => {
    console.log(`/calculate GET`);

    res.send(listOfCalc);
});

app.post(`/calculate`, (req, res) => {
    console.log(`/calculate POST`);

    let input = req.body;

    //do calculations based on selected operator
    if (input.operator === `+`) {
        input.result = Number(input.firstNum) + Number(input.secondNum);
    }
    else if (input.operator === `-`) {
        input.result = Number(input.firstNum) - Number(input.secondNum);
    }
    else if (input.operator === `*`) {
        input.result = Number(input.firstNum) * Number(input.secondNum);
    }
    else {
        input.result = Number(input.firstNum) / Number(input.secondNum);
    }

    console.log(input);
    
    
    listOfCalc.push(req.body);
    console.log(listOfCalc);
    res.sendStatus(201);

});