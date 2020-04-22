import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { array } from 'prop-types'

var BoxHeight = 40
var boxStyle = []


export class LevelSymbol extends React.Component {


    constructor() {
        console.log("LevelSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")

        for (let i = 0; i < G_Config.MaxPlayerLevelNumber; i++)
            boxStyle.push({ fontSize: 20, color: 'transparent', fontWeight: 'normal', borderWidth : 2, boxHeight : BoxHeight })

        super();

    }



    render() {
        for (let i = 0; i < G_Config.MaxPlayerLevelNumber; i++)
            boxStyle[i] = { fontSize: 20, color: 'transparent', fontWeight: 'normal', borderWidth : 2, boxHeight : BoxHeight }

        boxStyle[this.props.playerLevel].fontSize = 30
        boxStyle[this.props.playerLevel].color = 'blue'
        boxStyle[this.props.playerLevel].fontWeight = 'bold'
        boxStyle[this.props.playerLevel].borderWidth = 4
        boxStyle[this.props.playerLevel].boxHeight = BoxHeight*1.5

        return(
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginRight: '20%', marginLeft: '20%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[6].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[6].backgroundColor, borderWidth: boxStyle[6].borderWidth, height: boxStyle[6].boxHeight }] }>
                        <Text style={{ fontSize: boxStyle[6].fontSize, color: PlayerLevelStyle[6].textColor, fontWeight: boxStyle[6].fontWeight }}> { PlayerLevelStyle[6].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[5].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[5].backgroundColor, borderWidth: boxStyle[5].borderWidth, height: boxStyle[5].boxHeight }] }>
                        <Text style={{ fontSize: boxStyle[5].fontSize, color: PlayerLevelStyle[5].textColor, fontWeight: boxStyle[5].fontWeight }}> { PlayerLevelStyle[5].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[4].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[4].backgroundColor, borderWidth: boxStyle[4].borderWidth, height: boxStyle[4].boxHeight }] }>
                        <Text style={{ fontSize: boxStyle[4].fontSize, color: PlayerLevelStyle[4].textColor, fontWeight: boxStyle[4].fontWeight }}> { PlayerLevelStyle[4].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[3].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[3].backgroundColor, borderWidth: boxStyle[3].borderWidth, height: boxStyle[3].boxHeight }] }>
                        <Text style={{ fontSize: boxStyle[3].fontSize, color: PlayerLevelStyle[3].textColor, fontWeight: boxStyle[3].fontWeight }}> { PlayerLevelStyle[3].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[2].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[2].backgroundColor, borderWidth: boxStyle[2].borderWidth, height: boxStyle[2].boxHeight }] }>
                        <Text style={{ fontSize: boxStyle[2].fontSize, color: PlayerLevelStyle[2].textColor, fontWeight: boxStyle[2].fontWeight }}> { PlayerLevelStyle[2].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[1].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[1].backgroundColor, borderWidth: boxStyle[1].borderWidth, height: boxStyle[1].boxHeight }] }>
                        <Text style={{ fontSize: boxStyle[1].fontSize, color: PlayerLevelStyle[1].textColor, fontWeight: boxStyle[1].fontWeight }}> { PlayerLevelStyle[1].text } </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={ [styles.triangle, { borderLeftColor: boxStyle[0].color }]}></View>
                    <View style={ [styles.levelBox, { backgroundColor: PlayerLevelStyle[0].backgroundColor, borderWidth: boxStyle[0].borderWidth, height: boxStyle[0].boxHeight }] }>
                        <Text style={{ fontSize: boxStyle[0].fontSize, color: PlayerLevelStyle[0].textColor, fontWeight: boxStyle[0].fontWeight }}> { PlayerLevelStyle[0].text } </Text>
                    </View>
                </View>
            </View>
      )
    }  
}

const styles = StyleSheet.create({
    levelBox: {
        justifyContent: 'center', 
        alignItems: 'center', 
        borderStyle: 'solid', 
        borderColor : 'black', 
        borderRadius: 5, 
        height: BoxHeight, 
        width: '100%',
        marginTop: 4,
        marginBottom: 4
    },
    triangle: {
        overflow: 'hidden',
        width: 0,
        height: 0,
        borderBottomColor: 'transparent',
        borderBottomWidth: BoxHeight*2/3,
        borderTopColor: 'transparent',
        borderTopWidth: BoxHeight*2/3,
        borderLeftWidth: BoxHeight,
        marginRight: 4
  // borderRadius: 10
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
    
})