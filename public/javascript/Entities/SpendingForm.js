'use strict';

class SpendingForm {
    constructor(app) {
        this.app = app;
        this.form = document.createElement('form');
        this.prepMerchantSection();
        this.prepNameSection();
        this.prepPriceSection();
        this.prepPortionSection();
        this.prepDateSection();
        this.prepFriendSection();
    
        return this.form;
    }

    prepMerchantSection() {
        this.merchantLabel = document.createElement('label');
        merchantLabel.setAttribute('for', 'merchant');
        merchantLabel.innerHTML = 'merchant';
        this.merchantInput = document.createElement('select');
        merchantInput.setAttribute('name', 'merchant');
        merchantInput.setAttribute('id', 'merchantInput');

        for (let merchant of this.app.merchants) {
            let merchantOption = document.createElement('option');
            merchantOption.setAttribute('value', merchant.name);
            merchantOption.setAttribute('id', 'merchantOption');
            merchantOption.innerHTML = merchant.name;
            merchantInput.appendChild(merchantOption);
        }

        this.appendDuo(merchantLabel, merchantInput);
    }

    prepNameSection() {
        this.nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'spendingName');
        nameLabel.innerHTML = 'spending title';
        this.nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', 'spendingName');
        nameInput.setAttribute('placeholder', 'groceries');
        nameInput.setAttribute('id', 'spendingName');

        this.appendDuo(nameLabel, nameInput);
    }

    prepPriceSection() {
        this.priceLabel = document.createElement('label');
        priceLabel.setAttribute('for', 'spendingPrice');
        priceLabel.innerHTML = 'spending price';
        this.priceInput = document.createElement('input');
        priceInput.setAttribute('type', 'number');
        priceInput.setAttribute('name', 'spendingPrice');
        priceInput.setAttribute('id', 'priceInput');
        priceInput.setAttribute('placeholder', '123.45');

        this.appendDuo(priceLabel, priceInput);
    }

    prepPortionSection() {
        this.portionLabel = document.createElement('label');
        portionLabel.setAttribute('for', 'spendingPortion');
        portionLabel.innerHTML = 'spending portion';
        this.portionInput = document.createElement('input');
        portionInput.setAttribute('type', 'number');
        portionInput.setAttribute('name', 'spendingPortion');
        portionInput.setAttribute('id', 'portionInput');
        portionInput.setAttribute('placeholder', '0.5');

        this.appendDuo(portionLabel, portionInput);
    }

    prepDateSection() {
        this.dateLabel = document.createElement('label');
        dateLabel.setAttribute('for', 'date');
        dateLabel.innerHTML = 'date';
        this.dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('name', 'date');
        dateInput.setAttribute('id', 'dateInput');

        this.appendDuo(dateLabel, dateInput);
    }

    prepFriendSection() {
        this.friendLabel = document.createElement('label');
        friendLabel.setAttribute('for', 'friend');
        friendLabel.innerHTML = 'friend';
        this.friendInput = document.createElement('select');
        friendInput.setAttribute('name', 'friend');
        friendInput.setAttribute('id', 'friendInput');

        for (let friend of this.app.user.friends) {
            let friendOption = document.createElement('option');
            friendOption.setAttribute('value', friend.username);
            friendOption.setAttribute('id', 'friendOption');
            friendOption.innerHTML = friend.username;
            friendInput.appendChild(friendOption);
        }

        this.appendDuo(friendLabel, friendInput);
    }

    prepSubmitSection() {
        this.submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');
        submitButton.setAttribute('id', 'submitButton');
        this.form.appendChild(submitButton);

        this.form.onsubmit = function() {
            
            let json = JSON.stringify({
                userId: this.app.user.id,
                merchantName: document.getElementById('merchantOption').innerText,
                spendingName: this.nameInput.innerText,
                spendingPrice: this.priceInput.innerText,
                spendingPortion: this.portionInput.innerText,
                date: this.dateInput.innerText,
                friend: this.friendOption.innerText
            });

            sendJson({
                url: '/processNewSpending',
                json: json,
                success: (newSpending) => this.saveNewSpending(),
                error: () => console.error("spending not processed")
            });
        };
    }

    appendDuo(label, input) {
        this.form.appendChild(label);
        this.form.appendChild(input);
    }
}