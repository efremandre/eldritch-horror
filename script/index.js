'use stript';
import ancientsData from "../data/ancients.js";
import cardsDataGreen from "../data/mythicCards/green/greenCards.js";
import cardsDataBrown from "../data/mythicCards/brown/brownCards.js";
import cardsDataBlue from "../data/mythicCards/blue/blueCards.js";

console.log('Hi guys');

const ancientCard = document.querySelectorAll('.ancient__card');
const ancient = document.querySelector('.ancient');
const ancientImg = document.querySelector('.ancient__img');
const stack = document.querySelector('.setap__stack');
const stackImg = document.querySelector('.setap__stack-img');

const btnBlock = document.querySelector('.main__button');
const btnСhoiceAncient = document.querySelector('.btnСhoiceAncient');
const btnReolad = document.querySelector('.btnReolad');
const btnOpenCard = document.querySelector('.btnOpenCard');

const stageText = document.querySelectorAll('.counter__text');

const greenStage1 = document.querySelector('.counter__green-stage1');
const greenStage2 = document.querySelector('.counter__green-stage2');
const greenStage3 = document.querySelector('.counter__green-stage3');

const brownStage1 = document.querySelector('.counter__brown-stage1');
const brownStage2 = document.querySelector('.counter__brown-stage2');
const brownStage3 = document.querySelector('.counter__brown-stage3');

const blueStage1 = document.querySelector('.counter__blue-stage1');
const blueStage2 = document.querySelector('.counter__blue-stage2');
const blueStage3 = document.querySelector('.counter__blue-stage3');

const cardDeck = [];

let ancientId = 'Not ID';

// сохраняем в lokalStorage
function setLocalStorigesId() {
	localStorage.setItem('nameAncient', ancientId);
}

// получаем древнего из lokalStorage
function getLocalStorigesId() {
	let id = localStorage.getItem('nameAncient');
	return id;
}

let ancientLocalStId = getLocalStorigesId();


// отключаем кнопку выбрать до выбора древнего
function chekButton() {
	btnСhoiceAncient.removeAttribute('disabled');
	btnСhoiceAncient.classList.remove('disabled');
}

// функция для стилей при выборе карточек
function addRemoveFocus() {
	ancientCard.forEach((elem) => {
		elem.addEventListener('click', () => {
			ancientCard.forEach(el => {
				el.classList.remove('focus');
				el.classList.add('antifocus')
			});
			elem.classList.add('focus');
			elem.classList.remove('antifocus')
			chekButton();
		})
	})
}

addRemoveFocus();

// кнопки получения объекта с инфой о нужных карточках, удаление ненужных карточек и перезагрузка страницы
if (btnСhoiceAncient) {
	btnСhoiceAncient.addEventListener('click', choiceBtn);
	btnСhoiceAncient.addEventListener('click', removeCard);
	btnReolad.addEventListener('click', reloadBtn);
}

// получаем id древнего, чтобы получить кол-во нужных карточек
function getIdAncients() {
	ancientCard.forEach((elem) => {
		elem.addEventListener('click', (ev) => {
			ancientId = ev.target.id;
			console.log(ancientId)
			setLocalStorigesId();
		})
	})

	return ancientId;
}

getIdAncients();

