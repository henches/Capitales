import React from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Modal, Image } from 'react-native'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import { COLORS, Gstyles } from './Styles'
import { G_GetImageForLevel } from '../Helpers/PointsManager'
import { TextInput } from 'react-native';
import { playSound } from '../Helpers/SoundFunctions'
import { QrLevelSymbol } from './QrLevelSymbol'





class SeriesScreen extends React.Component {

    constructor() {
        console.log('SERIES SCREEN CONSTRUCTOR ')
        super()
     }

     componentDidMount() {
        console.log("SERIES SCREEN DID MOUNT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")


    }

    
    static navigationOptions = {
        headerShown: false,
    }

    state = {
        modalVisible: false,
        inputResponse: "",   // Réponse saisie au clavier
    }

    _goSeriesScreen = () => {

        // console.log("ON LANCE LA QUESTION SUIVANTE OU ON S'ARRETE SI ON ATTEINT LA FIN DE LA Series")
        if (this.props.navigation.state.params.indexInSeries < this.props.QueresSeries.length - 1) {
            // console.log("-> On continue la Series")
            this.props.navigation.push('SeriesScreen', { indexInSeries: this.props.navigation.state.params.indexInSeries+1 })
        }
        else {
            // console.log("> On arrête la série")
            this.props.dispatch({ type: "QUERES_STATS-UPDATE", value: this.props.QueresSeries })   // on met à jour la liste de stats de questions globale
//            console.log("PROOOOOOOOOPS = ", this.props)
            this.props.navigation.navigate('SeriesResultsScreen', {})
        }
    }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }


    _displayResponseResults = (qr, myResponse, level) => {
        // console.log('*****************************   go Popup ****************************')
        let isMyResponseRight = false
        let myIsTypo = false
        if (level == 3 || level == 4) {
            const levenshtein = require('js-levenshtein')
            let lev = levenshtein(qr.capital, myResponse.capital) 
            if (lev <= 2) {
                isMyResponseRight = true
                myIsTypo =  (lev != 0)
            }
            else
                isMyResponseRight = false
        } 
        else {
            isMyResponseRight = (myResponse.capital.localeCompare(qr.capital) == 0)
        }

       const action = { type: 'QUERES_SERIES-ADD_ANSWER', value: { index : this.props.navigation.state.params.indexInSeries, isResponseRight: isMyResponseRight, givenResponse: myResponse.capital, isTypo: myIsTypo } }
       this.props.dispatch(action)


        playSound(isMyResponseRight)

        this.setState({ modalVisible: true })
    }

    __hideResponseResults = () => {
        // console.log('*****************************   Quit Popup ****************************')
 
       this.setState({ modalVisible: false })
       this._goSeriesScreen();
    }

    _showAlertQuitSeries() {  
        Alert.alert(  
            'Es-tu sûr de vouloir quitter ?',  
            'Tous les progès dans cette session seront perdus',  
            [  
                {  
                    text: 'Annuler',  
                    onPress: () => console.log('Annuler Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'Quitter', onPress: () => this._goHomeScreen()},  
            ]  
        )
    }

    render() {
       //  <Text style={{ fontSize: 10, fontWeight: 'bold'}}> rr={queres.rightResponsesNb} level={level}  </Text>  (mis de côté, pour debug : à afficher juste après l'affichage du pays)



        // console.log('SeriesScreen : state', this.state)
        // console.log('SeriesScreen : Render props', this.props)
        console.log('SeriesScreen : Render SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')


        const indexInSeries = this.props.navigation.state.params.indexInSeries
        const queres = this.props.QueresSeries[indexInSeries]

        const level = queres.level
        const afterResponseLevel = queres.afterResponseLevel
        const levelChanged = (afterResponseLevel != level)

        const rightResponsesNb = queres.rightResponsesNb
        const afterResponseRightResponsesNb = queres.afterResponseRightResponsesNb
        const rightResponsesNbDisplay = afterResponseRightResponsesNb  > rightResponsesNb ? afterResponseRightResponsesNb : rightResponsesNb

        
        const rNbForNextLevel = queres.rNbForNextLevel
        // level = 3 // A fins de TEST du level 3
        // rNbForNextLevel = 6 // A fins de TEST du level 3

        // let imageUrl = 'file:../Helpers/capital_images/' + this.props.QueresSeries[this.props.QuestionsCounter].capital.toLowerCase() + '.jpeg'



        // Progress bar for the series of tests
        let progressWidth = ((indexInSeries) / G_Config.SeriesLength)*100+'%'

        // Popup Elements 
        // Popup CSS


        
        // const afterResponseRNbForNextLevel = queres.afterResponseRNbForNextLevel
        const levelImage = levelChanged ? G_GetImageForLevel(afterResponseLevel) : G_GetImageForLevel(level) // l'image du niveau pour le popup ET pour la queres affichée (le nouveau niveau doit être mis à jour)

        let popupVerdict = ''
        let pointsWon = 0

        if (queres.isResponseRight) {
            popupVerdict = "BRAVO !"
            pointsWon = queres.pointsWon
            popupPointsWon = "+ "+pointsWon+" pt"+(pointsWon>1?"s":"")+" !"
            popupBackgroundColor = COLORS.okBackgroundColor
            popupTextColor = COLORS.okTextColor
            popupButtonBackgroundColor = COLORS.okButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.okButtonBorderBottomColor
        }
        else {
            popupVerdict = "ATTENTION !"
            popupPointsWon = ""
            popupBackgroundColor = COLORS.nokBackgroundColor
            popupTextColor = COLORS.nokTextColor
            popupButtonBackgroundColor = COLORS.nokButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.nokButtonBorderBottomColor
        }
        
        // Popup Texts
        let popupConfirmationText = "La capitale de "
        let popupCheeringText = ""
        let typoWarningText = ""
        let popupFlexSize = 7
        // console.log("level= ", level, " rNbForNextLevel=", rNbForNextLevel)
        if (level == 0) {
            if (levelChanged && queres.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                popupLevelImage = levelImage
            }
            else if (queres.isResponseRight) {
//                popupCheeringText = "plus que " + (rNbForNextLevel-1)+ " bonnes réponses pour le niveau 1"
            }
        }
        else if (level == 1) {
            if (levelChanged && queres.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                popupLevelImage = levelImage
            }
            else if (queres.isResponseRight) {
//                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 2"
            }
        }
        else if (level == 2) {
            popupConfirmationText = "Le pays de "
            if (levelChanged && queres.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                popupLevelImage = levelImage
            }
            else if (queres.isResponseRight) {
//                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 3"
            }
        }
        else if (level == 3) {
            popupFlexSize = 5
            if (queres.isResponseRight && queres.isTypo) {
                typoWarningText = "(attention : il y a une faute de frappe)"
            }
            if (levelChanged  && queres.isResponseRight) {
                popupCheeringText = "Vous avez atteint le niveau"
                popupLevelImage = levelImage
            }
            else if (queres.isResponseRight) {
//                popupCheeringText = "plus que " + (rNbForNextLevel-1) + " bonnes réponses pour le niveau 4"
            }
        }
        else if (level == 4) { // Should Never Happen
            popupFlexSize = 5
            if (queres.isResponseRight && queres.isTypo) {
                typoWarningText = "(attention : il y a une faute de frappe)"
            }
        }

    
        // Popup Cheering View
        let cheeringView = 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{  color: popupTextColor, fontSize: 16, fontWeight: 'bold' }}>{popupCheeringText}</Text>
        </View>
        if (levelChanged && queres.isResponseRight)
            cheeringView = 
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: popupTextColor, fontSize: 20, fontWeight: 'bold' }}>{popupCheeringText} </Text>
                    <Image style={{ width: 70, height: 70 }} source={popupLevelImage} />
                </View>
        else if (queres.isResponseRight) 
            cheeringView = 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{  color: popupTextColor, fontSize: 16, fontWeight: 'bold' }}>{popupCheeringText}</Text>
                </View>

        // End of Popup View

        // Response View
        let responses = queres.proposedResponses
        let responseView = <View> <Text> fake </Text> </View> // juste pour intialiser la variable
        let question  = queres.state
        let questionIntro = "Capitale de"
        let answer = queres.capital
        if (level == 0) { 
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.button_text}> {responses[0].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.button_text}> {responses[1].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2]), level }}>
                        <Text style={Gstyles.button_text}> {responses[2].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3]), level }}>
                        <Text style={Gstyles.button_text}> {responses[3].capital} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 1) {
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.button_text}> {responses[0].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.button_text}> {responses[1].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2], level) }}>
                        <Text style={Gstyles.button_text}> {responses[2].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3], level) }}>
                        <Text style={Gstyles.button_text}> {responses[3].capital} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[4], level) }}>
                        <Text style={Gstyles.button_text}> {responses[4].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[5], level) }}>
                        <Text style={Gstyles.button_text}> {responses[5].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[6], level) }}>
                        <Text style={Gstyles.button_text}> {responses[6].capital} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[7], level) }}>
                        <Text style={Gstyles.button_text}> {responses[7].capital} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 2) {
            question = queres.capital
            questionIntro = "Quel est le pays dont la capitale est "
            answer = queres.state
            responseView = 
            <View style={styles.response_view}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[0], level) }}>
                        <Text style={Gstyles.button_text}> {responses[0].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[1], level) }}>
                        <Text style={Gstyles.button_text}> {responses[1].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[2], level) }}>
                        <Text style={Gstyles.button_text}> {responses[2].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[3], level) }}>
                        <Text style={Gstyles.button_text}> {responses[3].state} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[4], level) }}>
                        <Text style={Gstyles.button_text}> {responses[4].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[5], level) }}>
                        <Text style={Gstyles.button_text}> {responses[5].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[6], level) }}>
                        <Text style={Gstyles.button_text}> {responses[6].state} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._displayResponseResults(queres, responses[7], level) }}>
                        <Text style={Gstyles.button_text}> {responses[7].state} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        else if (level == 3) { // Text input
            if (this.state.inputResponse.localeCompare("") == 0) {
                checkButtonStyle = Gstyles.button_inactive
                checkTextButtonStyle = Gstyles.check_text_inactive
            }
            else {
                checkButtonStyle = Gstyles.button
                checkTextButtonStyle = Gstyles.button_text
            }
            responseView = 
            <View style={styles.text_response_view}>
                    <TextInput
                        style={{ fontSize:20, height: 40, backgroundColor: 'gainsboro', borderColor: 'darkgray', borderWidth: 2, borderRadius: 10, marginLeft: 10, marginRight: 10, paddingLeft: 5, paddingRight:5 }}
                        placeholder='Ecris la capitale'
                        placeholderTextColor='dimgrey'
                        onChangeText={(text) => this.setState({inputResponse: text})}
                    />
                    <TouchableOpacity style={checkButtonStyle}
                        onPress={() => { this._displayResponseResults(queres, { state : queres.state, capital: this.state.inputResponse }, level) }}>
                        <Text style={checkTextButtonStyle}> Vérifier </Text>
                    </TouchableOpacity>
            </View>
        }
        else if (level == 4) { // Text input  (idem niveau 3)
            if (this.state.inputResponse.localeCompare("") == 0) {
                checkButtonStyle = Gstyles.button_inactive
                checkTextButtonStyle = Gstyles.check_text_inactive
            }
            else {
                checkButtonStyle = Gstyles.button
                checkTextButtonStyle = Gstyles.button_text
            }
            responseView = 
            <View style={styles.text_response_view}>
                    <TextInput
                        style={{ fontSize:20, height: 40, backgroundColor: 'gainsboro', borderColor: 'darkgray', borderWidth: 2, borderRadius: 10, marginLeft: 10, marginRight: 10, paddingLeft: 5, paddingRight:5 }}
                        placeholder='Ecris la capitale'
                        placeholderTextColor='dimgrey'
                        onChangeText={(text) => this.setState({inputResponse: text})}
                    />
                    <TouchableOpacity style={checkButtonStyle}
                        onPress={() => { this._displayResponseResults(queres, { state : queres.state, capital: this.state.inputResponse }, level) }}>
                        <Text style={checkTextButtonStyle}> Vérifier </Text>
                    </TouchableOpacity>
            </View>
        }

        return (
            <View style={ Gstyles.main_view }>
                <View style={ styles.quitAndProgressBar_view }>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={()=> this._showAlertQuitSeries() }>
                            <Image style={{ width: 35, height: 35 }} source={require('../Images/quit-screen.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.progressBar_view }>
                        <View style={{ flexDirection: 'row', backgroundColor: 'gainsboro', borderRadius: 10, height: 10 }}>
                            <View style={{ backgroundColor: '#78c800', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: progressWidth}}>
                            </View>        
                        </View>      
                    </View>
                </View>
                <Divider/>
                <View style={ styles.question_view }>
                    <Text style={{ fontSize: 16, fontWeight: 'bold'}}> {questionIntro} </Text>
                    <Text style={{ fontSize: 40, fontWeight: 'bold'}}> {question} ? </Text>
                </View>
                <Divider/>
                <View style={styles.image_view}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 220, height: 220 }} source={require('../Helpers/capital_images/paris.jpeg')} />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <QrLevelSymbol maxRightResponses={ 8 } rightResponsesNb={ rightResponsesNbDisplay } symbolHeight= { 180 }/>
                    </View>
                </View>
                <Divider/>
                { responseView }
                <Divider/>
                <View style={styles.ad_view} >
                    <Text style={styles.title_text}></Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed')
                    }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 6 }}></View>
                        <TouchableWithoutFeedback onPress={() => { this.__hideResponseResults() }}>
                            <View style={{ flex: popupFlexSize, backgroundColor: popupBackgroundColor, padding: 10}}>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{  color: popupTextColor, fontSize: 25, fontWeight: 'bold' }}>{popupVerdict}</Text>
                                        <Text style={{  color: popupTextColor, fontSize: 25, fontWeight: 'bold' }}>{popupPointsWon}</Text>
                                    </View>
                                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: popupTextColor, fontSize: 25, fontWeight: 'bold', margin: 9 }}>{popupConfirmationText} {question} est</Text>
                                        <Text style={{ color: popupTextColor, fontSize: 50, fontWeight: 'bold' }}>{answer}</Text>
                                        <Text style={{ color: popupTextColor, fontSize: 14, fontWeight: 'bold' }}>{typoWarningText}</Text>
                                    </View>
                                    { cheeringView }
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.__hideResponseResults() }} style={[Gstyles.button, { backgroundColor:popupButtonBackgroundColor, borderBottomColor:popupButtonBorderBottomColor }]}  >
                                            <Text style={Gstyles.button_text}>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    quitAndProgressBar_view: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingLeft: '3%', 
        paddingRight: '3%' 
    },
    question_view: {
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center'  
    },
    image_view: {
        flex: 6, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    response_view: {
        flexDirection: 'row', 
        flex: 7, 
    },
    text_response_view: {
        flex: 7,
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        paddingTop: 15
    },
    ad_view: {
        flex: 1, 
    },
    title_text: {
        height: 50
    },
    progressBar_view: {
        flex: 6, 
        justifyContent: 'center' 
    },
    progressBar: {
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: 20,
        width: '40%',
        borderColor: '#000',
        borderWidth: 4,
        borderRadius: 5,
        backgroundColor: "#8BED4F"
       },
    modal_view: {
        backgroundColor: "#fff",
        width: 300,
        height: 300
    },
})

const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(SeriesScreen)
