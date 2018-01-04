/**
 * Created by tangzn on 19/10/17.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import Request from '../utils/Request';



function requestData() {
    return {
        type: types.FETCH_HOME_DATE_REQUEST,
    }
}

function receiveData(json, date) {
    return {
        type: types.FETCH_HOME_DATA_SUCCESS,
        dataSource: json,
        dataTime: date,
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_HOME_DATA_FAILURE,
    }
}

let dataSource = [];

export function welfareData(date) {
    return dispatch => {
        //let url = fetchUrl.daily + date;
        let url = 'http://gank.io/api/day/2017/10/20'
        console.log(url);
        // 1.发出拉取数据的信号
        dispatch(requestData());
        return Request.get(url, (data) => {
            let results = data;
            setTimeout(() => {
                dataSource = results;
                dispatch(receiveData(dataSource, date));
            }, 500);
        }, () => {
            dispatch(fetchFailure());
        });
    }
};

