'use strict';

class User {

    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
        this.spendings = null;
        this.friends = null;
        this.friendOf = null;
        this._onSpendingsLoaded = (user) => {};

        this.loadSpendings();
    }

    set onSpendingsLoaded(call) {
        if (this.spendings === null)
            this._onSpendingsLoaded = call;
        else
            call(this);
    }

    loadSpendings() {

        let json = JSON.stringify({
            id: this.id,
        });

        sendJson({
            url: '/getSpendings',
            json: json,
            success: (spendings) => {
                console.log('spendings', spendings);
                this.spendings = Spending.parseList(spendings);
                this._onSpendingsLoaded(this);
            },
            error: () => console.error("Spendings not loaded")
        });
    }
}