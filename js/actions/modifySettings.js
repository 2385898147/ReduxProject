/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import SettingsDataDAO from '../dao/SettingsDataDAO';

export function changeColor(color, flag = true) {
    if (flag) {
        let dao = new SettingsDataDAO();
        dao.saveThemeColor(color);
    }

    return {
        type: TYPES.CHANGE_COLOR,
        color: color
    };
}

function fetchThemeColorValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getThemeColorValue().then((result) => {
            dispatch(changeColor(result, false));
        }, (error) => {
            dispatch(changeColor(error));
        });
    };
}

export function changeNightMode(value, flag = true) {
    if (flag) {
        let dao = new SettingsDataDAO();
        dao.saveOpenNightMode(value)
    }

    if (value) {
        return {
            type: TYPES.OPEN_NIGHT_MODE
        };
    } else {
        return {
            type: TYPES.CLOSE_NIGHT_MODE
        }
    }
    ;
}

function fetchOpenNightModelValue() {
    return (dispatch => {
        let dao = new SettingsDataDAO();
        dao.getOpenNightModeValue().then((result) => {
            dispatch(changeNightMode(result, false))
        }, (error) => {
            dispatch(changeNightMode(error))
        });
    });
}


export function initialSettingsStateFacade() {
    return (dispatch) => {
        dispatch(fetchThemeColorValue());
        dispatch(fetchOpenNightModelValue());
    }
}