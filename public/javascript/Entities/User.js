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

        this._onFriendsLoaded = (user) => {};
        this.loadFriends();
    }

    set onSpendingsLoaded(call) {
        if (this.spendings === null)
            this._onSpendingsLoaded = call;
        else
            call(this);
    }

    set onFriendsLoaded(call) {
        if (this.friends === null)
            this._onFriendsLoaded = call;
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
                console.log('spendings: ', spendings);
                this.spendings = Spending.parseList(spendings);
                this._onSpendingsLoaded(this);
            },
            error: () => console.error("Spendings not loaded")
        });
    }

    loadFriends() {

        let json = JSON.stringify({
            id: this.id,
        });

        sendJson({
            url: '/getFriends',
            json: json,
            success: (friends) => {
                console.log('friends: ', friends);
                this.friends = Friend.parseList(friends);
                this._onFriendsLoaded(this);
            },
            error: () => console.error("Friends not loaded")
        });
    }
}