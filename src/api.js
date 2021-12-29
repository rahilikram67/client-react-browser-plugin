// this help us in making http calls to the server
// cb is useState set function 
export default function api(url, method, query, header, cb) {
    var xml = new XMLHttpRequest();
    xml.open(method, url);
    xml.setRequestHeader("Content-Type", "application/" + header);
    xml.responseType = "json";
    xml.onload = function () {
        if (xml.status !== 200) alert("ERROR: status code " + xml.status)
        cb(xml.response)
    }
    xml.onerror = function () { alert("error") }
    if (query) {
        console.log(query)
        xml.send(query)
    }
    else xml.send()
}