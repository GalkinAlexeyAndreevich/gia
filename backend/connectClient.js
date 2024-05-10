import mysql2 from "mysql2/promise"
export async function connectClient(){
	const client = await mysql2.createConnection({
		host:'localhost',
		port:3306,
		database:'equipment_repair',
		password:'root',
		user:'root'
	})
	client.connect()
	return client
}