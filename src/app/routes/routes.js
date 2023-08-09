const dbConnection = require("../../config/dbConnection");

module.exports = (app) => {
  const sql = dbConnection();

  app.get('/', (req, res) => {
    res.render("inicio.ejs")
  })
  //******************************************************SOCIOS******************************************************/
  app.get("/socios", (req, res) => {
    sql.query("SELECT * FROM socios", (err, result) => {
      console.log(result);
      res.render("socios.ejs", {
        socios: result,
      });
    });
  });

  app.post("/socios", (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const fecha_nac = req.body.fecha_nac;
    const dni = req.body.dni;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const fecha_alta = req.body.fecha_alta;

    sql.query(
      `INSERT INTO socios SET?`,
      {
        nombre,
        apellido,
        fecha_nac,
        dni,
        direccion,
        telefono,
        email,
        fecha_alta,
      },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Nuevo socio agregado:", result);
          res.redirect("/socios");
        }
      }
    );
  });


  app.get("/borrar_socio/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM socios WHERE id_socio = ?";

    sql.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el registro:", err);
        res.status(500).send("Error al borrar el registro");
      } else {
        console.log("Registro borrado");
        res.redirect("/socios");
      }
    });
  });

  //MOSTRAR SOCIO A EDITAR
  app.get("/editar_socio/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM socios WHERE id_socio =?";

    sql.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al obtener información del socio: ", err);
        res.status(500).send("Error al obtener información del socio");
      } else {
        console.log("Redirigido para editar socio");
        res.render("editar_socios.ejs", {
          socio: result[0],
        });
      }
    });
  });

  //EDITAR SOCIO
  app.post("/editar_socio/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, fecha_nac, dni, direccion, telefono, email, fecha_alta } = req.body;
    const query = "UPDATE socios SET nombre = ?, apellido = ?, fecha_nac = ?, dni = ?, direccion = ?, telefono = ?, email = ?, fecha_alta =? WHERE id_socio =?";

    sql.query(query, [nombre, apellido, fecha_nac, dni, direccion, telefono, email, fecha_alta, id], (err, result) => {
      if (err) {
        console.error("Error al editar socio:", err);
        res.status(500).send("Error al editar socio");
      } else {
        console.log("Socio editado correctamente");
        res.redirect("/socios");
      }
    });
  });
  //******************************************************LIBROS******************************************************/

  app.get("/libros", (req, res) => {
    sql.query("SELECT * FROM libros", (err, result) => {
      console.log(result);
      res.render("libros.ejs", {
        libros: result,
      });
    });
  });

  app.post("/libros", (req, res) => {
    const isbn = req.body.isbn;
    const titulo = req.body.titulo;
    const reseña = req.body.reseña;
    const autor = req.body.autor;
    const editorial = req.body.editorial;
    const anio = req.body.anio;

    sql.query(
      `INSERT INTO libros SET?`,
      {
        isbn,
        titulo,
        reseña,
        autor,
        editorial,
        anio
      },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Nuevo libro agregado:", result);
          res.redirect("/libros");
        }
      }
    );
  });


  app.get("/borrar_libro/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM libros WHERE id_libro = ?";

    sql.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el libro:", err);
        res.status(500).send("Error al borrar el libro");
      } else {
        console.log("Libro borrado");
        res.redirect("/libros");
      }
    });
  });

  //MOSTRAR LIBRO A EDITAR
  app.get("/editar_libro/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM libros WHERE id_libro =?";

    sql.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al obtener información del libro: ", err);
        res.status(500).send("Error al obtener información del libro");
      } else {
        console.log("Redirigido para editar libro");
        res.render("editar_libros.ejs", {
          libro: result[0],
        });
      }
    });
  });

  //EDITAR LIBRO
  app.post("/editar_libro/:id", (req, res) => {
    const id = req.params.id;
    const { isbn, titulo, reseña, autor, editorial, anio } = req.body;
    const query = "UPDATE libros SET isbn = ?, titulo = ?, reseña = ?, autor = ?, editorial = ?, anio = ? WHERE id_libro =?";

    sql.query(query, [isbn, titulo, reseña, autor, editorial, anio, id], (err, result) => {
      if (err) {
        console.error("Error al editar libro:", err);
        res.status(500).send("Error al editar libro");
      } else {
        console.log("Libro editado correctamente");
        res.redirect("/libros");
      }
    });
  });
  //*****************************************************PRESTAMOS*****************************************************/
  app.get("/prestamos", (req, res) => {
    sql.query(
      "SELECT * FROM prestamos " +
      "LEFT JOIN socios ON prestamos.id_socio = socios.id_socio " +
      "LEFT JOIN libros ON prestamos.id_libro = libros.id_libro", 
      (err, result) => {
      console.log(result);
      res.render("prestamos.ejs", {
        prestamos: result,
      });
    });
  });

  app.get("/prestamos", (req, res) => {
    sql.query("SELECT * FROM prestamos", (err, result) => {
      console.log(result);
      res.render("prestamos.ejs", {
        prestamos: result,
      });
    });
  });

  app.post("/prestamos", (req, res) => {
    const id_libro = req.body.id_libro;
    const id_socio = req.body.id_socio;
    const fecha_retiro = req.body.fecha_retiro;
    const fecha_entrega = req.body.fecha_entrega;

    sql.query(
      `INSERT INTO prestamos SET?`,
      {
        id_libro,
        id_socio,
        fecha_retiro,
        fecha_entrega 
      },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Nuevo prestamo agregado:", result);
          res.redirect("/prestamos");
        }
      }
    );
  });


  app.get("/borrar_prestamo/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM prestamos WHERE id_prestamo = ?";

    sql.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al borrar el prestamo:", err);
        res.status(500).send("Error al borrar el prestamo");
      } else {
        console.log("Prestamo borrado");
        res.redirect("/prestamos");
      }
    });
  });

  //MOSTRAR PRESTAMO A EDITAR
  app.get("/editar_prestamo/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM prestamos WHERE id_prestamo =?";

    sql.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al obtener información del prestamo: ", err);
        res.status(500).send("Error al obtener información del prestamo");
      } else {
        console.log("Redirigido para editar el prestamo");
        res.render("editar_prestamos.ejs", {
          prestamo: result[0],
        });
      }
    });
  });

  //EDITAR PRESTAMO
  app.post("/editar_prestamo/:id", (req, res) => {
    const id = req.params.id;
    const { id_libro, id_socio, fecha_retiro, fecha_entrega } = req.body;
    const query = "UPDATE prestamos SET id_libro = ?, id_socio = ?, fecha_retiro = ?, fecha_entrega = ? WHERE id_prestamo =?";

    sql.query(query, [id_libro, id_socio, fecha_retiro, fecha_entrega, id], (err, result) => {
      if (err) {
        console.error("Error al editar el prestamo:", err);
        res.status(500).send("Error al editar el prestamo");
      } else {
        console.log("Prestamo editado correctamente");
        res.redirect("/prestamos");
      }
    });
  });


  
};
