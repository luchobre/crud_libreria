const app = require ('./config/server');
require ('./app/routes/routes')(app);


// iniciar servidor

app.listen(app.get('port'),()=>{
    console.log ('Activo en puerto ', app.get('port'));
});