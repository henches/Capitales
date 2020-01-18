import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Image } from 'react-native'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import COLORS from './Styles'
import { storeQuestionStats } from '../Helpers/StorageFunctions'





class SeriesScreen extends React.Component {

    constructor() {
        console.log('*************************************************** Constructor Series Screen *************************************************************************************')
        super()
     }
    
    static popupResponseIsOK = "BRAVO !"
    static popupResponseIsKO = "ATTENTION !"

    static navigationOptions = {
        headerTitle: "CAPITALES",
        headerStyle: {
            backgroundColor: 'whitesmoke',
            fontWeight: 'bold',
            fontSize: 35
        },
        headerLeft: null,
    }

    state = {
        modalVisible: false,
        givenResponse: "",
        isResponseRight: true
    }

    _goSeriesScreen = () => {

        // console.log("ON LANCE LA QUESTION SUIVANTE OU ON S'ARRETE SI ON ATTEINT LA FIN DE LA Series")
        if (this.props.navigation.state.params.indexInSeries < G_SeriesLength - 1) {
            // console.log("-> On continue la Series")
            this.props.navigation.push('SeriesScreen', { indexInSeries: this.props.navigation.state.params.indexInSeries+1 })
        }
        else {
            // console.log("> On arrête la série")
            this.props.dispatch({ type: "UPDATE-QUESTION-STATS", value: this.props.QueresSeries })   // on met à jour la liste de stats de questions globale
//            console.log("PROOOOOOOOOPS = ", this.props)
            storeQuestionStats(this.props.QuestionStatsList) // on sauvegarde cette liste sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de la liste')
            })
            this.props.navigation.navigate('SeriesResultsScreen', {})
        }
    }

    _displayResponseResults = (qr, myResponse) => {
        // console.log('*****************************   go Popup ****************************')
        // console.log('go Popup : myResponse = ', myResponse)
        this.setState({ givenResponse: myResponse.capital })
        isResponseRight = (myResponse.capital.localeCompare(qr.capital) == 0)
        this.setState({ isResponseRight: isResponseRight })
        this.setState({ modalVisible: true })
    }

    __hideResponseResults = () => {
        // console.log('*****************************   Quit Popup ****************************')
        const action = { type: 'QUERES-SERIES-ADD_ANSWER', value: { index : this.props.navigation.state.params.indexInSeries, isResponseRight: this.state.isResponseRight, givenResponse: this.state.givenResponse } }
        this.props.dispatch(action)
        this.setState({ modalVisible: false })
        this._goSeriesScreen();
    }

    render() {
        // console.log('SeriesScreen : state', this.state)
        // console.log('SeriesScreen : Render props', this.props)
        console.log('SeriesScreen : Render ')
        // console.log('SeriesScreen : Render : this.props.navigation.state.params', this.props.navigation.state.params)

        indexInSeries = this.props.navigation.state.params.indexInSeries
        queres = this.props.QueresSeries[indexInSeries]
        const responses = queres.proposedResponses

        // let imageUrl = 'file:../Helpers/capital_images/' + this.props.QueresSeries[this.props.QuestionsCounter].capital.toLowerCase() + '.jpeg'
        let progressWidth = ((indexInSeries+1) / G_SeriesLength)*100+'%'
        popupResponse = ''
        if (this.state.isResponseRight) {
            popupResponse = this.popupResponseIsOK
            popupBackgroundColor = COLORS.okBackgroundColor
            popupTextColor = COLORS.okTextColor
            popupButtonBackgroundColor = COLORS.okButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.okButtonBorderBottomColor
        }
        else {
            popupResponse = this.popupResponseIsKO
            popupBackgroundColor = COLORS.nokBackgroundColor
            popupTextColor = COLORS.nokTextColor
            popupButtonBackgroundColor = COLORS.nokButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.nokButtonBorderBottomColor
        }


        return (
            <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor}}>
                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: '3%', paddingRight: '3%' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'gainsboro', borderRadius: 10, height: 10 }}>
                        <View style={{ backgroundColor: '#78c800', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: progressWidth}}>
                        </View>        
                    </View>      
                </View>
                <Divider/>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'  }}>
                    <Text style={{ fontSize: 40, fontWeight: 'bold'}}> {queres.state} </Text>
                </View>
                <Divider/>
                <Divider/>
                <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[0]) }}>
                            <Text style={styles.button_text}> {responses[0].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[1]) }}>
                            <Text style={styles.button_text}> {responses[1].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[2]) }}>
                            <Text style={styles.button_text}> {responses[2].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[3]) }}>
                            <Text style={styles.button_text}> {responses[3].capital} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[4]) }}>
                            <Text style={styles.button_text}> {responses[4].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[5]) }}>
                            <Text style={styles.button_text}> {responses[5].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[6]) }}>
                            <Text style={styles.button_text}> {responses[6].capital} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { this._displayResponseResults(queres, responses[7]) }}>
                            <Text style={styles.button_text}> {responses[7].capital} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider/>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.title_text}></Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed')
                    }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 2 }}></View>
                        <View style={{ flex: 7 }}></View>
                        <View style={{ flex: 8, backgroundColor: popupBackgroundColor, padding: 10}}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{  color: popupTextColor, fontSize: 25, fontWeight: 'bold' }}>{popupResponse}</Text>
                            </View>
                            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: popupTextColor, fontSize: 25, fontWeight: 'bold', margin: 10 }}>La capitale de {queres.state} est</Text>
                                <Text style={{ color: popupTextColor, fontSize: 50, fontWeight: 'bold' }}>{queres.capital}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.button, { backgroundColor:popupButtonBackgroundColor, borderBottomColor:popupButtonBorderBottomColor }]} onPress={() => { this.__hideResponseResults() }}>
                                    <Text style={{ padding: 10, fontSize: 25, color: 'white' }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

/*
<View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
<Image style={{ width: 220, height: 220 }} source={this.props.RightResponse.image} />
</View>
*/

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        marginTop: 30
    },
    title_view: {
        flex: 1
    },
    title_text: {
        height: 50
    },
    Series_infos_view: {
        flex: 1
    },
    Series_info_text: {
        height: 50
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
    progressBar: {
     position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: 20,
     width: '40%',
     borderColor: '#000',
     borderWidth: 4,
     borderRadius: 5,
     backgroundColor: "#8BED4F"
    },
    button_text: {
        fontSize: 25,
        color: 'white',
        padding: 10
    },
    question_view: {
        flex: 2
    },
    question_text: {
        height: 50
    },
    choices_view: {
        flex: 4
    },
    modal_view: {
        backgroundColor: "#fff",
        width: 300,
        height: 300
    }
})

const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleListOfQuestionStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(SeriesScreen)
