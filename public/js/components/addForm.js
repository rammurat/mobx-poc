import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

@observer
export default class addForm extends React.Component{
    createNew(e){
        //get values 
        var product = {
            price : ReactDOM.findDOMNode(this.refs.price).value,
            name : ReactDOM.findDOMNode(this.refs.name).value,
            category : ReactDOM.findDOMNode(this.refs.category).value
        }
                
        //save value
        this.props.store.createItem(product);
        
        //reset form 
        ReactDOM.findDOMNode(this.refs.price).value = "";
        ReactDOM.findDOMNode(this.refs.name).value = "";
        ReactDOM.findDOMNode(this.refs.category).value = "";
        
    }
    
    
    render(){

        const {productList,categories} = this.props.store;
        
        const catItems = categories.map(item => (
            <option key={item.id} value={item.name}>{item.name}</option>    
        ));
        
        return <div>
            <div className="row">
                <h2>Product List</h2>
                <form className="form-inline" >
                    <div className="form-group">
                        <label className="sr-only" htmlFor="item">Item</label>
                        <input className="form-control" id="item" placeholder="Product name" ref="name"/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="price">Price</label>
                        <input className="form-control" id="price" placeholder="Price" ref="price"/>
                    </div>
                    <div className="form-group">
                        <select className="form-control" ref="category">
                            <option value="">Category</option>
                            {catItems}
                        </select>
                    </div>
                    <input type="button" className="btn btn-primary" onClick={this.createNew.bind(this)} value="Add"/>
                </form>
            </div>
        </div>
    }
}