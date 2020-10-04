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

    const searchButton =  document.querySelector('#query_button')    
    if(searchButton){
        searchButton.addEventListener('click', onClickSearch)
        const active_user = window.localStorage.getItem(activeUserLocalStorage) ?
        JSON.parse(window.localStorage.getItem(activeUserLocalStorage)) : undefined
        let token = ""
        let user = ""
        if(active_user){
            token = active_user.token
            user = active_user.usuario
            document.querySelector('#display_user').innerHTML = `<b>${user}</b>`
            document.querySelector('#display_token').innerHTML = `<b>${token}</b>`
        }
         
    }

    const filmBox =  document.querySelector('#film_box')    
    if(filmBox){
        loadFilmData()
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
        const error_box =  document.querySelector('#error_box')
        const error_text_elem =  document.querySelector('#error_text')
        const loginForm = document.querySelector('#login_form')
        const users = window.localStorage.getItem(usersLocalStorage) ?
        JSON.parse(window.localStorage.getItem(usersLocalStorage)) : []
        let username = loginForm.querySelector('input[name="username"]').value;        
        let password = loginForm.querySelector('input[name="password"]').value;        
        for(let user of users){            
            if(username === user.usuario){
                if(password === user.password){
                    user.token = generateToken(user)
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

    function loadFilmData(){
        const active_user = window.localStorage.getItem(activeUserLocalStorage) ?
        JSON.parse(window.localStorage.getItem(activeUserLocalStorage)) : undefined

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        console.log(id);

        const method = 'GET'
        let token = ""
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${active_user.apikey}&language=en-US`   
        // https://restcountries.eu/rest/v2/name/{}
        /* const http = new XMLHttpRequest()
        console.log(http)
        http.onreadystatechange = ajaxCallback
        http.addEventListener('readystatechange', ajaxCallback)
        http.open(method, url)
        http.send(null) */

        // fetch
        // axios

        fetch(url)
        .then( resp => {
            console.log(resp)
            if (resp.status < 200 || resp.status >= 300) {
                console.log(resp.statusText)
                throw new Error('HTTP Error ' + resp.status)
            }
            return resp.json()
        })
        .then( data =>  processFilmResult(data))
        .catch (error => alert(error.message))  
    }

    function processFilmResult(data){
        const film_details_box = document.querySelector("#film_details")
        let film_details_html = `<h3>${data.original_title}</h3>`
        film_details_html = `${film_details_html}<b>Puntuación: ${data.popularity}</b><br><br>`
        film_details_html = `${film_details_html}Sinopsis:<br>${data.overview}<br><br>`
        film_details_html = `${film_details_html}Fecha de lanzamiento: ${data.release_date}<br>`
        film_details_html = `${film_details_html}Duración ${data.runtime} minutos<br>`
        film_details_html = `${film_details_html}Idioma original: ${data.original_language}<br><br>`   
        film_details_box.innerHTML = film_details_html    
    }

    function onClickSearch() {
        console.log(window.localStorage)
        const active_user = window.localStorage.getItem(activeUserLocalStorage) ?
        JSON.parse(window.localStorage.getItem(activeUserLocalStorage)) : undefined
        
        let query = encodeURIComponent(document.querySelector('input[name="query"]').value) 

        const method = 'GET'
        let token = ""
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${active_user.apikey}&language=en-US&query=${query}&page=1&include_adult=false`   
        // https://restcountries.eu/rest/v2/name/{}
        /* const http = new XMLHttpRequest()
        console.log(http)
        http.onreadystatechange = ajaxCallback
        http.addEventListener('readystatechange', ajaxCallback)
        http.open(method, url)
        http.send(null) */

        // fetch
        // axios

        fetch(url)
        .then( resp => {
            console.log(resp)
            if (resp.status < 200 || resp.status >= 300) {
                console.log(resp.statusText)
                throw new Error('HTTP Error ' + resp.status)
            }
            return resp.json()
        })
        .then( data =>  processResults(data))
        .catch (error => alert(error.message))   

    }

    function processResults(data){
        console.log(data)
        const results_box = document.querySelector('#results')
        results_box.innerHTML = ""
        const page = data.page
        const results = data.total_results
        const total_pages = data.total_pages
        let i=1
        for(let result of data.results){            
            let pelicula = document.createElement("div")
            pelicula.innerHTML += `${i} -- <br><b><a href="film.html?id=${result.id}">${result.original_title}</a></b><br><br>${result.overview}<br><br><br>`
            i++
            results_box.appendChild(pelicula)
        }
        results_box.innerHTML=`[${results} resultados] -- Página ${page} de ${total_pages}<br><br><a href="#"><- Pagina Anterior</a> || <a href="#">Página Siguiente -></a><br><br>${results_box.innerHTML}<br> [${results} resultados] -- Página ${page} de ${total_pages}<br><br><a href="#"><- Pagina Anterior</a> || <a href="#">Página Siguiente -></a>`
    }

    function generateToken(user){
        const method = 'GET'
        let token = ""
        const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${user.apikey}`   
        // https://restcountries.eu/rest/v2/name/{}
        /* const http = new XMLHttpRequest()
        console.log(http)
        http.onreadystatechange = ajaxCallback
        http.addEventListener('readystatechange', ajaxCallback)
        http.open(method, url)
        http.send(null) */

        // fetch
        // axios

        fetch(url)
        .then( resp => {
            console.log(resp)
            if (resp.status < 200 || resp.status >= 300) {
                console.log(resp.statusText)
                throw new Error('HTTP Error ' + resp.status)
            }
            return resp.json()
        })
        .then( data =>  processToken(data, user))
        .catch (error => alert(error.message))        
        
    }

    function processToken(data, user){
        const error_box =  document.querySelector('#error_box')
        const error_text_elem =  document.querySelector('#error_text')
        user.token = data.request_token
        window.localStorage.setItem(activeUserLocalStorage, JSON.stringify(user))
        console.log(window.localStorage)
        console.log(data)
        error_text_elem.innerHTML = `Login correcto.<br><br>Token Created: ${data.success}<br>Token: ${data.request_token}<br>Expires at: ${data.expires_at}<br><br>Usuario activo: <b>${user.usuario}</b> -> <a href="films.html"> Consultar Peliculas </a>`
        error_box.classList.remove("hidden")  
        error_box.classList.remove("error")
        error_box.classList.add("ok")
    }

    
}

document.addEventListener('DOMContentLoaded', main)