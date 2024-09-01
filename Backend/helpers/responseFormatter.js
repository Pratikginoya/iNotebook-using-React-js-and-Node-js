const formatResponse = (res, success, statusCode, message, data = []) => {
    return res.status(statusCode).json({
        success: success,
        statusCode: statusCode,
        message: message,
        data: data,
    });
};

module.exports = formatResponse;