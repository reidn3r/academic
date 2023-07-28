
const registerUser = (req, res) => {
    const data = req.body;

    console.log(data);
    res.json(data);
    //validar cpf, data de nascimento, universidade, cidade, estado
}

module.exports = registerUser;