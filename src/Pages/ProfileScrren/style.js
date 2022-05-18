import {ScaledSheet} from 'react-native-size-matters'
import COLOR from '../../Assistant/Color'
const Styles = ScaledSheet.create({
    Padding: {
        padding : '10@s'

    },

    container: {
        flex : 1,
        backgroundColor : COLOR.white
    },
    marginLeft : {
        marginLeft : '10@s'

    },
    ImageContainer: {
        height : '280@s',
        backgroundColor : COLOR.firstColor,
        justifyContent : 'center',
        alignItems : 'center',
        borderBottomColor : COLOR.white,
        borderBottomWidth : 2,
        
    },

    image: { 
        width : '90@s',
        height : '90@s',
        borderRadius : 50,
        borderColor : COLOR.white,
        borderWidth : 2,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    imageColor: {
        color : COLOR.white,
        fontSize : '20@s',

        fontWeight : 'bold'
    },
    order : {

        // backgroundColor : '',
        flexDirection : 'row',
        alignItems : 'center',
        height  : '45@s',
     
    },
    MarginBottomAndTop : {
        marginBottom : '10@s',
        marginBottom : '10@s'
    },
   Icons : {
       fontSize : '25@s',
       color : COLOR.black
   },
   color : {
    color : COLOR.black
   },

   Button: {
       padding : '10@s',
       flex : 1,
    //    backgroundColor : 'red',
       justifyContent : 'center'
   },
   IconLeft: {

    width : '40@s',
    height : '40@s',
    borderRadius : 50,
    borderColor : COLOR.firstColor,
    backgroundColor : COLOR.firstColor,
    justifyContent : 'center',
    alignItems : 'center'
   },
   header: {
       flexDirection : 'row',
       alignItems : 'center'
   },
   FONT: {
       fontSize : '18@s',
       textTransform : 'capitalize'
   },
   OrderList :{
       backgroundColor : COLOR.firstColor,
       padding : '5@s',
       borderRadius  : '4@s',
       borderColor : COLOR.white
   },
   Colorwhite : {
       color : COLOR.white
   },
   City: {
       flexDirection : 'row',
       alignItems : 'center',
       justifyContent : 'space-between'
   }


})


export default Styles