console.log('Hey guys and ladies!!');

import React from 'react';
import ReactDOM from 'react-dom';

import ItemList from './components/itemList.js';
import ItemStore from './store/itemStore.js';

ReactDOM.render(<ItemList />, document.getElementById('root'));