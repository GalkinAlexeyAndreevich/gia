import { connectClient } from "../connectClient.js";

export const getUsers = async(req,res)=>{
	const client = await connectClient()
	const data = await client.execute('select * from users')
	console.log(data);
	client.end()
	res.json(data[0])
}

export const getUsersOnRole = async(req,res)=>{
	const {roleId} = req.params
	const client = await connectClient()
	const data = await client.execute('select * from users where role_id=?',[roleId])
	console.log(data);
	client.end()
	res.json(data[0])
}

export const getUsersOnId = async(req,res)=>{
	const {userId} = req.params
	const client = await connectClient()
	const data = await client.execute('select * from users where id_user=?',[userId])
	console.log(data);
	client.end()
	res.json(data[0])
}

export const createUser = async(req,res)=>{
	const {login, password} = req.body
	const client = await connectClient()
	const result = await client.execute('insert into users(login,password) values(?,?)',[login, password])
	client.end()
	res.json(result[0])
}

export const login = async(req,res)=>{
	const {login, password} = req.body
	const client = await connectClient()
	const result = await client.execute('select from users where login=? and password=?',[login, password])
	client.end()
	res.json(result[0])
}

