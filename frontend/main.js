const fetchData = async()=>{
	const result = await fetch('http://localhost:5000/users/getUsers')
	const data = await result.json()
	console.log(data);
}
// fetchData()

const fetchDataOnString = async()=>{
	const result = await fetch('http://localhost:5000/executeSql',{
		method:'POST',
		headers: {
			"Content-Type": "application/json"
		},  
		body:JSON.stringify({
			sqlString:`select * from users where id_user=${1}`,
		}) 
	})
	console.log(result.body);
	if (result.ok) {
    const data = await result.json();
    console.log(data);
  } else {
    console.error('Ошибка при получении данных:', result.status);
  }
}

fetchDataOnString()