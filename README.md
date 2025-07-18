##Documentación API
Bienvenido a la Api. Aquí encontraras como usar los endpoints. Api de consulta RIJKS DATA
Todas las consultas comienzan con museorijks.onrender.com/api/MuseoRijks

##GET museorijks.onrender.com/api/MuseoRijks/Artistas

Recupera una lista de los Artistas, de los que se tienen obras en exposicion.
Ejemplo:  GET museorijks.onrender.com/api/MuseoRijks/Artistas
Respuesta:
```json
[
    {
        "key": "anonymous",
        "value": 193039
    },
    {
        "key": "Ed van der Elsken",
        "value": 7652
    },
    {
        "key": "George Hendrik Breitner",
        "value": 5584
    },
    {
        "key": "Jan Luyken",
        "value": 4856
    },
    {
        "key": "Reinier Vinkeles (I)",
        "value": 4559
    }    
]       
```
##GET museorijks.onrender.com/api/MuseoRijks/Obras/Artista

Recupera Todas las obras de un Artista en particular. Utilizando el parametro de consulta nombreArtista.
Ejemplo: GET museorijks.onrender.com/api/MuseoRijks/Obras/Artista?nombreArtista=Rembrandt+van+Rijn
Respuesta:
```json		
[
    {
        "links": {
        "self": "http://www.rijksmuseum.nl/api/nl/collection/SK-C-5",
        "web": "http://www.rijksmuseum.nl/nl/collectie/SK-C-5"
        },
        "id": "nl-SK-C-5",
        "objectNumber": "SK-C-5",
        "title": "De Nachtwacht",
        "hasImage": true,
        "principalOrFirstMaker": "Rembrandt van Rijn",
        "longTitle": "De Nachtwacht, Rembrandt van Rijn, 1642",
        "showImage": true,
        "permitDownload": true,
        "webImage": {
        "guid": "bbd1fae8-4023-4859-8ed1-d38616aec96c",
        "offsetPercentageX": 0,
        "offsetPercentageY": 1,
        "width": 5656,
        "height": 4704,
        "url": "https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB6UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s0"
        }        
    }
]
```

##GET museorijks.onrender.com/api/MuseoRijks/Obra/:id

Recupera una obra en particular a partir de su id. Utilizando un parametro de ruta para la consulta.
Ejemplo: GET museorijks.onrender.com/api/MuseoRijks/Obra/SK-C-5
Respuesta:
```json
{
    "id": "nl-SK-C-5",
    "objectNumber": "SK-C-5",
    "title": "De Nachtwacht",
    "longTitle": "De Nachtwacht, Rembrandt van Rijn, 1642",
    "copyrightHolder": null,
    "url": "https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB6UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s0",
    "titles": [
    "Officieren en andere schutters van wijk II in Amsterdam, onder leiding van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, bekend als ‘De Nachtwacht’",
    "Het korporaalschap van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, bekend als de 'Nachtwacht'"
    ],
    "description": "Officieren en andere schutters van wijk II in Amsterdam onder leiding van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, sinds het einde van de 18de eeuw bekend als ‘De Nachtwacht’. Schutters van de Kloveniersdoelen uit een poort naar buiten tredend. Op een schild aangebracht naast de poort staan de namen van de afgebeelde personen: Frans Banning Cocq, heer van purmerlant en Ilpendam, Capiteijn Willem van Ruijtenburch van Vlaerdingen, heer van Vlaerdingen, Lu[ij]tenant, Jan Visscher Cornelisen Vaendrich, Rombout Kemp Sergeant, Reijnier Engelen Sergeant, Barent Harmansen, Jan Adriaensen Keyser, Elbert Willemsen, Jan Clasen Leydeckers, Jan Ockersen, Jan Pietersen bronchorst, Harman Iacobsen wormskerck, Jacob Dircksen de Roy, Jan vander heede, Walich Schellingwou, Jan brugman, Claes van Cruysbergen, Paulus Schoonhoven. De schutters zijn gewapend met onder anderen pieken, musketten en hellebaarden. Rechts de tamboer met een grote trommel. Tussen de soldaten links staat een meisje met een dode kip om haar middel, rechts een blaffende hond. Linksboven de vaandrig met de uitgestoken vaandel.",
    "objectTypes": [
    "schilderij"
    ],
    "objectCollection": [
    "schilderijen"
    ],
    "principalMaker": "Rembrandt van Rijn",
    "materials": [
    "doek",
    "olieverf"
    ],
    "techniques": [
    
    ],
    "productionPlaces": [
    "Amsterdam"
    ],
    "dating": {
    "presentingDate": "1642",
    "sortingDate": 1642,
    "period": 17,
    "yearEarly": 1642,
    "yearLate": 1642
    },
    "Dimensions": [
    {
        "unit": "cm",
        "type": "hoogte",
        "precision": null,
        "part": null,
        "value": "379,5"
    },
    {
        "unit": "cm",
        "type": "breedte",
        "precision": null,
        "part": null,
        "value": "453,5"
    },
    {
        "unit": "kg",
        "type": "gewicht",
        "precision": null,
        "part": null,
        "value": "337"
    },
    {
        "unit": "kg",
        "type": "gewicht",
        "precision": null,
        "part": null,
        "value": "170"
    }
    ],
    "physicalMedium": "olieverf op doek"
}
```


