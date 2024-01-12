const AUTHKEY = "Sugam"

const auth = (req,res,next) => {
    try {
        if (req.headers.authorization === AUTHKEY){
            next();
        } else {
            res.status(401).json({"error":"Auth key Invalid"})
        }
    } catch {
        res.status(401).json(
            {error : new Error('Invalid Request')}
        )
    }
}

module.exports = auth