export default ({message, status}) =>{
    const err = new Error();
    err.message = message;
    err.statusCode = status;
    return err;
};