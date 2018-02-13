export function convertSecondsToDate (secondsIn) {
    //console.log("Entering convertSecondsToDate"); //debug
    let millisecondsHere = secondsIn * 1000;
    //console.log("Calculated Milliseconds: " + millisecondsHere); //debug
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    let localDate = new Date(millisecondsHere);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString
    let localDateString = localDate.toLocaleDateString("en-US", options);
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    let localTimeString = localDate.toLocaleTimeString('en-US');
    let localDateTimeString = localDateString + ", " + localTimeString;
    //console.log(localDateString); //debug
    //console.log("Leaving convertSecondsToDate"); //debug
    return localDateTimeString;
}