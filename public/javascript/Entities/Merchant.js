class Merchant {

    constructor(id, name) {
        this._spendings = [];
        this._id = id;
        this._name = name;
    }


    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}