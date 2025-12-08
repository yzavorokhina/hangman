let state = JSON.parse(window.localStorage.getItem('state'));

if (!state){
    state = {
        topicIndex: null,
        wordIndex: null
    }
}

let currentWord = null;
let wordLetters = [];
let errorScore = 0;
let successScore = 0;

//TODO save game in local storage (in function):
let storedData = window.localStorage.getItem('saveGame');
let saveGame = storedData ? JSON.parse(storedData) : [];


//const alphabet = 'АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ';
const alphabet = 'абвгдеёжзиклмнопрстуфхцчшщьыъэюя';
const topics = ["Города", "Транспорт", "Спорт"];

const words = {
    "Города" : ["минск", "москва", "париж", "рим"],
    "Транспорт" : ["автомобиль", "самолет", "телега", "трамвай"],
    "Спорт" : ["футбол", "шахматы", "теннис", "бокс"]
}

const gameElements = {
    topic: document.getElementById("game-topic"),
    word: document.querySelector(".word"),
    letters: document.querySelector(".letters"),
    hungman: [
        document.getElementById("kran"),
        document.getElementById("head"),
        document.getElementById("body"),
        document.getElementById("left-leg"),
        document.getElementById("right-leg"),
        document.getElementById("left-arm"),
        document.getElementById("right-arm")
    ]   
}

function init(){
    let topicIndex = state.topicIndex !== null ? state.topicIndex : rand(0, topics.length-1);
    let wordsSet = words[topics[topicIndex]];
    let wordIndex = state.wordIndex !== null ? state.wordIndex : rand(0, wordsSet.length-1);

    currentWord = wordsSet[wordIndex];
    // currentWord = 'молоко';

    gameElements.topic.innerText = topics[topicIndex];

    for (let i = 0; i < currentWord.length; i++){
        let span = document.createElement("span");
        span.classList.add("word-letter");

        gameElements.word.append(span);

        let wordLetter = {
            letter: currentWord[i],
            element: span
        }

        wordLetters.push(wordLetter);
    }

    for (let i = 0; i < alphabet.length; i++){
        let button = document.createElement("button");
        button.classList.add("letter");
        button.innerText = alphabet[i];

        button.onclick = () => {
            checkLetter(alphabet[i]);

        //TODO remove active settings of button:
        // button.classList.remove("letter");
        // button.classList.add('pink');
        // button.disabled = true;
        button.onclick = null;
        }
        gameElements.letters.append(button);
    }
}

function* showHungmanPartGenerator(){
    for (let i = 0; i < gameElements.hungman.length; i++){
        gameElements.hungman[i].style.display = 'block';
        yield;
    }
}

let showHungmanPart = showHungmanPartGenerator();

function checkLetter(letter){
    //console.log(letter);
    let pos = 0;
    let indexes = []; //false

    while(true){
        let foundPos = currentWord.indexOf(letter, pos);

        if(foundPos == -1){
            break;
        }

        indexes.push(foundPos);
        pos = foundPos + 1;
    }

    if(indexes.length > 0) {
        // отображаем буквы:
        // console.log('1234143');
        for(let index of indexes){
            wordLetters[index].element.innerText = wordLetters[index].letter;
            successScore++;
        }

        if(successScore++ == currentWord.length){
            gameOver('Вы выиграли!!');
        }

    } else {
        // отрисовываем часть человека:
        // showHungmanPart();
        showHungmanPart.next();
        errorScore++;

        if(errorScore >= gameElements.hungman.length){
            gameOver('Вы проиграли!!');
        }
    }
}

function gameOver(message){
    let gameOver = document.querySelector(".game-over");
    gameOver.innerText = message;
    gameOver.classList.add("active");

    setTimeout(() => {
    window.location.reload();
    })
}

function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

init();