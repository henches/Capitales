import React from 'react'
import { Text, View, Animated, TouchableOpacity, Easing, Bounce } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';


const progressDuration = 200


// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class AnimatedCounter extends React.Component {


    constructor() {
        console.log("Animated Counter Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super();

        this.state = {
            size : new Animated.Value(1),
            counter : 0
        }
    }

    componentDidMount() {
        console.log("Component Animated Counter Didmount")
        this.setState({ counter: this.props.oldValue })
    }


    _initProgressAnimation = (oldValue, newValue) => {
        this.setState({ counter: oldValue })
        console.log('Animated Counter oldValue  = ', oldValue)
        console.log('Animated Counter newValue  = ', newValue)
    }


   _animateProgress  = () => {
        console.log("Animated Counter : animateProgress")
        if (this.props.oldValue == this.props.newValue) {
            this.props.onEndAnim()
            return
        }
        Animated.timing(this.state.size, {
                toValue: 2,
                duration: progressDuration, 
                easing: Easing.linear
        }).start( () =>  {     
            this._animateProgress2()
        })
    }


    _animateProgress2  = () => {
        console.log("Animated Counter : animateProgress2")
        this.setState({ counter: this.props.newValue })
        Animated.timing(this.state.size, {
                toValue: 1,
                duration: progressDuration, 
                easing: Easing.linear
        }).start( () =>  {      
            this.props.onEndAnim()           
        })
    }

  

    render() {

        const oldValue = this.props.oldValue 
        const newValue = this.props.newValue 
        console.log("Animated Counter oldValue = ", oldValue)
        console.log("Animated Counter newValue = ", newValue)


        return(
            <Animated.View style={{ transform: [{ scale: this.state.size }] }}>
                <Text style={{ fontFamily: 'ComicHelvetic_Light',  fontSize: scale(20), fontWeight: 'bold' }}>{ this.state.counter }</Text>
            </Animated.View>
      )
    }  
}
