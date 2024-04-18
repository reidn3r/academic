const stateModel = require('../../models/State_Info');

const findStateByName = async(stateInput) => {
    const foundState = await stateModel.findOne({where: {state_name: stateInput}});
    return foundState;
}

module.exports = findStateByName;