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

const query = (data) => {
    let select = "SELECT * FROM profile AS p INNER JOIN user AS u ON p.register_id=u.register_id ";
    let from = "WHERE ";
    let topics = "INNER JOIN topics_of_interest_profile AS tip ON p.register_id=tip.profile_id "
    let hasTopics = false;
    
    const fields = Object.keys(data);
    const values = Object.values(data);

    for(let j=0; j<fields.length; j++){
        if(typeof(values[j]) === "string" && fields[j] !== "interest"){
            if(fields[j] === "name"){
                from += `u.${fields[j]} LIKE "%${values[j]}%"`;
            }
            else{
                from += `u.${fields[j]}="${values[j]}"`;
            }
        }
        else if(fields[j] === "interest"){
            from += `tip.topic_id=${values[j]} `;
            hasTopics = !hasTopics;
        }
        else{
            from += `u.${fields[j]}=${values[j]}`;
        }
        if(j <= fields.length - 2) from += " AND ";
    }
    return hasTopics ? select + topics + from : select + from;
}

const countQuery = (data) => {
    return data
        .replace("SELECT * FROM ", "SELECT COUNT(*) AS c FROM ")
        .split("LIMIT")[0];
}


module.exports = { query, countQuery };