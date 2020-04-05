# Debugger 

<img src="assets/lb1.gif" width="25" height="25" /> life is short, debugging should be fun <img src="assets/lb1.gif" width="25" height="25" /> <br/><br/>
A developer take on the classic Minesweeper game written in JavaScript, HTML and CSS

Demo: https://mmxw.github.io/debugger/

## Features

- user can choose difficulty level based on the size of the woodpecker (aka de*bug*ger)
- bonus message when you win :) 

## How to use

Download all the files and open `index.html` in a web browser

## Desgin process
- I spent a few hours planning the game logic and break down the problem into small tasks, with one function corresponding to one small task, which made the actual coding part a lot easier. (Link to the detailed planning doc [here](https://github.com/mmxw/debugger/blob/master/minesweeper-game-logic-planning.txt))
  - SET UP GAME BOARD: generate grid when user clicked the PLAY button; 
  - USER STARTS THE GAME: 
     - user first click should open an empty one; timer starts at the same time; 
     - then the program generates 10 random numbers between 0 and 143 (other than the clicked grid index);
     - add '.bug' class to these 10 grids; 
     - for each empty grid, automatically click the surrounding 8 grids, count the number of '.bug' grids, display the number;
     - if the grid is empty, then automatically click the surrouding grids again, repeat last step, until there's no more empty grids that are open
     
  - USER PLAYS THE GAME: 
    - left click to open a grid; if the grid is empty, then automatically click the surrouding grids again, repeat until there's no more empty grids that are open;
    - right click to place a woodpecker indicating that user thinks there's a bug hiding under the grid;
  - END GAME: 
    - if user successfully identify all bugs, then user wins; display winning message; 
    - if user left click on a grid with a bug in, then user loses; dispaly losing message; 
  - RESET GAME: 
    - clear grids;
    - reset timer; 

## What I learned from making the game

* **Conceptually, and most importantly**, *game development is different from playing the game!* As a developer, you can set the rule and you can cheat when you test the game. But when I finished writing the game, I realised I just made a beast that I can't win. 
* **Technically**, the following were the most *exciting* and *challenging* parts of the whole process for me:
  - dummy grids. To set a boundary for autoclicking not go beyond the game board, I added an invisible row of grids on all sides of the board. So the game board for the easy level was in fact 11 x 11, not 10 x 10. These dummy grids are the stopping point for autoclicking. (later I learned that these are called [sentinel values](https://en.wikipedia.org/wiki/Sentinel_value))
  - a non-deterministic bug related to the random number generator: 

  I wanted to exclude the dummy grids and the first click from the random numbers was to set it such that the randomNumbers set does not include the dummies and the first click. However, the way I wrote my code was such that it is possible for the random number to be the index of the first click (given the nature of randomness). So `isFirstClick = randomNumbers.has(squares.indexOf(firstClick))` in the following code could be true, hence the condition `(!isDummy && !isFirstClick)` for the `if` statement is always false, so no more randomNum being added to the randomNumbers. There fore the condition of the `while` loop is always true, hence infinite loops until the page becomes unresponsive!

  Because of the non-deterniministic nature of `randomNum`, it took me a while to figure it out, until I used  `console.log('bug indexes', randomNumbers, new Error().stack)`. 

  But it was a wild win to catch such bug! (and a reflection of me writing bad code at the beginning of my learning as well. But hey, I learned! :)

  ```js
  function generateRandomNums(min, max) {
      const randomNumbers = new Set()

      while (randomNumbers.size < bugTotal) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        const isDummy = excludedItems(12).includes(randomNum)
        <!-- const isFirstClick = (randomNumbers.has(squares.indexOf(firstClick))) --> DANGER!!!!
        const isFirstClick = (randomNum === (squares.indexOf(firstClick)))      
        if (!isDummy && !isFirstClick) randomNumbers.add(randomNum)     
        //console.log('bug indexes', randomNumbers, new Error().stack)  
      }
      return randomNumbers
    }
   
  ```
  
## License



