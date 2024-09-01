const jwt = require('jsonwebtoken');

const JWT_SECRETS = "HelloIamPratik$"

const fetchuser =(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Unauthorized user"});
    }

    try{
        const data = jwt.verify(token, JWT_SECRETS);
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({error:"Unauthorized user"});
    }
}

module.exports = fetchuser;