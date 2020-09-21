'use strict';

window.onload = function() {
    let app = new App();
    app.logIn('jarito');
}

/*function logIn(username) {
    let req = new XMLHttpRequest();
    req.responseType = 'json';

    let json = JSON.stringify({
        username: username,
    });

    req.open('POST', '/getUser');
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    req.onload = function () {

        if (req.status !== 200) { // HTTP error?
            // handle error
            alert('Error: ' + req.status);
        }

        const userData = req.response[0];


        app.user = new User(userData['id'], userData['firstName'], userData['lastName'],
            userData['username'], null, null, null);

        app.showNavBar();
        app.loadSpendings();
        app.toggleOverview();
    }

    req.send(json);
}*/