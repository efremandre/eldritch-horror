'use stript';
import ancientsData from "/eldritch-horror/data/ancients.js";

console.log('Hi guys');

const ancientCard = document.querySelectorAll('.ancient__card');
const btnСhoiceAncient = document.querySelector('.button__block');

const cthulhuStage1 = ancientsData[1].firstStage;
const cthulhuStage2 = ancientsData[1].secondStage;
const cthulhuStage3 = ancientsData[1].thirdStage;

let idAncient;

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

function getIdAncients() {
	ancientCard.forEach((elem) => {
		elem.addEventListener('click', (ev) => {
			idAncient = ev.target.id;
			console.log(idAncient)
		})
	})
	return idAncient;
}

getIdAncients();

btnСhoiceAncient.addEventListener('click', choiceBtn);

function choiceBtn() {
	if (idAncient == ancientsData[1].id) {
		console.log(cthulhuStage1)
	}
}

choiceBtn();