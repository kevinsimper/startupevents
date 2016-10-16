import Sequelize from 'sequelize'

export default {
  name: 'user',
  props: {
    email: Sequelize.STRING,
    facebookId: Sequelize.STRING,
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }
}
