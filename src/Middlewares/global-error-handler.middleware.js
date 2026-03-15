import envConfig from "../config/env.config.js";

/** 
@param {Error} err
@param {Object} req
@param {Object} res
@param {Function} next
*/

const globalErrorHandler = (err,req,res,next) => {
    console.log(err);

    res.status(err?.cause?.status || 500).json ({
        message: err.message || 'Internal Server Error',
        stack: envConfig.app.NODE_ENV =='dev' ? err.stack : undefined 
    })
}

export default globalErrorHandler;