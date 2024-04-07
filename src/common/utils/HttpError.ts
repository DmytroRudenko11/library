import { CustomError } from "../interfaces";

const errorMessage = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
    500: "Internal server error"
};



export const HttpError = (status, message = errorMessage[status]) => {
    const error: CustomError = new Error(message);
    error.status = status;
    return error;
};
