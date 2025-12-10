let state = {
    currentWord: null,
    wordLetters: [],
    topicIndex: null,
    wordIndex: null,
    errorScore: 0,
    successScore: 0,
    totalErrorScore: 0,
    totalSuccessScore: 0,
    selectedLetters: []
}

let currentWord = null;
let wordLetters = [];
let selectedLetters = [];
let errorScore = 0;
let successScore = 0;
let totalErrorScore = 0;
let totalSuccessScore = 0;

//const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const topics = ["Города", "Транспорт", "Спорт"];

const words = {
    "Города": ["минск", "москва", "париж", "рим"],
    "Транспорт": ["автомобиль", "самолет", "телега", "трамвай"],
    "Спорт": ["футбол", "шахматы", "теннис", "бокс"]
}

const gameElements = {
    topic: document.getElementById("game-topic"),
    word: document.querySelector(".word"),
    letters: document.querySelector(".letters"),
    hungman: [
        document.getElementById("gallows"),
        document.getElementById("head"),
        document.getElementById("body"),
        document.getElementById("left-leg"),
        document.getElementById("right-leg"),
        document.getElementById("left-arm"),
        document.getElementById("right-arm")
    ]
}

async function clearGameState() {
    state.topicIndex = null;
    state.wordIndex = null;
    state.successScore = 0;
    state.errorScore = 0;
    state.currentWord = null;
    state.wordLetters = [];
    state.selectedLetters = [];
    console.log({ clearGameState: JSON.stringify(state) });
    console.log({ clearGameStateP: JSON.parse(JSON.stringify(state)) });
    window.localStorage.setItem('gameState', JSON.stringify(state));

    let newState = JSON.parse(window.localStorage.getItem('gameState'));
    
    console.log({ newState });
}

async function saveGameState() {
    window.localStorage.clear('gameState');
}

async function loadGameState() {
    let loadState = JSON.parse(window.localStorage.getItem('gameState'));
    
    if (loadState) {
        state = loadState;
    }
}

async function init() {
    await loadGameState();
    console.log({ state });
    console.log({ currentWord, selectedLetters });
    // let topicIndex = rand(0, topics.length - 1);
    let topicIndex = state.topicIndex !== null ? state.topicIndex : rand(0, topics.length - 1);
    let wordsSet = words[topics[topicIndex]];
    // let wordIndex = rand(0, wordsSet.length - 1);
    let wordIndex = state.wordIndex !== null ? state.wordIndex : rand(0, wordsSet.length - 1);

    selectedLetters = state.selectedLetters !== null ? state.selectedLetters : [];

    //totalErrorScore = state.totalErrorScore > 0 ? state.totalErrorScore : 0;
    //totalSuccessScore = state.totalSuccessScore > 0 ? state.totalSuccessScore : 0;

    state.topicIndex = topicIndex;
    state.wordIndex = wordIndex;
    window.localStorage.setItem('gameState', JSON.stringify(state));

    currentWord = wordsSet[wordIndex];
    // currentWord = 'молоко';

    gameElements.topic.innerText = topics[topicIndex];

    for (let i = 0; i < currentWord.length; i++) {
        let span = document.createElement("span");
        span.classList.add("word-letter");

        gameElements.word.append(span);

        let wordLetter = {
            letter: currentWord[i],
            element: span
        }
        wordLetters.push(wordLetter);
    }

    for (let i = 0; i < alphabet.length; i++) {
        let button = document.createElement("button");
        button.classList.add("letter");
        button.innerText = alphabet[i];

        if (selectedLetters.indexOf(alphabet[i]) !== -1) {
            button.classList.add('grey-letter');
            button.disabled = true;
            checkLetter(alphabet[i], true);
        }

        button.onclick = () => {
            checkLetter(alphabet[i]);

            // stylization of pressed letters:
            button.classList.add('grey-letter');
            button.disabled = true;
        }

        gameElements.letters.append(button);
    }
}

function* showHungmanPartGenerator() {
    for (let i = 0; i < gameElements.hungman.length; i++) {
        gameElements.hungman[i].style.display = 'block';
        yield;
    }
}

let showHungmanPart = showHungmanPartGenerator();

async function checkLetter(letter, init = false) {
    console.log(letter);
    let pos = 0;
    let indexes = []; //false

    while (true) {
        let foundPos = currentWord.indexOf(letter, pos);

        if (foundPos == -1) {
            break;
        }
        indexes.push(foundPos);
        pos = foundPos + 1;
    }

    console.log({indexes});

    if (indexes.length > 0) {
        // display letters:
        // console.log('1234143');
        for (let index of indexes) {
            wordLetters[index].element.innerText = wordLetters[index].letter;
            successScore++;
        }

        if (successScore == currentWord.length) {
            await clearGameState();
            gameOver(true);
        }

    } else {
        // draw a part of a hangman:
        // showHungmanPart();
        showHungmanPart.next();
        errorScore++;

        if (errorScore >= gameElements.hungman.length) {
            await clearGameState();
            gameOver(false);
        }
    }

    if (!init) {
        selectedLetters.push(letter);
        await saveGameState();
    }
}

function gameOver(result) {
    let gameOverElement = document.querySelector(".game-over");
    gameOverElement.classList.add("active");

    if (result) {
        //totalSuccessScore += 1;
        gameOverElement.innerText = 'Вы спасли человека!!';
        gameOverElement.classList.add('green-success');
    } else {
        //totalErrorScore += 1;
        gameOverElement.innerText = 'Вы проиграли!!';
        gameOverElement.classList.add('red-fail');
    }


    // setTimeout(() => {
    //     window.location.reload();
    // }, 5000);
}

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

init();