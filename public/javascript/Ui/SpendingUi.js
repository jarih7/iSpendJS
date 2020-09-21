'use strict';

class SpendingUi {

    constructor(data, date) {

        this.mainBlock = node({
            type: 'div',
            class: 'spending'
        });

        this.top = node({
            type: 'div',
            class: 'sTop'
        });

        this.bottom = node({
            type: 'div',
            class: 'sBot'
        });

        //spending shared
        if (data.friendId != 0) {
            this.sharingUi = new SharingUi(data.userId, data.username, data.spendingUserId, data.friendUsername);
            this.top.appendChild(this.sharingUi.drawSelf());
        } else {
            this.top.appendChild(node({
                type: 'div',
                class: 'sharing',
                html: 'not shared'
            }));
        }

        this.top.appendChild(node({
            type: 'div',
            class: 'spendingTop',
            child: [
                node({
                    type: 'div',
                    class: 'spendingName',
                    html: data.name
                }),
                node({
                    type: 'div',
                    class: 'spendingPrice',
                    html: data.price + ' Kč'
                })
            ]
        }));

        this.top.appendChild(node({
            type: 'div',
            class: 'spendingMiddle',
            child: [
                node({
                    type: 'div',
                    class: 'merchantName',
                    html: data.merchantName
                }),
                node({
                    type: 'div',
                    class: 'spendingPortion',
                    html: data.portion * 100 + ' %'
                })
            ]
        }));

        let merchantLogo = document.createElement('img');
        merchantLogo.setAttribute('src', 'visual/merchants/' + data.merchantName + '.png');
        merchantLogo.setAttribute('class', 'merchantLogo');

        this.bottom.appendChild(node({
            type: 'div',
            class: 'spendingBottom',
            child: [
                node({
                    type: 'div',
                    class: 'spendingDate',
                    html: date.toLocaleString('en-EN', {month: 'long'}) + ' '
                    + date.getDate() + ', ' + date.getFullYear()
                }),
                merchantLogo
            ]
        }));

        this.mainBlock.appendChild(this.top);
        this.mainBlock.appendChild(this.bottom);
    }

    drawSelf() {
        return this.mainBlock;
    }
}