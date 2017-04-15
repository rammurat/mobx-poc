import {observable,computed} from 'mobx';
import {_} from "underscore";

class newItem{
    @observable id;
    @observable name;
    @observable price;
    @observable category;
    
    constructor(product){
        this.id = parseInt(Date.now()) + "_" + Math.random(20)
        this.name = product.name
        this.price = product.price
        this.category = product.category
    }
}

export class ProductStore{
    @observable productList = [];
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
    
    @computed get filteredProductList(){
        var groups = [];
        
        if(this.productList.length){
            groups = _.groupBy(this.productList,  "category");
            
            var data = _.map(groups,function(g, key) {
              return { 
                 id: Date.now() + Math.random(20),
                  name : key,
                 price: _.reduce(g,function(m,x) { 
                   return Number(m) + Number(x.price);
                 }, 0) 
              };
            });
            
            data = _.sortBy(data, 'price');
        }
        
        return data;
    } 
     
     deleteItem(id){
         
        this.productList = _.without(this.productList, _.findWhere(this.productList, {
          id: id
        }));
     }
    
     createItem(product){
          this.productList.push( new newItem(product));
     }
}

export default new ProductStore;