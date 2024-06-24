"use strict";

const tilesContainer = document.querySelector(".tiles");
const cardLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const lettersPickList = [...cardLetters, ...cardLetters];
const tileCount = lettersPickList.length;

// Game State
let firstCard = null;
let awaitingEndOfMove = false;

function buildCard(letter) {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("data-letter", letter);

  element.addEventListener("click", flipCard);

  return element;
}

// Flip card
function flipCard() {
  if (awaitingEndOfMove || this === firstCard) return;

  this.classList.add("flipped");
  this.style.backgroundColor = "#88D498";

  if (!firstCard) {
    firstCard = this;
    return;
  }

  awaitingEndOfMove = true;

  if (
    firstCard.getAttribute("data-letter") === this.getAttribute("data-letter")
  ) {
    // It's a match!

    setTimeout(() => {
      firstCard.classList.add("matched");
      this.classList.add("matched");
      resetCards();
    }, 500);
  } else {
    // Not a match

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      this.classList.remove("flipped");
      firstCard.style.backgroundColor = "";
      this.style.backgroundColor = "";
      resetCards();
    }, 1000);
  }
}

// Reset cards
function resetCards() {
  awaitingEndOfMove = false;
  firstCard = null;
}

// Build up the cards
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * lettersPickList.length);
  const letter = lettersPickList[randomIndex];
  const tile = buildCard(letter);

  lettersPickList.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
