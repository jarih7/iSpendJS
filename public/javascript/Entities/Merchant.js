'use strict';

class Merchant {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }

    static parseList(dataList){
        let list = [];
        for(let data of dataList) 
            list.push(new Merchant(data));

        return list;
    }
}