'use strict';

function compareMerchants(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

class Merchant {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }

    static parseList(dataList){
        let list = [];
        for(let data of dataList) 
            list.push(new Merchant(data));

        list.sort(compareMerchants);
        return list;
    }
}