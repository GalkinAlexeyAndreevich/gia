const executeSql = async(string)=>{
	return new Promise(async(resolve, reject)=>{
		const result = await fetch('http://localhost:5755/executeSql',{
			method:'POST',
			headers: {
				"Content-Type": "application/json"
			},  
			body:JSON.stringify({
				sqlString:string,
			}) 
		})
		console.log(result);
		if (result.ok) {
			const data = await result.json();
			console.log(data);
			resolve({status:200,data})
		} else {
			console.error('Ошибка при получении данных:', result.status);
			resolve({status:500})
		}
	})
}
let userInfo = {}

function getElementOnClass(nameClass){
	const element = document.querySelector(`.${nameClass}`)
	console.log(element);
	return element
}

const registrationForm = document.forms.registrationForm
const authForm = document.forms.authForm

registrationForm.addEventListener('submit', async(e)=>{
	e.preventDefault()
  let loginInput = registrationForm.elements.login; 
	let passwordInput = registrationForm.elements.password; 
	if(!loginInput.value || !passwordInput.value){
		alert("Заполните логин и пароль")
		return
	}
	const answer = await executeSql(`
		insert into users(login, password, roleId) values
		('${loginInput.value.trim()}','${passwordInput.value.trim()}',1)
	`)
	console.log(answer);
	if(answer.status == 500){
		alert('Пользователь с таким логином уже существует')
	}else{
		alert('Пользователь успешно зарегистрирован')
		getWindowOnRole(answer.data.insertedId)
		loginInput.value = ''
		passwordInput.value = ''
	}
})

authForm.addEventListener('submit', async(e)=>{
	e.preventDefault()
  let loginInput = authForm.elements.login; 
	let passwordInput = authForm.elements.password; 
	if(!loginInput.value || !passwordInput.value){
		alert("Заполните логин и пароль")
		return
	}
	console.log(loginInput.value, passwordInput.value);
	const answer = await executeSql(`
		select id_user from users 
		where login='${loginInput.value.trim()}' and password='${passwordInput.value.trim()}'
	`)
	console.log(answer);
	if(answer.status == 200 && answer.data.length){
		alert('Вы успешно вошли в свой аккаунт')
		getWindowOnRole(answer.data[0].id_user)
		loginInput.value = ''
		passwordInput.value = ''
	}else{
		alert('Неверный логин или пароль')
	}
})

async function getWindowOnRole(userId){
	registrationForm.classList.add('hide')
	authForm.classList.add('hide')
	getElementOnClass('mainContent').classList.remove('hide')
	const user = await executeSql(`select id_user, login, role_id, phone from users where id_user = ${userId}`)
	if(user.status == 200 && user.data.length){
		userInfo = user.data[0]
		console.log(user.data, userInfo);
		getElementOnClass('loginUser').textContent = `Логин: ${userInfo.login}`
		getElementOnClass('roleUser').textContent = `Роль: ${getRoleNameOnId(userInfo.role_id)}`
		showWindowOnRole()
	}
}

getElementOnClass('exitBtn').addEventListener('click',()=>{
	userInfo = {}
	showWindowOnRole()
	getElementOnClass('mainContent').classList.add('hide')
	registrationForm.classList.remove('hide')
	authForm.classList.remove('hide')
})
function showWindowOnRole(){
	if(userInfo.role_id == 1){
		getElementOnClass('clientContainer').classList.remove('hide')
		getElementOnClass('workerContainer').classList.add('hide')
		getElementOnClass('managerContainer').classList.add('hide')
	}else if(userInfo.role_id == 2){
		getElementOnClass('clientContainer').classList.add('hide')
		getElementOnClass('workerContainer').classList.remove('hide')
		getElementOnClass('managerContainer').classList.add('hide')
	}else if(userInfo.role_id == 3){
		getElementOnClass('clientContainer').classList.add('hide')
		getElementOnClass('workerContainer').classList.add('hide')
		getElementOnClass('managerContainer').classList.remove('hide')
	}else{
		getElementOnClass('clientContainer').classList.add('hide')
		getElementOnClass('workerContainer').classList.add('hide')
		getElementOnClass('managerContainer').classList.add('hide')
	}
}
function getRoleNameOnId(id){
	if(id==1)return 'Пользователь'
	if(id==2)return 'Работник по починке'
	if(id==3)return 'Менеджер'
}
