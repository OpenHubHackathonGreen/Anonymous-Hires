function requestLisener(event){
    let response = this.responseText;
}
function makeRequest(request){
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", requestLisener);
    oReq.open("GET", request);
    oReq.send();
}