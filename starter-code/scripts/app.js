window.addEventListener('DOMContentLoaded', () => {
  //VARIABLES

  const squares = [] //NodeList of grid elements
  const width = 12
  
  let timerID = null
  let timeRemaining = 999
  let gameInPlay = false
  let excludedNumArr = []
  
  const board = document.querySelector('#board')
  const timerDisplay = document.querySelector('.time-countdown')
  const firstClick = document.querySelector('.first-click')
  const clickedGrids = document.querySelectorAll('.clicked') 
  
  let bombCount //TODO
  let flagCount //TODO
  
  function init() {
    generateGrid() //* TESTING, passed
    
    
    
   
  }

  init()
  
  //FUNCTIONS
  
  //SET UP GAME BOARD
  
  function generateGrid() {
    // generate grid
    // start timer
    // user first click trigger's random bomb-generating
    // alerts player when time's up
    Array(width * width).join('.').split('.').forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      square.addEventListener('click', () => {
        if (!gameInPlay) {
          square.classList.add('first-click')
          gameInPlay = true
          randomizeBombs()
        } else {
          square.classList.add('clicked')
          console.log(squares.indexOf(square), 'was clicked')
          clicked(square)
        }
      })
      squares.push(square)
      board.appendChild(square)
    })
    timer()
  } 
  
  function timer() {
    timerID = setInterval(countDown, 1000)
  }
  
  function countDown() {
    if (timeRemaining === 990) {
      finishGame()
    } else {
      timerDisplay.innerHTML = timeRemaining
      timeRemaining--
    }
  }
  
  function finishGame() {
    gameInPlay = false
    resetTimer()
    alert('GAME OVER')
  }
  
  function resetTimer() {
    clearInterval(timerID)
    timerDisplay.textContent = 0
  }

  
  function randomizeBombs() {
    // any 12 grids on the board
    // other than the first one clicked (let clicked = the index of the clicked grid) 
    if (gameInPlay) {
      const randomBombIndex = generateRandomNums(0, 143)

      randomBombIndex.forEach(index => {
        squares[index].classList.add('bomb')
        console.log(index, 'bomb here')
      })

    }
    
  }  

  function generateRandomNums(min, max) {
    const randomNumbers = new Set()
    
    while (randomNumbers.size < Math.sqrt(max + 1)) {

      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min 

      if (!(excludedItems(12).includes(randomNum) || randomNumbers.has(squares.indexOf(firstClick)))) {
        randomNumbers.add(randomNum)
      }

      //console.log('bomb indexes', randomNumbers, new Error().stack)
      
    }
    return randomNumbers
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

    // console.log(excludedNumArr, 'outer grids')
    return excludedNumArr
  }

  function clicked(grid) {
    if (grid.classList.contains('bomb')) {
      //explode()
      finishGame()
    } 
  }



  





})