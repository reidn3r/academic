const cleanString = require('./cleanString');

const isValid = (cpf) => {
    cpf = cleanString(cpf);
    if(cpf.length > 11) return false;
    let sum = 0;
    let coef = 10;
    for(let i=0; i<cpf.length - 2; i++){
        sum += parseInt(cpf[i]) * coef;
        coef -= 1;
    }
    
    let rest = (sum*10) % 11 == 10 || (sum*10) % 11 == 11 ? 0 : (sum*10) % 11;
    if(rest == parseInt(cpf[9])){
        sum = 0;
        let coef = 11;
        for(let j=0; j<cpf.length - 1; j++){
            sum += parseInt(cpf[j]) * coef;
            coef -= 1;
        }
        rest = (sum*10) % 11 == 10 || (sum*10) % 11 == 11 ? 0 : (sum*10) % 11;
        if(rest == cpf[10]) return true;
        return false;
    };
    return false;
}

module.exports = isValid;
