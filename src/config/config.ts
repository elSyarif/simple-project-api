export default() => ({
	PORT: parseInt(process.env.PORT, 10) || 3000,
	DATABASE: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	}
})
