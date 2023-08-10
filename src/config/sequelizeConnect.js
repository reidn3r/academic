const db = require('./sequelizeConfig');

const dbConnect = async(app) => {
    try{
        await db.authenticate();
        console.log(`sequelize connected at PORT: ${process.env.db_port}`);
    }
    catch(err){
        console.log(err)
        db.close();
    }
}

module.exports = dbConnect;