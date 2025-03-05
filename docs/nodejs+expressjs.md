# **Node.js + Espress.js**
## ¿Qué es Node.js?
Node.js es un entorno de ejecución de código abierto para JavaScript, esto significa que Node.js prepara un entorno en el que permite ejecutar código JavaScript del lado del servidor con el motor V8 de Google, es decir, fuera del navegador. Es comúnmente utilizado para desarrollar aplicaciones del lado del servidor, también para crear APIs. Node.js es una herramienta de consola, es decir, lo utilizas a través de comandos escritos en un terminal.
## ¿Qué es Express.js?
Express es un framework de backend diseñado específicamente para proporcionar características y herramientas sobre Node.js para desarrollar aplicaciones de backend, las herramientas que te permiten de forma más sencilla, manejar rutas y entre otras cosas como hacer middleware que sería mucho más complejo sin el framework.
## Instalación
### Node.js
Node.js debe de ser instalado desde [su página web oficial](https://nodejs.org/en/download/), con el instalador correspondiente para tu máquina y siguiendo las indicaciones del asistente del instalador para completar la instalación.
### NPM
NPM es el gestor de paquetes oficial de Node.js y se utiliza para instalar Express y otras librerías. Para instalarlo debes de ejecutar el siguiente comando en tu terminal
```
npm --global
```
### Instalar Express
Express también se instala desde la terminal, ejecutando el siguiente comando
```
npm install express
```
## CRUD
CRUD es un acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar). Sirve para referirse a las operaciones básicas
para interactuar con los registros persistentes de una aplicación, por lo que cuando nos referimos a una aplicación CRUD, nos referimos a una aplicación que como mínimo cumple con estas 4 funciones.
Para desarrollar, aquí está el código para desarrollar las principales funciones de una aplicación CRUD.
### CREAR
```
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
  };
  tasks.push(newTask);
  res.json(newTask);
});
```
### LEER
Para leer TODAS las tareas
```
app.get('/tasks', (req, res) => {
  res.json(tasks);
});
```
Para leer UNA de las tareas
```
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    res.json(task);
  }
});
```
### ACTUALIZAR
```
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const existingTaskIndex = tasks.findIndex((t) => t.id === taskId);
  if (existingTaskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    tasks[existingTaskIndex] = { ...tasks[existingTaskIndex], ...updatedTask };
    res.json(tasks[existingTaskIndex]);
  }
});
```
### BORRAR
```
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const existingTaskIndex = tasks.findIndex((t) => t.id === taskId);
  if (existingTaskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    const deletedTask = tasks.splice(existingTaskIndex, 1);
    res.json(deletedTask[0]);
  }
});
```
## Ejercicio
Crea una aplicación básica en la que gestiones una lista de la compra, cada registro debe tener el nombre del producto, su cantidad y un boolean que
indica si está en el carrito o no, a continuación, muestra en la página principal un string por cada registro existente (sin CSS)
Ejemplo: “Nombre: Pan, Cantidad: 3, En_Carrito: No”.
Además de que en la página principal, debe haber un botón de crear para añadir un producto a la lista, que redirija a un formulario básico (sin CSS)
que genere el producto y lo añada a la lista y redirigiendo al la página principal al terminar el formulario. Por último añade a cada registro un
botón de eliminar para poder borrar el registro, no es necesario añadir las funciones de actualizar, ya que es un ejercicio de prueba.