// перемешиваение карт
function randomaserDeck(deck) {
	for (let i = deck.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

// добавление карт в новую колоду
function creatSubDeck(length, deck, stage) {
	for (let i = 0; i < length; i++) {
		let res = deck.pop();
		stage.push(res)
	}
}

// замешиваем колоду
function stageCardsById(id) {
	const ancient = ancientsData.filter(({ name }) => name === id)[0];
	const stages = {};

	for (const [name, value] of Object.entries(ancient)) {
		if (name.endsWith("Stage")) stages[name] = value;
	}

	for (const stage of Object.values(stages)) {
		const temp = [];
		for (const [type, count] of Object.entries(stage)) {
			if (type.startsWith("green")) {
				randomaserDeck(cardsDataGreen);
				for (let i = 0; i < count; i++) {
					temp.push(cardsDataGreen.pop());
				}
			}
			if (type.startsWith("blue")) {
				randomaserDeck(cardsDataBlue);
				for (let i = 0; i < count; i++) {
					temp.push(cardsDataBlue.pop());
				}
			}
			if (type.startsWith("brown")) {
				randomaserDeck(cardsDataBrown);
				for (let i = 0; i < count; i++) {
					temp.push(cardsDataBrown.pop());
				}
			}
		}

		randomaserDeck(temp);
		cardDeck.push(temp);
	}

	console.log(cardDeck)
	return cardDeck;
}

// собираем массив из карточек, происходит по нажатию кнопки "ЗАМЕШАТЬ"
function creatCardDeck() {
	stageCardsById(ancientId); // функция в которой создаются все три колоды и складываются в одну общую колоду

	localStorage.setItem('deck', JSON.stringify(cardDeck)); // сохранил в localStorage всю стопку для переноса на след. страницу
	return cardDeck;
}

// замешиваем колоду карт
function choiceBtn() {
	creatCardDeck();
}

// добавляем выбранную карту на следующей страничке
function addInCardNextPage() {
	if (ancientImg.src === '') {
		ancientImg.src = `./assets/Ancients/${ancientLocalStId}.png`;
	}
}

addInCardNextPage();

// удаление ненужных карточек
function removeCard() {
	btnBlock.classList.add('down');
	ancientCard.forEach((elem) => {
		elem.classList.add('up');
		makeTransition();
	})
}

// отложить переход на след. страничку чтобы отыграла анимация удаления ненужных карточек
function makeTransition() {
	setTimeout(() => {
		window.location.href = 'next.html';
	}, 500);
}

// кнопка перезагрузки странички
function reloadBtn() {
	location.reload();
	return false;
}

// открываем карточки из стопки
if (btnOpenCard) {
	btnOpenCard.addEventListener('click', openCard);
}

// достаем из local storiges массив с картами
let i = 0;
let newDeckCard = [];

if (localStorage.getItem('deck')) {
	newDeckCard = JSON.parse(localStorage.getItem('deck'));
	console.log(newDeckCard)
}

console.log(newDeckCard)

function countColorCardSt1() {
	let greenCount = 0;
	let brownCount = 0;
	let blueCount = 0;

	newDeckCard[0].forEach(elem => {
		if (elem.color === 'green') {
			greenCount++;
		}
		greenStage1.innerHTML = greenCount;

		if (elem.color === 'brown') {
			brownCount++;
		}

		brownStage1.innerHTML = brownCount;

		if (elem.color === 'blue') {
			blueCount++;
		}
		blueStage1.innerHTML = blueCount;
	})
}

function countColorCardSt2() {
	let greenCount = 0;
	let brownCount = 0;
	let blueCount = 0;

	newDeckCard[1].forEach(elem => {
		if (elem.color === 'green') {
			greenCount++;
		}
		greenStage2.innerHTML = greenCount;

		if (elem.color === 'brown') {
			brownCount++;
		}
		brownStage2.innerHTML = brownCount;

		if (elem.color === 'blue') {
			blueCount++;
		}
		blueStage2.innerHTML = blueCount;
	})
}

function countColorCardSt3() {
	let greenCount = 0;
	let brownCount = 0;
	let blueCount = 0;

	newDeckCard[2].forEach(elem => {
		if (elem.color === 'green') {
			greenCount++;
		}
		greenStage3.innerHTML = greenCount;

		if (elem.color === 'brown') {
			brownCount++;
		}
		brownStage3.innerHTML = brownCount;

		if (elem.color === 'blue') {
			blueCount++;
		}
		blueStage3.innerHTML = blueCount;
	})
}

// отображение в счетчике
function showDataCard() {
	if (greenStage1, brownStage1, blueStage1) {
		countColorCardSt1();
	}

	if (greenStage2, brownStage2, blueStage2) {
		// countColorCardSt2();
	}

	if (greenStage3, brownStage3, blueStage3) {
		// countColorCardSt3();
	}
}

document.addEventListener("DOMContentLoaded", showDataCard); // отображение кол-ва карт в счетчике при загрузки страницы

// берем карты из массива и показываем их на экран
function openCard() {
	if (newDeckCard[i].length) {
		let card = newDeckCard[i].pop();
		stackImg.src = card.cardFace;
	} else {
		i++;
	}
	showDataCard();
	changeDeckAndBtn();
}

// по окончанию колоды показываем затеменную рубашку каты, делаем кнопку открывания неактивной и меняем текс в кнопке "назад", переадаем функцию в openCard()
function changeDeckAndBtn() {
	if (!newDeckCard[0].length && !newDeckCard[1].length && !newDeckCard[2].length) {
		stackImg.src = 'assets/mythicCardBackground.png';
		stackImg.classList.add('antifocus');
		btnOpenCard.setAttribute('disabled', 'true');
		btnOpenCard.classList.add('disabled');
		btnReolad.innerHTML = 'Замешать ещё'
	}
}
