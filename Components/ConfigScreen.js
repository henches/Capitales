import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';
import { CheckBox } from 'react-native-elements'




class GlobalQuestionStatsScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    }
   
    constructor() {
        console.log('CONFIG SCREEN CONSTRUCTOR *************************************************************************************')
        super()
    }

    state = {
        checked: true
    }



    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.dispatch({ type: "USER_PREFS-SOUNDS", value: this.state.checked })
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }


   
    render() {
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor, marginTop: verticalScale(20) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: scale(30), fontWeight: 'bold'}}>PARAMETRES</Text>
                    </View>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <CheckBox
                            center
                            title='Sons actifs :'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            iconRight={ true }
                            checked={ this.state.checked }
                            onPress={() => { this.setState({ checked: !this.state.checked }) }}
                            />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>  
                        <TouchableOpacity style={Gstyles.button}  onPress={() => { this._goHomeScreen() }}>
                                <Icon
                                    containerStyle={{ marginLeft: scale(10) }}
                                    size={ 30 }
                                    type='ionicon'
                                    name='ios-home'
                                    color='white'
                                />
                        </TouchableOpacity>
                    </View>
                </View>  
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        marginTop: verticalScale(30)
    },
    title_view: {
        flex:1
    },
    title_text: {
        height: verticalScale(50)
    },
    stats_view: {
        flex:1
    },
    stats_text: {
        height: verticalScale(50)
    },
    play_view: {
        flex:1
    },
    play_button: {
        height: verticalScale(50)
    },
    progressBar: {
        height: verticalScale(20),
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    button: {
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: scale(5)
    },

})



const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        PlayerLevel: state.HandleQueresStatsReducer.PlayerLevel
    }
}

export default connect(mapStateToProps)(HandleUserPrefsReducer)
