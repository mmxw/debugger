
function init() {

  //! VARIABLES
  const squares = [] //arrays of grids
  const clickedGrid = null //index of the grid that user clicked
  const width = 12
  let userIndex = null
  let randomBombIndex = null
  let bombCount = null
  let timerID = null
  let timeRemaining = 999
  let gameInPlay = false
  let excludedNumArr = [] 
  

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
    clearGrid()
    clicked() 
  }

  // function startGame() {
  //   // TODO the first one clicked on is always (0), 
  //   // TODO then computer automatically click all surrounding grids (because it is impossible for them to have bombs, otherwise the current one won't be 0

  //   squares.forEach(square => square.addEventListener('click', (e) => {
  //     e.target.id = 'first-click'
  //     firstClick = e.target
  //     console.log(e) //* TESTING, passed
  //     console.log('user has started the game by clicking on', squares.indexOf(firstClick)) //* TESTING, passed
     
  //   }))

  //   randomizeBombs() 
  //   //console.log('created bombs at index', //generateRandomNums(0, 143)) //* TESTING, passed

  // }

  // startGame()

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

      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min 

      if (!(excludedItems(12).includes(randomNum) || randomNumbers.has(squares.indexOf(firstClick)))) {
        randomNumbers.add(randomNum)
      }
    
    }
    
    // console.log('bomb indexes', randomNumbers, new Error().stack) //* TESTING, passed
    return randomNumbers
  }

 
  //console.log('these are the excluded grids', excludedItems(12)) //* TESTING, passed

  // randomizeBombs() //* TESTING, passed


  function clicked() {
    if (!gameInPlay) {
      // reveal empty grid, i.e., there are 0 bombs in the  surrounding 8 grids 
      bombCount === 0 // TODO
      clickedGrid.innerHTML = ""
      clickedGrid.addEventListener('click', (e) => {
        e.target.classList.add('empty-grid')
        gameInPlay === true
        randomizeBombs() 
      })
    } else {
      // TODO if the clicked grid is an empty grid, automatically click the surrounding 8 grids 
      bombCount === 0 
      automaticClick() // TODO
      // TODO for each of the 8 grids
         // if (bombCount === 0)
         clickedGrid.innerHTML = ""
         e.target.classList.add('empty-grid')
         automaticClick()
         // if (bombCount > 0) 
        clickedGrid.innerHTML = bombCount
        e.target.classList.add('nonempty-grid')   
      }
    }
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


















