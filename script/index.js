'use stript';
import ancientsData from "./data/ancients.js";
import cardsDataGreen from "./data/MythicCards/green/index.js";
import cardsDataBrown from "./data/MythicCards/brown/index.js";
import cardsDataBlue from "./data/MythicCards/blue/index.js";

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
const dataNumberCard = [];

let greenCardsNum = 0;
let blueCardsNum = 0;
let brownCardsNum = 0;

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
			console.log(ancientId);//*********************** */
			setLocalStorigesId();
			setDataAnc();
		})
	})
}

getIdAncients();

// узнаем нужное для древнег кол-во карт

console.log(ancientId)

function setDataAnc() {

	for (let key in ancientsData) {
		if (ancientId === ancientsData[key].name) {
			if (dataNumberCard.length === 0) {
				dataNumberCard.push(ancientsData[key].firstStage.greenCards);
				dataNumberCard.push(ancientsData[key].firstStage.brownCards);
				dataNumberCard.push(ancientsData[key].firstStage.blueCards);

				dataNumberCard.push(ancientsData[key].secondStage.greenCards);
				dataNumberCard.push(ancientsData[key].secondStage.brownCards);
				dataNumberCard.push(ancientsData[key].secondStage.blueCards);

				dataNumberCard.push(ancientsData[key].thirdStage.greenCards);
				dataNumberCard.push(ancientsData[key].thirdStage.brownCards);
				dataNumberCard.push(ancientsData[key].thirdStage.blueCards);

			} else if (dataNumberCard.length !== 0) { // костыль добавил потому что пушится сверху, а не заменяется, если выбрать другую карту древнего
				dataNumberCard.splice(0, 9);

				dataNumberCard.push(ancientsData[key].firstStage.greenCards);
				dataNumberCard.push(ancientsData[key].firstStage.brownCards);
				dataNumberCard.push(ancientsData[key].firstStage.blueCards);

				dataNumberCard.push(ancientsData[key].secondStage.greenCards);
				dataNumberCard.push(ancientsData[key].secondStage.brownCards);
				dataNumberCard.push(ancientsData[key].secondStage.blueCards);

				dataNumberCard.push(ancientsData[key].thirdStage.greenCards);
				dataNumberCard.push(ancientsData[key].thirdStage.brownCards);
				dataNumberCard.push(ancientsData[key].thirdStage.blueCards);
			}
		}
	}

	console.log(dataNumberCard)
	return dataNumberCard;
}

// собираем массив из карточек
function creatCardDeck() {
	//  1 этап
	function creatStage1(green, brown, blue) {
		const stage1 = [];

		green.sort(() => Math.random() - 0.5);
		for (let i = 0; i < dataNumberCard[0]; i++) {
			let res = green.pop();
			stage1.push(res)
		}
		brown.sort(() => Math.random() - 0.5);
		for (let i = 0; i < dataNumberCard[1]; i++) {
			let res = brown.pop();
			stage1.push(res)
		}
		blue.sort(() => Math.random() - 0.5);
		for (let i = 0; i < dataNumberCard[2]; i++) {
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
		for (let i = 0; i < dataNumberCard[3]; i++) {
			let res = green.pop();
			stage2.push(res)
		}
		brown.sort(() => Math.random() - 0.5);
		for (let i = 0; i < dataNumberCard[4]; i++) {
			let res = brown.pop();
			stage2.push(res)
		}
		blue.sort(() => Math.random() - 0.5);
		for (let i = 0; i < dataNumberCard[5]; i++) {
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
		for (let i = 0; i < dataNumberCard[6]; i++) {
			let res = green.pop();
			stage3.push(res)
		}
		brown.sort(() => Math.random() - 0.5);
		for (let i = 0; i < dataNumberCard[7]; i++) {
			let res = brown.pop();
			stage3.push(res)
		}
		blue.sort(() => Math.random() - 0.5);
		for (let i = 0; i < dataNumberCard[8]; i++) {
			let res = blue.pop();
			stage3.push(res)
		}

		stage3.sort(() => Math.random() - 0.5);

		return cardDeck.push(stage3);
	}

	creatStage3(cardsDataGreen, cardsDataBrown, cardsDataBlue);

	localStorage.setItem('deck', JSON.stringify(cardDeck));
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

// открываем карточки из стопки
if (btnOpenCard) {
	btnOpenCard.addEventListener('click', openCard);
}

let i = 0;

// достаем из local storiges массив с картами
let newDeckCard = [];

if (localStorage.getItem('deck')) {
	newDeckCard = JSON.parse(localStorage.getItem('deck'));
}

// берем карты из массива и показываем их на экран
function openCard() {
	if (newDeckCard[i].length || i++) {
		let elem = newDeckCard[i].pop();
		stackImg.src = elem.cardFace;
		console.log(newDeckCard[i].length)
		if (newDeckCard[i].length === 0) {
			newDeckCard.splice(0, 1);
		}
	}

	changeDeckAndBtn();
}

// по окончанию колоды показываем затеменную рубашку каты, делаем кнопку открывания неактивной и меняем текс в кнопке "назад", переадаем функцию в openCard()
function changeDeckAndBtn() {
	if (newDeckCard.length === 0) {
		stackImg.src = 'assets/mythicCardBackground.png';
		stackImg.classList.add('antifocus');
		btnOpenCard.setAttribute('disabled', 'true');
		btnOpenCard.classList.add('disabled');
		btnReolad.innerHTML = 'Замешать ещё'
	}
}



