console.log(`js loaded`);
$(jqReady);

function jqReady() {
    console.log(`jquery loaded`);
    $(`#calculatorGrid`).on(`click`, `button`, displayInputs)
    $(`#equalBtn`).on(`click`, calculateOperation);
    $(`#clearBtn`).on(`click`, clearInputs);
    getResults();


}


//append to the DOM whichever button is clicked as a string
function displayInputs() {
    let btnClicked = $(this).text();
    // If the button clicked is not an equal sign, 
    if (btnClicked !== `=`) {
        // nor a clear button
        if (btnClicked !== `C`) {
            //append the text of button onto DOM
            $(`#inputDisplay`).append(btnClicked);
        }
    }
}

function renderToDOM(array) {
    console.log(`in renderToDOM`);
    //empties the DOM
    $(`#historyContainer`).empty();
    $(`#resultsContainer`).empty();

    //if there are calculations, show on DOM only the most recent result from listOfCalculations
    if (array.length > 0) {
        $(`#resultContainer`).text(`${array[array.length - 1].result}`);
    }

    //shows on DOM all the calculations from listOfCalculations
    for (let calculations of array) {
        $(`#historyContainer`).append(`
            <li>${calculations.inputString}</li>
        `);
    }
} 


function clearInputs() {
    console.log(`in clearInputs fx`);
    $(`#inputDisplay`).text(``);
}

function getResults() {
    console.log(`in getResults fx`);
    $.ajax({
        method: `GET`,
        url: `/calculate`
    }).then(function (response) {
        console.log(`GET /calculate SUCCESS`);
        renderToDOM(response);
    }).catch(function (response) {
        alert(`GET /calculate failed!`)
    });
}

function calculateOperation() {
    console.log(`in calculateOperation fx`);
    switch ($(`#inputDisplay`).text().charAt(0)) {
        case '':
            alert(`MUST ENTER INPUT`);
            break;
        case '*':
        case '/':
            alert(`Cannot start with an operator`);
            break;
        default:
            $.ajax({
                method: `POST`,
                url: `/calculate`,
                data: {
                    inputString: $(`#inputDisplay`).text(),
                    result: ``
                }
            }).then(function (response) {
                console.log(`POST /calculate success`, response);
                getResults();
            }).catch(function (response) {
                alert(`POST failed`, response);
            })
    }
}