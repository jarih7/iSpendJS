'use strict';

function node(options) {
    let e;

    if (!options) {
        e = document.createElement('div');
        return e;
    } else {
        e = document.createElement(options.type);
    }

    if (options.id)
        e.id = options.id;

    if (options.html)
        e.innerHTML = options.html;

    if (options.class) {
        if (Array.isArray(options.class))
            for (let c of options.class)
                e.classList.add(c);
        else
            e.classList.add(options.class);
    }

    if (options.child) {
        if (Array.isArray(options.child))
            for (let c of options.child)
                e.appendChild(c);
        else
            e.appendChild(options.child);
    }

    if (options.onclick) {
        e.onclick = options.onclick;
    }

    if (options.onmouseenter && options.onmouseleave)
    {
        e.onmouseenter = options.onmouseenter;
        e.onmouseleave = options.onmouseleave;
    }

    return e;
}


class Ui {

    constructor(app) {
        this.app = app;
        this.activeUser = document.getElementById('activeUser');
        this.content = document.getElementById('content');
        this.background = document.getElementById('background');

        this.navbar = null;
        this.overviewButton = null;
        this.historyButton = null;
        this.searchButton = null;
        this.settingsButton = null;
        this.addSpendingButton = null;

        this.activeButton = null;
        this.activeViewContent = null;
    }

    appendToContent(element) {
        this.content.appendChild(element);
    }

    clearContent() {
        this.content.innerHTML = '';
    }

    appendToActiveViewContent(element) {
        this.activeViewContent.appendChild(element);
    }

    clearActiveViewContent() {
        this.activeViewContent.innerHTML = '';
    }

    createLoginScreen(userList) {
        let users = [];

        for (let user of userList) {
            users.push(node({
                type: 'div',
                class: 'user',
                html: user, //user contains user's username
                onclick: () => {
                    this.app.logIn(user);
                }
            }));
        }

        let list = node({
            type: 'div',
            id: 'userList',
            child: users
        });

        let welcome = node({
            type: 'div',
            id: 'welcome',
            html: 'iSpend log-in'
        });

        this.appendToContent(welcome);
        this.appendToContent(list);
        this.background.classList.remove('backgroundWrapLogged');
        this.background.classList.add('backgroundWrapLogIn');
    }

    createPageLayout(user) {
        this.clearContent();

        let logoutButton = document.createElement('img');
        logoutButton.setAttribute('src', 'visual/icons/' + 'logout.png');
        logoutButton.setAttribute('id', 'logoutButton');
        logoutButton.onclick = () => { this.app.logOut(user.username) }

        let header = node({
            type: 'div',
            id: 'header',
            child: node({
                type: 'div',
                id: 'userAndLogout',
                child: [
                    node({
                        type: 'div',
                        html: user.username,
                        id: 'activeUser'
                    }),
                    logoutButton
                ]
            })
        });
        
        this.createNavBar(header);
        this.activeViewContent = node({
            type: 'div',
            id: 'active'
        });
        
        this.appendToContent(header);
        this.appendToContent(this.activeViewContent);
        this.background.classList.remove('backgroundWrapLogIn');
        this.background.classList.add('backgroundWrapLogged');
    }

    createNavBar(header) {
        this.overviewButton = node({
            type: 'div',
            id: 'overviewButton',
            class: 'activeButton',
            html: 'Overview',
            onclick: () => { this.app.overview() }
        });

        //set overview as active
        this.activeButton = this.overviewButton;

        this.historyButton = node({
            type: 'div',
            id: 'historyButton',
            html: 'History',
            onclick: () => { this.app.history() }
        });

        this.searchButton = node({
            type: 'div',
            id: 'searchButton',
            html: 'Search',
            onclick: () => { this.app.search() }
        });

        this.settingsButton = node({
            type: 'div',
            id: 'settingsButton',
            html: 'Settings',
            onclick: () => { this.app.settings() }
        });

        let nav = node({
            type: 'div',
            id: 'navbar',
            child: [
                this.overviewButton,
                this.historyButton,
                this.searchButton,
                this.settingsButton
            ]
        });

        this.addSpendingButton = node({
            type: 'div',
            id: 'addSpendingButton',
            html: 'add spending',
            onclick: () => { this.app.addSpending() }
        });

        let navContainer = node({
            type: 'div',
            id: 'navContainer',
            child: [
                nav,
                node({
                    type:'div',
                    id: 'addSpendingButtonContainer',
                    child: this.addSpendingButton
                })
            ]
        });

        header.appendChild(navContainer);
        this.navbar = navContainer;
    }

