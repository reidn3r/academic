const isValid = (cpf) => {
    if(cpf.length > 11) return false;
    let sum = 0;
    for(let i=0; i<cpf.length - 2; i++){
        let coef = 10;
        sum += parseInt(cpf[i]) * coef;
        coef -= 1;
    }
    
    if((sum*10) % 11 == parseInt(cpf[9]) || 0 == parseInt(cpf[9])){
        sum = 0;
        let coef = 11;
        for(let j=0; j<cpf.length - 1; j++){
            sum += parseInt(cpf[j]) * coef;
            coef -= 1;
        }
        if((sum*10) % 11 == cpf[10]) return true;
        return false;
    };
    return false;
}

module.exports = isValid;