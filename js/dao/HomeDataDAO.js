/**
 * Created by wangdi on 19/10/17.
 */
'use strict';

const HOME_DATA = '@HOMEData';

import {AsyncStorage} from 'react-native';

export default class HomeDataDAO {

    save(json, time) {
        let data = {
            time: time,
            contnet: json
        };

        try {
            AsyncStorage.setItem(HOME_DATA, JSON.stringify(data));
        } catch (error) {

        }
    }


    /** 本地数据.
     1. 首先，判断当地数据的时间是今天的日期。
     2.如果结果是正确的，它将返回本地数据，”requestHomeData。js不会获取服务器数据。
     如果是假的，它还会返回本地数据，“requestHomeData”。js将获取服务器数据。
     3. 如果它返回null(拒绝null)，这意味着没有记录或错误。这
     还将引发“requestHomeData。js来获取服务器数据。
     4. 当函数拒绝本地数据(拒绝data.content)时，“requestHomeData”。js将
     获取服务器数据并判断数据的有效性。然后决定是否保存
     最新的数据或者仍然显示昨天的数据，因为也许今天的数据还没有更新。
     */

    fetchLocalData(time) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(HOME_DATA, (error, result) => {
                if (!error) {
                    const data = JSON.parse(result);
                    //判断数据是否更新
                    if (data) {
                        if (data.time.toString() == time) {
                            resolve(data.contnet);
                        } else {//没有数据记录
                            reject(data.contnet);
                        }
                    } else {
                        reject(null);
                    }
                } else { //必须获取服务器数据
                    reject(null);
                }
            });
        });
    }
}
