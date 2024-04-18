
export class CleanString {

    public removeSpaces(input:string){
        return input.replace(/^\s+|\s+$/g, '');
    }

    public CPFisValid = (cpf:string):boolean => {
        cpf = this.cleanString(cpf);
        if(cpf.length != 11) return false;
        let sum:number = 0; let coef:number = 10;
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
            if(rest == parseInt(cpf[10])) return true;
            return false;
        };
        return false;
    }

    public cleanString = (str:string):string => {
        if(typeof(str) != "string") return "";
        const result:string = str.replaceAll(".", '').replaceAll('-', '');
        return isNaN(+result) ? "" : result;
    }
}