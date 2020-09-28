'use strict';

class SpendingForm {
    constructor(app) {
        this.app = app;
        this.formBody = document.createElement('div');
        this.formBody.id = 'spendingForm';
        this.formPageTitle = document.createElement('div');
        this.app.ui.addSpendingButton.onclick = null;
    }

    displayMerchantChoice() {
        this.clearFormBody();
        let merchants = [];

        for (let merchant of this.app.merchants) {
            merchants.push(node({
                type: 'div',
                class: 'merchantButton',
                id: 'merchant' + merchant.id,
                html: merchant.name,
                onclick: () => {
                    this.merchantId = merchant.id;
                    let selected = document.getElementById('merchant' + merchant.id);

                    let all = document.getElementsByClassName('merchantButton');
                    for (let merch of all)
                        merch.classList.remove('selectedMerchantButton');
                    selected.classList.add('selectedMerchantButton');
                    this.app.ui.addSpendingButton.onclick = () => { this.displaySpendingName() }
                }
            }));
        }

        let merchantList = node({
            type: 'div',
            id: 'merchantList',
            child: merchants
        });

        this.formPageTitle.innerHTML = 'select merchant';
        this.formBody.appendChild(this.formPageTitle);
        this.formBody.appendChild(merchantList);

        this.app.ui.addSpendingButton.innerHTML = 'next';
        return this.drawSelf();
    }

    displaySpendingName() {
        this.clearFormBody();
        console.log('got merchant: ' + this.merchantId);

        let spendingName = node({
            type: 'input',
            id: 'spendingName'
        });

        this.app.ui.addSpendingButton.onclick = () => {
            this.spendingName = document.getElementById('spendingName').value;
            this.displayPrice();
        }

        this.formPageTitle.innerHTML = 'enter spending title';
        this.formBody.appendChild(this.formPageTitle);
        this.formBody.appendChild(spendingName);

        return this.drawSelf();
    }

    displayPrice() {
        this.clearFormBody();
        console.log('got name: ' + this.spendingName);

        let spendingPrice = node({
            type: 'input',
            id: 'spendingPrice'
        });

        let spendingPortions = node({
            type: 'div',
            id: 'spendingPortions',
            child: [
                node({
                    type: 'div',
                    class: 'portionButton',
                    id: 'halvePortionButton',
                    html: '50 %',
                    onclick: () => {
                        this.spendingPortion = 0.5;
                    }
                }),
                node({
                    type: 'div',
                    class: 'portionButton',
                    id: 'allPortionButton',
                    html: '100 %',
                    onclick: () => {
                        this.spendingPortion = 1;
                    }
                })
            ]
        });

        this.app.ui.addSpendingButton.onclick = () => {
            this.spendingPrice = document.getElementById('spendingPrice').value;
            this.displayFriends();
        }

        this.formPageTitle.innerHTML = 'enter price';
        this.formBody.appendChild(this.formPageTitle);
        this.formBody.appendChild(spendingPrice);
        this.formBody.appendChild(spendingPortions);

        return this.drawSelf();
    }

    displayFriends() {
        this.clearFormBody();
        console.log('got price: ' + this.spendingPrice);
        console.log('got portion: ' + this.spendingPortion);
        this.friendUsername = 'nobody';
        let friends = [];

        for (let friend of this.app.user.friends) {
            friends.push(node({
                type: 'div',
                class: 'friendButton',
                id: 'friend' + friend.id,
                html: friend.username,
                onclick: () => {
                    this.friendUsername = friend.username;
                    let selected = document.getElementById('friend' + friend.id);

                    let all = document.getElementsByClassName('friendButton');
                    for (let fr of all)
                        fr.classList.remove('selectedFriendButton');
                    selected.classList.add('selectedFriendButton');
                    this.app.ui.addSpendingButton.onclick = () => { this.saveSpending() }
                }
            }));
        }

        let friendsList = node({
            type: 'div',
            id: 'friendsList',
            child: friends
        });

        this.formPageTitle.innerHTML = 'choose friend';
        this.formBody.appendChild(this.formPageTitle);
        this.formBody.appendChild(friendsList);

        this.app.ui.addSpendingButton.innerHTML = 'save';
        return this.drawSelf();
    }

    saveSpending() {
        console.log('got friend: ' + this.friendUsername);

        let json = JSON.stringify({
            userId: this.app.user.id,
            merchantId: this.merchantId,
            spendingName: this.spendingName,
            spendingPrice: this.spendingPrice,
            spendingPortion: this.spendingPortion,
            date: null,
            friend: this.friendUsername
        });

        sendJson({
            url: 'processNewSpending',
            json: json,
            success: () => {
                this.app.reloadSpendings();
            },
            error: () => console.error('spending not saved, error occured')
        });
    }

    drawSelf() {
        return this.formBody;
    }

    clearFormBody() {
        this.formBody.innerHTML = '';
    }
}