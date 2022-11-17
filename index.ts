
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (res:any) => {
    res.send("Hola mundo");
});


app.listen(3000, () => {
    console.log("Server On :3000");
})

let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: 'getssoma.com',
    database: 'getssoma_promine',
    user: 'getssoma_nantu',
    password: ',zfcb}*Ac-#A'
});

conexion.connect((error:any) => {
    if( error ){
        //console.log(error);
        throw error;
    }else{
        console.log('**OK',error);
    }
});

function getAspirantes( conexion:any , callback:any){
    conexion.query( "SELECT * FROM aspirante", (err:any, result:any) => {
        if( err ) throw err;
        callback(result);
    } )
}

const x = getAspirantes(conexion,(result:any) => {
    console.log(result);
})

conexion.end();