var deferredPrompt;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function() {
      console.log('Service worker registered!');
    }).catch(function(err){
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event){
  console.log('beforeinstallpromt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

var promise = new Promise(function(resolve, reject){
  setTimeout(function(){
    reject({code: 500, message: 'An error occured!'})
  }, 3000);
});

fetch('https://httpbin.org/ip')
  .then(function(response){
    console.log(response);
  });

promise.then(function(text){
  return text;
}).then(function(newText){
  console.log(newText);
}).catch(function(err){
  console.log(err.code, err.message);
});

console.log('This is executed right after setTimeout()');