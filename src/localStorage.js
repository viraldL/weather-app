function populateStorage() {
            localStorage.setItem(`tempType`, document.querySelector('input[name="value-radio"]:checked').value);
            // localStorage.setItem(`city`, city);
}

function retriveStorage() {
    if(localStorage.getItem("tempType") == 0) {
        document.querySelectorAll('input[name="value-radio"]')[0].checked = true;
    } else {
        document.querySelectorAll('input[name="value-radio"]')[1].checked = true;
    }
}

export { populateStorage, retriveStorage };