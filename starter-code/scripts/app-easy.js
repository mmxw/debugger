window.addEventListener('DOMContentLoaded', () => {
  //!VARIABLES

  const squares = [] //NodeList of grid elements
  const width = 12
  
  let timerID = null
  let timeRemaining = 999
  let gameInPlay = false
  let excludedNumArr = []
  
  const board = document.querySelector('#board')
  const timerDisplay = document.querySelector('.time-countdown')
  const firstClick = document.querySelector('.first-click')
  const flagCount = document.querySelector('.flag-number')
  const bombGrids = () => document.querySelectorAll('.bomb')
  const flaggedGrids = () => document.querySelectorAll('.flagged-grid')
  // const clickedGrids = document.querySelectorAll('.clicked') 
   
  let bombCount 
  let currentIndex 
  
  //!RUN THESE FUNCTIONS
  generateGrid() 
  excludedItems(width)
  dummy(excludedNumArr)
  
  
  //!FUNCTIONS
  
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

      square.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        rightClicked(square)
      })
      
      squares.push(square)
      
      board.appendChild(square)
    })
    
    
  } 

  function startGame(square) {
    // first click triggers random bomb-generating
    clearGrid()
    square.classList.add('first-click')
    square.classList.add('clicked-grid')
    square.classList.add('empty-grid')
    console.log(getCurrentIndex(square), 'was clicked')
    gameInPlay = true
    randomizeBombs()
    automaticClick(getCurrentIndex(square))
    timer()
    
  }

  function clicked(square) {
    // game rules when square clicked (other than 1st click)
    // if clicked is a bomb, then finish game 
    // if clicked is empty, then automatically click the surrounding 8 grids; for each of the 8 grids: repeat game rules
    // if clicked is nonempty (i.e., bombs in some of the surrounding 8 grids), display the bombCount 

    if (square.classList.contains('dummy')) return
    else {
      square.classList.add('clicked-grid')
      //console.log(squares.indexOf(square), 'was clicked')
  
      currentIndex = getCurrentIndex(square)
      bombCount = countBombs(currentIndex)
  
      if (square.classList.contains('bomb')) {
        //TODO explode()
        console.log('bomb was clicked at', currentIndex)
        missionFailed()
      } else {
        //console.log(bombCount)
        if (bombCount === 0) {
          square.classList.add('empty-grid')
          console.log('empty grid at', currentIndex) //* TESTING
          automaticClick(currentIndex)     
        } else {
          square.classList.add('nonempty-grid')
          square.innerHTML = bombCount
        }
      }
    }
    
       
  }

  function automaticClick(currentIndex) {

    const neighboringIndex = [currentIndex - 13, currentIndex - 12, currentIndex - 11, currentIndex - 1, currentIndex + 1, currentIndex + 11, currentIndex + 12, currentIndex + 13]
    
    for (let i = 0; i < neighboringIndex.length; i++) {
      const square = squares[neighboringIndex[i]]
      if (square.classList.contains('clicked-grid')) continue
      else if (square.classList.contains('bomb')) continue
      else clicked(square)
      console.log('automatically clicking neighbors of', currentIndex ) //* TESTING          
    }
 
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

  function rightClicked(square) {
    // right click to place a flag
    if (!gameInPlay || square.classList.contains('dummy')) return 
    else {
      if (!square.classList.contains('flagged-grid')) {
        square.classList.toggle('flagged-grid')
        square.innerHTML = '&#x1F6A9;'
        if (flagCount.innerHTML > 0) flagCount.innerHTML--
        else {
          alert('you\'ve run out of flags!')
        }    
      } else {
        square.classList.toggle('flagged-grid')
        square.innerHTML = ''
        flagCount.innerHTML++
      }   
    }
    const bombArr = Array.from(bombGrids())
    const flagArr = Array.from(flaggedGrids())

    console.log(flagArr) //* TESTING

    if (flagArr.length === 12 && equalArrays(bombArr, flagArr)) {
      missionAccomplished()
    }

  }

  function timer() {
    timerID = setInterval(countDown, 1000)
  }
  
  function countDown() {
    if (timeRemaining === 900) {
      finishGame()
    } else {
      timerDisplay.innerHTML = timeRemaining
      timeRemaining--
    }
  }
  
  function finishGame() {
    gameInPlay = false
    resetTimer()
    clearGrid()
    location.reload()
  }
  
  function resetTimer() {
    clearInterval(timerID)
    timerDisplay.textContent = 999
    setInterval(timerID)
  }

  function clearGrid() {
    resetTimer()
    squares.forEach(square => {
      const cls = ['first-click', 'empty-grid', 'nonempty-grid', 'bomb', 'flagged-grid']
      cls.forEach(cl => removeClasses(square, cl)) 
      square.innerHTML = ''
    })
  }

  function removeClasses(el, cl) {
    el.classList.remove(cl)
  }

  function randomizeBombs() {
    // any 12 grids on the board 
    // other than the first one clicked (let clicked = the index of the clicked grid) and the dummy grids
    if (gameInPlay) {
      const randomBombIndex = generateRandomNums(0, 143)
      let total = 0
      randomBombIndex.forEach(index => {
        squares[index].classList.add('bomb')
        total++
        console.log(index, `${total}th bomb here`)
      })
    }  
  }  

  function generateRandomNums(min, max) {
    // generate random numbers that excludes the dummy grid indexes

    const randomNumbers = new Set()
    
    while (randomNumbers.size < 12) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min 
      if (!(excludedItems(12).includes(randomNum) || randomNumbers.has(squares.indexOf(firstClick)))) {
        randomNumbers.add(randomNum)
      }
      //console.log('bomb indexes', randomNumbers, new Error().stack)  
    }
    return randomNumbers
  }

  function excludedItems(width) {
    // excludes the dummy grids, i.e., the outer invisible grids

    const topRow = _.range(0, width)
    const bottomRow = _.range(width * 11, width * 12)
    let middleRows = []

    for (let i = 1; i < 11; i++) {
      middleRows.push([width * i, width * (i + 1) - 1])
    } 
    middleRows = middleRows.flat()  
    excludedNumArr = [...topRow, ...bottomRow, ...middleRows]
    
    //console.log(excludedNumArr, 'outer grids')
    return excludedNumArr
  }

  function dummy(excludedNumArr) { 
    excludedNumArr.forEach(num => {
      squares[num].classList.add('dummy')
      squares[num].classList.add('clicked-grid')
    })
  }

  function missionAccomplished() {  
    alert('CONGRATULATIONS! MISSION ACCOMPLISHED!!!')
    finishGame()    
  }

  function missionFailed() {
    finishGame()
    //TODO explode()
    alert('SORRY! MISSION FAILED')
  }

  function equalArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false

    // const arr1Sorted = arr1.concat().sort()
    // const arr2Sorted = arr2.concat().sort()
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false
    }
    
    return true
  }

})


//TODO 

//* function destructFlag()
// at the end of game, destruct flags that are misplaced
//* function explode()
// when clicked on a bomb, make board explode