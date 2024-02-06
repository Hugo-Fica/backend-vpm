import { Sequelize } from 'sequelize'

const db = new Sequelize(
  'railway',
  'root',
  'CGA4aEEDC-ahg3ge2C3daA-Dfc2-4Cgd',
  {
    host: 'viaduct.proxy.rlwy.net',
    port: '10542',
    dialect: 'mysql'
  }
)

export default db
