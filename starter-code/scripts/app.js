window.addEventListener('DOMContentLoaded', () => {

  //! SWITCHING DIFFICULTY LEVELS

  const isEasyMode = window.location.pathname.includes('easy.html')
  const isMediumMode = !isEasyMode && window.location.pathname.includes('medium.html')
  const isHardMode = !isEasyMode && !isMediumMode && window.location.pathname.includes('hard.html')
  
  let bugTotal
  

  function switchMode() {
    switch (true) {
      case isEasyMode:
        bugTotal = 12
        break
      case isMediumMode:
        bugTotal = 24
        break
      case isHardMode:
        bugTotal = 36
        break
      default:
        throw Error('no such mode')
    }
  }

  //!VARIABLES

  const squares = [] //NodeList of grid elements
  const width = 12
  
  let timerID = null
  let timeRemaining = 999
  let gameInPlay = false
  let excludedNumArr = []
  
  const board = document.querySelector('#board')
  const timerDisplay = document.querySelector('.time-countdown')
  const firstClick = () => document.querySelector('.first-click')
  const wpCount = document.querySelector('.wp-number')
  const bugGrids = () => document.querySelectorAll('.bug')
  const peckedGrids = () => document.querySelectorAll('.pecked-grid')
  const popupWin = document.querySelector('.popup-win')
  const popupLose = document.querySelector('.popup-lose')
   
  let bugCount 
  let currentIndex 
  
  //!RUN THESE FUNCTIONS
  generateGrid() 
  excludedItems(width)
  dummy(excludedNumArr)
  switchMode()
  
  //!FUNCTIONS
  
  //SET UP GAME BOARD
  
  function generateGrid() {
    // generate grid
    // start timer
    // user first click trigger's random bug-generating
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
    // first click triggers random bug-generating
    clearGrid()
    square.classList.add('first-click')
    square.classList.add('clicked-grid')
    square.classList.add('empty-grid')
    console.log(getCurrentIndex(square), 'was first click')
    gameInPlay = true
    randomizeBugs()
    automaticClick(getCurrentIndex(square))
    timer()  
  }

  function clicked(square) {
    // game rules when square clicked (other than 1st click)
    // if clicked is a bug, then finish game 
    // if clicked is empty, then automatically click the surrounding 8 grids; for each of the 8 grids: repeat game rules
    // if clicked is nonempty (i.e., bugs in some of the surrounding 8 grids), display the bugCount 

    if (square.classList.contains('dummy')) return
    else {
      square.classList.add('clicked-grid')
      //console.log(squares.indexOf(square), 'was clicked')
  
      currentIndex = getCurrentIndex(square)
      bugCount = countBugs(currentIndex)
  
      if (square.classList.contains('bug')) {
        //TODO explode()
        console.log('bug was clicked at', currentIndex)
        lose()
      } else {
        //console.log(bugCount)
        if (bugCount === 0) {
          square.classList.add('empty-grid')
          console.log('empty grid at', currentIndex) //* TESTING
          automaticClick(currentIndex)     
        } else {
          square.classList.add('nonempty-grid')
          square.innerHTML = bugCount
        }
      }
    }  
       
  }

  function automaticClick(currentIndex) {

    const neighboringIndex = [currentIndex - 13, currentIndex - 12, currentIndex - 11, currentIndex - 1, currentIndex + 1, currentIndex + 11, currentIndex + 12, currentIndex + 13]
    
    for (let i = 0; i < neighboringIndex.length; i++) {
      const square = squares[neighboringIndex[i]]
      if (square.classList.contains('clicked-grid')) continue
      else if (square.classList.contains('bug')) continue
      else clicked(square)
      console.log('automatically clicking neighbors of', currentIndex ) //* TESTING          
    }
 
  }  

  function getCurrentIndex(square) {   
    return squares.indexOf(square)
  }

  function countBugs(currentIndex) {
    let count = 0
    const neighboringGrids = [squares[currentIndex - 13], squares[currentIndex - 12], squares[currentIndex - 11], squares[currentIndex - 1], squares[currentIndex + 1], squares[currentIndex + 11], squares[currentIndex + 12], squares[currentIndex + 13]]
    for (const item of neighboringGrids) {
      if (item.classList.contains('bug')) {
        count++
      }
    }
    return count
  } 

  function rightClicked(square) {
    // right click to place a wp
    if (!gameInPlay || square.classList.contains('dummy')) return 
    else {
      if (!square.classList.contains('pecked-grid')) {
        square.classList.toggle('pecked-grid')
        square.innerHTML = '<img class="woodpecker" src="assets/wp4.png">'
        if (wpCount.innerHTML > 0) wpCount.innerHTML--
        else {
          alert('you\'ve run out of woodpeckers!')
        }    
      } else {
        square.classList.toggle('pecked-grid')
        square.innerHTML = ''
        wpCount.innerHTML++
      }   
    }
    const bugArr = Array.from(bugGrids())
    const wpArr = Array.from(peckedGrids())

    // console.log(wpArr) //* TESTING

    if (wpArr.length === bugTotal && equalArrays(bugArr, wpArr)) {
      win()
    }

  }

  function timer() {
    timerID = setInterval(countDown, 1000)
  }
  
  function countDown() {
    if (timeRemaining === 900) {
      lose()
    } else {
      timerDisplay.innerHTML = timeRemaining
      timeRemaining--
    }
  }
  
  function win() {
    gameInPlay = false
    resetTimer()
    clearGrid()
    //! if reload, the popup page doesn't show up
    // location.reload()

    popupWin.style.display = 'block'
  }

  function lose() {
    gameInPlay = false
    resetTimer()
    clearGrid()
    popupLose.style.display = 'block'
 
  }
  
  function resetTimer() {
    clearInterval(timerID)
    timerDisplay.textContent = 999
    setInterval(timerID)
  }

  function clearGrid() {
    resetTimer()
    squares.forEach(square => {
      const cls = ['first-click', 'empty-grid', 'nonempty-grid', 'bug', 'pecked-grid']
      cls.forEach(cl => removeClasses(square, cl)) 
      square.innerHTML = ''
    })
  }

  function removeClasses(el, cl) {
    el.classList.remove(cl)
  }

  function randomizeBugs() {
    // any 12 grids on the board 
    // other than the first one clicked (let clicked = the index of the clicked grid) and the dummy grids
    if (gameInPlay) {
      const randomBugIndex = generateRandomNums(0, 143)
      let total = 0
      randomBugIndex.forEach(index => {
        squares[index].classList.add('bug')
        total++
        console.log(index, `${total}th bug here`)
      })
    }  
  }  

  function generateRandomNums(min, max) {
    // generate random numbers that excludes the dummy grid indexes

    const randomNumbers = new Set()
    
    while (randomNumbers.size < bugTotal) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min 
      if (!(excludedItems(12).includes(randomNum) || randomNumbers.has(squares.indexOf(firstClick())))) {
        randomNumbers.add(randomNum)
      }
      //console.log('bug indexes', randomNumbers, new Error().stack)  
    }
    return randomNumbers
  }

  function excludedItems(width) {
    // excludes the dummy grids, i.e., the outer invisible grids

    const topRow = [...Array(12).keys()]
    const bottomRow = [132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143]
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
      squares[num].classList.add('clicked-grid')
    })
  }

  function equalArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false
    }

    return true
  }

  // function range(start, end) {
  //   let arr = []
  //   for (let i = start; i < (end - start); i++) {
  //     arr.push(i)
  //   }
  //   return arr
  // } 
})
