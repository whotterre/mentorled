import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres', // or 'mysql'
    models: [Task, User]
  });
  

  export default sequelize

  