/**
 * Created by tangzn on 19/10/17.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    dataSource: {},
    dataTime: '',
};

export default function homeDataState(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_HOME_DATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };

        case types.FETCH_HOME_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource,
                dataTime: action.dataTime
            };

        case types.FETCH_HOME_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };

        default:
            return state;
    }
}


