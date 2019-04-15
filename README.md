# :x: :o: TicTacToe3D
University Project (Class: Visual Computing)

Tic Tac Toe is a paper-and-pencil game for two players,X and O, where the objective is put 3 marks in horizontal, vertical or diagonal in the 3x3 game board first then the opponent.
Almost everyone knows this game and in the visual computing class, I and <a href="https://github.com/Joaobranquinho">João Branquinho</a> had to recreate this game in three dimensions. 

The game should be designed to support the following functionalities 

- The game board should be easy to rotate and see all fields
- Use texture on cubes to distinguish players
- The player can win in any 3 in a row scenario

We had some problems to understand which cube the player click because when the game board rotates freely we don't have the position of each cube and was not viable calculate all positions.

As a solution, we decide to use other canvas to replicate the game and the rotations but this cubes all of them have a different color. With this scenario when the player picks a cube on the top canvas, we recreate the same click on the hidden canvas and we get the pixel color, therefore, we know which cube is. 

We have the game on <a href="https://tiagoramalho.github.io/TicTacToe3D/">TicTacToe3D</a> and we let the colorful canvas for explaining and showing how each move works.

