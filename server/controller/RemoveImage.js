const fs = require('fs')



exports.RemoveImage = (Slicet) => {

    try {

        console.log('remove',Slicet)
        fs.unlinkSync(Slicet)
        console.log('oke')
        return
    } catch (error) {
        return
    }


}