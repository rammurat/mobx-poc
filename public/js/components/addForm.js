import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

@observer
export default class addForm extends React.Component{
    createNew(){
        //get values 
        var product = {
            price : ReactDOM.findDOMNode(this.refs.price).value,
            name : ReactDOM.findDOMNode(this.refs.name).value,
            category : ReactDOM.findDOMNode(this.refs.category).value
        }

        //save value
        this.props.store.createItem(product);

        this.resetForm();
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            category : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.target.classList.add('active');

        this.setState({
            [e.target.name]: e.target.value
        });

        this.showInputError(e.target.name);
    }

    handleSubmit(e) {    
        e.preventDefault();

        if (!this.showFormErrors()) {
            console.log('form is invalid: do not submit');
        } else {
            this.createNew();
            console.log('form is valid: submit');
        }
    }
    
    resetForm(){
        
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        
        inputs.forEach(input => {
            input.classList.remove('active');
            input.value = "";
        });
        
        selects.forEach(select => {
            select.classList.remove('active');
            select.value = "";
        });
    }

    showFormErrors() {
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        
        let isFormValid = true;

        inputs.forEach(input => {
            input.classList.add('active');

            const isInputValid = this.showInputError(input.name);

            if (!isInputValid) {
                isFormValid = false;
            }
        });
        
        selects.forEach(select => {
            select.classList.add('active');

            const isSelectValid = this.showInputError(select.name);

            if (!isSelectValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showInputError(refName) {
        
        const validity = this.refs[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);

        if (!validity.valid) {
            if (validity.valueMissing) {
                error.textContent = `${label} is a required field`; 
            } else if (validity.patternMismatch) {
                error.textContent = `${label} price should be in digits`; 
            } 
            return false;
        }

        error.textContent = '';
        return true;
    }

    render(){

        const {productList,categories} = this.props.store;

        const catItems = categories.map(item => (
            <option key={item.id} value={item.name}>{item.name}</option>    
        ));

        return <div>
            <div className="row">
                <h2>Product List</h2>
                    <form className="form-inline" id="productForm" noValidate>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="item" id="nameLabel">Product Name</label>
                                <input name="name" className="form-control" id="item" placeholder="Product name" ref="name" onChange={ this.handleChange } required/>
                                    <div className="error" id="nameError" />
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="price" id="priceLabel">Price</label>
                                                <input name="price" className="form-control" id="price" placeholder="Price" ref="price" pattern="[0-9]{1,10}" onChange={ this.handleChange } required/>
                                                    <div className="error" id="priceError" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="sr-only" htmlFor="category" id="categoryLabel">Category</label>
                                                            <select name="category" id="category" className="form-control" ref="category" onChange={ this.handleChange } required>
                                                                <option value="">Category</option>
                                                                {catItems}
        </select>
        <div className="error" id="categoryError" />
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
                </form>
                </div>
                </div>
    }
}