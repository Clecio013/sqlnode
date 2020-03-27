const { Op } = require('sequelize')
const User = require('../models/User')

module.exports = {
  async show (req, res) {
    // Encontrar todos usuario que tem email que termina com @rocketseat.com;
    // desses usuarios eu quero buscar todos que moram na rua "Rua guilherme bembala"
    // Desses usuarios eu quero buscar as tecnologias que começam com react

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@rocketseat.com.br'
        }
      },
      include: [
        { association: 'addresses', where: { street: 'Rua Guilherme Gembala' } },
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.iLike]: 'React%'
            }
          }
        }
      ]
    })

    return res.json(users)
  }
}
