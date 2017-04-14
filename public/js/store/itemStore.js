import {autorun,observable} from 'mobx';

class ItemStore{
    @observable list = ["Mils", "Egggs"];
    @observable filter = ""
}

var store = window.store = new ItemStore;

export default store;

autorun(() => { 
        console.log(store.filter)
        console.log(store.list[0])
})