
var getInstancia = function(){
  const url = window.location.href.split('?');

  if (url.length == 1)
    return 'cmmg';

  return url[1];
}


const instancia = getInstancia();
const url = 'http://' + instancia + '.educat.net.br/api/avaliacao_realizacao/login';

document.querySelector('form').action = url

let scanner = new Instascan.Scanner({ video: document.querySelector('video'), mirror: false });

scanner.addListener('scan', function (id_realizacao) {
  swal({
    title: 'Sucesso!',
    text: 'Você está sendo redirecionado para a avaliação.',
    type: 'success',
    showConfirmButton: false
  });
  
  window.location.replace(url + '?id_realizacao=' + id_realizacao);
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length == 1) 
    scanner.start(cameras[0]);
  if (cameras.length == 2) 
    scanner.start(cameras[1]);
})


var swithToPIN = function() {
  document.querySelector('#qrcode-container').style.display = 'none';
  document.querySelector('#pin-container').style.display = 'block';
}

var swithToQRCode = function() {
  document.querySelector('#qrcode-container').style.display = 'block';
  document.querySelector('#pin-container').style.display = 'none';
}

var showError = function() {
  document.querySelector('#pin-container .form-group').classList.add('has-error');
}

document.querySelector("#pin-container input").addEventListener("keypress", function(ev) {
  document.querySelector('#pin-container .form-group').classList.remove('has-error');
});

document.querySelector("#qrcode-container a").addEventListener("click", function(ev) {
  ev.preventDefault();
  swithToPIN()
});

document.querySelector("#pin-container a").addEventListener("click", function(ev) {
  ev.preventDefault();
  swithToQRCode();
});

if(window.location.href.indexOf('error') != -1) {
  swithToPIN();
  showError();
}
