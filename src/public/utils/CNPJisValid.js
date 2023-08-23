const cleanString = require('./cleanString');
const cnpjValidation = (str) => {
    str = cleanString(str);
    if(str.length < 14) return false;
    let sum=0; let coef=5; let idx=0;
    while(coef >= 2){
        sum += coef * parseInt(str[idx]);
        coef -= 1;
        idx += 1;
        if(coef == 1 && idx == 4){
            coef = 9;
        }
    }
    
    const firstDigit = (sum%11) == (0 || 1) ? 0 : 11 - (sum%11);
    if(firstDigit == parseInt(str[str.length - 2])){
        coef = 6; sum=0; idx=0;
        while(coef >= 2){
            sum += coef * parseInt(str[idx]);
            coef -= 1;
            idx += 1;
            if(coef == 1 && idx == 5){
                coef = 9;
            }
        }
        const secondDigit = (sum%11) == (0 || 1) ? 0 : 11 - (sum%11);
        if(secondDigit == str[str.length-1]) return true; 
    }
    return false;
}

// module.exports = cnpjValidation;