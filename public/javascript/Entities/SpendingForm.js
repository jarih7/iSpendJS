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
        this.userId.type = 'text';
        this.userId.value = this.app.user.id;
        this.userId.name = 'userId';
        this.userId.id = 'userId';
    }

    prepMerchantSection() {
        this.merchantLabel = document.createElement('label');
        this.merchantLabel.htmlFor = 'merchant';
        this.merchantLabel.innerHTML = 'merchant';
        this.merchantInput = document.createElement('select');
        this.merchantInput.name = 'merchant';
        this.merchantInput.id = 'merchantInput';
        this.merchantInput.required = true;

        for (let merchant of this.app.merchants) {
            let merchantOption = document.createElement('option');
            merchantOption.value = merchant.name;
            merchantOption.id = 'merchantOption';
            merchantOption.innerHTML = merchant.name;
            this.merchantInput.appendChild(merchantOption);
        }

        this.appendDuo(this.merchantLabel, this.merchantInput);
    }

    prepNameSection() {
        this.nameLabel = document.createElement('label');
        this.nameLabel.htmlFor = 'spendingName';
        this.nameLabel.innerHTML = 'spending title';
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.name = 'spendingName';
        //this.nameInput.placeholder = 'groceries';
        this.nameInput.id = 'spendingName';
        this.nameInput.required = true;
        this.appendDuo(this.nameLabel, this.nameInput);
    }

    prepPriceSection() {
        this.priceLabel = document.createElement('label');
        this.priceLabel.htmlFor = 'spendingPrice';
        this.priceLabel.innerHTML = 'spending price';
        this.priceInput = document.createElement('input');
        this.priceInput.type = 'text';
        this.priceInput.name = 'spendingPrice';
        this.priceInput.id = 'priceInput';
        //this.priceInput.placeholder = '123.45';
        this.priceInput.required = true;
        this.appendDuo(this.priceLabel, this.priceInput);
    }

    prepPortionSection() {
        this.portionLabel = document.createElement('label');
        this.portionLabel.htmlFor = 'spendingPortion';
        this.portionLabel.innerHTML = 'spending portion';
        this.portionInput = document.createElement('select');
        this.portionInput.name = 'spendingPortion';
        this.portionInput.id = 'portionInput';
        this.portionInput.required = true;

        for (let portion of this.app.portions) {
            let portionOption = document.createElement('option');
            portionOption.value = portion.value;
            portionOption.innerHTML = portion.value;
            portionOption.className = 'portionOption';
            this.portionInput.appendChild(portionOption);
        }

        this.appendDuo(this.portionLabel, this.portionInput);
    }

    prepDateSection() {
        this.dateLabel = document.createElement('label');
        this.dateLabel.htmlFor = 'date';
        this.dateLabel.innerHTML = 'date';
        this.dateInput = document.createElement('input');
        this.dateInput.type = 'date';
        this.dateInput.name = 'date';
        this.dateInput.id = 'dateInput';
        this.dateInput.required = false;
        //this.appendDuo(this.dateLabel, this.dateInput);
    }

    prepFriendSection() {
        this.friendLabel = document.createElement('label');
        this.friendLabel.htmlFor = 'friend';
        this.friendLabel.innerHTML = 'friend';
        this.friendInput = document.createElement('select');
        this.friendInput.name = 'friend';
        this.friendInput.id = 'friendInput';
        this.friendInput.required = true;

        console.log('this app user friends:', this.app.user.friends);

        for (let friend of this.app.user.friends) {
            let friendOption = document.createElement('option');
            friendOption.value = friend.username;
            friendOption.innerHTML = friend.username;
            friendOption.className = 'friendOption';
            this.friendInput.appendChild(friendOption);
        }

        this.appendDuo(this.friendLabel, this.friendInput);
    }

    prepSubmitSection() {
        this.submitButton = node({
            type: 'div',
            id: 'submitButton',
            html: 'Submit',
            onclick: () => {
                this.submitForm();
                console.log('going back to history');
                this.app.history();
            }
        });

        this.form.appendChild(this.submitButton);
    }

    submitForm() {
        console.log('event submit form');

        let merchantOpts = document.getElementById('merchantInput');
        let selectedMerchant = merchantOpts.options[merchantOpts.selectedIndex].value;

        let friendOpts = document.getElementById('friendInput');
        let selectedFriend = friendOpts.options[friendOpts.selectedIndex].value;

        let portionOpts = document.getElementById('portionInput');
        let selectedPortion = portionOpts.options[portionOpts.selectedIndex].value;

        let json = JSON.stringify({
            userId: this.app.user.id,
            merchantName: selectedMerchant,
            spendingName: this.nameInput.value,
            spendingPrice: this.priceInput.value,
            spendingPortion: selectedPortion,
            date: this.dateInput.value,
            friend: selectedFriend
        });

        sendJson({
            url: '/processNewSpending',
            json: json,
            success: () => this.app.history(),
            error: () => console.error('spending not processed')
        });
    }

    appendDuo(label, input) {
        this.form.appendChild(label);
        this.form.appendChild(input);
    }
}