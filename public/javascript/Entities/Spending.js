'use strict';

function compareSpendings(a, b) {
    if (a.date.getTime() < b.date.getTime())
        return 1;
    if (a.date.getTime() > b.date.getTime())
        return -1;
    return 0;
}

class Spending {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.portion = data.portion;

        let dateTimeString = new String(data.date.date);
        let dateString = dateTimeString.split(' ')[0];
        this.date = new Date(dateString);

        this.userId = data.userId;
        this.spendingUserId = data.spendingUserId;
        this.friendId = data.friendId;
        this.friendUsername = data.friendUsername;
        this.merchantName = data.merchantName;

        this.ui = new SpendingUi(data, this.date);
    }

    static parseList(dataList){
        let list = [];
        for(let data of dataList) 
            list.push(new Spending(data));

        list.sort(compareSpendings);
        return list;
    }

}