let url = 'https://catfact.ninja/fact';

function getPartial(url) {
  let promise = new Promise(function(valid) {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', url);
    ajax.onload = function() {
        valid(JSON.parse(ajax.responseText));
    };
    ajax.send();
  });
  return promise;
}

// Llamada a la función
getPartial(url)
  .then(data => console.log('Dato sobre gatos:', data.fact))
  .catch(error => console.error(error));
