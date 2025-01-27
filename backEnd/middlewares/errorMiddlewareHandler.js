// const errorMiddlewareHandler = (err, req, res, next) => {
//     //  set status code 

//     const errroStatusCode = (res.statusCode === 200) ? 500 : res.StatusCode;

//     res.status(errroStatusCode);
//     res.json({
//         message: err.message,
//     });

// };

// module.exports = { errorMiddlewareHandler };



const errorMiddlewareHandler = (err, req, res, next) => {
    // Set status code correctly
    const errorStatusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(errorStatusCode).json({
        message: err.message || 'Something went wrong',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null  // Helpful for debugging
    });
};

module.exports = { errorMiddlewareHandler };
