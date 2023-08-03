const sequelize = require('../config/dbConfig');


const locationValidation = async(cityInput, stateId) =>{
    const [results, metadata] = await sequelize.query(`SELECT * FROM city_info WHERE city_name LIKE '${cityInput}' AND state_id = ${stateId} LIMIT 1`);
    if(results.length == 0) return res.status(404).json({message: "Insira uma cidáde válida"});

    return results.length > 0 ? results[0] : null;
}


module.exports = locationValidation;