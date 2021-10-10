console.log(`js loaded`);
$(jqReady);

function jqReady() {
    console.log(`jquery loaded`);
    $(`#addBtn`).on(`click`, addBtnSelected);
    $(`#subtractBtn`).on(`click`, subtractBtnSelected);
    $(`#multiplyBtn`).on(`click`, multiplyBtnSelected);
    $(`#divideBtn`).on(`click`, divideBtnSelected);
    $(`#equalBtn`).on(`click`, calculateOperation);
    $(`#clearBtn`).on(`click`, clearInputs);
    getResults();
}

function renderToDOM(array) {
    console.log(`in renderToDOM`);
    $(`#historyContainer`).empty();
    $(`#resultsContainer`).empty();

    $(`#resultContainer`).text(`${array[array.length-1].result}`)

    for (let calculations of array) {
        $(`#historyContainer`).append(`
            <li>${calculations.firstNum} ${calculations.operator} ${calculations.secondNum}</li>
        `);
    }
} 

function addBtnSelected() {
    console.log(`in addBtnSelected fx`);
    if ($(`#addBtn`).hasClass(`selectedOperator`)) {
        $(`#addBtn`).removeClass(`selectedOperator`);
    }
    else {
        if ($(`.selectedOperator`).length >= 1) {
            console.log(`in else`);
            $(`#addBtn`).removeClass(`selectedOperator`);
            $(`#subtractBtn`).removeClass(`selectedOperator`);
            $(`#multiplyBtn`).removeClass(`selectedOperator`);
            $(`#divideBtn`).removeClass(`selectedOperator`);
            $(`#addBtn`).addClass(`selectedOperator`);
                }
        else {
            $(`#addBtn`).addClass(`selectedOperator`);
        }
    }
}

function subtractBtnSelected() {
    console.log(`in subtractBtnSelected fx`);
    if ($(`#subtractBtn`).hasClass(`selectedOperator`)) {
        $(`#subtractBtn`).removeClass(`selectedOperator`);
    }
    else {
        if ($(`.selectedOperator`).length >= 1) {
            console.log(`in else`);
            $(`#addBtn`).removeClass(`selectedOperator`);
            $(`#subtractBtn`).removeClass(`selectedOperator`);
            $(`#multiplyBtn`).removeClass(`selectedOperator`);
            $(`#divideBtn`).removeClass(`selectedOperator`);
            $(`#subtractBtn`).addClass(`selectedOperator`);
        }
        else {
            $(`#subtractBtn`).addClass(`selectedOperator`);
        }
    }
}

function multiplyBtnSelected() {
    console.log(`in multiplyBtnSelected fx`);
    if ($(`#multiplyBtn`).hasClass(`selectedOperator`)) {
        $(`#multiplyBtn`).removeClass(`selectedOperator`);
    }
    else {
        if ($(`.selectedOperator`).length >= 1) {
            console.log(`in else`);
            $(`#addBtn`).removeClass(`selectedOperator`);
            $(`#subtractBtn`).removeClass(`selectedOperator`);
            $(`#multiplyBtn`).removeClass(`selectedOperator`);
            $(`#divideBtn`).removeClass(`selectedOperator`);
            $(`#multiplyBtn`).addClass(`selectedOperator`);
        }
        else {
            $(`#multiplyBtn`).addClass(`selectedOperator`);
        }
    }
}

function divideBtnSelected() {
    console.log(`in divideBtnSelected fx`);
    if ($(`#divideBtn`).hasClass(`selectedOperator`)) {
        $(`#divideBtn`).removeClass(`selectedOperator`);
    }
    else {
        if ($(`.selectedOperator`).length >= 1) {
            console.log(`in else`);
            $(`#addBtn`).removeClass(`selectedOperator`);
            $(`#subtractBtn`).removeClass(`selectedOperator`);
            $(`#multiplyBtn`).removeClass(`selectedOperator`);
            $(`#divideBtn`).removeClass(`selectedOperator`);
            $(`#divideBtn`).addClass(`selectedOperator`);
        }
        else {
            $(`#divideBtn`).addClass(`selectedOperator`);
        }
    }
}

function clearInputs() {
    console.log(`in clearInputs fx`);
    $(`#firstNumInput`).val(``);
    $(`#secondNumInput`).val(``);
    $(`#addBtn`).removeClass(`selectedOperator`);
    $(`#subtractBtn`).removeClass(`selectedOperator`);
    $(`#multiplyBtn`).removeClass(`selectedOperator`);
    $(`#divideBtn`).removeClass(`selectedOperator`);
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
    $.ajax({
        method: `POST`,
        url: `/calculate`,
        data: {
            firstNum: $(`#firstNumInput`).val(),
            operator:
                $(`#addBtn`).hasClass(`selectedOperator`) ? `+`
                    : $(`#subtractBtn`).hasClass(`selectedOperator`) ? `-` 
                        : $(`#multiplyBtn`).hasClass(`selectedOperator`) ? `*`
                            : $(`#divideBtn`).hasClass(`selectedOperator`) ? `/`
                                : ``,
            secondNum: $(`#secondNumInput`).val(),
            result: ``
        }
    }).then(function (response) {
        console.log(`POST /calculate success`, response);
        getResults();
    }).catch(function (response) {
        alert(`POST failed`, response);
    })

}

