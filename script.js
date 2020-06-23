//Fetch dom elements and set variables
const cardsContainer = document.getElementById("cards-container"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  currentEl = document.getElementById("current"),
  showBtn = document.getElementById("show"),
  hideBtn = document.getElementById("hide"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card"),
  clearBtn = document.getElementById("clear"),
  addContainer = document.getElementById("add-container");

//Keep track of current card

let currentActiveCard = 0;

//Store DOM cards

const cardsEl = [];

// Store card data
const cardsData = getCardsData();

//Create all cards

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

//Create a single card

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  //Add to DOM cards

  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

//Show number of cards

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//Get cards from local storage

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

//Add card to local storage

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

//Event listeners

//Next button

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

//Prev button

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

//Show add container

showBtn.addEventListener("click", () => addContainer.classList.add("show"));

//Hide container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

//Add new card

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answer.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//Clear cards btn

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
