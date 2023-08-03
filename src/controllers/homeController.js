const homeController = (req, res) => {
    res.status(200).json({message: 'main'});
}

module.exports = homeController;