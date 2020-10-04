

function loadCountriesList() {
    const method = 'GET'
    const url = 'https://restcountries.eu/rest/v2/all'   
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
    .then( data =>  addCountriesToSelect(data))
    .catch (error => alert(error.message))
}

function addCountriesToSelect(data) {    
    let i = 0;
    const selectCountries = document.querySelector('#countries')
    country_to_add = document.createElement("option")
    country_to_add.text = "-- Select your country --"
    selectCountries.add(country_to_add, selectCountries[i])
    i++
    country_to_add = document.createElement("option")
    country_to_add.text = "--------------------"
    selectCountries.add(country_to_add, selectCountries[i])
    i++
    country_to_add = document.createElement("option")
    country_to_add.text = "Spain"
    selectCountries.add(country_to_add, selectCountries[i])
    i++
    country_to_add = document.createElement("option")
    country_to_add.text = "France"
    selectCountries.add(country_to_add, selectCountries[i])
    i++
    country_to_add = document.createElement("option")
    country_to_add.text = "--------------------"
    selectCountries.add(country_to_add, selectCountries[i])
    i++

    for(country of data){  
        country_to_add = document.createElement("option")
        if(country.name!=="Spain" && country.name !== "France") {
            country_to_add.text = country.name
            selectCountries.add(country_to_add, selectCountries[i])
            i++;
        }
    }

}
loadCountriesList();

function showProvinceForSpain(){
    const selectCountries = document.querySelector('#countries')
    const prov_elems = document.querySelectorAll('.provinces')
    if(selectCountries.options[selectCountries.selectedIndex].text=="Spain"){               
        for(item of prov_elems){            
            item.classList.remove("hidden")
        }
    }else{                
        for(item of prov_elems){            
            item.classList.add("hidden")
        }
    }
}