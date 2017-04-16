import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

@observer
export default class addForm extends React.Component{
    //create product
    createNewProduct(){
        //get values 
        var product = {
            price : ReactDOM.findDOMNode(this.refs.price).value,
            name : ReactDOM.findDOMNode(this.refs.name).value,
            category : ReactDOM.findDOMNode(this.refs.category).value
        }

        //save value
        this.props.store.createProduct(product);
        
        //reset form on product creation
        this.resetForm();
    }

    //initialize form initial state values
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

    //update current field state on change 
    handleChange(e) {
        //add active class
        e.target.classList.add('active');

        //set state
        this.setState({
            [e.target.name]: e.target.value
        });

        //validate and show error
        this.showInputError(e.target.name);
    }

    //handle form submission 
    handleSubmit(e) {    
        e.preventDefault();

        if (!this.showFormErrors()) {
            console.log('form is invalid: do not submit');
        } else {
            //add new product on succeded form validation 
            this.createNewProduct();
            console.log('form is valid: submit');
        }
    }
    
    //reset form
    resetForm(){
        //get all input and select menus of form, if new form fields will introduce it will handle automatically 
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        
        //traverse input fields
        inputs.forEach(input => {
            input.classList.remove('active');
            input.value = "";
        });
        
        //traverse select fields 
        selects.forEach(select => {
            select.classList.remove('active');
            select.value = "";
        });
    }

    //show errors
    showFormErrors() {
        //get form fields 
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        
        let isFormValid = true;

        //traverse input fields 
        inputs.forEach(input => {
            //add error
            input.classList.add('active');

            const isInputValid = this.showInputError(input.name);

            if (!isInputValid) {
                isFormValid = false;
            }
        });
        
        //traverse select menu fields
        selects.forEach(select => {
            //add error
            select.classList.add('active');

            const isSelectValid = this.showInputError(select.name);

            if (!isSelectValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    //validate input fields 
    showInputError(refName) {
        //fetch field
        const validity = this.refs[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);

        //validate field
        if (!validity.valid) {
            if (validity.valueMissing) {
                error.textContent = `${label} is a required field`; 
            } else if (validity.patternMismatch) {
                error.textContent = `${label} price should be in digits`; 
            } 
            return false;
        }

        //update error message
        error.textContent = '';
        return true;
    }

    //render html
    render(){
        //get objects from store
        const {productList,categories} = this.props.store;

        //create category menu
        const catItems = categories.map(item => (
            <option key={item.id} value={item.name}>{item.name}</option>    
        ));

        //render html 
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