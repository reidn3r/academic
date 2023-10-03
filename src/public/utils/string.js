const nlp = require('compromise');
const wordData = require('../../data/exportWords');
const ptbrWords = Object.values(wordData);

let str = "       Engenharia     de      bar    "
// let str = "engenharia de bar";

const checkString = (str) => {    
    let result = str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s{2,}/g, ' ');

    let out_str=result;

    //Remove espaço no começo
    if(out_str[0] == ' '){
        out_str="";
        for(let i=1; i<result.length; i++){
            out_str += result[i];
        }
    }
    
    //Remoção de espaço no fim
    while(out_str[out_str.length-1] == " "){
        out_str = out_str.slice(0, -1);
    }

    const splitWords = out_str.split(' ');
    const setWords = new Set(splitWords);
    if(splitWords.length != setWords.size) return false;

    for(let j=0; j<splitWords.length; j++){
        if(!ptbrWords.includes(splitWords[j]+'\r')){
            return false;
        }
    }
    return true;
}

console.log(checkString(str));