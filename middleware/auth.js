module.exports = (req, res, next) => {
    if (!req.session.persona) {
        return res.json({ msg: 'no estas en sesion' })    //sin el return nos tira un error de encabezado ya que confunde los res
    } else {
        next()  //si existe puedo continuar
    }
}