import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'
import ModalDropdown from 'react-native-modal-dropdown'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';



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
        let dataZone = ["Monde", "Europe", "Afrique", "Ameriques", "AsiePacif"]
        let dataLevel = ["Tous", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor, marginTop: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: scale(30), fontWeight: 'bold'}}>LISTE DES CAPITALES</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: scale(15), fontWeight: 'normal' }}>Filtres</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: scale(15), fontWeight: 'normal' }}>Zone :</Text>
                                <View style={{  }}>
                                    <ModalDropdown
                                                options = { dataZone }
                                                defaultValue = { this.state.selectedZone }
                                                style = { styles.dropDown }
                                                textStyle = {{ fontSize: scale(15), color: 'white', fontWeight:'bold' }}
                                                dropdownStyle={{ fontSize: scale(15), width:170 }}   
                                                onSelect={ (index,value)=>{
                                                    this._updateList(true, value) }}
                                                onDropdownWillShow={ (index,value)=>{
                                                    console.log("DropDown") }}
                                        />
                                    <View style={{ position: "absolute", right: 10, top: 7 }}><Text style={{ color: 'white' }}>▼</Text></View>  
                                </View>           
                            </View>           
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: scale(15), fontWeight: 'normal' }}>Niveau :</Text>
                                <View style={{  }}>
                                    <ModalDropdown
                                                options = { dataLevel }
                                                defaultValue = { this.state.selectedLevel }
                                                style = { styles.dropDown }
                                                textStyle = {{ fontSize: scale(15), color: 'white', fontWeight:'bold' }}
                                                dropdownStyle={{ fontSize: scale(15), width:70 }}   
                                                onSelect={ (index,value)=>{
                                                    this._updateList(false, value) }}
                                        />
                                    <View style={{ position: "absolute", right: 10, top: 7 }}><Text style={{ color: 'white' }}>▼</Text></View>  
                                </View>           
                            </View>           
                        </View>
                    </View>
                    <View style={{ flex: 10, justifyContent: 'center' }}>
                        <FlatList
                            data={this.state.listQr.sort((a,b) => { return (a.Queres.niveau - b.Queres.niveau)})}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: 'darkslategrey', padding: 5, marginVertical: 2, marginHorizontal: 8 }}>
                                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: scale(15), color: 'white' }}>{ item.Queres.state }</Text>
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: scale(15), color: 'white' }}>{ item.Queres.capital }</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text style={{ fontSize: scale(15), color: 'white' }}>{ item.Queres.niveau }</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={ item => item.id }
                            extraData={ this.state }
                            ListHeaderComponent = {                         
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: 'darkslategrey', padding: 5, marginVertical: 2, marginHorizontal: 8 }}>
                                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ fontSize: scale(15), fontWeight: 'bold', color: 'white' }}>PAYS</Text>
                                </View>
                                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ fontSize: scale(15), fontWeight: 'bold', color: 'white' }}>CAPITALE</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Text style={{ fontSize: scale(15), fontWeight: 'bold', color: 'white' }}>NIV</Text>
                                </View>
                             </View>
                            }   
                            stickyHeaderIndices={[0]}
                        />
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                        <TouchableOpacity style={Gstyles.button}  onPress={() => { this._goHomeScreen() }}>
                                <Icon
                                    containerStyle={{ marginLeft: 10 }}
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
        marginTop: 30
    },
    title_view: {
        flex:1
    },
    title_text: {
        height: 50
    },
    stats_view: {
        flex:1
    },
    stats_text: {
        height: 50
    },
    play_view: {
        flex:1
    },
    play_button: {
        height: 50
    },
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    dropDown: {
        width: 100,
        height: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: 5,
        paddingLeft: 10,
        paddingRight: 25
        
    },

})



const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList
    }
}

export default connect(mapStateToProps)(GlobalQuestionStatsScreen)
