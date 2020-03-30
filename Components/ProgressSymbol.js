import React from 'react'
import { Text, View } from 'react-native'



// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressSymbol extends React.Component {

    constructor() {
        super();
        this.state = {
 //           progressPosition: new Animated.Value(0)
        }
    }

    _animateProgress = () => {
        console.log("_testAnim");
/*
        Animated.timing(
            this.state.progressPosition,
            {
              toValue: this.props.points/this.props.maxPoints,
              duration: 500, 
              easing: Easing.bounce
            }
          ).start() 
          */
    }


    render() {

        const myFlex = this.props.myFlex // chaine de caractères
        const animate = this.props.animate // boolen qui indique s'il faut animer ou pas la progression
        const points = this.props.points  // points : nombre de points actuels pour la zone
        const oldPoints = this.props.oldPoints  // points : nombre de points actuels pour la zone
        const maxPoints = this.props.maxPoints // maxPoints : nombre maximal de points pour la zone
        const percent = points / maxPoints * 100
        const zone = this.props.zone // chaine de caractères

        console.log("PROGRESS SYMBOL : oldPoints ", oldPoints, " points = ", points)
        return(
            <View style={{ flex: myFlex, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{zone}</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', paddingTop: 0, paddingBottom: 0,paddingRight: '5%', paddingLeft: '5%'}}>
                        <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: 16, width:"100%", alignSelf: 'center'}}>               
                         <View style={{ flexDirection: 'row', paddingRight: '5%', paddingLeft: '5%' }}>
                            <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'flex-start'}}>
                                <Text style={{ fontSize: 12 }}>0</Text>
                            </View>
                            <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'center'}}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{points}</Text>
                            </View>
                            <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'flex-end'}}>
                                <Text style={{ fontSize: 12 }}>{maxPoints}</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'dodgerblue', borderRadius: 10, height: 16, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: percent+"%" }}></View>         
                        </View>      
                </View>
            </View>
        )
    }  
}
