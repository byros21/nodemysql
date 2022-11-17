
//import { DatePipe } from '@angular/common';

//"use strict";

require("dotenv").config();
const express = require("express");
//const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

//hbs.registerPartials( __dirname + '/views/partials');

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

//console.log("Server On : ", port);

app.listen(port, () => {
    console.log("Server On : ", port);
});

let mysql = require("mysql");
const SqlString = require("mysql/lib/protocol/SqlString");

let conexion = mysql.createConnection({
    host: 'getssoma.com',
    database: 'getssoma_promine',
    user: 'getssoma_nantu',
    password: ',zfcb}*Ac-#A'
});

//pipe = new DatePipe('en-US');

conexion.connect((error) => {
    if (error) {
        //console.log(error);
        throw error;
    }
    else {
        console.log('**OK', error);
    }
});

app.get("/aspirantes", (req, res) => {
    getAspirantes(conexion, '2022-01-01 00:00:00', (result) => {
        //return result;
        res.send(
            result
        );
    })

});

app.get("/aspirantes/:fecha", (req, res) => {
    getAspirantes(conexion, req.params.fecha, (result) => {
        //return result;
        res.send(
            result
        );
    })

});

app.get("/aspirante/:cedula", (req, res) => {
    //console.log(req.params.cedula)
    getAspirante(conexion, req.params.cedula , (result) => {
        res.send(
            result
        );
    })
});

function getAspirantes(conexion, fecha, callback) {
    //const x = "2000-12-21T11:23:00";
    const fecha_mod = fecha.replace('T',' ')
    //console.log(fecha_mod)
    const strSql =
        " SELECT *, CONCAT(asp_nombres,' ',asp_apellidop,' ',asp_apellidom) AS asp_nombre FROM aspirante AS ASP "
        + "INNER JOIN estados AS EST ON EST.est_nombre LIKE ASP.asp_estado "
        + "INNER JOIN asp_tthh_validar AS ATH ON ATH.atv_aspirante LIKE ASP.asp_cedula "
        + "LEFT JOIN asp_medi_validar AS AME ON AME.amv_aspirante LIKE ASP.asp_cedula "
        + "LEFT JOIN asp_psico_validar AS APS ON APS.apv_aspirante LIKE ASP.asp_cedula "
        + "LEFT JOIN asp_segu_validar AS ASE ON ASE.asv_aspirante LIKE ASP.asp_cedula "
        + "WHERE ASP.asp_fecha_modificado > '" + fecha + "'  "
        + "ORDER BY ASP.asp_fecha_modificado DESC;"
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
}


function getAspirante(conexion, cedula, callback) {
    const strSql =
        " SELECT *, CONCAT(asp_nombres,' ',asp_apellidop,' ',asp_apellidom) AS asp_nombre FROM aspirante AS ASP "
        + "INNER JOIN estados AS EST ON EST.est_nombre LIKE ASP.asp_estado "
        + "INNER JOIN asp_tthh_validar AS ATH ON ATH.atv_aspirante LIKE ASP.asp_cedula "
        + "LEFT JOIN asp_medi_validar AS AME ON AME.amv_aspirante LIKE ASP.asp_cedula "
        + "LEFT JOIN asp_psico_validar AS APS ON APS.apv_aspirante LIKE ASP.asp_cedula "
        + "LEFT JOIN asp_segu_validar AS ASE ON ASE.asv_aspirante LIKE ASP.asp_cedula "
        + "WHERE ASP.asp_cedula LIKE '" + cedula + "' ;"
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
}

function changeFormat(today) {
    let ChangedFormat = this.pipe.transform(today, 'YYYY-MM-dd HH:mm:ss');
    //console.log(ChangedFormat);
    return ChangedFormat;
}

/*const x = getAspirantes(conexion, '2022-11-16 10:05:00', (result) => {
    console.log(result.length);
});*/

//conexion.end();
