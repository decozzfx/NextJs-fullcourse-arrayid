const knex = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USERNAME,
      password : `Nextjs123##`,
      database : process.env.DB_NAME
    }
  });

  export default knex