'use strict';

class Friend {

    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
    }

    static parseList(dataList){
        let list = [];
        
        list.push(new Friend({
            id: 0,
            firstName: 'no',
            lastName: 'friend',
            username: 'nobody'
        }));

        for(let data of dataList) 
            list.push(new Friend(data));

        return list;
    }
}