import { observable } from 'mobx';
var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
var axios = require('axios');

class RedStore{
    @observable objects = [];
    @observable contacto_id = null;
    @observable nombre = null;
    url = 'http://127.0.0.1:8000/redes/';


    all(){
        return axios.get(this.url + '?contacto_id='+this.contacto_id, {headers:{"Authorization": "Token "+localStorage.token}})
            .then(function(res){
            self.objects = []
            res.data.map(function(obj_){
                self.objects.push(obj_)
            })
        })
        .catch(function(e){
            console.log(e);
        });

    }

    delete(key){
        return axios.delete(this.url+key+'/')

    }

    update(key_){
        var data = {}
        for(var key in this){
            if(
                key!=="url" &&
                key!=="objects"
              ){
                data[key] = this[key]
            }
        }

        data['headers'] = {"Authorization": "Token "+localStorage.token}
        return axios.put(this.url+key_+'/',data);
}

    create(){
        var data = {}
        for(var key in this){
            if(
                key!=="url" &&
                key!=="objects"
              ){
                data[key] = this[key]
            }
        }

        data['headers'] = {"Authorization": "Token "+localStorage.token}
        return axios.post(this.url, data);
}

    get(key){
        var self = this
        return axios.get(this.url+key+'/', {headers:{"Authorization": "Token "+localStorage.token}})
        .then(function(response){
            var data=response.data;
            for(var key in self){
                if(
                    key!=="url" &&
                    key!=="objects"
                  ){
                    self[key] = data[key]
                }
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

export default new RedStore()
