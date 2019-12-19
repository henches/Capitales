import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Divider, Button } from 'react-native-elements'





class SeriesScreen extends React.Component {
    static navigationOptions = {
        headerTitle:"CAPITALES",
        headerRight:() => (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
        headerLeft:() => (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    }

    state = {
        modalVisible: false,
        isAnswerRight: true
    }

    _goSeriesScreen = () => {
        console.log("ON LANCE LA QUESTION SUIVANTE OU ON S'ARRETE SI ON ATTEINT LA FIN DE LA Series")
        if (this.props.QuestionsCounter < G_SeriesLength-1) {
            console.log("-> On continue la Series")
            const action = { type: "INITIATE-NEXT-QUESTION", value: this.props.QuestionsCounter+1 }
            this.props.dispatch(action)
            this.props.navigation.push('SeriesScreen', {})
        }
        else {
            console.log("> On arrête la série")
            this.props.navigation.navigate('SeriesResultsScreen', {})   
         }
    }
    
    _displayAnswerResults = (myAnswer) => {
        console.log('go Popup : myAnswer = ', myAnswer)
        console.log('go Popup : RightAnswer = ', this.props.RightAnswer)
//        if (myAnswer.capital == this.props.RightAnswer.capital)
        isAnswerRight = (myAnswer.capital.localeCompare(this.props.RightAnswer.capital) == 0)
        this.setState({isAnswerRight: isAnswerRight})
        this.setState({modalVisible: true})
    }

    __hideAnswerResults = () => {
        console.log('Quit Popup Reponse')
        this.setState({modalVisible: false})
        this._goSeriesScreen();
    }    


    render() {
        console.log("SeriesScreen RENDER")
        console.log('go Popup : state', this.state)

        const popupAnswerIsOK = "BRAVO !"
        const popupAnswerIsKO = "DOMMAGE !"
        const answerList = this.props.AnswersList;

        return(
          <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text>Marge !!!  C'est Homer qui te parle ...</Text>
                </View>
                <Divider/>
                <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={styles.Series_infos_text}> { this.props.RightAnswer.state } </Text>
                </View>
                <Divider/>
                <View style={{flex: 4, justifyContent: 'center'}}>
                    <Text style={styles.Series_infos_text}>PHOTO</Text>
                </View>
                <Divider/>
                <View style={{flex: 8, flexDirection:'row', justifyContent: 'center'}}>
                    <View style={{flex:1, flexDirection: 'column', justifyContent: 'center'}}> 
                    <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[0])}}>
                            <Text style={styles.button_text}> { answerList[0].capital } </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[1])}}>
                            <Text style={styles.button_text}> { answerList[1].capital } </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[2])}}>
                            <Text style={styles.button_text}> { answerList[2].capital } </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[3])}}>
                            <Text style={styles.button_text}> { answerList[3].capital } </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent: 'center'}}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[4])}}>
                            <Text style={styles.button_text}> { answerList[4].capital } </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[5])}}>
                            <Text style={styles.button_text}> { answerList[5].capital } </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[6])}}>
                            <Text style={styles.button_text}> { answerList[6].capital } </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {this._displayAnswerResults(answerList[7])}}>
                            <Text style={styles.button_text}> { answerList[7].capital } </Text>
                        </TouchableOpacity>
                    </View>
                </View>                     
                <Divider/>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.title_text}>marge bas</Text>
                </View>                     
                <Modal
                    animationType="none"
                    transparent={true}
                    visible = {this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed')
                    }}>
                    <View style={{ flex: 1, backgroundColor: "#00000000" }}>
                        <View style={{flex: 7}}></View>
                        <View style={{flex: 8, backgroundColor: 'aqua', borderRadius: 10, margin: 30 }}> 
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 25 }}>{ this.state.isAnswerRight ? popupAnswerIsOK : popupAnswerIsKO }</Text>
                            </View>                
                            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                               <Text style={{fontSize: 25 }}>La capitale de la France est :</Text>
                               <Text style={{fontSize: 50 }}>PARIS</Text>
                            </View>
                            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={styles.button} onPress={() => { this.__hideAnswerResults() }}>
                                    <Text style={styles.button_text}>OK</Text>
                                </TouchableOpacity>
                            </View>             
                        </View>
                        <View style={{flex: 1}}></View>
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
        flex:1
    },
    title_text: {
        height: 50
    },
    Series_infos_view: {
        flex:1
    },
    Series_info_text: {
        height: 50
    },
    button: {
        height: 50, 
        borderRadius: 10, 
//        borderStyle: 'solid',
//        borderWidth: 1,
        justifyContent: 'center', 
        alignItems:'center', 
        backgroundColor: 'dodgerblue',
//        display: 'block',

//        margin: 0 auto;
//        width: 50%;
//        height: 50px;
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        margin: 5
//        background: 'linear-gradient(#5FDDFF,#53ADDF)',
//        border-top: none;
//        border-left: none;
//        border-right: none;
//        color: white;
//        border-radius: 10px;
//        box-shadow: 0px 2px 10px grey;
//        transition: 150ms ease;

/*      
display: block;
margin: 0 auto;
width: 50%;
height: 50px;
font-family: Helvetica;
border-bottom: 5px solid steelblue;
border-top: none;
border-left: none;
border-right: none;
background: linear-gradient(#5FDDFF,#53ADDF);
color: white;
border-radius: 10px;
transition: 150ms ease;
font-weight: bold;
*/




    },
    button_text: { 
        fontSize: 25,
        color: 'white',
        padding: 10
    },
    question_view: {
        flex:2
    },
    question_text: {
        height: 50
    },
    choices_view: {
        flex:4
    },
    modal_view: {
        backgroundColor: "#fff",
        width:300,
        height:300
    }
})

const mapStateToProps = state => {
    return {
        AnswersList: state.AnswersList,
        RightAnswer: state.RightAnswer,
        QuestionsCounter: state.QuestionsCounter    
    }
}

export default connect(mapStateToProps)(SeriesScreen)
