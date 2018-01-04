/**
 * Created by wangdi on 4/12/16.
 */
'use strict';

const THEME_COLOR = '@ThemeColor';
const NIGHT_MODE = '@NightMode';

import {AsyncStorage} from 'react-native';

export default class SettingsDataDAO{

    saveOpenNightMode(value){
        AsyncStorage.setItem(NIGHT_MODE, value ? 'true' : 'false');
    }

    getOpenNightModeValue(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(NIGHT_MODE, (error, result) => {
                if(!error && result){
                    if(result === 'true')
                        resolve(true);
                    else
                        resolve(false);
                }else{
                    reject(false);
                }
            });
        });
    }

    saveThemeColor(color){
        AsyncStorage.setItem(THEME_COLOR, color);
    }

    getThemeColorValue(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(THEME_COLOR, (error, result) => {
                if(!error && result){
                    resolve(result);
                }else{
                    reject('#1e90ff');
                }
            });
        });
    }

}