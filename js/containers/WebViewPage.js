/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Text,
    ActivityIndicator,
    InteractionManager,
} from 'react-native';
import theme from '../constants/theme';
import NavigationBar from '../components/NavigationBar';
import BackPageComponent from '../components/BackPageComponent';
import px2dp from '../utils/px2dp';
import {connect} from 'react-redux';

class WebViewPage extends BackPageComponent {
    constructor(props) {
        super(props);
        this.state = {
            didMount: false,
        }
    }


    //使用InteractionManager可以让一些耗时的任务在交互操作或者动画完成之后进行执行，这样使用可以保证我们的JavaScript的动画效果可以平滑流畅的执行。可以大大提升用户体验。
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                didMount: true
            });
        });
    }

    render() {
        const rowData = this.props.rowData;
        return (
            <View style={[styles.container, {backgroundColor: this.props.pageBackgroundColor}]}>
                <View style={styles.contentContainer}>
                    {this.state.didMount ?
                        <WebView
                            ref={(ref) => {
                                this.webView = ref
                            }}
                            style={[styles.webView, {backgroundColor: this.props.pageBackgroundColor}]}
                            source={{uri: rowData.url}}
                            renderLoading={this._renderLoading.bind(this)}
                            renderError={this._renderError.bind(this)}
                            startInLoadingState={true}
                        />
                        :
                        null}
                </View>
                <View style={[styles.toolbar, {top: 0}]}>
                    <NavigationBar
                        title="详细内容"
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}
                    />
                </View>
            </View>
        );
    }


    _renderLoading() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={this.props.tabIconColor} size="large"/>
                <Text style={{marginTop: px2dp(10), color: this.props.tabIconColor}}>玩命加载中...</Text>
            </View>
        );
    }

    _renderError() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        marginTop: theme.toolbar.paddingTop,
        zIndex: 1
    },
    webView: {
        flex: 1
    },
});

const mapStateToProps = (state) => {
    return {
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor,
    };
};


export default connect(mapStateToProps)(WebViewPage);