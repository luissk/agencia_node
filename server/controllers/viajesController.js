const Viaje = require('../models/Viajes')

exports.mostrarViajes = async (req, res) => {
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    })

    /*Viaje.findAll()
        .then(viajes => res.render('viajes', {
            pagina: 'Próximos viajes',
            viajes
        }))
        .catch(err => console.log(err))
    */
}

exports.mostrarViaje = async (req, res) => {
    const viaje = await Viaje.findByPk(req.params.id)
    res.render('viaje', {
        viaje
    })
}