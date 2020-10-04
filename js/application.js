function main(){
    console.log("APP INIT")
    
    const usersLocalStorage = "users"
    const activeUserLocalStorage = "active_user"
    //eliminar para almacenar varios
    //window.localStorage.setItem(usersLocalStorage, "[]")
    
    const singupButton =  document.querySelector('#singup_button')
    if(singupButton){
        singupButton.addEventListener('click', onClickSingUp)
    }

    const loginButton =  document.querySelector('#login_button')    
    if(loginButton){
        loginButton.addEventListener('click', onClickLogin)
    }

    function onClickSingUp() {
        const singupForm = document.querySelector('#singup_form')
        const inputs = [...singupForm.querySelectorAll('input')]
        const textareas = [...singupForm.querySelectorAll('textarea')]
        const selects = [...singupForm.querySelectorAll('select')]
        let genero = ""

        if(inputs[0].checked){
            genero = "male"
        }else if(inputs[1].checked){
            genero = "female"
        }else if(inputs[2].checked){
            genero = "other"
        }
      

        for(let item of inputs){
            console.log(item.name)
        }

        console.log(inputs)
        console.log(textareas)
        console.log(selects)
        const user_data = {
            genero : genero,    
            nombre : inputs[3].value,
            apellido : inputs[4].value,
            pais : "a",
            provincia : "a",
            telefono : inputs[5].value,
            email : inputs[6].value,
            usuario : inputs[7].value,
            password : inputs[8].value,
            apikey : inputs[10].value
        }
        const users = window.localStorage.getItem(usersLocalStorage) ?
        JSON.parse(window.localStorage.getItem(usersLocalStorage)) : []
        users.push(user_data)
        window.localStorage.setItem(usersLocalStorage, JSON.stringify(users))
        console.log(window.localStorage)    
    }

    function onClickLogin() {
        console.log("usesss")
        const error_box =  document.querySelector('#error_box')
        const error_text_elem =  document.querySelector('#error_text')
        const loginForm = document.querySelector('#login_form')
        const users = window.localStorage.getItem(usersLocalStorage) ?
        JSON.parse(window.localStorage.getItem(usersLocalStorage)) : []
        let username = loginForm.querySelector('input[name="username"]').value;        
        let password = loginForm.querySelector('input[name="password"]').value;        
        for(let user of users){
            console.log(user)
            if(username === user.usuario){
                if(password === user.password){
                    window.localStorage.setItem(activeUserLocalStorage, JSON.stringify(user))
                    console.log(window.localStorage)
                    error_text_elem.innerHTML = `Login correcto. Usuario activo: <b>${username}</b> -> <a href="films.html"> Consultar Peliculas </a>`
                    error_box.classList.remove("hidden")  
                    error_box.classList.remove("error")
                    error_box.classList.add("ok")
                }else{
                    error_text_elem.innerHTML = "Contraseña incorrecta"
                    error_box.classList.remove("hidden")
                    error_box.classList.remove("ok")
                    error_box.classList.add("error")
                    //Contraseña incorrecta
                }
            }else{
                error_text_elem.innerHTML = "Usuario no encontrado"
                error_box.classList.remove("hidden")
                error_box.classList.remove("ok")
                error_box.classList.add("error")
                //No se encuentra el usuario
            }
        }
    }

    
}

document.addEventListener('DOMContentLoaded', main)