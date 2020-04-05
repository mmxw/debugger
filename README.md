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

## License



