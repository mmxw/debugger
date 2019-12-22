/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-mixed-spaces-and-tabs */
function init() {

  // VARIABLES

  // *const excludedNumsArr = flat(_.range(0, width, [width * line, width * (line + 1) - 1], _.range(width * 11, width * 12)))
  const squares = [] //arrays of grids
  const clickedGrid = null //index of the grid that user clicked
  const width = 12
  let timerID = null
  let bombCounter = null
  let timeRemaining = 999
  let gameInPlay = false
  let userIndex = null

  // DOM VARIABLES
  const board = document.querySelector('.board')
  const playBtn = document.querySelector('.play')
  const firstClick = document.querySelector('.first-click') // first click triggers the revealing of nearby 5-20 grids 
  const timerDisplay = document.querySelector('.time-countdown')
  const flagDisplay = document.querySelectorAll('.flag')
  const bombCounterDisplay = document.querySelectorAll('.counter')
  const resetBtn = document.querySelector('.reset')
  
  

  // FUNCTIONS

  // when user hits the `play` button, the game board is set (by clearing and generating the grid)
  function play() {
    clearGrid()
    generateGrid()
    

  }

  function generateGrid() {
    Array(width * width).join('.').split('.').forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      board.appendChild(square)
    })
    // TODO timer()
    timer()
  }

  console.log(squares) //* TESTING
  //generateGrid() //* TESTING


  function countDown() {
    if (timeRemaining === 990) {
      finishGame()
    } else {
      timerDisplay.innerHTML = timeRemaining
      timeRemaining--
      console.log(timeRemaining)
    }
  }

  countDown()

  function finishGame() {
    // finish game; timer reset; 
    gameInPlay = false
    resetTimer()
    alert('GAME OVER')
  }

  function timer() {
    // count down by one second from 999
    if (timerID === null) {
      timerID = setInterval(countDown, 1000)
    } else {
      timerID = setInterval(countDown, 1000)
    } 
    console.log('creating', timerID, new Error().stack)
  }

  function resetTimer() {
    clearInterval(timerID)
    console.log('clearing', timerID)
    timerDisplay.textContent = 0
  }

  generateGrid()


  
  function startGame() {
    // TODO the first one clicked on is always (0), 
    // TODO then computer automatically click all surrounding grids (because it is impossible for them to have bombs, otherwise the current one won't be 0
    
    
    randomizeBombs()
    

  }

  function randomizeBombs() {
    // any 10 grids on the board
    // other than the first one clicked (let clicked = the index of the clicked grid) 

    generateRandomNums(0, 143)
    randomNumbers.forEach(number => board[number].classList.add('bomb'))
  }

  function userClick(e) {
    // continue playing if game continues; else game over
    if (!gameInPlay) return 

    // if the one clicked on is a bomb then game over
    // if the one clicked on is empty (0), computer automatically click all surrounding grids (because it is impossible for them to have bombs, otherwise the current one won't be 0
    // computer stops autoclicking when there forms a wall with numbers of bombs displayed in the grids 

    if (e.target.classList.constains('bomb')) {
      finishGame()
    }

    
  }

  function generateRandomNums(min, max) {

    const randomNumbers = new Set()

    while (randomNumbers.size < Math.sqrt(max + 1)) {
      // eslint-disable-next-line func-call-spacing
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
      
      (randomNumbers.has(excludedNumArr) || randomNumbers.has(firstClick)) ? generateRandomNums(min, max) : randomNum
      
	    randomNumbers.add(randomNum)
    }

    return randomNumbers

  }

  

  function countBombs() {	
    // for each grid, count the neighboring 8 squares, if they have '.bomb' class, if so, counter ++


  }

  function flag() {
    // right click to put a flag on the grid (if user decides that there is definitely a bomb, then they flag it)

  }

  

  function clearGrid() {
    resetBoard()
    resetTimer()
  }

  function resetBoard() {
    // clear all bombs
    // clear all flags
    // return to starting position

  }




  // DOM EVENTS

  // start game
  //playBtn.addEventListener('click', play)

  // firstClick.addEventListener('click', startGame)

  
    // squares.forEach(square => {
    //   square.addEventListener('click', () => {
    //       console.log(squares.indexOf(square))
    //   })
  


  




  
  
}




window.addEventListener('DOMContentLoaded', init)


















