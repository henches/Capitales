import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { COLORS, Gstyles } from './Styles'
import ModalDropdown from 'react-native-modal-dropdown'



class GlobalQuestionStatsScreen extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerLeft: (
          <Icon
            containerStyle={{ marginLeft: 10 }}
            type='ionicon'
            name='ios-home'
            color='blue'
  //          onPress={() => navigation.navigate('HomeScreen', {}) }
          />
        )
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
        let l=this.state.listQr
        l.splice(0,l.length)
        let selZone = this.state.selectedZone
        let selLevel = this.state.selectedLevel
        if (isZone)
            selZone = value
        else 
            selLevel = value
        for (let i = 0; i < this.props.QuestionStatsList.length; i++) {
            //console.log("_updateList this.props.QuestionStatsList[i] = ", this.props.QuestionStatsList[i], " selectedZone = ", this.state.selectedZone, " selectedLevel = ", this.state.selectedLevel)
            //console.log("_updateList i = ", i)
            //console.log("_updateList this.props.QuestionStatsList[i] = ", this.props.QuestionStatsList[i])
            //console.log("_updateList selZone = ", selZone, " selLevel = ", selLevel)
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
            if (copyZone && copyLevel)
                l.push(this.props.QuestionStatsList[i])
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
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor }}>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Zone :</Text>
                        <ModalDropdown
                                    options = { dataZone }
                                    defaultValue = { this.state.selectedZone }
                                    style = {{ flex: 1, paddingRight:30 }}
                                    textStyle = {{ fontWeight:'bold', textAlign: 'right'}}
                                    dropdownStyle={{ width:170 }}   
                                    onSelect={ (index,value)=>{
                                        this._updateList(true, value) }}
                            />                    
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Niveau :</Text>
                        <ModalDropdown
                                    options = { dataLevel }
                                    defaultValue = { this.state.selectedLevel }
                                    style = {{ flex: 1, paddingRight:30 }}
                                    textStyle = {{ fontWeight:'bold', textAlign: 'right'}}
                                    dropdownStyle={{ width:170 }}   
                                    onSelect={ (index,value)=>{
                                        this._updateList(false, value) }}
                            />                    
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}>Zone : { this.state.selectedZone }</Text>
                    <Text style={{ textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}>Level : { this.state.selectedLevel }</Text>
                    <View style={{ flex: 10, justifyContent: 'center' }}>
                        <FlatList
//                            data={this.props.QuestionStatsList}
                            data={this.state.listQr.sort((a,b) => { return (a.Queres.niveau - b.Queres.niveau)})}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: '#2F4F4F', 
                                                padding: 5, marginVertical: 2, marginHorizontal: 8 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>{ item.Queres.state }</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 20, color: 'white' }}>{ item.Queres.capital }</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>{ item.Queres.niveau }</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                        <TouchableOpacity style={Gstyles.button}
                                onPress={() => { this._goHomeScreen() }}>
                                <Text style={Gstyles.button_text}>HOME</Text>
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
    button: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: 5
    },

})



const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList
    }
}

export default connect(mapStateToProps)(GlobalQuestionStatsScreen)
