##Documentación API
Bienvenido a la Api. Aquí encontraras como usar los endpoints. Api de consulta RIJKS DATA
Todas las consultas comienzan con museorijks.onrender.com/api/MuseoRijks

### 📘 Endpoint: `GET /coleccion`

Obtiene una colección de obras de arte con paginación.

#### 🔸 Parámetros de consulta (`query`):

| Parámetro | Formato | Requerido | Por defecto | Descripción                         |
| --------- | ------- | --------- | ----------- | ----------------------------------- |
| `key`     | a-z 0-9 | SI        | -           | Obligatorio                         |
| `pagina`  | 0-n     | No        | `1`         | Número de página para la paginación |
| `limite`  | 0-n     | No        | `20`        | Cantidad de elementos por página    |

## Ejemplos de uso

- `GET http://localhost:8080/api/museorijks/obras/coleccion`  
  Devuelve la primera página con 20 resultados (valores por defecto).

- `GET http://localhost:8080/api/museorijks/obras/coleccion?pagina=2`  
  Devuelve la segunda página con 20 resultados.

- `GET http://localhost:8080/api/museorijks/obras/coleccion?pagina=1&limite=5`  
  Devuelve la primera página con solo 5 resultados por página.

##GET museorijks.onrender.com/api/museorijks/artistas

Recupera una lista de los Artistas, de los que se tienen obras en exposicion.
Ejemplo: GET museorijks.onrender.com/api/museorijks/artistas
Respuesta:

```json
{
	"status": "success",
	"message": "Listado de Autores recuperado Exitosamente.",
	"paginacion": {
		"resultadoTotal": 13,
		"paginaActual": 1,
		"limite": 20,
		"paginasTotales": 1
	},
	"data": [
		{
			"idprincipalmaker": 1,
			"name": "Rembrandt van Rijn",
			"placeofbirth": "Leiden",
			"dateofbirth": "1606-07-15",
			"dateofdeath": "1669-10-08",
			"placeofdeath": "Ámsterdam",
			"nationality": "Holandés del Norte",
			"occupations": ["dibujante", "grabador", "pintor"]
		},
		{
			"idprincipalmaker": 2,
			"name": "Vincent van Gogh",
			"placeofbirth": "Groot Zundert",
			"dateofbirth": "1853-03-30",
			"dateofdeath": "1890-07-29",
			"placeofdeath": "Auvers-sur-Oise",
			"nationality": "Holandés",
			"occupations": ["dibujante", "grabador", "pintor"]
		},
		{
			"idprincipalmaker": 3,
			"name": "Cornelis Cornelisz. van Haarlem",
			"placeofbirth": "Haarlem",
			"dateofbirth": "1562",
			"dateofdeath": "1638-11-11",
			"placeofdeath": "Haarlem",
			"nationality": "Holandés del Norte",
			"occupations": ["dibujante", "pintor"]
		}
	]
}
```

##GET museorijks.onrender.com/api/museorijks/obras/artista

Recupera Todas las obras de un Artista en particular. Utilizando el parametro de consulta nombre.
Ejemplo: GET museorijks.onrender.com/api/museorijks/obras/artista?nombre=Rembrandt+van+Rijn
Respuesta:

```json
{
	"status": "success",
	"mensaje": "Colección de obras de arte recuperada exitosamente.",
	"paginacion": {
		"resultadoTotal": 5,
		"paginaActual": 1,
		"limite": 2,
		"paginasTotales": 3
	},
	"hayResultado": true,
	"data": [
		{
			"objectnumber": "SK-C-597",
			"title": "Retrato de una Mujer, Probablemente Maria Trip (1619-1683)",
			"hasimage": true,
			"principalOrFirstMaker": "Rembrandt van Rijn",
			"longtitle": "Retrato de una Mujer, Probablemente Maria Trip (1619-1683), Rembrandt van Rijn, 1639",
			"webImage": {
				"width": 4351,
				"height": 5754,
				"url": "https://lh3.googleusercontent.com/AyiKhdEWJ7XmtPXQbRg_kWqKn6mCV07bsuUB01hJHjVVP-ZQFmzjTWt7JIWiQFZbb9l5tKFhVOspmco4lMwqwWImfgg=s0"
			}
		},
		{
			"objectnumber": "SK-C-216",
			"title": "Isaac y Rebeca, Conocidos como \"La Novia Judía\"",
			"hasimage": true,
			"principalOrFirstMaker": "Rembrandt van Rijn",
			"longtitle": "Isaac y Rebeca, Conocidos como \"La Novia Judía\" , Rembrandt van Rijn, c. 1665 - c. 1669",
			"webImage": {
				"width": 7620,
				"height": 5542,
				"url": "https://lh3.googleusercontent.com/mAyAjvYjIeAIlByhJx1Huctgeb58y7519XYP38oL1FXarhVlcXW7kxuwayOCFdnwtOp6B6F0HJmmws-Ceo5b_pNSSQs=s0"
			}
		}
	]
}
```

