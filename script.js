let currentGame = 'apple';
let appleCurrentRow = -1;
let appleSignals = [];

// PROMOKOD KO'CHIRISH
function copyPromo() {
  const promo = document.getElementById('promo-code').innerText;
  navigator.clipboard.writeText(promo);
  const toast = document.getElementById('copy-toast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2000);
}

// ID VALIDATSIYASI (10 xonali)
function validateID() {
  const input = document.getElementById('user-id').value;
  const btn = document.getElementById('entry-btn');
  const error = document.getElementById('id-error');

  if (input.length === 10 && !isNaN(input)) {
    btn.disabled = false;
    error.classList.add('hidden');
  } else {
    btn.disabled = true;
    if (input.length > 0) error.classList.remove('hidden');
    else error.classList.add('hidden');
  }
}

// KIRISH
function enterApp() {
  const userId = document.getElementById('user-id').value;
  document.getElementById('display-id').innerText = userId;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');
  initAppleGrid();
  initMinesGrid();
  initSwampGrid();
}

function logout() {
  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
}

// O'YINLARNI ALMASHTIRISH
function switchGame(game) {
  currentGame = game;
  document.querySelectorAll('.game-selector button').forEach(b => b.classList.remove('active-btn'));
  
  document.getElementById('apple-game').classList.add('hidden');
  document.getElementById('mines-game').classList.add('hidden');
  document.getElementById('swamp-game').classList.add('hidden');

  document.getElementById('apple-controls').classList.add('hidden');
  document.getElementById('general-controls').classList.add('hidden');

  if (game === 'apple') {
    document.getElementById('apple-game').classList.remove('hidden');
    document.getElementById('apple-controls').classList.remove('hidden');
    document.getElementById('btn-apple').classList.add('active-btn');
  } else if (game === 'mines') {
    document.getElementById('mines-game').classList.remove('hidden');
    document.getElementById('general-controls').classList.remove('hidden');
    document.getElementById('btn-mines').classList.add('active-btn');
  } else if (game === 'swamp') {
    document.getElementById('swamp-game').classList.remove('hidden');
    document.getElementById('general-controls').classList.remove('hidden');
    document.getElementById('btn-swamp').classList.add('active-btn');
  }
}

// GRIDLAR
function initAppleGrid() {
  const grid = document.getElementById('apple-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const cell = document.createElement('div');
    cell.className = 'apple-cell';
    cell.id = `apple-${i}`;
    grid.appendChild(cell);
  }
}

function initMinesGrid() {
  const grid = document.getElementById('mines-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell-square';
    cell.id = `mine-${i}`;
    grid.appendChild(cell);
  }
}

function initSwampGrid() {
  const grid = document.getElementById('swamp-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell-square';
    cell.id = `swamp-${i}`;
    grid.appendChild(cell);
  }
}

// APPLE OF FORTUNE
function appleStart() {
  initAppleGrid();
  appleCurrentRow = 0;
  appleSignals = [];

  for (let r = 0; r < 4; r++) {
    appleSignals.push(Math.floor(Math.random() * 5));
  }
  renderAppleRow();
}

function appleNextRow() {
  if (appleCurrentRow < 3) {
    appleCurrentRow++;
    renderAppleRow();
  }
}

function applePrevRow() {
  if (appleCurrentRow > 0) {
    appleCurrentRow--;
    renderAppleRow();
  }
}

function renderAppleRow() {
  initAppleGrid();
  for (let r = 0; r <= appleCurrentRow; r++) {
    const col = appleSignals[r];
    const rowIndex = 3 - r; 
    const cellIndex = rowIndex * 5 + col;
    const cell = document.getElementById(`apple-${cellIndex}`);
    if (cell) {
      cell.classList.add('cell-active');
      cell.innerText = '🍎';
    }
  }
}

// MINES VA SWAMP LAND SIGNALLARI
function generateGeneralSignal() {
  if (currentGame === 'mines') {
    initMinesGrid();
    let selected = new Set();
    while (selected.size < 3) selected.add(Math.floor(Math.random() * 25));
    selected.forEach(idx => {
      const cell = document.getElementById(`mine-${idx}`);
      cell.classList.add('cell-active');
      cell.innerText = '⭐';
    });
  } else if (currentGame === 'swamp') {
    initSwampGrid();
    let selected = new Set();
    while (selected.size < 4) selected.add(Math.floor(Math.random() * 25));
    selected.forEach(idx => {
      const cell = document.getElementById(`swamp-${idx}`);
      cell.classList.add('cell-active');
      cell.innerText = '🐸';
    });
  }
}
