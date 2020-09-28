'use strict';

class SpendingForm {
    constructor(app) {
        this.app = app;
        this.form = document.createElement('form');
        this.form.id = 'spendingForm';
        this.priceAndPortion = document.createElement('div');
        this.priceAndPortion.id = 'priceAndPortion';

        

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

        this.appendDuo(this.merchantLabel, this.merchantInput, this.form);
    }

    prepNameSection() {
        this.nameLabel = document.createElement('label');
        this.nameLabel.htmlFor = 'spendingName';
        this.nameLabel.innerHTML = 'spending title';
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.name = 'spendingName';
        this.nameInput.placeholder = 'groceries';
        this.nameInput.id = 'spendingName';
        this.nameInput.required = true;
        this.appendDuo(this.nameLabel, this.nameInput, this.form);
    }

    prepPriceSection() {
        this.priceLabel = document.createElement('label');
        this.priceLabel.htmlFor = 'spendingPrice';
        this.priceLabel.innerHTML = 'spending price';
        this.priceInput = document.createElement('input');
        this.priceInput.type = 'text';
        this.priceInput.name = 'spendingPrice';
        this.priceInput.id = 'priceInput';
        this.priceInput.placeholder = '123.45';
        this.priceInput.required = true;
        this.appendDuo(this.priceLabel, this.priceInput, this.priceAndPortion);
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

        this.appendDuo(this.portionLabel, this.portionInput, this.priceAndPortion);
        this.form.appendChild(this.priceAndPortion);
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

        this.appendDuo(this.friendLabel, this.friendInput, this.form);
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
            success: (spending) => this.app.user.addNewSpending(spending),
            error: () => console.error('spending not processed')
        });
    }

    addNewSpending(spending) {
        //add new spending from json data received above
    }

    appendDuo(label, input, target) {
        let pair = node({
            type: 'div',
            class: 'formPair',
            child: [
                label,
                input
            ]
        });

        target.appendChild(pair);
    }
}