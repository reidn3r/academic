const homeController = (req, res, next) => {
    res.status(200).json({message: 'main'});
}

module.exports = homeController;