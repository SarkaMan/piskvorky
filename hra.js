import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const selectButton = (evt) => {
  const btn = evt.target;
  evt.target.disabled = true;
  if (currentPlayer === 'circle') {
    btn.classList.add('board__field--circle');
    currentPlayer = 'cross';
    document.getElementById('current__player').src = 'cross.svg';
  } else {
    btn.classList.add('board__field--cross');
    currentPlayer = 'circle';
    document.getElementById('current__player').src = 'circle.svg';
  }
  result();
  console.log(createArray());
};
//Posluchač událostí pro všechna tlačítka
const btn = document.querySelectorAll('.board__button');
btn.forEach((button) => {
  button.addEventListener('click', selectButton);
});

//Vytvoření pole
const createArray = () => {
  let array = [];
  btn.forEach((button) => {
    if (button.classList.contains('board__field--circle')) {
      array.push('o');
    } else if (button.classList.contains('board__field--cross')) {
      array.push('x');
    } else {
      array.push('_');
    }
  });
  return array;
};

//Určení vítěze a nastavení časovače
const result = () => {
  let array = createArray();

  const winner = findWinner(array);

  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vítězem je hráč se symbolem ${winner}.`);
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, 2000);
    return false;
  }

  if (winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila remízou.`);
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, 2000);
    return false;
  }
  return true;
};

//Ošetření situace, kdy uživatel klikne omylem na tlačítko restart
document
  .querySelector('.button__restart')
  .addEventListener('click', (event) => {
    const confirmRestart = confirm('Opravdu chcete ukončit hru?');
    if (confirmRestart === false) {
      event.preventDefault();
    }
  });
