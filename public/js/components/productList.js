import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

@observer
export default class productList extends React.Component{
    //delete product from list
    deleteProduct(id){
        this.props.store.deleteItem(id);
    }

    //render component
    render(){
        
        //get objects from store
        const {productList,categories} = this.props.store;
        
        //render main product table
        const productTable = productList.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td><span className="glyphicon glyphicon-trash" onClick={() => this.deleteProduct(product.id)}></span></td>
          </tr>    
        ));

        //render html
        return <div className="row">
          <table className="table table-striped">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                  {productTable}
              </tbody>
          </table>
        </div>
    }
}