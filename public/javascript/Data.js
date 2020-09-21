'use strict';

function sendJson(options) {

    let req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('POST', options.url, true);

    req.setRequestHeader('Content-type', 'application/json');

    req.onload = function () {
        console.log(this);
        if (req.status === 200) { // HTTP error?
            //response = JSON.parse(req.responseText);  
            //console.log('got from server', req);          
            options.success(req.response);
        } else {
            options.error();
        }
    }

    //console.log('sending', options);
    req.send(options.json); 
}