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

    return: string
        - SELECT campo_1, campo_2, ..., campo_n FROM user WHERE 
        campo_1="valor_1" AND campo_2="valor_2" AND ...
*/

// const query = (data) => {
//     let select = "SELECT register_id ";
//     let from = "FROM user WHERE ";
    
//     const fields = Object.keys(data);
//     const values = Object.values(data);

//     for(let j=0; j<fields.length; j++){
//         if(values[j]){
//             if(typeof(values[j]) === "string"){
//                 if(fields[j] === "name"){
//                     from += `${fields[j]} LIKE "%${values[j]}%"`;
//                 }
//                 else{
//                     from += `${fields[j]}="${values[j]}"`;
//                 }
//             }
//             else{
//                 from += `${fields[j]}=${values[j]}`;
//             }
//             if(j <= fields.length - 2) from += " AND ";
//             if(j == fields.length - 1) from += "; ";
//         }
//     }
//     return select + from;
// }
const query = (data) => {
    let select = "SELECT * FROM profile AS p INNER JOIN user AS u ON p.register_id=u.register_id ";
    let from = "WHERE ";
    
    const fields = Object.keys(data);
    const values = Object.values(data);

    for(let j=0; j<fields.length; j++){
        if(values[j]){
            if(typeof(values[j]) === "string"){
                if(fields[j] === "name"){
                    from += `u.${fields[j]} LIKE "%${values[j]}%"`;
                }
                else{
                    from += `u.${fields[j]}="${values[j]}"`;
                }
            }
            else{
                from += `u.${fields[j]}=${values[j]}`;
            }
            if(j <= fields.length - 2) from += " AND ";
            // if(j == fields.length - 1) from += "; ";
        }
    }
    return select + from;
}


module.exports = query;