import { ScaledSheet } from 'react-native-size-matters';



const Styles = ScaledSheet.create({
    Container: {
        padding: '20@s',
        flex : 1
    },
    row : {
        // flexDirection  : '',
        // backgroundColor  : 'red'

    },
    Font: {
        fontSize: '20@s',
        // height : '30@s',
        color  : 'black'

    },
    ExtraFont: {
     fontSize : '30@s',
     marginBottom : '5@s'
    },
    extraSize: {
        fontWeight: 'bold'
    },
    Input : {
        marginTop : '15@s'
    },
    marginTopDefault : {
        marginTop : '30@s',
    },
    or : {

    
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'

    },
    textor: {
        width  : '40%',
        height : '1@s',
        backgroundColor : 'black'

    },
    account : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    accountFont: {
        fontSize : '16@s',
        color  : 'black'
    }
   
})



export default Styles