import { CoffeeRefactor1740561468269 } from 'src/migrations/1740561468269-CoffeeRefactor'
import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [],
  migrations: [CoffeeRefactor1740561468269],
})
