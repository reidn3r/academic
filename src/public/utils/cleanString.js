const cleanString = (str) => {
    if(typeof(str) != "string") return null;
    let finalStr="";
    for(let i=0; i<str.length; i++){
        if(str[i] >= 0 && str[i] <= 9){
            finalStr += str[i];
        }
        else{
            return false;
        }
    }
    return finalStr;
}

module.exports = cleanString;
