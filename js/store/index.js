/**
 * Created by tangzn on 19/10/17.
 */
'use strict';

import {createStore, applyMiddleware} from 'redux';
import reduces from '../reducers/index';
import thunk from 'redux-thunk';

export default createStore(reduces,applyMiddleware(thunk));