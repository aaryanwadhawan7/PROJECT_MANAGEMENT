
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch (next);
}

// if promise is not resolve then it will move to catch fn