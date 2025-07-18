const express = require('express');
class Server{
    constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.app.disable('x-powered-by');
        this.middleware();
        this.routers();
    }
    middleware(){
        this.app.use(express.static('Public'));
    }
    routers(){
        this.app.use('/api/MuseoRijks/',require('../Routes/Coleccion'));
        this.app.use('/api/MuseoRijks/',require('../Routes/Artista'));
        this.app.use('/api/MuseoRijks/',require('../Routes/Obras'));
        this.app.all('*', (req,res)=>{
            res.status(404).json({
                statusCode: 404,
                message: "Ruta No Encontrada"
            });
        });
    }
    listen() {
        this.app.listen(this.port, () =>{
            console.log(`Escuchando en el puerto http://localhost:${this.port}`);
        });
    }
}
module.exports = Server;