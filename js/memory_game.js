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
    var Memory = {
        playersRecord: [
            {difficulty: 'easy', name: null, wrongGuesses: null},
            { difficulty: 'medium', name: null, wrongGuesses: null },
            { difficulty: 'hard', name: null, wrongGuesses: null }
        ],
        playerName: '',
        themePathName: '',
        difficultyObj: {},
        coverImagePath: '',
        backCardPath: '',
        imageArray: [],
        wrongGuesses: 0,
        audio: null,
        match: function(cardsCollection) { //recursive function
            if (cardsCollection.length === 1) {
                return true;
            } else if (cardsCollection.get(0).className === cardsCollection.get(1).className) {
                return Memory.match(cardsCollection.slice(1));
            } else {
                return false;
            }
        },
        addImagesToCards: function () {
            for (var i = 0; i < Memory.imageArray.length; i++) {
                var newImage = $('<img />');
                newImage.attr('src', `./media/${Memory.imageArray[i]}`);
                newImage.addClass('back-card');
                var newLi = $('<li/>');
                var backCard = $('<img />');
                backCard.attr('src', `./media/${Memory.backCardPath}`);
                backCard.addClass('front-card');
                newLi.attr('class', `${i + 1}`);
                newLi.append(backCard);
                newLi.append(newImage);
                $('ul#deck').append(newLi.clone());
                $('ul#deck').append(newLi);
            }
        },
        shuffleListOfCards: function () {
            var ul = document.querySelector('ul');
            for (var i = ul.children.length; i >= 0; i--) {
                ul.appendChild(ul.children[Math.random() * i | 0]);
            }
        },
        bindLogicToCards: function () {
            $('ul li').on('click', function () {
                $(this).addClass('clicked');
                var clickedCards = $('ul li.clicked');
                if (clickedCards.length === 2) {
                    var isMatch = Memory.match(clickedCards);
                    if (isMatch) { // cards Match
                        clickedCards.removeClass('clicked');
                        clickedCards.addClass('matched-card');
                        // add audio file

                    } else { // cards don't match
                        $('#container').addClass('not-active');
                        $('#player-live-score').text('Wrong Guesses: ' + ++Memory.wrongGuesses);
                        // pause for 1 sec
                        setTimeout(function () {
                            $('#container').removeClass('not-active');
                            clickedCards.removeClass('clicked');
                        }, 1000);

                    }
                } //end of 2 clicked cards logic
            });
        },
        bindWinCondition: function() {
            $('ul li').on('click', function () {
                setTimeout(function() {
                    var matchedCards = $('ul li.matched-card');
                    if(matchedCards.length === (Memory.imageArray.length * 2)) {
                        //Win logic
                        Memory.printScoreTable(Memory.difficultyObj.difficulty, Memory.playerName, Memory.wrongGuesses);
                        $('#player-final-score').text('wrong guesses: ' + Memory.wrongGuesses);
                        $('div#modal-container').addClass('active-modal');
                    }
                }, 1);
            });
        },
        setBackgroundImage: function() {
            $("html").css("background", `url('./media/${Memory.coverImagePath}') no-repeat center center fixed`);
            $("html").css("background-size", `cover`);
            $("html").css("-o-background-size", `cover`);
            $("html").css("-moz-background-size", `cover`);
            $("html").css("-webkit-background-size", `cover`);
        },
        resetGame: function() {
            Memory.audio.pause();
            Memory.audio.removeAttribute('src'); // empty source
            Memory.audio.load();
            Memory.playersRecord = [
                { difficulty: 'easy', name: null, wrongGuesses: null },
                { difficulty: 'medium', name: null, wrongGuesses: null },
                { difficulty: 'hard', name: null, wrongGuesses: null }
            ];
            Memory.wrongGuesses = 0;
            Memory.themePathName = '';
            Memory.difficultyObj = {};
            Memory.coverImagePath = '';
            Memory.backCardPath = '';
            Memory.imageArray = [];
            $('#players-record').empty();
            $('ul').empty();
            $('#player-live-score').text('');
            $('#player-final-score').text('');
            $('#theme').hide();
            $('#difficulty').hide();
            $('#start').show();
            $('#welcome-screen').show();
            $('div#modal-container').removeClass('active-modal');
            $('#container').hide();
        },
        bindTryAgainButton: function() {
            $('#try-again-button').on('click', function() {
                Memory.resetGame();
            });
        },
        bindPlayGameButton: function() {
            $('#difficulty').hide();
            $('#theme').hide();
            $('#play-game-button').on('click', function() {
                $('#start').hide();
                $('#difficulty').show();
            });
        },
        bindDifficultyButtons: function() {
            $('.difficulty-buttons').on('click', function () {
                $('#difficulty').hide();
                $('#theme').show();
            });
            $('.difficulty-buttons[value="easy"]').on('click', function () {
                Memory.difficultyObj = {
                    difficulty: 'easy',
                    length: 6    
                };
            });
            $('.difficulty-buttons[value="medium"]').on('click', function () {
                Memory.difficultyObj = {
                    difficulty: 'medium',
                    length: 9
                };
            });
            $('.difficulty-buttons[value="hard"]').on('click', function () {
                Memory.difficultyObj = {
                    difficulty: 'hard',
                    length: 12
                };
            });
        },
        bindThemesButtons: function() {
            $('#narcos').on('click', function() {
                Memory.themePathName = 'narcos';
                });
            $('#la-casa-de-papel').on('click', function () {
                Memory.themePathName = 'la casa de papel';
            });
            $('.themes-buttons').on('click', function () {
                $('#welcome-screen').hide();
                $('#container').show();
                if(Memory.audio === null) {
                    Memory.audio = document.createElement('audio');
                    Memory.audio.id = 'audio';
                    Memory.audio.type = 'audio/mpeg';
                }
                Memory.audio.volume = 0.5;
                Memory.audio.src = `./media/theme ${Memory.themePathName}/audio.mp3`;
                Memory.audio.preload = 'auto';
                Memory.audio.loop = true;
                Memory.audio.autoplay = true;
                Memory.coverImagePath = `theme ${Memory.themePathName}/cover.jpg`;
                Memory.backCardPath = `theme ${Memory.themePathName}/back_card.png`;
                for(var i=0; i < Memory.difficultyObj.length; i++) {
                    Memory.imageArray.push(`theme ${Memory.themePathName}/${Memory.difficultyObj.difficulty}/${i + 1}.jpg`);
                }
                Memory.addImagesToCards();
                Memory.shuffleListOfCards();
                Memory.setBackgroundImage();
                Memory.bindWinCondition();
                Memory.bindLogicToCards();
            });
        },
        printScoreTable: function(difficulyInput, nameInput, wrongGuessesInput) {
            if(localStorage.playersRecord) {
                Memory.playersRecord = JSON.parse(localStorage.playersRecord);
            }
            var table = document.getElementById('table-score');
            var records = document.getElementById("players-record");
            for(var i=0; i < Memory.playersRecord.length; i++) {
                var row = records.insertRow();
                var difficultyCell = row.insertCell(0);
                var nameCell = row.insertCell(1);
                var wrongGuessesCell = row.insertCell(2);
                difficultyCell.innerHTML = Memory.playersRecord[i].difficulty;
                nameCell.innerHTML = Memory.playersRecord[i].name;
                wrongGuessesCell.innerHTML = Memory.playersRecord[i].wrongGuesses;
            }
            if(difficulyInput === 'easy' &&
            (Memory.playersRecord[0].wrongGuesses === null  || wrongGuessesInput < Memory.playersRecord[0].wrongGuesses)) {
                table.rows[1].cells[1].innerHTML = nameInput;
                Memory.playersRecord[0].name = nameInput;
                table.rows[1].cells[2].innerHTML = wrongGuessesInput;
                Memory.playersRecord[0].wrongGuesses = wrongGuessesInput;
            } else if (difficulyInput === 'medium' &&
                (Memory.playersRecord[1].wrongGuesses === null || wrongGuessesInput < Memory.playersRecord[1].wrongGuesses)) {
                table.rows[2].cells[1].innerHTML = nameInput;
                Memory.playersRecord[1].name = nameInput;
                table.rows[2].cells[2].innerHTML = wrongGuessesInput;
                Memory.playersRecord[1].wrongGuesses = wrongGuessesInput;
            } else if (difficulyInput === 'hard' &&
                (Memory.playersRecord[2].wrongGuesses === null || wrongGuessesInput < Memory.playersRecord[2].wrongGuesses)) {
                table.rows[3].cells[1].innerHTML = nameInput;
                Memory.playersRecord[2].name = nameInput;
                table.rows[3].cells[2].innerHTML = wrongGuessesInput;
                Memory.playersRecord[2].wrongGuesses = wrongGuessesInput;
            }
            localStorage.playersRecord = JSON.stringify(Memory.playersRecord);
        },
        runGame: function () {
            Memory.bindTryAgainButton();
            Memory.bindPlayGameButton();
            Memory.bindDifficultyButtons();
            Memory.bindThemesButtons();
        }
    }; // end of Memory Object

    Memory.runGame();
});