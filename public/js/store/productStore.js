import {observable,computed} from 'mobx';
import {_} from "underscore";

class newProduct{
    //observer each product
    @observable id;
    @observable name;
    @observable price;
    @observable category;

    //initialize product
    constructor(product){
        this.id = parseInt(Date.now()) + "_" + Math.random(20)
        this.name = product.name
        this.price = product.price
        this.category = product.category
    }
}

export class ProductStore{
    //observer product list and master categories
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

    //compute grouped product categories 
    @computed get filteredProductList(){
        var groups = [];

        if(this.productList.length){
            //group products
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

    //delete product
    deleteItem(id){
        //find product from list and remove
        this.productList = _.without(this.productList, _.findWhere(this.productList, {
            id: id
        }));
    }

    //create item
    createProduct(product){
        this.productList.push( new newProduct(product));
    }
}

export default new ProductStore;