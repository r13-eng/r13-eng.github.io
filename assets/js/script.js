const url = 'https://aula.educat.net.br/api/avaliacao_realizacao/login?id_realizacao=';

let scanner = new Instascan.Scanner({ video: document.querySelector('video'), mirror: false });

scanner.addListener('scan', function (id_realizacao) {
  swal({
    title: 'Sucesso!',
    text: 'Você está sendo redirecionado para a avaliação.',
    type: 'success',
    showConfirmButton: false
  });
  
  window.location.replace(url + id_realizacao);
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length == 1) 
    scanner.start(cameras[0]);
  if (cameras.length == 2) 
    scanner.start(cameras[1]);
})

document.querySelector("#qrcode-container a").addEventListener("click", function(ev) {
  ev.preventDefault();
  document.querySelector('#qrcode-container').style.display = 'none';
  document.querySelector('#pin-container').style.display = 'block';
});

document.querySelector("#pin-container a").addEventListener("click", function(ev) {
  ev.preventDefault();
  document.querySelector('#qrcode-container').style.display = 'block';
  document.querySelector('#pin-container').style.display = 'none';
});