//importar dependencia de conexion
import {connection} from './database/connection.js'
import express from "express"
import cors from  "cors"


// efectuar conexion a BD
connection();

//crear conexion a servidor de node
const app = express();
const puerto = 3000;

//configurar cors
app.use(cors());

//conertir los datos del body a obj js
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//cargar rutas
import UserRoutes from "./routes/user.js";


app.use("/api/user", UserRoutes);




app.listen(puerto, ()=> {
    console.log("Server runing in port :" +puerto)
})