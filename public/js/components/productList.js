import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

@observer
export default class productList extends React.Component{
    deleteProduct(id){
        
        this.props.store.deleteItem(id);
    }

    render(){
        
        const {productList,categories} = this.props.store;
        
        const productTable = productList.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td><span className="glyphicon glyphicon-trash" onClick={() => this.deleteProduct(product.id)}></span></td>
          </tr>    
        ));

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