import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'
//import ModalDropdown from 'react-native-modal-dropdown'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';
import RNPickerSelect from 'react-native-picker-select'
import {Picker} from 'react-native'


class GlobalQuestionStatsScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    }
    
    constructor() {
        console.log('GLOBAL QUESTION STATS CONSTRUCTOR *************************************************************************************')
        super()
        this.state = {
            selectedZone: "Monde",
            selectedLevel: "Tous",
            listQr: [] 
        }
     }

    componentDidMount() {
        console.log("GLOBAL QUESTION STATS SCREEN DID MOUNT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        this.setState({ listQr: [...this.props.QuestionStatsList] })
    }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }

    _updateList = (isZone, value) => {
        console.log("_updateList value = ", value)
        let l=this.state.listQr
        l.splice(0,l.length)
        let selZone = this.state.selectedZone
        let selLevel = this.state.selectedLevel
        if (isZone)
            selZone = value
        else 
            selLevel = value
        for (let i = 0; i < this.props.QuestionStatsList.length; i++) {
            let copyZone = false
            if (selZone.localeCompare("Monde")==0)
                copyZone = true
            else if (selZone.localeCompare(this.props.QuestionStatsList[i].Queres.continent)==0)
                copyZone = true
            let copyLevel = false
            if (selLevel.localeCompare("Tous")==0)
                copyLevel = true
            else if (selLevel.localeCompare(parseInt(this.props.QuestionStatsList[i].Queres.niveau))==0)
                copyLevel = true
            if (copyZone && copyLevel) {
                l.push(this.props.QuestionStatsList[i])
                console.log("_updateList this.props.QuestionStatsList[i] = ", this.props.QuestionStatsList[i].Queres.capital, " selectedZone = ", selZone, " selectedLevel = ", selLevel)
            }
        }
        // console.log("_updateList l = ", l)
        this.setState({ listQr: l })
        if (isZone)
            this.setState({ selectedZone: selZone })
        else
            this.setState({ selectedLevel: selLevel })
    }

    render() {
        let dataZone = [{ label: "Monde", value: "Monde" },
                        { label : "Europe", value: "Europe" },
                        { label : "Afrique", value: "Afrique" },
                        { label : "Ameriques", value: "Ameriques" },
                        { label : "AsiePacif", value: "AsiePacif" }]
        let dataLevel = [
                        { label: "Tous", value: "Tous" },
                        { label: "0", value: "0" },
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                        { label: "5", value: "5" },
                        { label: "6", value: "6" },
                        { label: "7", value: "7" },
                        { label: "8", value: "8" },
                        { label: "9", value: "9" },
                        { label: "10", value: "10" }]
       return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor, marginTop: verticalScale(20) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(25) }}>LISTE DES CAPITALES</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: scale(20) }}>
                        <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(15) }}>Zone : </Text>
                                    <RNPickerSelect
                                            items={ dataZone }
                                            placeholder={ {} } 
                                            onValueChange={value => {
                                                this.setState({
                                                    selectedZone: value,
                                                })
                                                this._updateList(true, value)
                                            }}
                                            style={pickerSelectStyles}
                                            useNativeAndroidPickerStyle={false}
                                    />
                            </View>           
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(15) }}>Niveau : </Text>
                                    <RNPickerSelect
                                            items={ dataLevel }
                                            placeholder={ {} } 
                                            onValueChange={value => {
                                                this.setState({
                                                    selectedLevel: value,
                                                })
                                                this._updateList(false, value)
                                            }}
                                            style={pickerSelectStyles}
                                            useNativeAndroidPickerStyle={false}
                                    />
                            </View>           
                        </View>
                    </View>
                    <View style={{ flex: 13, justifyContent: 'center' }}>
                        <FlatList
                            data={this.state.listQr.sort((a,b) => { return (a.Queres.niveau - b.Queres.niveau)})}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: PlayerLevelStyle[item.Queres.niveau].backgroundColor, 
                                                padding: scale(5), marginVertical: verticalScale(2), marginHorizontal: scale(8) }}>
                                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: scale(15), color: PlayerLevelStyle[item.Queres.niveau].textColor }}>{ item.Queres.state }</Text>
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: scale(15), color: PlayerLevelStyle[item.Queres.niveau].textColor }}>{ item.level == 3 ? item.Queres.capital : '----' }</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: scale(15), color: PlayerLevelStyle[item.Queres.niveau].textColor }}>{ item.Queres.niveau }</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={ item => item.id }
                            extraData={ this.state }
                            ListHeaderComponent = {                         
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: 'darkslategrey', padding: scale(5), marginVertical: verticalScale(2), marginHorizontal: scale(8) }}>
                                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(15), color: 'white' }}>PAYS</Text>
                                </View>
                                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(15), color: 'white' }}>CAPITALE</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'CapitalesFont_Medium',  fontSize: scale(15), color: 'white' }}>N</Text>
                                </View>
                             </View>
                            }   
                            stickyHeaderIndices={[0]}
                        />
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
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
    dropDown: {
        width: scale(100),
        height: verticalScale(25),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: scale(5),
        paddingLeft: scale(10),
        paddingRight: scale(25)
        
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontFamily: 'CapitalesFont_Light',  
      fontSize: verticalScale(15),
      paddingHorizontal: scale(4),
      paddingVertical: verticalScale(1),
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      color: 'black',
      width: scale(100),
      height: verticalScale(25),
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  
const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList
    }
}

export default connect(mapStateToProps)(GlobalQuestionStatsScreen)
