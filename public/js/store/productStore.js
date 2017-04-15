import {observable,computed} from 'mobx';

class newItem{
    @observable value;
    @observable id;
    @observable complete;
    
    constructor(value){
        this.id = Date.now()
        this.value = value
        this.complete = false
    }
}

export class ProductStore{
    @observable list = [{
        id : 909090,
        value : "test",
        complete : false
    }];
    @observable categories = [{
        id : Date.now() + Math.random(20),
        name : "Food"
    },{
        id : Date.now() + Math.random(20),
        name : "Clothing"
    },{
        id : Date.now() + Math.random(20),
        name : "Transport"
    }]
    @observable filter = "";
    @computed get filteredListItems(){
        var matchesFilter = new RegExp(this.filter,"i");
        return this.list.filter(item => !this.filter || matchesFilter.test(item) );
    } 
     
     deleteItem(e){
         console.log("delete called");
     }
    
     createItem(value){
          this.list.push( new newItem(value));
     }
}

export default new ProductStore;