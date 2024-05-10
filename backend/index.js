import express from "express"
import cors from "cors"
import { usersRouter } from "./routes/users.js"
import { connectClient } from "./connectClient.js"

const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())
app.use("/users", usersRouter);

app.post("/executeSql", async(req,res)=>{
	const {sqlString} = req.body 
	const client = await connectClient()
	try{
		const result = await client.execute(sqlString)
		console.log(result[0]);
		res.json(result[0])
	}finally{
		client.end()
	}

});

app.listen(port,()=>{
	console.log("Все круто работает на порту ", port);
})

