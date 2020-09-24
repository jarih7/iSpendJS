'use strict';

class SpendingForm {
    constructor(app) {
        this.app = app;
        this.form = document.createElement('form');
        this.prepUserId();
        this.prepMerchantSection();
        this.prepNameSection();
        this.prepPriceSection();
        this.prepPortionSection();
        this.prepDateSection();
        this.prepFriendSection();
        this.prepSubmitSection();
    
        return this.form;
    }

    prepUserId() {
        this.userId = document.createElement('input');
        this.userId.setAttribute('type', 'text');
        this.userId.value = this.app.user.id;
        console.log('inserting user id', this.app.user.id);
        this.userId.setAttribute('name', 'userId');
        this.userId.setAttribute('id', 'userId');

        this.form.appendChild(this.userId);
    }

    prepMerchantSection() {
        this.merchantLabel = document.createElement('label');
        this.merchantLabel.setAttribute('for', 'merchant');
        this.merchantLabel.innerHTML = 'merchant';
        this.merchantInput = document.createElement('select');
        this.merchantInput.setAttribute('name', 'merchant');
        this.merchantInput.setAttribute('id', 'merchantInput');

        for (let merchant of this.app.merchants) {
            let merchantOption = document.createElement('option');
            merchantOption.setAttribute('value', merchant.name);
            merchantOption.setAttribute('id', 'merchantOption');
            merchantOption.innerHTML = merchant.name;
            this.merchantInput.appendChild(merchantOption);
        }

        this.appendDuo(this.merchantLabel, this.merchantInput);
    }

    prepNameSection() {
        this.nameLabel = document.createElement('label');
        this.nameLabel.setAttribute('for', 'spendingName');
        this.nameLabel.innerHTML = 'spending title';
        this.nameInput = document.createElement('input');
        this.nameInput.setAttribute('type', 'text');
        this.nameInput.setAttribute('name', 'spendingName');
        this.nameInput.setAttribute('placeholder', 'groceries');
        this.nameInput.setAttribute('id', 'spendingName');

        this.appendDuo(this.nameLabel, this.nameInput);
    }

    prepPriceSection() {
        this.priceLabel = document.createElement('label');
        this.priceLabel.setAttribute('for', 'spendingPrice');
        this.priceLabel.innerHTML = 'spending price';
        this.priceInput = document.createElement('input');
        this.priceInput.setAttribute('type', 'text');
        this.priceInput.setAttribute('name', 'spendingPrice');
        this.priceInput.setAttribute('id', 'priceInput');
        this.priceInput.setAttribute('placeholder', '123.45');

        this.appendDuo(this.priceLabel, this.priceInput);
    }

    prepPortionSection() {
        this.portionLabel = document.createElement('label');
        this.portionLabel.setAttribute('for', 'spendingPortion');
        this.portionLabel.innerHTML = 'spending portion';
        this.portionInput = document.createElement('input');
        this.portionInput.setAttribute('type', 'text');
        this.portionInput.setAttribute('name', 'spendingPortion');
        this.portionInput.setAttribute('id', 'portionInput');
        this.portionInput.setAttribute('placeholder', '0.5');

        this.appendDuo(this.portionLabel, this.portionInput);
    }

    prepDateSection() {
        this.dateLabel = document.createElement('label');
        this.dateLabel.setAttribute('for', 'date');
        this.dateLabel.innerHTML = 'date';
        this.dateInput = document.createElement('input');
        this.dateInput.setAttribute('type', 'date');
        this.dateInput.setAttribute('name', 'date');
        this.dateInput.setAttribute('id', 'dateInput');

        //this.appendDuo(this.dateLabel, this.dateInput);
    }

    prepFriendSection() {
        this.friendLabel = document.createElement('label');
        this.friendLabel.setAttribute('for', 'friend');
        this.friendLabel.innerHTML = 'friend';
        this.friendInput = document.createElement('select');
        this.friendInput.setAttribute('name', 'friend');
        this.friendInput.setAttribute('id', 'friendInput');

        console.log('this app user friends:', this.app.user.friends);

        for (let friend of this.app.user.friends) {
            let friendOption = document.createElement('option');
            friendOption.setAttribute('value', friend.username);
            friendOption.setAttribute('id', 'friendOption');
            friendOption.innerHTML = friend.username;
            this.friendInput.appendChild(friendOption);
        }

        this.appendDuo(this.friendLabel, this.friendInput);
    }

    prepSubmitSection() {
        let submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Submit');
        submitButton.setAttribute('id', 'submitButton');
        this.form.appendChild(submitButton);

        console.log('PREP SUBMIT');

        this.form.setAttribute('action', '/processNewSpending');
        this.form.setAttribute('method', 'post');
        this.form.onsubmit = function () {
            this.app.history();
        };

        /*
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
                success: () => console.log('spending processed'),
                error: () => console.error('spending not processed')
            });
        };
        */
    }

    appendDuo(label, input) {
        this.form.appendChild(label);
        this.form.appendChild(input);
    }
}