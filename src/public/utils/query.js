/* 
    data é um objeto do tipo:
    {
        campo_1: "valor_1",
        campo_2: "valor_2",
        campo_3: valor_numerico,
    }

    onde campo_n é um campo a ser buscado da tabela
    user do banco de dados e valor_x é o valor 
    associado a um dado desse campo

*/

const query = (data) => {
    let select = "SELECT ";
    let from = "FROM user WHERE ";
    
    const fields = Object.keys(data);
    const values = Object.values(data);
    
    let current_field = null;
    for(let i=0; i<fields.length; i++){
        if(i == fields.length-1){
            current_field = fields[i] + ' ';
            if(typeof(values[i]) === "string"){
                from += `${fields[i]}="${values[i]}";`;
            }
            else{
                from += `${fields[i]}=${values[i]};`;
            }
        }
        else{
            current_field = fields[i] + ',';
            if(typeof(values[i]) === "string"){
                from += `${fields[i]}="${values[i]}",`;
            }
            else{
                from += `${fields[i]}=${values[i]},`;
            }
        }
        select += current_field;
    }
}
