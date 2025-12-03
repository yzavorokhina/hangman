import $ from 'jquery';
import '../scss/custom.scss';
import _ from 'lodash';

let conn = new XMLHttpRequest();

//XPathResult.open(method, URL) - инициализация
//conn.open('GET', 'https://punkapi.online/v3/beers/random');

//xhr.send([body]) for POST
// conn.send();
//xhr.getResponseHeader

//получение ответа:
//load/error/progress

conn.onerror = function(){
    console.log(`Не могу соединиться с целевым сервером`);
}

conn.onload = function(){
    if(this.status !== 200) {
        console.log(`Получен статус ответа ${this.status}. Ошибка!`);
        return;
    }
    console.log(this.response);
    renderBeerCard(this.response);
}

// функция смены фона:
let currentColor;
const colors = ['#7fff00', '#49d100', '#5ce000', '#6ef000', '#7fff00', '#90ff27', '#a0ff3d', '#6ef000', '#b1ff4f'];

function changeRandomBackground() {
  const currentColorIndex = colors.indexOf(currentColor);
  let nextColor = colors[currentColorIndex + 1] || colors[0];
  // get random color with lodash:
  const randomColor1= _.sample(colors);
  // const randomColor2 = Math.floor(Math.random() * (colors.length - 0 + 1)) + 0;
  nextColor = randomColor1;
  // console.log({randomColor2});

  document.body.style.background = nextColor;
  console.log(`new color is ${nextColor}`);
  currentColor = nextColor;
}

setInterval( () => {
    conn.open('GET', 'https://punkapi.online/v3/beers/random');
    conn.responseType = 'json';
    conn.send();
    changeRandomBackground();
}, 5000);

// TODO: use fetch for response:
// let response = fetch ('https://punkapi.online/v3/beers/random');
// console.log(response);

// функция отрисовки карточки с продуктом:
function renderBeerCard(randomBeer){
    console.log(randomBeer);

    const productCard = $(".product-card");
    const { image, name, description } = randomBeer;

    let beer_html = `<div>
                        <img src="https://punkapi.online/v3/images/${image}" alt="${name}">
                        <div>
                            <h5>${name}</h5>
                            <p>${description}</p>
                        </div>
                    </div>`;
    productCard.html(beer_html); 
}
