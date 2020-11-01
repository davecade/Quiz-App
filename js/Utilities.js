// -- UTILITIES

const getPercentage = (number, total) => {
    return Math.round((number/total)*100);
}

const setValue = (element, value) => {
    element.innerHTML = value;
}


export { getPercentage, setValue }