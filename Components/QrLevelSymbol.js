import React from 'react'
import { Image, View } from 'react-native'
import { G_GetLevelFromRightResponsesNb } from '../Helpers/PointsManager'
import { COLORS, Gstyles } from './Styles'


export class QrLevelSymbol extends React.Component {

    /*
    static propTypes = {
        status: PropTypes.number.isRequired,
        rightResponsesNb: PropTypes.number.isRequired,
        symbolHeight : PropTypes.number.isRequired,
        maxRightResponses : PropTypes.number.isRequired,
    }

    */

    render() {
        // cette classe  les props
        // level : de 0 à 4
        // rightResponsesNb : Nombre de bonnes réponses de 0 à n
        // maxRightResponses : NombreMaximum de bonnes réponses
        // symbolHeight : hauteur du symbole

        const rightResponsesNb = this.props.rightResponsesNb
        const maxRightResponses = this.props.maxRightResponses
        const symbolHeight = this.props.symbolHeight

        const elt = G_GetLevelFromRightResponsesNb(rightResponsesNb)
        const level = elt.level

        const levelSize = symbolHeight/maxRightResponses

        const levelImageSize = levelSize*1.2
        const progress = levelSize*rightResponsesNb

        const decX = 5
        const decY = -2


        const yFirstImageLevelPos = symbolHeight-levelSize*G_Config.Level[0].QrNb-levelImageSize/2-decY
        const ySecondImageLevelPos = symbolHeight-levelSize*(G_Config.Level[0].QrNb+G_Config.Level[1].QrNb)-levelImageSize/2-decY
        const yThirdImageLevelPos = symbolHeight-levelSize*(G_Config.Level[0].QrNb+G_Config.Level[1].QrNb+G_Config.Level[2].QrNb)-levelImageSize/2-decY
        const yFourthImageLevelPos = symbolHeight-levelSize*(G_Config.Level[0].QrNb+G_Config.Level[1].QrNb+G_Config.Level[2].QrNb+G_Config.Level[3].QrNb)-levelImageSize/2-decY

        
        const left = -levelImageSize/2+decX

        let image1 = G_Config.Level[1].NotReachedImage
        let image2 = G_Config.Level[2].NotReachedImage
        let image3 = G_Config.Level[3].NotReachedImage
        let image4 = G_Config.Level[4].NotReachedImage

        if (level == 1) {
            image1 = G_Config.Level[1].Image
        }
        else if (level == 2) {
            image1 = null
            image2 = G_Config.Level[2].Image
        }
        else if (level == 3) {
            image1 = null
            image2 = null
            image3 = G_Config.Level[3].Image
        }
        else if (level == 4) {
            image1 = null
            image2 = null
            image3 = null
            image4 = G_Config.Level[4].Image

        }



        // console.log("status = " + level + " rightResponsesNb : " + rightResponsesNb + " symbolHeight : ", symbolHeight, " progress : ", progress, " levelSize: ",  levelSize, " yFirstImageLevelPos : ", yFirstImageLevelPos)
        // console.log(" G_Config.Level[0] : ", G_Config.Level[0])
        return(
            <View style={{ backgroundColor: 'lightgrey', marginTop: 0, borderRadius: 10, height: symbolHeight, width:11, alignSelf: 'center'}}>
                    <View style={[{ backgroundColor: 'lawngreen', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: symbolHeight-progress, bottom: 0 }, { height: progress }]}>
                    </View>         
                    <Image  style={{ position: 'absolute', left: left, right: 0, top: yFirstImageLevelPos, bottom: 0, width: levelImageSize, height: levelImageSize }} source={image1} />
                    <Image  style={{ position: 'absolute', left: left, right: 0, top: ySecondImageLevelPos, bottom: 0, width: levelImageSize, height: levelImageSize }} source={image2} />
                    <Image  style={{ position: 'absolute', left: left, right: 0, top: yThirdImageLevelPos, bottom: 0, width: levelImageSize, height: levelImageSize }} source={image3} />
                    <Image  style={{ position: 'absolute', left: left, right: 0, top: yFourthImageLevelPos, bottom: 0, width: levelImageSize, height: levelImageSize }} source={image4} />
            </View>
        )
    }  
    /*                    <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: symbolHeight, width:11, alignSelf: 'center'}}>
                        <View style={[{ backgroundColor: 'dodgerblue', borderRadius: 10, height: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }, { height: progress }]}></View>         
                    </View>

    */
}
