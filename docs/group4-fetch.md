
# Grup4-Fetch

## Introducció a Fetch
Fetch és una API moderna proporcionada pels navegadors per realitzar peticions HTTP asíncrones a servidors web. Substitueix l'antic `XMLHttpRequest`, oferint una sintaxi més clara i funcionalitats millorades. Fetch permet obtenir dades des d'un servidor, enviar informació, actualitzar elements i eliminar-los, seguint el model CRUD (Create, Read, Update, Delete).

## Característiques principals
- **Basat en Promises:** Fetch utilitza promeses, el que facilita la seva integració amb `then` i `catch` per gestionar respostes i errors.
- **Compatibilitat amb `async/await`:** Permet escriure codi més llegible i estructurat.
- **Suport per JSON:** Moltes API envien i reben dades en format JSON, i Fetch facilita aquesta manipulació.
- **Gestió flexible d'errors:** Mitjançant `try/catch` es poden gestionar errors de xarxa o respostes incorrectes.

## Sintaxi bàsica
El mètode `fetch()` realitza una petició HTTP i retorna una Promise que es resol quan es rep una resposta del servidor.

### Exemple bàsic de `fetch()`
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json()) // Converteix la resposta en JSON
  .then(data => console.log(data)) // Mostra les dades a la consola
  .catch(error => console.error('Error:', error)); // Gestiona errors
```

Amb `async/await`, el mateix exemple seria:
```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
getData();
```

## CRUD amb Fetch
Fetch és ideal per implementar operacions CRUD amb una API REST.

### Create (POST) - Afegir un nou element
```javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Element nou' })
})
.then(response => response.json())
.then(data => console.log('Creat:', data))
.catch(error => console.error('Error:', error));
```
Explicació:
- `method: 'POST'`: Indica que estem enviant dades.
- `headers`: Defineix el tipus de contingut enviat (`JSON`).
- `body`: Converteix l’objecte JavaScript en una cadena JSON.

### Read (GET) - Obtenir dades
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
Explicació:
- `fetch(url)`: Realitza la petició GET per obtenir dades.
- `.json()`: Converteix la resposta en un objecte JavaScript.

### Update (PUT) - Actualitzar un element existent
```javascript
fetch('https://api.example.com/data/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Element actualitzat' })
})
.then(response => response.json())
.then(data => console.log('Actualitzat:', data))
.catch(error => console.error('Error:', error));
```
Explicació:
- `method: 'PUT'`: Indica que volem modificar un element.
- `url`: Conté l'ID de l'element a modificar (`/data/1`).
- `body`: Conté les noves dades en format JSON.

### Delete (DELETE) - Eliminar un element
```javascript
fetch('https://api.example.com/data/1', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log('Eliminat:', data))
.catch(error => console.error('Error:', error));
```
Explicació:
- `method: 'DELETE'`: Indica que volem eliminar un element.
- `url`: Conté l'ID de l'element a eliminar (`/data/1`).

## Exercici pràctic
Creeu una pàgina HTML amb un formulari per afegir elements i una taula per mostrar-ne la llista. Utilitzeu Fetch per:
1. Carregar els elements existents (`GET`).
2. Afegir nous elements (`POST`).
3. Editar elements existents (`PUT`).
4. Eliminar elements (`DELETE`).

Exemple d'interfície HTML:
```html
<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <title>CRUD amb Fetch</title>
</head>
<body>
  <form id="addForm">
    <input type="text" id="name" placeholder="Nom">
    <button type="submit">Afegir</button>
  </form>
  <ul id="itemsList"></ul>

  <script>
    document.getElementById('addForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const response = await fetch('https://api.example.com/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const newItem = await response.json();
      document.getElementById('itemsList').innerHTML += `<li>${newItem.name}</li>`;
    });
  </script>
</body>
</html>
```

Aquest codi permet afegir elements a una llista mitjançant Fetch.

## Conclusió
Fetch és una eina fonamental per realitzar operacions asíncrones a una API REST. Permet una gestió eficient de dades en aplicacions web modernes, facilitant la implementació del CRUD i millorant l’experiència d’usuari.
