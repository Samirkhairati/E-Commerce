const asyncHandler = (givenFunction, customError) => {
    return async (req, res, next)=> {
        try {
            await givenFunction(req, res, next);
            console.log("successful")
        } catch (error) {
            if (customError === undefined) {
                //res.send(error.message)
                console.log(RED,`@asyncHandler error: ${error.message}`);
            } else {
                res.send(customError + error.message)
                console.log(RED, `@asyncHandler error: ${customError + error.message}`);
            }
        }
    };
};
const RED = '\x1b[31m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';
const YELLOW = '\x1b[33m%s\x1b[0m';
const BLUE = '\x1b[34m%s\x1b[0m';

export default asyncHandler;