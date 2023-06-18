import ErrorResponse from "../utils/errorResponse.utils.js";

const errorHandler = (err, req, res, next) => {
    let error = { ...err }; // spread the error 

    error.message = err.message; // set error message 

    // errors 
    // Mongoose error : cast error 
    if (err.name === 'CastError') {
        const message = `Resource not found with id : ${err.value}`;
        error = new ErrorResponse(message, 404) // page not found
    }

    // Mongoose error : duplicate keys
    if (err.code === 11000) {
        const message = "Duplicate Fields are found, user already exists."
        error = new ErrorResponse(message, 400) // bad request 
    }

    // Mongoose errro : validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400) // bad request
    }

    res.status(error.statusCode || 500).json({ succes: false, error: error.message || "Item not found / server error" })
}

export default errorHandler;