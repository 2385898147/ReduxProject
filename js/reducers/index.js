/**
 * Created by tangzn on 19/10/17.
 */
'use strict';

import {combineReducers} from 'redux';
import homeDataState from './homeDataState';
import settingState from './settingState';

export default combineReducers({
    homeDataState,settingState
});