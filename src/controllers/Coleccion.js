const axios = require('axios');
const apiKey = process.env.API_KEY;
const baseUrl = "https://www.rijksmuseum.nl/api/en/collection";

const getColeccion = (req, res) => {    
    axios.get(baseUrl + `?key=${apiKey}&material=canvas&ps=30&s=relevance&imgonly=True`)
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

module.exports = {
    getColeccion
}