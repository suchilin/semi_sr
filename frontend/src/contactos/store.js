import { observable } from 'mobx';
var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
var axios = require('axios');

class ContactoStore{
    @observable cModalopen = false;
    @observable uModalopen = false;
    @observable is_create = false;
    @observable titulo = ''
    @observable objects = [];
    @observable id = null;
    @observable nombre = null;
    @observable apellidos = null;
    @observable direccion = null;
    @observable telefono = null;
    url = 'http://127.0.0.1:8000/contactos/';


    all(page){
        if(page==null){
            page = 1
        }
        var self = this
        return axios.get(this.url + '?page='+page, {headers:{"Authorization": "Token "+localStorage.token}})
            .then(function(res){
            console.log(res)
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
                key!=="objects" &&
                key!=="cModalopen" &&
                key!=="titulo" &&
                key!=="is_create" &&
                key!=="uModalopen"
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
                key!=="objects" &&
                key!=="cModalopen" &&
                key!=="titulo" &&
                key!=="is_create" &&
                key!=="uModalopen"
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
                    key!=="objects" &&
                    key!=="cModalopen" &&
                    key!=="titulo" &&
                key!=="is_create" &&
                    key!=="uModalopen"
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

export default new ContactoStore()
