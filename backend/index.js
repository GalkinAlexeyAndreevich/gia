import express from "express"
import cors from "cors"
import mysql2 from "mysql2/promise"

const app = express()
const port = process.env.PORT || 5755 

app.use(cors())
app.use(express.json())

export async function connectClient(){
	const client = await mysql2.createConnection({
		host:'localhost',
		port:3306,
		database:'mygia1',
		password:'root',
		user:'root'
	})
	client.connect()
	return client
}

app.post("/executeSql", async(req,res)=>{
	const {sqlString} = req.body 
	const client = await connectClient()
	try{
		const result = await client.execute(sqlString)
		console.log(result[0]);
		res.json(result[0])
	}catch(e){
		console.log("Прозошла ошибка", e);
		res.sendStatus(500)
	}finally{
		client.end()
	}

});

app.listen(port,()=>{
	console.log("Все круто работает на порту ", port);
})

