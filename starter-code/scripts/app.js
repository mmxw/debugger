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
  let currentIndex 
  

  generateGrid() 
  excludedItems(width)
  dummy(excludedNumArr)
  
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
          startGame(square)
        } else {
          clicked(square)
        }
      })
      //? square.addEventListener('contextmenu', placeFlag)
      squares.push(square)
      
      board.appendChild(square)
    })
    
    timer()
  } 

  function startGame(square) {
    // first click triggers random bomb-generating
    
    square.classList.add('first-click')
    gameInPlay = true
    randomizeBombs()
    
  }

  function clicked(square) {
    // game rules when square clicked (other than 1st click)
    // if clicked is a bomb, then finish game 
    // if clicked is empty, then automatically click the surrounding 8 grids; for each of the 8 grids: repeat game rules
    // if clicked is nonempty (i.e., bombs in some of the surrounding 8 grids), display the bombCount 

    square.classList.add('clicked')
    console.log(squares.indexOf(square), 'was clicked')

    currentIndex = getCurrentIndex(square)
    bombCount = countBombs(currentIndex)

    if (square.classList.contains('bomb')) {
      //TODO explode()
      finishGame()

    } else if (square.classList.contains('dummy')) {
      square.innerHTML = ''
    } else {

      //console.log(bombCount)

      if (bombCount === 0) {
        square.classList.add('empty-grid')
        //TODO clickedEmpty(index)
        //TODO automaticClick(index)
        
      } else {
        square.classList.add('nonempty-grid')
        square.innerHTML = bombCount
        //TODO clickedNonEmpty(index)
        
      }
    }
    
    //TODO 
    
    // placeFlags()
  }

  function getCurrentIndex(square) {
    return squares.indexOf(square)

  }

  function countBombs(currentIndex) {
    let count = 0
    const neighboringGrids = [squares[currentIndex - 13], squares[currentIndex - 12], squares[currentIndex - 11], squares[currentIndex - 1], squares[currentIndex + 1], squares[currentIndex + 11], squares[currentIndex + 12], squares[currentIndex + 13]]
    for (const item of neighboringGrids) {
      if (item.classList.contains('bomb')) {
        count++
      }
    }
    return count

  }

  function placeFlag() {

  }
  

  // function placeFlag(e, square) {
  //   e.preventDefault()
  //   square.classList.toggle('flagged-grid')
  // }

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
    clearGrid()
  }
  
  function resetTimer() {
    clearInterval(timerID)
    timerDisplay.textContent = 999
  }

  function clearGrid() {
    squares.forEach(square => {
      square.classList.removeClasses(['first-click', 'empty-grid', 'nonempty-grid', 'bomb'])
      square.innerHTML = ''

    })
      
  }

  DOMTokenList.prototype.removeClasses = function(classes) {
    
    for (let i = 0, length = classes.length; i < length; i++) {
      this.remove(classes[i])
    }
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
    
    console.log(excludedNumArr, 'outer grids')
    return excludedNumArr
  }

  function dummy(excludedNumArr) { 
    excludedNumArr.forEach(num => {
      squares[num].classList.add('dummy')
    })
  }

  
})