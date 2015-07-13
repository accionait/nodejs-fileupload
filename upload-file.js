/*------------------UPLOAD FILE MAGIC HERE!--------------*/
app.post('/app/upload', multipart(), function (req, res) {
	fs.readFile(req.files.file.path, function (err, data) {
		var imageName = req.files.file.name;

		//si tira un error
		if(!imageName){
			console.log("Hubo un error");
			res.redirect("/");
			res.end();
		}
		else {
			var ruta = req.body.idConsorcio + "/" + req.body.modulo + "/" + req.body.carpeta;
			var directorios = ruta.split('/');
			var path = './uploads/';
			
			directorios.forEach(function(directorio, pos){
				if(directorio[pos] == 2){
					path += directorio;
				}
				else{
					path += directorio + "/";
				}
				
				fs.mkdir(path, function(error){
					if(error){
						console.log(error);
					}
					else{
						console.log("Directorio: " + path);
					}
				});
			});
			
			fs.writeFile(path + imageName, data, function (err) {
				if(err){
					console.log("Error "+ err);
				}
				else{
					res.json("Archivo guardado");
				}
			});
		}
	});
});
