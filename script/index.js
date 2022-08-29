'use stript';
import ancientsData from "../data/ancients.js";
import cardsDataGreen from "../data/mythicCards/green/greenCards.js";
import cardsDataBrown from "../data/mythicCards/brown/brownCards.js";
import cardsDataBlue from "../data/mythicCards/blue/blueCards.js";

console.log('\n\n (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ \n\n\n');

const ancientCard = document.querySelectorAll('.ancient__card');
const ancientImg = document.querySelector('.ancient__img');
const stackImg = document.querySelector('.setap__stack-img');

const btnBlock = document.querySelector('.main__button');
const btnСhoiceAncient = document.querySelector('.btnСhoiceAncient');
const btnPrev = document.querySelector('.btnPrev');
const titleDeck = document.querySelector('.title-deck');

const stageRow = document.querySelectorAll('.general-stage');

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

// получаем id древнего, чтобы получить кол-во нужных карточек
function getIdAncients() {
	ancientCard.forEach((elem) => {
		elem.addEventListener('click', (ev) => {
			ancientId = ev.target.id;
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
function creatSubDeck(iter, arr1, arr2) {
	for (let i = 0; i < iter; i++) {
		arr2.push(arr1.pop());
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
		const newArr = [];
		for (const [type, num] of Object.entries(stage)) {
			if (type.startsWith('green')) {
				randomaserDeck(cardsDataGreen); // перемешали колоду с зелеными картами
				creatSubDeck(num, cardsDataGreen, newArr); // собрали нужное зеленных кол-во карт
			}
			if (type.startsWith('brown')) {
				randomaserDeck(cardsDataBrown);
				creatSubDeck(num, cardsDataBrown, newArr);
			}
			if (type.startsWith('blue')) {
				randomaserDeck(cardsDataBlue);
				creatSubDeck(num, cardsDataBlue, newArr);
			}
		}

		randomaserDeck(newArr); // перемешали получившуюся колоду для этапа
		cardDeck.push(newArr); // засунули колоду в массив
	}

	return cardDeck;
}

// кнопки получения объекта с инфой о нужных карточках, удаление ненужных карточек и перезагрузка страницы
if (btnСhoiceAncient) {
	btnСhoiceAncient.addEventListener('click', choiceBtn);
	btnСhoiceAncient.addEventListener('click', removeCard);
}

// собираем массив из карточек и передаем на след страницу, происходит по нажатию кнопки "ЗАМЕШАТЬ"
function choiceBtn() {
	stageCardsById(ancientId); // функция в которой создаются все три колоды и складываются в одну общую колоду

	localStorage.setItem('deck', JSON.stringify(cardDeck)); // сохранил в localStorage всю стопку для переноса на след. страницу
	return cardDeck;
}


// добавляем выбранную карту на следующей страничке
function addInCardNextPage() {
	if (ancientImg.src === '') {
		ancientImg.src = `./assets/Ancients/${ancientLocalStId}.webp`;
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
	}, 300);
}

// работа с колодой и показ данных о колодах
function schowDeck() {
	// достаем из local storiges массив с картами
	let newDeckCard = [];

	if (localStorage.getItem('deck')) {
		newDeckCard = JSON.parse(localStorage.getItem('deck'));
	}

	// для кроссчека
	console.log(newDeckCard[0]);
	console.log('------- deck of cards for stage 1 -------\n');
	console.log(newDeckCard[1]);
	console.log('------- deck of cards for stage 2 -------\n');
	console.log(newDeckCard[2])
	console.log('------- deck of cards for stage 3 -------\n');
	//

	// считаем карточки по цветам
	const countNumber = [];

	function countCard(value) {
		newDeckCard.forEach(elem => {
			const temp = elem.filter(({ color }) => color === value);
			countNumber.push(temp.length);
		})

		return countNumber;
	}

	// отображение в счетчике
	function showCountNum() {
		if (greenStage1, greenStage2, greenStage3) {
			countCard('green');
			greenStage3.innerHTML = countNumber.pop();
			greenStage2.innerHTML = countNumber.pop();
			greenStage1.innerHTML = countNumber.pop();
		}

		if (brownStage1, brownStage2, brownStage3) {
			countCard('brown')
			brownStage3.innerHTML = countNumber.pop();
			brownStage2.innerHTML = countNumber.pop();
			brownStage1.innerHTML = countNumber.pop();
		}

		if (blueStage1, blueStage2, blueStage3) {
			countCard('blue');
			blueStage3.innerHTML = countNumber.pop();
			blueStage2.innerHTML = countNumber.pop();
			blueStage1.innerHTML = countNumber.pop();
		}
	}

	document.addEventListener("DOMContentLoaded", showCountNum); // отображение кол-ва карт в счетчике при загрузки страницы



	// открываем карточки из стопки
	if (stackImg) {
		stackImg.addEventListener('click', openCard);
	}

	function setDellayBtnOPenCard() {
		stackImg.removeEventListener('click', openCard);

		setTimeout(() => {
			stackImg.addEventListener('click', openCard)
		}, 500)
	}



	// берем карты из массива и показываем их на экран
	let i = 0;

	function openCard() {
		if (newDeckCard[i].length || i++) {
			let card = newDeckCard[i].pop();
			stackImg.src = card.cardFace;

			console.log(`open card: ${card.id}`);
		}

		showCountNum();
		arrStringCount();
		changeBtnPrev();
		setDellayBtnOPenCard();
	}



	// по окончанию карт в этапе делаем строку "неактивной"
	function arrStringCount() {
		stageRow.forEach((elem, index) => {
			if (newDeckCard[index].length === 0) {
				elem.classList.add('disabled');
			}
		})
	}

	// по окончанию колоды показываем затеменную рубашку каты, делаем кнопку открывания неактивной и меняем текс в кнопке "назад", переадаем функцию в openCard()
	function changeBtnPrev() {
		if (newDeckCard[2].length === 0) {
			stackImg.remove();
			btnPrev.innerHTML = 'Замешать ещё';
			titleDeck.innerHTML = 'Карты закончились';
		}
	}

}
schowDeck();


