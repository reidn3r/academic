// let str = "60.146.705/0001-43";

const cleanString = (str) => {
    console.log(str);
    if(typeof(str) != "string") return null;
    let finalStr="";
    for(let i=0; i<str.length; i++){
        if(str[i] >= 0 && str[i] <= 9){
            finalStr += str[i];
        }
    }
    return finalStr;
}

module.exports = cleanString;
// console.log(cleanString(str));