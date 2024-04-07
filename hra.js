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
};

document
  .querySelector('button:nth-child(1)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(2)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(3)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(4)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(5)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(6)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(7)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(8)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(9)')
  .addEventListener('click', selectButton);
document
  .querySelector('button:nth-child(10)')
  .addEventListener('click', selectButton);

//Ošetření situace, kdy uživatel klikne omylem na tlačítko restart
document
  .querySelector('.button__restart')
  .addEventListener('click', (event) => {
    const confirmRestart = confirm('Opravdu chcete ukončit hru?');
    if (confirmRestart === false) {
      event.preventDefault();
    }
  });
