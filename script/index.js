'use stript';
import ancientsData from "/eldritch-horror/data/ancients.js";
import cardsDataGreen from "/eldritch-horror/data/MythicCards/green/index.js";
import cardsDataBrown from "/eldritch-horror/data/MythicCards/brown/index.js";
import cardsDataBlue from "/eldritch-horror/data/MythicCards/blue/index.js";

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

let firstStage;
let secondStage;
let thirdStage;

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

// отключаем кнопку выбрать до выбора древнего
function chekButton() {
	btnСhoiceAncient.removeAttribute('disabled');
	btnСhoiceAncient.classList.remove('disabled');
}

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
			setLocalStorigesId();
			console.log(ancientId) //*********************** */
		})
	})
	return ancientId;
}

getIdAncients();

// замешиваем колоду карт
function choiceBtn() {


	// for (let i = 0; i < ancientsData.length; i++) {
	// 	if (ancientId === ancientsData[i].name) {
	// 		firstStage = ancientsData[i].firstStage;
	// 		localStorage.setItem('greenCards1', firstStage.greenCards);
	// 		localStorage.setItem('brownCards1', firstStage.brownCards);
	// 		localStorage.setItem('blueCards1', firstStage.blueCards);

	// 		secondStage = ancientsData[i].secondStage;
	// 		localStorage.setItem('greenCards2', secondStage.greenCards);
	// 		localStorage.setItem('brownCards2', secondStage.brownCards);
	// 		localStorage.setItem('blueCards2', secondStage.blueCards);

	// 		thirdStage = ancientsData[i].thirdStage;
	// 		localStorage.setItem('greenCards3', thirdStage.greenCards);
	// 		localStorage.setItem('brownCards3', thirdStage.brownCards);
	// 		localStorage.setItem('blueCards3', thirdStage.blueCards);
	// 	}
	// }
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

// отображение в счетчике
function showDataCard() {
	if (greenStage1, brownStage1, blueStage1) {
		greenStage1.innerHTML = localStorage.getItem('greenCards1');
		brownStage1.innerHTML = localStorage.getItem('brownCards1');
		blueStage1.innerHTML = localStorage.getItem('blueCards1');
	}

	if (greenStage2, brownStage2, blueStage2) {
		greenStage2.innerHTML = localStorage.getItem('greenCards2');
		brownStage2.innerHTML = localStorage.getItem('brownCards2');
		blueStage2.innerHTML = localStorage.getItem('blueCards2');
	}

	if (greenStage3, brownStage3, blueStage3) {
		greenStage3.innerHTML = localStorage.getItem('greenCards3');
		brownStage3.innerHTML = localStorage.getItem('brownCards3');
		blueStage3.innerHTML = localStorage.getItem('blueCards3');
	}
}

showDataCard();

// собираем массив из карточек
function creatCardDeck() {
	//  1 этап
	function creatStage1(green, brown, blue) {
		const stage1 = [];

		green.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].firstStage.greenCards; i++) {
			let res = green.pop();
			stage1.push(res)
		}
		brown.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].firstStage.brownCards; i++) {
			let res = brown.pop();
			stage1.push(res)
		}
		blue.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].firstStage.blueCards; i++) {
			let res = blue.pop();
			stage1.push(res)
		}

		stage1.sort(() => Math.random() - 0.5);

		return cardDeck.push(stage1);
	}

	creatStage1(cardsDataGreen, cardsDataBrown, cardsDataBlue);

	//  2 этап
	function creatStage2(green, brown, blue) {
		const stage2 = [];

		green.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].secondStage.greenCards; i++) {
			let res = green.pop();
			stage2.push(res)
		}
		brown.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].secondStage.brownCards; i++) {
			let res = brown.pop();
			stage2.push(res)
		}
		blue.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].secondStage.blueCards; i++) {
			let res = blue.pop();
			stage2.push(res)
		}

		stage2.sort(() => Math.random() - 0.5);

		return cardDeck.push(stage2);
	}

	creatStage2(cardsDataGreen, cardsDataBrown, cardsDataBlue);

	//  3 этап
	function creatStage3(green, brown, blue) {
		const stage3 = [];

		green.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].thirdStage.greenCards; i++) {
			let res = green.pop();
			stage3.push(res)
		}
		brown.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].thirdStage.brownCards; i++) {
			let res = brown.pop();
			stage3.push(res)
		}
		blue.sort(() => Math.random() - 0.5);
		for (let i = 0; i < ancientsData[0].thirdStage.blueCards; i++) {
			let res = blue.pop();
			stage3.push(res)
		}

		stage3.sort(() => Math.random() - 0.5);

		return cardDeck.push(stage3);
	}

	creatStage3(cardsDataGreen, cardsDataBrown, cardsDataBlue);

	console.table(cardDeck[0])
	console.table(cardDeck[1])
	console.table(cardDeck[2])

	return cardDeck;
}

const mixStack = creatCardDeck();

localStorage.setItem('mixStack', mixStack);

// открываем карточки из стопки
if (btnOpenCard) {
	btnOpenCard.addEventListener('click', openCard);
}

let i = 0;

function openCard() {

	if (cardDeck[i].length || i++) {
		let elem = cardDeck[i].pop();
		stackImg.src = elem.cardFace;
		console.log(cardDeck[i].length)
		if (cardDeck[i].length === 0) {
			cardDeck.splice(0, 1);
		}
	}

	if (cardDeck.length === 0) {
		stackImg.src = 'assets/mythicCardBackground.png';
		stackImg.classList.add('antifocus');
		btnOpenCard.setAttribute('disabled', 'true');
		btnOpenCard.classList.add('disabled');
		btnReolad.innerHTML = 'Замешать ещё'
	}
}



