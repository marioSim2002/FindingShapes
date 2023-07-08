class Level {
  constructor(emojiList, totalEmojis, differentEmoji, timerValue) {
    this.emojiList = emojiList;
    this.totalEmojis = totalEmojis;
    this.differentEmoji = differentEmoji;
    this.timerValue = timerValue;
  }

  addEmojis() {
    const emojiContainer = document.getElementById('emos');
    emojiContainer.innerHTML = '';

    const randomIndex = Math.floor(Math.random() * this.totalEmojis);

    for (let i = 0; i < this.totalEmojis; i++) {
      const emoji = document.createElement('span');
      emoji.textContent = i === randomIndex ? this.differentEmoji : this.emojiList[0];
      emojiContainer.appendChild(emoji);
    }
  }

  getRandomEmoji() {
    return this.emojiList[Math.floor(Math.random() * this.emojiList.length)];
  }

  getTimerValue() {
    return this.timerValue;
  }
}

let currentLevel = 0;
let timeRemaining = 0; // var to store the remaining time
let countdownInterval; // var to store the interval ID

function loadLevel(levelNumber) {
  let level = levels[levelNumber];
  const levelObj = new Level(level.emojiList, level.totalEmojis, level.differentEmoji, level.timerValue);

  levelObj.addEmojis();

  const emojiContainer = document.getElementById('emos');
  emojiContainer.addEventListener('click', handleClick);

  function handleClick(event) {
    const clickedEmoji = event.target.textContent;
    const differentEmoji = levelObj.differentEmoji;

    if (clickedEmoji === differentEmoji) {
     
      nextLevel();
   
      //timeRemaining += 5;
      //console.log('Correct!');
    }
  }
}

function startTimer(timerValue) {
  timeRemaining = timerValue;

  const timerDisplay = document.getElementById('timer');

  // Function to update the timer display
  function updateTimer() {
    timerDisplay.textContent = timeRemaining;
    timeRemaining--;

    if (timeRemaining <= 0) {
   
      clearInterval(countdownInterval);
      gameOver();
    }
  }

  clearInterval(countdownInterval);

  // Initial display of timer value
  updateTimer();

  // Start the countdown interval
  countdownInterval = setInterval(updateTimer, 1000);
}

function nextLevel() {
  currentLevel++;
  if (currentLevel >= levels.length) {
    // Handle game completion
    alert('Congratulations! You completed all levels.');
  } else {
    const currentTimerValue = timeRemaining; // Store the current remaining time
    startTimer(currentTimerValue + 8); // Add 5 seconds to the current remaining time
    loadLevel(currentLevel); // Pass the level number to loadLevel
  }
}


function gameOver() {
  clearInterval(countdownInterval);

 
  const playAgain = confirm('Game over! Do you want to play again?');

  if (playAgain) {
    currentLevel = 0; 
    timeRemaining = 14; 
    loadLevel(currentLevel);
    startTimer(timeRemaining);
  } else {
    loadLevel(0);
    startTimer(13);
    alert('Thank you for playing!');
  }
}

loadLevel(currentLevel);
startTimer(13);
