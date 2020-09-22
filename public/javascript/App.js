'use strict';

class App {

    constructor() {
        this._onMerchantsLoaded = (app) => {};
        this.ui = new Ui(this);
        this.start();
    }

    set onMerchantsLoaded(call) {
        if (this.merchants === null)
            this._onMerchantsLoaded = call;
        else
            call(this);
    }

    start() {
        this.user = null;

        sendJson({
            url: '/getUsers',
            success: (userList) => this.ui.createLoginScreen(userList),
            error: () => console.error('Users not available')
        });
    }

    loadMerchants() {
        sendJson({
            url: '/getMerchants',
            success: (merchants) => {
                console.log('merchants: ', merchants);
                this.merchants = Merchant.parseList(merchants);
                this._onMerchantsLoaded(this);
            },
            error: () => console.error("Merchants not loaded")
        });
    }

    userLoaded(userData) {
        console.log('loading merchants');
        this.loadMerchants();

        this.user = new User(userData);
        this.ui.createPageLayout(this.user);
        this.overview();
    }
    
    overview() {
        this.ui.clearActiveViewContent();

        this.user.onSpendingsLoaded = (user) => {
            this.ui.displayOverview(user);
        };

        console.log('in overview');
    }

    history() {
        this.ui.clearActiveViewContent();
        this.ui.displayHistory(this.user);
        console.log('in history');
    }

    search() {
        this.ui.clearActiveViewContent();
        this.ui.displaySearch(this.user);
        console.log('in search');
    }

    settings() {
        this.ui.clearActiveViewContent();
        this.ui.displaySettings(this.user);
        console.log('in settings');
    }

    addSpending() {
        this.ui.clearActiveViewContent();

        this.spendingForm = new SpendingForm(this);
        //console.log('form: ', this.spendingForm);

        this.ui.displayAddSpending(this.user);
        console.log('adding a spending');
    }
    
    logIn(username) {
        let json = JSON.stringify({
            username: username,
        });

        console.log('logging in: ', username);
    
        sendJson({
            url: '/getUser',
            json: json,
            success: (userData) => this.userLoaded(userData),
            error: () => console.error("user not loaded") 
        });
    }

    logOut(username) {
        console.log('logging out user: ', username);
        this.ui.clearContent();
        this.ui.background.classList.remove('backgroundWrap');
        this.start();
    }
    
}
