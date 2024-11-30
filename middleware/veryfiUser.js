const veryfiUser = (req,res,next) =>{
    if(req.role !== 'user'){
        res.status(404).send({ succss : false , message: "You ar not authorized to prefrom this actions" });
    }

    next();
}

module.exports = veryfiUser;