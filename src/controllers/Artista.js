const axios = require('axios');
const apiKey = process.env.API_KEY;
const getArtistas = (req, res) => {
    axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}`)
        .then(({ data }) => {
            const { facets: facetsData } = data;
            const [ primer ] = facetsData;
            const { facets } = primer;
            res.status(200).json(facets);
        })
        .catch((error)=>{
            //si sucede una respuesta de error de la api utlizada
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
    getArtistas
}