    displayOverview(user) {
        this.switchView(this.overviewButton);
        //spendings already filled
        
        //let lastWeekList = [];
        //let lastMonthList = [];

        let today = new Date();
        let minusWeek = new Date(today);
        let minusMonth = new Date(today);

        let lastWeekSum = 0;
        let lastMonthSum = 0;

        minusWeek.setDate(minusWeek.getDate() - 7);
        minusMonth.setMonth(minusMonth.getMonth() - 1);

        for (let spending of user.spendings) {
            if (spending.date >= minusWeek) {
                lastWeekSum += spending.price;
                lastMonthSum += spending.price;
                continue;
            }

            if (spending.date >= minusMonth) {
                lastMonthSum += spending.price;
            }
        }

        let lastWeekBlock = node({
            type: 'div',
            id: 'lastWeekBlock',
            child: [
                node({
                    type: 'div',
                    id: 'lastWeekBlockTop',
                    child: [
                        node({
                            type: 'div',
                            id: 'lastWeekBlockTitle',
                            html: 'last week'
                        }),
                        node({
                            type: 'div',
                            id: 'lastWeekBlockDates',
                            html: 'from ' + minusWeek.toLocaleString('en-EN', {month: 'long'}) + ' '
                            + minusWeek.getDate() + ' to ' + today.toLocaleString('en-EN', {month: 'long'}) + ' '
                            + today.getDate()
                        })
                    ]
                }),
                node({
                    type: 'div',
                    id: 'lastWeekBlockBottom',
                    html: lastWeekSum + ' Kč'
                })
            ]
        });

        let lastMonthBlock = node({
            type: 'div',
            id: 'lastMonthBlock',
            child: [
                node({
                    type: 'div',
                    id: 'lastMonthBlockTop',
                    child: [
                        node({
                            type: 'div',
                            id: 'lastMonthBlockTitle',
                            html: 'last month'
                        }),
                        node({
                            type:'div',
                            id: 'lastMonthBlockDates',
                            html: 'from ' + minusMonth.toLocaleString('en-EN', {month: 'long'}) + ' '
                            + minusMonth.getDate() + ' to ' + today.toLocaleString('en-EN', {month: 'long'}) + ' '
                            + today.getDate()
                        })
                    ]
                }),
                node({
                    type: 'div',
                    id: 'lastMonthBlockBottom',
                    html: lastMonthSum + ' Kč'
                })
            ]
        });

        let overviewBlocks = node({
            type: 'div',
            id: 'overviewBlocks',
            child: [
                lastWeekBlock,
                lastMonthBlock
            ]
        });

        this.appendToActiveViewContent(overviewBlocks);
    }

    displayHistory(user) {
        this.switchView(this.historyButton);

        let spendings = [];

        for (let spending of user.spendings) {
            spendings.push(spending.ui.drawSelf())
        }

        let list = node({
            type: 'div',
            id: 'spendings',
            child: spendings
        });

        this.appendToActiveViewContent(list);
    }

    displaySearch(user) {
        this.switchView(this.searchButton);
    }

    displaySettings(user) {
        this.switchView(this.settingsButton);
    }

    displayAddSpending(user) {
        this.switchView(this.addSpendingButton);

        let l0 = document.createElement('label');
        l0.setAttribute('for', 'merchant');
        l0.innerHTML = 'merchant';

        let in0 = document.createElement('select');
        in0.setAttribute('name', 'merchant');

        //options

        let op0 = document.createElement('option');
        op0.setAttribute('value', 'Billa');
        op0.innerHTML = 'Billa';
        in0.appendChild(op0);

        //options

        let l1 = document.createElement('label');
        l1.setAttribute('for', 'spendingName');
        l1.innerHTML = 'spending title';

        let in1 = document.createElement('input');
        in1.setAttribute('type', 'text');
        in1.setAttribute('name', 'spendingName');
        in1.setAttribute('placeholder', 'groceries');

        let l2 = document.createElement('label');
        l2.setAttribute('for', 'spendingPrice');
        l2.innerHTML = 'spending price';

        let in2 = document.createElement('input');
        in2.setAttribute('name', 'spendingPrice');
        in2.setAttribute('placeholder', '123.45');

        let l3 = document.createElement('label');
        l3.setAttribute('for', 'date');
        l3.innerHTML = 'date';

        let in3 = document.createElement('input');
        in3.setAttribute('type', 'date');
        in3.setAttribute('name', 'date');

        let in4 = document.createElement('input');
        in4.setAttribute('type', 'submit');
        in4.setAttribute('value', 'Submit');

        //form
        let form = node({
            type: 'form',
            id: 'addSpendingForm',
            child: [
                l0,
                in0,
                l1,
                in1,
                l2,
                in2,
                in4
            ]
        });

        form.submit();
        this.appendToActiveViewContent(form);
    }

    switchView(button) {
        this.activeButton.className = '';
        button.className = 'activeButton';
        this.activeButton = button;
    }

}
