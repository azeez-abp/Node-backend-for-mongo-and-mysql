module.exports  =  (length,include_spacial_char=false)=> {
    var result           = '';
    let spacials  = '@$&#*'
    var characters       = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${include_spacial_char?spacials:''}`;
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

