# FrontFilm  

## Páginas principales:  

### Bienvenida  /index.html  
- Muestra un breve mensaje de bienvenida y 2 enlaces. Uno al login y otro a la página de registro    
  
### Registro  /singup.html  
- Muestra el formulario de registro.   
- El campo de Provincia solo aparece si se selecciona Spain en el campo de Pais.  
- Los datos se guardan en users dentro del localStorage  

### Login  /login.html  
- Muestra un formulario de login y tiene oculto una caja para mostrar errores.  
- Comprueba el usuario y pass introcudido contra todos los usuarios almacenados en el localStorage.   
- Si no coincide con ningún usuario, muestra error "Usuario no encontrado"  
- Si encuentra un usuario coincidente pero la contraseña no coincide muestra error "Contraseña incorrecta"  
- Si el usuario y contraseña coinciden, muestra mensaje en verde con los datos de la sesión. Además, almacena en el localStorage el usuario activo en "active_user"
  
### Consulta de películas  /films.html
- Muestra el nombre y token del usuario activo.
- Muestra un input para buscar por keyword en la base de datos de películas.
- Una vez buscado, se muestra el número de resultados y el número de páginas.
- Se diseña la UI de la paginación
- Los resultados cargan en formato texto. Título y descripción de la película.
  
### Detalle de pelicula  /film.html?id=123456  
- Muestra una página sencilla con los detalles de la película con ID parado por URI  
- Se pasa el ID de la pelicula por parametro en la URI  
- Se carga una nueva petición a la API con el ID de la pelicula y se obtienen los detalles  
- Se añade el HTML a la vista con los datos más relevantes de la película  
- Se añade enlace para volver a Buscar   
