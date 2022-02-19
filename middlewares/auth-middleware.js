const CustomError = require('../middlewares/custom-error')
const DatabaseFunc = require('../helpers/crud')
const JwtService = require('../helpers/auth')

const Crud = new DatabaseFunc()

async function getAccount (id) {
    let result
    result = await Crud.findOne('User',{id: id})
    if(!result) {
       return null
    };
    return result
}


function getTokenFromHeaders (req){
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1]; 
    }
    return null;
}

let requestOption = {
    issuer: 'POS',
    audience: 'POS'
}

const authenticate = async (req, res, next) => {
    try {
        var payload = {}
        var token = getTokenFromHeaders(req)
        var paths = req.originalUrl.split('/')
    
        if(token === null) {
            throw new CustomError({statusCode: 401, message: 'access denied'}, res)
        }
    
        payload = JwtService.verify(token, requestOption)
        if(payload === false) {
            throw new CustomError({statusCode: 401, message: 'access denied'}, res)
        }
       
        next()   
    } catch (error) {
        res.status(401).json({status: "error", message: 'session expired or access denied'
        });
    }
}
module.exports.auth = authenticate  