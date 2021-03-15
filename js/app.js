let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0;
let puntosComputadora = 0;


//variables para html
const presentacion = document.querySelector('.centrado');
const pantalla = document.querySelector('main');
const btncomenzar = document.querySelector('#comenzar');
const btnpedir = document.querySelector('#pedir');
const btndetener = document.querySelector('#detener');
const btnnuevo = document.querySelector('#nuevo');
const puntos = document.querySelectorAll('small');
const cartaJugador = document.querySelector('#jugador-cartas');
const cartaComputadora = document.querySelector('#computadora-cartas');



//comenzar
btncomenzar.addEventListener('click',()=>{
  presentacion.classList.add('ocultar');
  pantalla.classList.remove('ocultar');
});






//crear el deck y barajarlo
const crearDeck = () => {
  for(let i = 2; i <= 10; i++){
    for (let j of tipos) {
      deck.push(i + j);
    }
  }
  for(let i of especiales){
    for (let j of tipos) {
      deck.push(i + j);
    }
  }
  deck = _.shuffle(deck);
  return deck;
}
crearDeck();

// //tomar una carta

const pedirCarta = () => {
  let carta = deck.shift();
  if(deck.length === 0){
    throw 'Ya no hay cartas';
  }
  return carta;
}

const valorCarta = (carta) =>{
  const valor = carta.substring(0, carta.length - 1);
  return  (isNaN(valor))  ?
  (valor === 'A') ? 11 : 10 : Number(valor) ;
  // if (isNaN(valor)) {
    //   puntos = (valor === 'A') ? 11 : 10 ;
    // }else{
      //   puntos = Number(valor);
      // }
      // console.log(puntos);
}

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
      const carta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(carta);
      puntos[1].innerText = puntosComputadora;
      const imgcarta = document.createElement('img');
        imgcarta.src = `cartas/${carta}.png`;
        imgcarta.classList.add('carta');
        cartaComputadora.append(imgcarta);
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    if (puntosMinimos === puntosComputadora) {
      alert('Ambos pierden');
    }else if(puntosMinimos > 21){
      alert('Computadora Gana');
    }else if(puntosComputadora > 21){
      alert('Jugador Gana');
    }else{
      alert('Computadora Gana');
    }
  }, 100);
}

//eventos
btnpedir.addEventListener('click',()=>{
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntos[0].innerText = puntosJugador;

  const imgcarta = document.createElement('img');
    imgcarta.src = `cartas/${carta}.png`;
    imgcarta.classList.add('carta');
    cartaJugador.append(imgcarta);

    if (puntosJugador > 21) {
      btnpedir.disabled = true;
      btndetener.disabled = true;
      turnoComputadora(puntosJugador);      
    }else if(puntosJugador === 21){
      btnpedir.disabled = true;
      btndetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
});

btndetener.addEventListener('click',()=>{
    btndetener.disabled = true;
    btnpedir.disabled = true;
    turnoComputadora(puntosJugador);
});

btnnuevo.addEventListener('click',()=>{
  deck = [];
  deck = crearDeck();

  puntosComputadora = 0;
  puntosJugador = 0;

  puntos[0].innerText = 0;
  puntos[1].innerText = 0;

  cartaJugador.innerHTML = '';
  cartaComputadora.innerHTML = '';

  btndetener.disabled = false;
  btnpedir.disabled = false;
});