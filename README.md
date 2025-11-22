# Documentación API

Bienvenido a la Api. Aquí encontraras como usar los endpoints.
Todas las consultas comienzan con (https://museo-dwgk.onrender.com/api/museorijks)

# API KEY

Para poder usar la api del museo,deberá solicitar una api key atraves de la pagina (https://museo-dwgk.onrender.com), mediante correo y nombre completo, luego de la solicitud se dará una api-key que debe guardar, y esperar que se apruebe la solicitud.

## Documentación

Tambien Puedes acceder a la documentación interactiva en:
https://museo-dwgk.onrender.com

#### 🔸 Parámetros de consulta.

| Parámetro | Formato | Requerido | Por defecto | Descripción                        |
| --------- | ------- | --------- | ----------- | ---------------------------------- |
| `key`     | a-z 0-9 | SI        | -           | Obligatorio                        |
| `pagina`  | 0-n     | No        | `1`         | La página de resultados solicitada |
| `limite`  | 0-n     | No        | `20`        | Cantidad de elementos por página   |

Estos parametros de paginacion se pueden usar en las rutas get:

- https://museo-dwgk.onrender.com/api/museorijks/artista
- https://museo-dwgk.onrender.com/api/museorijks/artistas
- https://museo-dwgk.onrender.com/api/museorijks/obras/coleccion

## Ejemplos de uso

- `GET https://museo-dwgk.onrender.com/api/museorijks/obras/coleccion`  
  Devuelve la primera página con 20 resultados (valores por defecto).

- `GET https://museo-dwgk.onrender.com/api/museorijks/obras/coleccion?pagina=2`  
  Devuelve la segunda página con 20 resultados.

- `GET https://museo-dwgk.onrender.com/api/museorijks/obras/coleccion?pagina=1&limite=5`  
  Devuelve la primera página con solo 5 resultados por página.

## GET

Recupera una lista de los Artistas, de los que se tienen obras en exposicion.
Ejemplo: GET https://museo-dwgk.onrender.com/api/museorijks/artistas
Respuesta:

```json
{
	"status": "success",
	"message": "Listado de Autores recuperado Exitosamente.",
	"paginacion": {
		"resultadoTotal": 17,
		"paginaActual": 1,
		"limite": 20,
		"paginasTotales": 1
	},
	"data": [
		{
			"IdPrincipalMaker": 1,
			"name": "Rembrandt van Rijn",
			"placeOfBirth": "Leiden",
			"dateOfBirth": "1606-07-15",
			"dateOfDeath": "1669-10-08",
			"placeOfDeath": "Ámsterdam",
			"nationality": "Holandés del Norte",
			"occupations": ["dibujante", "grabador", "pintor"]
		},
		{
			"IdPrincipalMaker": 2,
			"name": "Vincent van Gogh",
			"placeOfBirth": "Groot Zundert",
			"dateOfBirth": "1853-03-30",
			"dateOfDeath": "1890-07-29",
			"placeOfDeath": "Auvers-sur-Oise",
			"nationality": "Holandés",
			"occupations": ["dibujante", "grabador", "pintor"]
		}
	]
}
```

## POST

Crear un nuevo artista
Ejemplo: POST https://museo-dwgk.onrender.com/api/museorijks/artista

Curpo de la Peticion:

```
{
  "name": "Mauricio Silva",
  "placeOfBirth": "Bahia Blanca",
  "dateOfBirth": "1991",
  "dateOfDeath": "",
  "placeOfDeath": "",
  "nationality": "Argentina",
  "occupations": [1]
}
```

Respuesta:

```
{
    "status": "success",
    "message": "Artista cargado Exitosamente",
    "data": {
        "idprincipalmaker": 38,
        "name": "Mauricio Silva",
        "placeofbirth": "Bahia Blanca",
        "dateofbirth": "1991",
        "dateofdeath": "",
        "placeofdeath": "",
        "nationality": "Argentina",
        "occupations": [
            {
                "idOccupation": null,
                "name": null
            }
        ]
    }
}
```

## PUT

Actualizar los datos del artista.El identificador unico del artista es requerido en la ruta.
Ejemplo: PUT https://museo-dwgk.onrender.com/api/museorijks/artista/{idArtista}

Curpo de la Peticion:

```
{
    "name": "Mauricio Nicolás Silva",
    "placeOfBirth": "Amsterdam",
    "dateOfBirth": "1585",
    "dateOfDeath": "1634",
    "placeOfDeath": "Kampen",
    "nationality": "Holandes",
    "occupations": [1]
}
```

Respuesta:

```
{
    "status": "success",
    "mensaje": "artista actualizado Correctamente",
    "data": {
        "idprincipalmaker": 25,
        "name": "Mauricio Nicolás Silva",
        "placeofbirth": "Amsterdam",
        "dateofbirth": "1585",
        "dateofdeath": "1634",
        "placeofdeath": "Kampen",
        "nationality": "Holandes",
        "occupations": [
            {
                "idOccupation": 1,
                "name": "grabador"
            }
        ]
    }
}
```

## DELETE

Eliminar un artista de la base de datos.El identificador unico del artista es requerido en la ruta.
Ejemplo: DELETE https://museo-dwgk.onrender.com/api/museorijks/artista/{idArtista}

Curpo de la Peticion: No se requiere cuerpo en la peticion delete

Respuesta:

```
{
    "status": "success",
    "mensaje": "Artista eliminado correctamente.",
    "data": {
        "idprincipalmaker": 13,
        "name": "Hendrick Avercamp",
        "placeofbirth": "Amsterdam",
        "dateofbirth": "1585",
        "dateofdeath": "1634",
        "placeofdeath": "Kampen",
        "nationality": null
    }
}
```

# Rutas Adicionales

GET

> https://museo-dwgk.onrender.com/api/museorijks/obras/coleccion
>
> - Obtiene la coleccion de obras completa.

> https://museo-dwgk.onrender.com/api/museorijks/obras/{idObra}
>
> - Obtiene los de una obra en particualar, se requiere el identificador unico en la ruta.

> https://museo-dwgk.onrender.com/api/museorijks/obras/coleccion
>
> - Obtiene la coleccion de obras completa.

POST

> https://museo-dwgk.onrender.com/api/museorijks/obra
>
> - Crear una nueva obra en la base de datos

PUT

> https://museo-dwgk.onrender.com/api/museorijks/obra/{idObra}
>
> - Actualizar una nueva obra en la base de datos, se requiere el identificador unico en la base de datos.

PATCH

> https://museo-dwgk.onrender.com/api/museorijks/obra/{idObra}
>
> - Actualizar parcialmenbte una nueva obra en la base de datos, se requiere el identificador unico en la base de datos.

> > Mas informacion en https://museo-dwgk.onrender.com
