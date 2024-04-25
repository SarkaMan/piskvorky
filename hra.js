import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const allButtons = document.querySelectorAll('.board__button');

//Funkce apiPlayer ziskava aktualni stav hraci desky, ktery odesila na API a vraci tah AI
const apiPlayer = async (player) => {
  const playingBoard = [];

  allButtons.forEach((button) => {
    if (button.classList.contains('board__field--circle')) {
      playingBoard.push('o');
    } else if (button.classList.contains('board__field--cross')) {
      playingBoard.push('x');
    } else {
      playingBoard.push('_');
    }
  });

  //Odeslani pozadavku fetch
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: playingBoard,
        player: player,
      }),
    },
  );

  //Ziskani dat z odpovedi
  const data = await response.json();
  const { x, y } = data.position;
  const fieldIndex = x + y * 10; //najde policko na prislusne pozici
  const field = allButtons[fieldIndex];
  field.click(); //simulace kliknuti na tlacitko - odehraje AI
};

//Funkce, ktera je volana pri kliknuti na tlacitko hraci desky
const selectButton = (evt) => {
  const btn = evt.target;
  evt.target.disabled = true;
  if (currentPlayer === 'circle') {
    btn.classList.add('board__field--circle');
    document.getElementById('current__player').src = 'cross.svg';
    currentPlayer = 'cross';
    apiPlayer('x');
  } else {
    btn.classList.add('board__field--cross');
    document.getElementById('current__player').src = 'circle.svg';
    currentPlayer = 'circle';
  }
  result();
};

allButtons.forEach((button) => {
  button.addEventListener('click', selectButton);
});

//Vytvoreni pole
const createArray = () => {
  const array = [];
  allButtons.forEach((button) => {
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

//Urceni viteze hry a nastaveni casovace
const result = () => {
  const array = createArray();
  const winner = findWinner(array);

  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vítězem je hráč se symbolem ${winner}.`);
      location.reload();
    }, 1000);
  }

  if (winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila remízou.`);
      location.reload();
    }, 1000);
  }
};

//Tlacitko restart
document
  .querySelector('.button__restart')
  .addEventListener('click', (event) => {
    const confirmRestart = confirm('Opravdu chcete ukončit hru?');
    if (confirmRestart === false) {
      event.preventDefault();
    }
  });
