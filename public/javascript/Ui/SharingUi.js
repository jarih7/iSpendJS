'use strict';

class SharingUi {

    constructor(userId, username, spendingUserId, friendUsername) {

        let fromTo = node({
            type: 'div',
            class: 'fromTo'
        });

        if (userId == spendingUserId) {
            fromTo.appendChild(node({
                type: 'div',
                class: 'spendingMe',
                html: username
            }));
            fromTo.appendChild(node({
                type: 'div',
                class: 'spendingArrow',
                html: '&#8594;'
            }));
            fromTo.appendChild(node({
                type: 'div',
                class: 'spendingFriend',
                html: friendUsername
            }));
        } else {
            fromTo.appendChild(node({
                type: 'div',
                class: 'spendingMe',
                html: friendUsername
            }));
            fromTo.appendChild(node({
                type: 'div',
                class: 'spendingArrow',
                html: '&#8592;'
            }));
            fromTo.appendChild(node({
                type: 'div',
                class: 'spendingFriend',
                html: username
            }));
        }

        this.mainBlock = node({
            type: 'div',
            class: 'sharing',
            child: [
                node({
                    type: 'div',
                    class: 'sharingNotice',
                    child: [
                        node({
                            type: 'div',
                            class: 'sharingSymbol',
                            html: '↻'
                        }),
                        node({
                            type: 'div',
                            html: 'shared'
                        })
                    ]
                }),
                fromTo
            ]
        });
    }

    drawSelf() {
        return this.mainBlock;
    }
}