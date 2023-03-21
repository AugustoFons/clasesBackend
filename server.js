const app = require("./app");
require('dotenv').config();

const port = process.env.PORT || 3000;  //en caso de que no este la variable de entorno le asigna el puerto 3000
app.listen(port, () => {
    console.log(`escuchando puerto ${port}`)
})