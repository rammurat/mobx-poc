import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 

//load dev tool to observer changes happen to dom
import DevTool from 'mobx-react-devtools';

//load product store
import ProductStore from '../store/productStore.js';

//import child components
import AddForm from './addForm.js';
import ProductList from './productList.js';
import GroupProductList from './groupProductList.js';

@observer
export default class app extends React.Component {
    //render html
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