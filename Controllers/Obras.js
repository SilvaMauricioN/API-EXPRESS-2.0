const axios = require('axios');
const apiKey = process.env.API_KEY;

const getObras = (req, res) => {
    const {nombreArtista} = req.query;
    axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&involvedMaker=${nombreArtista}`)
        .then(({ data }) => {
            const { artObjects } = data;
            res.status(200).json(artObjects);
        })
        .catch((error)=>{
            //si sucede una respuesta de error de axiso, es decir de la api
            if(error.response){
                const { status, statusText, data } = error.response;
                res.status(status).json({
                    status:status,
                    msg:statusText,
                    detalle:data
                });
            } else{
                res.status(500).json({
                    status:500,
                    msg: 'Error inesperado'
                });
            }
        });
}
const getObraPorId = (req, res) => {
    const { id } =req.params; 
    axios.get(`https://www.rijksmuseum.nl/api/en/collection/${id}?key=${apiKey}`)
        .then(({ data }) => {            
            const { artObject } = data;

            if (!artObject.webImage) {
                artObject.webImage = { url: '' };
            }            
            const {id,objectNumber,title,longTitle,copyrightHolder,
                webImage: { url },titles,description, objectTypes,
                objectCollection,principalMaker,materials,
                techniques,productionPlaces,dating,periods,
                places,dimensions,physicalMedium} = artObject;

            const obraDetalles = {id, objectNumber,title,longTitle,copyrightHolder,
                url,titles,description, objectTypes,
                objectCollection,principalMaker,materials,
                techniques,productionPlaces,dating,periods,
                places,dimensions,physicalMedium};

            res.status(200).json(obraDetalles);
        })
        .catch((error)=>{
            //si sucede una respuesta de error de axiso, es decir de la api
            if(error.response){
                const { status, statusText, data } = error.response;
                res.status(status).json({
                    status:status,
                    msg:statusText,
                    detalle:data
                });
            } else{                               
                res.status(500).json({
                    status:500,
                    msg: 'Error inesperado'
                });
            }
        });
}
module.exports = {
    getObras,
    getObraPorId
}