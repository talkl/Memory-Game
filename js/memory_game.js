/*Assignment #5 - Memory Game
______________________________________________________________________________________
The following exercise contains the following subjects:
o JavaScript: Events handling, DOM Manipulation
o HTML / CSS, Bootstrap

what i should do:
i want to make the board responsive with a bit of margin between cards. the cards will be fixed but will stack
if needed to be responsive.
i want to attach an image to the card and flip it when clicked (or show it).
if two cards are the same then show them and dont hide them.
two cards are the same if they have the same id.
random deal the cards with position. maybe each card image should have a src.
Modal You won with a new game button.
new game button header.
wrong guesses should be counted.
if there is a theme than you need to create the cards pattern and the images from a different object.
the cards should be dealt to a grid that the user can define the number of it. 

Understanding the task:
1. The board size should be 3 * 4; The cards should be dealt in random, every card has a match.
2. When the user wins, pop up a “You won!” overlay with a new game button.
3. Create a header with a “new game” button
4. The game page has to be mobile responsive
Important features:
● After flipping two cards with different images, the game should pause for a second.During that
second, the other cards are not clickable.
● Don’t wait to finish your project before you commit your code to GitHub.Commit whenever you added
an important functionality.
● Make sure your JS code is using functions and well commented.
Geek out:
1. Add number of wrong guesses counter(put it anywhere).The “you won” overlay should show them.
2. Add the ability to change the game theme(both images and card pattern).
3. Make the basic layout the “easy” level, add levels medium and hard(with more 18 and 24 cards).
Unleash the ninja within:
1. Add flipping animation effect for the card.
2. Add a high score functionality, that will save the name of the person with the least amounts of wrong
guesses.*/

$(document.body).ready(function () {
    // Document is loaded and DOM is ready
    var cards = $('ul li');
    cards.css('height', `${(parseInt($('#deck').css('height')) * 3) / cards.length }`);

    

});