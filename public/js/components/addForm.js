import React from 'react';
import { observer } from "mobx-react"; 

@observer
export default class addForm extends React.Component{
    createNew(e){
        if(e.which === 13){
            this.props.store.createItem(e.target.value);
            e.target.value = "";
        }
    }
    
    filter(e){
        this.props.store.filter = e.target.value;
    }

    render(){
        console.log(this.props.store);
        const {list,filteredListItems,filter,categories} = this.props.store;
        
        const catItems = categories.map(item => (
            <option key={item.id}>{item.name}</option>    
        ));
        
        return <div>
            <div className="row">
                <h2>Product List</h2>
                <form className="form-inline" >
                    <div className="form-group">
                        <label className="sr-only" htmlFor="item">Item</label>
                        <input className="form-control" id="item" placeholder="Item"/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="price">Price</label>
                        <input className="form-control" id="price" placeholder="Price"/>
                    </div>
                    <div className="form-group">
                        <select className="form-control">
                            <option value="">Category</option>
                            {catItems}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.createNew.bind(this)}>Add</button>
                </form>
            </div>
        </div>
    }
}