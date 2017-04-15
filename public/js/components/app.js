import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

import DevTool from 'mobx-react-devtools';

import ProductStore from '../store/productStore.js';

import AddForm from './addForm.js';
import ProductList from './productList.js';
import GroupProductList from './groupProductList.js';

@observer
export default class app extends React.Component {
    render() {
        
        return <div>
            <DevTool />
            <div className="row">
                <div className="col-xs-12 col-md-6 col-sm-12">
                    <AddForm store={ProductStore} />
                    <ProductList store={ProductStore}  />
                </div>
                <div className="col-xs-12 col-md-6 col-sm-12">
                    <GroupProductList store={ProductStore}  />
                </div>
            </div>
        </div>
    }
}