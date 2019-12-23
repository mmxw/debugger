/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-mixed-spaces-and-tabs */
function init() {

  //! VARIABLES
  const squares = [] //arrays of grids
  const clickedGrid = null //index of the grid that user clicked
  const width = 12
  let timerID = null
  const bombCounter = null
  let timeRemaining = 999
  let gameInPlay = false
  const userIndex = null
  const randomBombIndex = null
  let excludedNumArr = [] //TODO CHANGE LATER
  

  //! DOM VARIABLES
  const board = document.querySelector('.board')
  const playBtn = document.querySelector('.play')
  let firstClick = document.querySelector('#first-click') // first click triggers the revealing of nearby non-bomb grids
  const timerDisplay = document.querySelector('.time-countdown')
  const flagDisplay = document.querySelectorAll('.flag')
  const bombCounterDisplay = document.querySelectorAll('.counter')
  const resetBtn = document.querySelector('.reset')
  
  

  //! FUNCTIONS

  //? SET UP GAME BOARD (MOSTLY DONE)

  // when user hits the `play` button, the game board is set (by clearing and generating the grid)
  //TODO add an html element for the `play` button
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

    timer()
  }

  // console.log(squares) //* TESTING passed
  //generateGrid() //* TESTING passed


  function countDown() {
    if (timeRemaining === 990) {
      finishGame()
    } else {
      timerDisplay.innerHTML = timeRemaining
      timeRemaining--
      console.log(timeRemaining)
    }
  }

  // countDown() //* TESTING passed

  function finishGame() {
    // finish game; timer reset; 
    gameInPlay = false
    resetTimer()
    alert('GAME OVER')
  }

  function timer() {
    // count down by one second from 999
    timerID = setInterval(countDown, 1000)
    console.log('creating', timerID, new Error().stack) //* TESTING
  }

  function resetTimer() {
    clearInterval(timerID)
    console.log('clearing', timerID) //* TESTING
    timerDisplay.textContent = 0
  }

  generateGrid() //* TESTING passed

  //*****************THE ABOVE IS ALL GOOD NOW; ADD STYLING LATER; ADD PLAY BUTTON LATER*/

  //? USER STARTS GAME

  
  function startGame() {
    // TODO the first one clicked on is always (0), 
    // TODO then computer automatically click all surrounding grids (because it is impossible for them to have bombs, otherwise the current one won't be 0

    squares.forEach(square => square.addEventListener('click', (e) => {
      e.target.id = 'first-click'
      firstClick = e.target
      console.log(e) //* TESTING, passed
      console.log('user has started the game by clicking on', squares.indexOf(firstClick)) //* TESTING, passed
    }))

    randomizeBombs() 
    //console.log('created bombs at index', //generateRandomNums(0, 143)) //* TESTING, passed

  }

  startGame()

  function randomizeBombs() {
    // any 12 grids on the board
    //TODO other than the first one clicked (let clicked = the index of the clicked grid) 

    const randomBombIndex = generateRandomNums(0, 143)
    randomBombIndex.forEach(index => squares[index].classList.add('bomb'))
  }


 

  function excludedItems(width) {
    const topRow = _.range(0, width)
    const bottomRow = _.range(width * 11, width * 12)
    let middleRows = []

    for (let i = 1; i < 11; i++) {
      middleRows.push([width * i, width * (i + 1) - 1])
    } 

    middleRows = middleRows.flat()
    
    excludedNumArr = [...topRow, ...bottomRow, ...middleRows]
   
    return excludedNumArr
  }

  function generateRandomNums(min, max) {

    const randomNumbers = new Set()
    
    while (randomNumbers.size < Math.sqrt(max + 1)) {
      // eslint-disable-next-line func-call-spacing
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min 

      if (!(excludedItems(12).includes(randomNum) || randomNumbers.has(squares.indexOf(firstClick)))) {
        randomNumbers.add(randomNum)
      }
    
    }
    
    console.log('bomb indexes', randomNumbers, new Error().stack)
    return randomNumbers
  }

 
  //console.log(excludedItems(12)) //* TESTING, passed

  // randomizeBombs() //* TESTING, passed


  function userClick(e) {
    // continue playing if game continues; else game over
    if (!gameInPlay) return 

    // if the one clicked on is a bomb then game over
    if (e.target.classList.constains('bomb')) {
      finishGame()
    } else {
      //TODO game play

    }
    //TODO if the one clicked on is empty (0), computer automatically click all surrounding grids (because it is impossible for them to have bombs, otherwise the current one won't be 0
    //TODO computer stops autoclicking when there forms a wall with numbers of bombs displayed in the grids 

    

  }


  function countBombs() {	
    //TODO for each grid, count the neighboring 8 squares, if they have '.bomb' class, if so, counter ++


  }

  function flag() {
    //TODO right click to put a flag on the grid (if user decides that there is definitely a bomb, then they flag it)

  }

  

  function clearGrid() {
    resetBoard()
    resetTimer()
  }

  function resetBoard() {
    //TODO clear all bombs
    //TODO clear all flags
    //TODO return to starting position

  }




  //TODO DOM EVENTS

  // SET UP GAME BOARD
  //playBtn.addEventListener('click', play) //setting up board, timer and flags; timer starts to count down; 

  // USER STARTS TO PLAY GAME
  // firstClick.addEventListener('click', startGame)

  
  // squares.forEach(square => {
  //   square.addEventListener('click', () => {
  //       console.log(squares.indexOf(square))
  //   })
  


  




  
  
}




window.addEventListener('DOMContentLoaded', init)


















