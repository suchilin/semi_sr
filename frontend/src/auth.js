var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
var axios = require('axios');

module.exports = {
    login: function(username, pass) {
        if (this.loggedIn()) {
            return true;
        }
        return this.getToken(username, pass)

    },

    logout: function() {
        var url = 'http://localhost:8000/auth/logout/'
        axios.post(url)
        delete localStorage.token
    },

    loggedIn() {
        return !!localStorage.token
    },

    getToken(username, pass) {
        var resp = 0
        var url = 'http://localhost:8000/auth/login/'
        return axios.post(url,{
                'username': username,
                'password': pass
            })
    }

}
