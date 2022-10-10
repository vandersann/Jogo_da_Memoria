const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const audio = new Audio('http://orteil.dashnet.org/cookieclicker/snd/click4.mp3');
const audioSucess = new Audio('http://www.classicgaming.cc/classics/dragons-lair/files/sounds/begin-tune.wav');
const audioCong = new Audio('http://orteil.dashnet.org/cookieclicker/snd/choir.mp3');

var btn = document.querySelector("#refresh");

const characters = [
    'beth',
    'jerry',
    'evil_morty',
    'morty',
    'birdperson',
    'pickle_rick',
    'rick',
    'summer',
    'mr_meeseeks',
    'mr_poopy',
    'squanchy',
    'snowball',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 24) {
        clearInterval(this.loop);
        audioCong.play()
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        audioSucess.play();

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

const revealCard = ({
    target
}) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;

    }

    if (firstCard == "" && !target.parentNode.className.includes("grid")) {

        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
        console.log(target.parentNode)
        audio.play();


    } else if (secondCard === "" && !target.parentNode.className.includes("grid")) {

        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
        console.log(target.parentNode)
        audio.play();



        checkCards();


    }
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('/img/cards/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;

}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}

btn.addEventListener("click", function () {

    location.reload();
});