import Sequelize from 'sequelize'

export default {
  name: 'event',
  props: {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    type: Sequelize.STRING,
    externalId: Sequelize.STRING,
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    location: Sequelize.STRING
  }
}
