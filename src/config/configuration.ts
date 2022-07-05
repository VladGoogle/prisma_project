export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    host: process.env.DATABASE_HOST,
    password: process.env.POSTGRES_PASSWORD,
    user:process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});