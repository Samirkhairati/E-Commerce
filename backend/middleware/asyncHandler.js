const asyncHandler = (givenFunction) => {
    return async (req, res, next) => {
        try {
            await givenFunction(req, res, next);
        } catch (error) {
            console.log(`asyncHandler error: ${error.message}`);
        }
    };
};

export default asyncHandler;