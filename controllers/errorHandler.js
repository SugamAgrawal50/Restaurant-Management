const errorHandler = (req, res) => {
    res.json({"error":"API Not Found"})
}

module.exports = {errorHandler}