##GET museorijks.onrender.com/api/museorijks/obra/:id

Recupera una obra en particular a partir de su id. Utilizando un parametro de ruta para la consulta.
Ejemplo: GET museorijks.onrender.com/api/museorijks/obra/SK-C-5
Respuesta:

```json
{
	"status": "success",
	"mensaje": "Obra de arte recuperada exitosamente.",
	"hayResultado": true,
	"data": [
		{
			"objectnumber": "SK-C-5",
			"title": "La ronda de noche Compañía de Milicia del Distrito II bajo el mando del Capitán Frans Banninck Cocq",
			"longtitle": "La ronda de noche Compañía de Milicia del Distrito II bajo el mando del Capitán Frans Banninck Cocq, Rembrandt van Rijn, 1642",
			"hasimage": true,
			"productionplaces": ["Ámsterdam"],
			"description": "Oficiales y otros fusileros del distrito II en Ámsterdam bajo el mando del capitán Frans Banninck Cocq y el teniente Willem van Ruytenburch, conocidos desde finales del siglo XVIII como \"La Ronda de Noch\". Fusileros de los Kloveniersdoelen saliendo por una puerta. En un escudo colocado junto a la puerta están los nombres de las personas retratadas: Frans Banning Cocq, señor de Purmerland e Ilpendam, Capitán Willem van Ruijtenburch van Vlaerdingen, señor de Vlaerdingen, Teniente, Jan Visscher Cornelisen Vaandrig, Rombout Kemp Sargento, Reijnier Engelen Sargento, Barent Harmansen, Jan Adriaensen Keyser, Elbert Willemsen, Jan Clasen Leydeckers, Jan Ockersen, Jan Pietersen Bronchorst, Harman Iacobsen Wormskerck, Jacob Dircksen de Roy, Jan van der Heede, Walich Schellingwou, Jan Brugman, Claes van Cruysbergen, Paulus Schoonhoven. Los fusileros están armados con picas, mosquetes y alabardas, entre otras cosas. A la derecha el tamborilero con un gran tambor. Entre los soldados de la izquierda hay una niña con un pollo muerto en la cintura, a la derecha un perro ladrando. Arriba a la izquierda el alférez con el estandarte extendido.",
			"plaquedescription": "El lienzo más grande y famoso de Rembrandt fue hecho para el salón del gremio de los arcabuceros. Este era uno de varios salones de la guardia cívica de Ámsterdam, la milicia y policía de la ciudad. Rembrandt fue el primero en pintar figuras en un retrato de grupo haciendo algo. El capitán, vestido de negro, le está diciendo a su teniente que inicie la marcha de la compañía. Los guardias se están formando. Rembrandt usó la luz para enfocarse en detalles particulares, como la mano gesticulante del capitán y la joven en primer plano. Ella era la mascota de la compañía.",
			"materials": ["lienzo", "pintura al óleo (pintura)"],
			"techniques": [],
			"physicalmedium": "óleo sobre lienzo",
			"sclabelline": "Rembrandt van Rijn (1606-1669), óleo sobre lienzo, 1642",
			"historicaldescription": "El lienzo más grande y famoso de Rembrandt fue hecho para el salón del gremio de los arcabuceros. Esta era una de varias salas de la guardia cívica de Ámsterdam, la milicia y la policía de la ciudad. Rembrandt fue el primero en pintar figuras en un retrato de grupo haciendo algo. El capitán, vestido de negro, le está diciendo a su teniente que inicie la marcha de la compañía. Los guardias se están formando. Rembrandt usó la luz para enfocarse en detalles particulares, como la mano gesticulante del capitán y la joven en el fondo. Ella era la mascota de la compañía.",
			"objectTypes": ["pintura"],
			"otherTitles": [
				{
					"alternativeTitle": "Oficiales y otros miembros de la guardia civil del Distrito II en Ámsterdam, bajo el mando del Capitán Frans Banninck Cocq y el Teniente Willem van Ruytenburch, conocido como \"La ronda de noche\"",
					"titleType": "alternativo"
				},
				{
					"alternativeTitle": "La compañía del Capitán Frans Banninck Cocq y el Teniente Willem van Ruytenburch, conocido como 'La ronda nocturna'",
					"titleType": "alternativo"
				}
			],
			"datings": {
				"presentingDate": "1642",
				"sortingDate": 1642,
				"period": 17,
				"yearEarly": 1642,
				"yearLate": 1642
			},
			"principalOrFirstMaker": {
				"name": "Rembrandt van Rijn",
				"placeOfBirth": "Leiden",
				"dateOfBirth": "1606-07-15",
				"dateOfDeath": "1669-10-08",
				"placeOfDeath": "Ámsterdam",
				"nationality": "Holandés del Norte"
			},
			"webImage": {
				"width": 14645,
				"height": 12158,
				"url": "https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB6UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s0"
			}
		}
	]
}
```
