'use stript';
import ancientsData from "/eldritch-horror/data/ancients.js";

console.log('Hi guys');

const ancientCard = document.querySelectorAll('.ancient__card');
const btnСhoiceAncient = document.querySelector('.btnСhoiceAncient');

const cthulhuName = ancientsData[0].name;

const cthulhuStage1 = ancientsData[0].firstStage;
const cthulhuStage2 = ancientsData[0].secondStage;
const cthulhuStage3 = ancientsData[0].thirdStage;

let ancientId = 'Noname';

// функция для стилей при выборе карточек
function addRemoveFocus() {
	ancientCard.forEach((elem) => {
		elem.addEventListener('click', () => {
			ancientCard.forEach(el => { el.classList.remove('focus'); });
			elem.classList.add('focus');
		})
	})
}

addRemoveFocus();

// получаем id древнего, чтобы получить кол-во нужных карточек
function getIdAncients() {
	ancientCard.forEach((elem) => {
		elem.addEventListener('click', (ev) => {
			ancientId = ev.target.id;
			console.log(ancientId)
		})
	})
	return ancientId;
}

getIdAncients();

// кнопка получения объекта с инфой о нужных карточках
btnСhoiceAncient.addEventListener('click', choiceBtn);

function choiceBtn() {
	if (ancientId === cthulhuName) {
		console.log(cthulhuStage1)
	} else {
		console.log('no')
	}
}