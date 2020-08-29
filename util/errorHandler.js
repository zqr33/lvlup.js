module.exports = (err) => {
    if (err.response && err.response.status == 401) return new Error('Podano nieprawiłowy token')
    else return err
}