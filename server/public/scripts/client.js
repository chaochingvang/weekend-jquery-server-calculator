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
}

function addBtnSelected() {
    console.log(`in addBtnSelected fx`);
}

function subtractBtnSelected() {
    console.log(`in subtractBtnSelected fx`);
}

function multiplyBtnSelected() {
    console.log(`in multiplyBtnSelected fx`);
}

function divideBtnSelected() {
    console.log(`in divideBtnSelected fx`);
}

function calculateOperation() {
    console.log(`in calculateOperation fx`);
}

function clearInputs() {
    console.log(`in clearInputs fx`);
}

