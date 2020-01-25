import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Image } from 'react-native'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import COLORS from './Styles'
import { storeQuestionStats } from '../Helpers/StorageFunctions'
import { G_GetLevelFromRightResponsesNb } from '../Helpers/GlobalFunctions'





class SeriesScreen extends React.Component {

    constructor() {
        console.log('*************************************************** Constructor Series Screen *************************************************************************************')
        super()
     }
    

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
        isResponseRight: true,
        levelImage: null
    }

    _goSeriesScreen = () => {

        // console.log("ON LANCE LA QUESTION SUIVANTE OU ON S'ARRETE SI ON ATTEINT LA FIN DE LA Series")
        if (this.props.navigation.state.params.indexInSeries < G_Config.SeriesLength - 1) {
            // console.log("-> On continue la Series")
            this.props.navigation.push('SeriesScreen', { indexInSeries: this.props.navigation.state.params.indexInSeries+1 })
        }
        else {
            // console.log("> On arrête la série")
            this.props.dispatch({ type: "QUERES_STATS-UPDATE", value: this.props.QueresSeries })   // on met à jour la liste de stats de questions globale
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
        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")


        indexInSeries = this.props.navigation.state.params.indexInSeries
        queres = this.props.QueresSeries[indexInSeries]

        // let imageUrl = 'file:../Helpers/capital_images/' + this.props.QueresSeries[this.props.QuestionsCounter].capital.toLowerCase() + '.jpeg'
        // Progress bar for the series of tests
        let progressWidth = ((indexInSeries+1) / G_Config.SeriesLength)*100+'%'

        // Popup writings
        popupResponse = ''
        if (this.state.isResponseRight) {
            popupResponse = "BRAVO !"
            popupBackgroundColor = COLORS.okBackgroundColor
            popupTextColor = COLORS.okTextColor
            popupButtonBackgroundColor = COLORS.okButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.okButtonBorderBottomColor
        }
        else {
            popupResponse = "ATTENTION !"
            popupBackgroundColor = COLORS.nokBackgroundColor
            popupTextColor = COLORS.nokTextColor
            popupButtonBackgroundColor = COLORS.nokButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.nokButtonBorderBottomColor
        }
        

        popupConfirmationText = "textconfirm à définir"
        popupCheeringText = ""
        r = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb)
        console.log("G_GetLevelFromRightResponsesNb r = ", r)
        level = r.level
        rNbForNextLevel = r.responsesNbForNextLevel
        levelImage = r.image
        console.log("level= ", level, " rNbForNextLevel=", rNbForNextLevel)
        if (level == 0) {
            popupConfirmationText = "La capitale de "
            if (rNbForNextLevel == 1 && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                r = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  r.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1)+ " bonnes réponses pour le niveau 1"
            }
        }
        else if (level == 1) {
            popupConfirmationText = "La capitale de "
            if (rNbForNextLevel == 1 && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                r = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  r.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 2"
            }
        }
        else if (level == 2) {
            popupConfirmationText = "Le pays de "
            if (rNbForNextLevel == 1  && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                r = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  r.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 3"
            }
        }
        else if (level == 3) {
            popupConfirmationText = "La capitale de "
            if (rNbForNextLevel == 1  && this.state.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                r = G_GetLevelFromRightResponsesNb(queres.rightResponsesNb+1)
                popupLevelImage =  r.image
            }
            else if (this.state.isResponseRight) {
                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 4"
            }
        }
        else if (level == 4) { // Should Never Happen
            popupConfirmationText = "Level4 : shoud never Happen"
            if (rNbForNextLevel == 1  && this.state.isResponseRight)
                popupCheeringText = "Level4 : shoud never Happen my dear"
            else if (this.state.isResponseRight) {
                popupCheeringText = "Bravo mais ne doit jamais arriver !"
            }
        }

        

    
        // Cheering View
        cheeringView = 
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{  color: popupTextColor, fontSize: 16, fontWeight: 'bold' }}>{popupCheeringText}</Text>
           </View>
        if (rNbForNextLevel == 1  && this.state.isResponseRight)
            cheeringView = 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: popupTextColor, fontSize: 20, fontWeight: 'bold' }}>{popupCheeringText} </Text>
                    <Image style={{ width: 70, height: 70 }} source={popupLevelImage} />
                </View>
        else if (this.state.isResponseRight) 
            cheeringView = 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: popupTextColor, fontSize: 16, fontWeight: 'bold' }}>{popupCheeringText}</Text>
                </View>


        // Response View
        responses = queres.proposedResponses
        responseView = <View> 
            <Text> fake </Text> 
        </View>
        question  = ""
        if (queres.level == 0) { 
            question = queres.state
            responseView = 
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
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2]) }}>
                        <Text style={styles.button_text}> {responses[2].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3]) }}>
                        <Text style={styles.button_text}> {responses[3].capital} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (queres.level == 1) {
            question = queres.state
            responseView = 
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
        }
        else if (queres.level == 2) {
            question = queres.capital
            responseView = 
            <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0]) }}>
                        <Text style={styles.button_text}> {responses[0].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1]) }}>
                        <Text style={styles.button_text}> {responses[1].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2]) }}>
                        <Text style={styles.button_text}> {responses[2].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3]) }}>
                        <Text style={styles.button_text}> {responses[3].state} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[4]) }}>
                        <Text style={styles.button_text}> {responses[4].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[5]) }}>
                        <Text style={styles.button_text}> {responses[5].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[6]) }}>
                        <Text style={styles.button_text}> {responses[6].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[7]) }}>
                        <Text style={styles.button_text}> {responses[7].state} </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
                    <Text style={{ fontSize: 40, fontWeight: 'bold'}}> {question} </Text>
                    <Text style={{ fontSize: 10, fontWeight: 'bold'}}> rr={queres.rightResponsesNb} level={queres.level}  </Text>

                </View>
                <Divider/>
                <View style={{ flex: 7, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                         <Image style={{ width: 220, height: 220 }} source={require('../Helpers/capital_images/paris.jpeg')} />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                         <Image style={{ width: 70, height: 70 }} source={levelImage} />
                    </View>
                </View>
                <Divider/>
                { responseView }
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
                                <Text style={{ color: popupTextColor, fontSize: 25, fontWeight: 'bold', margin: 10 }}>{popupConfirmationText} {queres.state} est</Text>
                                <Text style={{ color: popupTextColor, fontSize: 50, fontWeight: 'bold' }}>{queres.capital}</Text>
                            </View>
                            { cheeringView }
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
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(SeriesScreen)
