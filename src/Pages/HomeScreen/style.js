import { ScaledSheet } from 'react-native-size-matters'
import COLOR from '../../Assistant/Color'

const Styles = ScaledSheet.create({

    container: {
        padding: '10@s',
        flex: 1,
        backgroundColor: COLOR.white
    },
    font: {
        fontSize: '20@s',
        color: COLOR.black,
        textTransform: 'capitalize'
    },
    marginBottomAndTop: {
        marginTop: '4@s',
        marginBottom: '4@s'
    },
    //    Total : {
    //        flexDirection : 'row-reverse'
    //    },
    extraFont: {
        marginTop: '20@s',
        fontSize: '30@s',
        textTransform: 'capitalize'
    },
    theColor: {
        color: COLOR.white
    },
    address: {
        flexDirection : 'row',
        alignItems : 'center'
    },
    containericon: {
        width : '30@s',
        height : '30@s',
        borderRadius : 50,
        borderColor : COLOR.white,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        marginRight : '10@s'
        
    },
    icon : {
    fontSize : '20@s',
    },
    orderavailable: {
        padding : '4@s',
        backgroundColor : COLOR.firstColor,
        borderRadius : '4@s',
        
    },
    button: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems  : 'center'
    },
    buttonCHILDREN : {
        width : '45%'
    }


})


export default Styles