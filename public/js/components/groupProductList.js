import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

@observer
export default class groupProductList extends React.Component{

    render(){

        //get objects from store
        const {filteredProductList} = this.props.store;

        //group product categories
        const filterTable = filteredProductList ? filteredProductList.map(product => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
            </tr>    
        )) : "";

        //render html
        return <div>
            <h2>Expenditure</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filterTable}
                </tbody>
            </table>
        </div>
    }
}