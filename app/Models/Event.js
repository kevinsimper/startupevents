import Sequelize from 'sequelize'

export default {
  name: 'event',
  props: {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    type: Sequelize.STRING,
    externalId: Sequelize.STRING,
    start: Sequelize.DATE,
    end: Sequelize.DATE,
    location: Sequelize.STRING
  }
}
