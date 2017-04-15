import React from 'react';
import { observer } from "mobx-react"; 

@observer
export default class productList extends React.Component{
    deleteProduct(e){
        if(e.which === 13){
            this.props.store.deleteItem(e.target.value);
        }
    }
    
    render(){
        
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
                  <tr>
                      <td>Breads</td>
                      <td>Food</td>
                      <td>40</td>
                      <td><span className="glyphicon glyphicon-trash"></span></td>
                  </tr>
                  <tr>
                      <td>Breads</td>
                      <td>Food</td>
                      <td>40</td>
                      <td><span className="glyphicon glyphicon-trash"></span></td>
                  </tr>
                  <tr>
                      <td>Breads</td>
                      <td>Food</td>
                      <td>40</td>
                      <td><span className="glyphicon glyphicon-trash"></span></td>
                  </tr>
                  <tr>
                      <td>Breads</td>
                      <td>Food</td>
                      <td>40</td>
                      <td><span className="glyphicon glyphicon-trash"></span></td>
                  </tr>
              </tbody>
          </table>
        </div>

    }
}