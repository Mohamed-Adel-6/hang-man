let letters = 'abcdefghijklmnopqrstuvwxyz';
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector('.letters');
lettersArray.forEach(letters => {
  let span = document.createElement("span");
  let letterNode = document.createTextNode(letters);
  span.classList.add('letter-box');
  span.appendChild(letterNode);
  lettersContainer.appendChild(span);
});
// object of word & category
let words = {
  programming: ['php', 'javascript', 'go', 'scale', 'python'],
  people: ['albert einstein', 'hitchcock', 'alexander', 'cleopatra'],
  countries: ['egypt', 'syria', 'yemen', 'qatar', 'palestine'],
  family: ["mohamed", "saeed", "boda", "yasen", "adel"],
};
// get random property 
let allKeys = Object.keys(words);
let randomPropertyNumber = Math.floor(Math.random() * allKeys.length);
let randomPropertyName = allKeys[randomPropertyNumber];
let randomPropValue = words[randomPropertyName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];

// set category info
document.querySelector('.category span').innerHTML = randomPropertyName;
let letterGuessCOntainer = document.querySelector('.letters-guess');
let lettersAndSpace = Array.from(randomValueName);
lettersAndSpace.forEach(letter => {
  let emptySpan = document.createElement('span');
  if (letter === " ") {
    emptySpan.className = 'has-space';
  };
  letterGuessCOntainer.appendChild(emptySpan);
});

// select all span
let guessSpan = document.querySelectorAll('.letters-guess span')
// set word attempts
let wordAttempts = 0;
// select the draw element
let theDraw = document.querySelector('.hang-man-draw')
// handing clicking on letters
let spanLength = 0;
document.addEventListener("click", (e) => {
  let states = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML;
    let theChosenWord = Array.from(randomValueName);
    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        states = true;
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter;
            spanLength++;
            if (spanLength === randomValueName.length) {
              winier()
              lettersContainer.classList.add('finished')
            }
            Array.from(randomValueName).forEach((e) => {
              if (e === " ") {
                if (spanLength === randomValueName.length - 1) {
                  winier()
                  lettersContainer.classList.add('finished')
                }
              }
            });
          };
        });
      };
    });
    // if letter is wrong
    if (states !== true) {
      wordAttempts++;
      theDraw.classList.add(`wrong-${wordAttempts}`);
      document.getElementById('fail').play();
      if (wordAttempts === 8) {
        endGame();
        lettersContainer.classList.add('finished')
      }
    } else {
      document.getElementById('success').play();
    };
  };
  function endGame() {
    let overlay = document.createElement('div');
    overlay.className='over-lay'
    let div = document.createElement('div')
    div.className = "popup";
    let textDiv = document.createTextNode(`Game Over the word is : ${randomValueName}`);
    let reload = document.createElement('button');
    reload.className = 'reload';
    let btnText = document.createTextNode('play agin')
    reload.appendChild(btnText);
    reload.onclick = function () {
      window.location.reload();
    }
    // append div & btn to page
    div.appendChild(textDiv);
    div.appendChild(reload);
    document.body.appendChild(div);
    document.body.appendChild(overlay);
    document.getElementById('over').play();
  } 
  function winier() {
    let overlay = document.createElement('div');
    overlay.className='over-lay'
    let div = document.createElement('div');
    div.className = "popup";
    let textDiv = document.createTextNode(` You win`);
    div.appendChild(textDiv);
    let pra = document.createElement('p');
    pra.className = 'pra';
    let praText = document.createTextNode(`your mistakes is ${wordAttempts}`);
    pra.appendChild(praText);
    let reload = document.createElement('button');
    reload.className = 'reload';
    let btnText = document.createTextNode('play agin')
    reload.appendChild(btnText);
    reload.onclick = function () {
      window.location.reload();
    }
    div.appendChild(pra);
    div.appendChild(reload);
    document.body.appendChild(div);
    document.body.appendChild(overlay);
    document.getElementById('win').play();
  }
});
