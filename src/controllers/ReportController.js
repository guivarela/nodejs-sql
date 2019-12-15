const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    // Encontrar todos os usuários que possuem emails terminados em @hotmail.com
    // Desses usuários eu quero buscar todos que moram na rua "Rua Oloco"
    // Desses usuários eu quero buscar as tecnologias que terminam com react

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@hotmail.com'
        }
      },
      include: [
        { association: 'addresses', where: { street: 'Rua Oloco' } },
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