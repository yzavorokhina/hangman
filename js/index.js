let currentWord = null;
let wordLetters = [];

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
    let topicIndex = rand(0, topics.length-1);
    let wordsSet = words[topics[topicIndex]];
    let wordIndex = rand(0, wordsSet.length-1);

    currentWord = wordsSet[wordIndex];

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
        }

        gameElements.letters.append(button);
    }
}

function checkLetter(letter){
    //console.log(letter);
    let pos = 0;
    let indexes = [];

    while(true){
        let foundPos = currentWord.indexOf(letter, pos);

        if(foundPos == -1){
            break;
        }

        indexes.push(foundPos);
        pos = foundPos + 1;
    }

    if(indexes) {
        // отображаем буквы:

    } else {
        // отрисовываем часть человека:
        showHungmanPart();
    }

}

function showHungmanPart(){

    
}

function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

init();