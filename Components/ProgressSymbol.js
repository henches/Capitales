import React from 'react'
import { Text, View, Animated, TouchableOpacity, Easing, Bounce } from 'react-native'


const barHeight = 18
progressDuration = 1000


// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressSymbol extends React.Component {


    constructor() {
        console.log("ProgressSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super();

        this.state = {
            circleSize : new Animated.Value(1),
            progress : new Animated.Value(0),
            counter : 0
        }
    }

    componentDidMount() {
        console.log("ComponentDidmount")
        this.setState({ counter: this.props.oldPoints })
        this.state.progress.setValue(Math.max(this.props.oldPoints/this.props.maxPoints, 0.05))
    }


    _tick = () => {
        this.setState(prevState => ({
            counter: prevState.counter + 1
          }))
    }

   _animateProgress  = () => {
    console.log("progress Symbol : _animateProgress ")
    Animated.timing(this.state.circleSize, {
            toValue: 2,
            duration: 500, 
            easing: Easing.linear
    }).start( () =>  {     
        this._animateProgress2()
    })
}

    
    _animateProgress2  = () => {
        console.log("progress Symbol : _animateProgress2 ")

        this.setState({ counter: this.props.oldPoints })
        this.interval = setInterval(() => this._tick(), progressDuration/(this.props.points-this.props.oldPoints+1));

        Animated.timing(this.state.progress, {
                toValue: this.props.points/this.props.maxPoints,
                duration: progressDuration, 
                easing: Easing.linear
        }).start( () =>  {                
            clearInterval(this.interval);
            this.setState({ counter: this.props.points })
            this._animateProgress3()
        })
    }

    _animateProgress3  = () => {
        console.log("progress Symbol : _animateProgress3 ")
        Animated.timing(this.state.circleSize, {
                toValue: 1,
                duration: 500, 
                easing: Easing.linear
        }).start( () =>  {      
            this.props.onEndAnim3()           
        })
    }

    _closeAnimations  = () => {
        console.log("progress Symbol : closeAnimations")
    }

    render() {

        const myFlex = this.props.myFlex // chaine de caractères
        const zone = this.props.zone // chaine de caractères
        console.log("render ProgressSymbol oldPoints = ", this.props.oldPoints)
        console.log("render ProgressSymbol points = ", this.props.points)
        console.log("render ProgressSymbol maxPoints = ", this.props.maxPoints)
        let justify = 'flex-end'
        // if (this.props.oldPoints/this.props.maxPoints < 0.05) justify = 'flex-start'


        return(
            <View style={{ flex: myFlex, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginRight: '5%', marginLeft: '5%' }}>
                <Text style={{ fontSize: 20 }}>{ zone }</Text>
                <View style={{ flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center', backgroundColor: 'lightskyblue', borderRadius: 10, height: barHeight, width: '100%' }}>
                    <Text style={{ position: 'absolute', left: '95%', fontSize: 10, color: 'black' }}> { this.props.maxPoints } </Text>
                    <Animated.View style={{ flexDirection: 'row', justifyContent: justify, backgroundColor: 'blue', borderRadius: 10, height: barHeight, 
                            width: this.state.progress.interpolate({ inputRange: [0,1], outputRange: ["0%","100%"] }) }}>      
                        <Animated.View style={{ transform: [{ scale: this.state.circleSize }] }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', borderRadius: '50%', height: barHeight, width: barHeight, marginRight: '0.5%' }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'white' }}> { this.state.counter } </Text>
                            </View>   
                        </Animated.View>
                    </Animated.View>
                </View>
            </View>
      )
    }  
}