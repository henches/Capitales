import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';
import { CheckBox } from 'react-native-elements'
import { app_name, app_version, app_version_description }  from '../package.json'





class ConfigScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    }
   
    constructor(props) {
        console.log('CONFIG SCREEN CONSTRUCTOR *************************************************************************************')
        super(props)
        console.log('CONFIG SCREEN CONSTRUCTOR this.props.soundsActive = ', this.props.soundsActive)
        this.state = {
            checked: this.props.soundsActive,
            shortcutClickNb: 0
        }
    }


    _shortcut = () => {
        this.setState({ shortcutClickNb: this.state.shortcutClickNb+1 })
        if (this.state.shortcutClickNb == 2) {
            //console.log("QuestionStatsList", this.props.QuestionStatsList)
            this.props.dispatch({ type: 'QUERES_STATS-SHORTCUT', value: this.props.QuestionStatsList })
            this.props.navigation.navigate('HomeScreen', { lastScreen: 'SeriesResultsScreen' })   
        }
    }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.dispatch({ type: "USER_PREFS-SOUNDS_ACTIVE", value: this.state.checked })
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }


   
    render() {
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor, marginTop: verticalScale(20) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(30) }}>PARAMETRES</Text>
                    </View>
                    <View style={{ flex: 6, justifyContent: 'center' }}>
                        <CheckBox
                            center
                            size={ scale(30) }
                            containerStyle = {{ backgroundColor: Gstyles.generalBackgroundColor }}
                            textStyle = {{ fontFamily: 'CapitalesFont_Light',  fontSize: scale(25), color: 'black' }}
                            checkedColor = 'blue'
                            uncheckedColor = 'blue'
                            title='Sons actifs :'
                            iconType='feather'
                            checkedIcon='check-square'
                            uncheckedIcon='square'
                            reverse={ true }
                            iconRight={ true }
                            checked={ this.state.checked }
                            onPress={() => { this.setState({ checked: !this.state.checked }) }}
                            />
                    </View>
                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={ () => { this._shortcut() } }>
                            <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(20) }}>{ "About" }</Text>
                        </TouchableOpacity>
                       <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(16) }}>{ "Nom : " + app_name }</Text>
                       <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(16) }}>{ "Version : " + app_version }</Text>
                       <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(16) }}>{ "Description de la version : " }</Text>
                       <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(16) }}>{ "\""+ app_version_description + "\""}</Text>
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
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: scale(5)
    },

})



const mapStateToProps = state => {
    return {
        soundsActive: state.HandleUserPrefsReducer.soundsActive,
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
    }
}

export default connect(mapStateToProps)(ConfigScreen)
