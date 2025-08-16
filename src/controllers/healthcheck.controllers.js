import { ApiResponse } from "../utils/api-response.js";

const healthCheck = (req, res, next) => {
    try {
        res.status(200).json(new ApiResponse(200, {message : "Server is running!"}))
    } catch (err) {
        next (err);
    }
}

export { healthCheck };
