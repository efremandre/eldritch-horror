'use stript';
import ancientsData from "/eldritch-horror/data/ancients.js";

console.log('Hi guys');

const ancientCard = document.querySelectorAll('.ancient__card');
const btnСhoiceAncient = document.querySelector('.btnСhoiceAncient');
const btnReolad = document.querySelector('.btnReolad');

let firstStage;
let secondStage;
let thirdStage;

let ancientId = 'Not ID';


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

// получаем name древнего из массива ancientsData
function getNameAncients() {

}

getNameAncients();

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
btnСhoiceAncient.addEventListener('click', removeCard);
btnReolad.addEventListener('click', reloadBtn);

function removeCard() {
	ancientCard.forEach((elem) => {
		if (elem.className === 'ancient__card') {
			elem.remove();
		}
	})
}

function showDataCard() {
	alert(`Этап 1: green ${firstStage.greenCards}, brown ${firstStage.brownCards}, blue ${firstStage.blueCards}\nЭтап 2: green ${secondStage.greenCards}, brown ${secondStage.brownCards}, blue ${secondStage.blueCards}\nЭтап 3: green ${thirdStage.greenCards}, brown ${thirdStage.brownCards}, blue ${thirdStage.blueCards}\n`);
}

function choiceBtn() {
	for (let i = 0; i < ancientsData.length; i++) {
		if (ancientId === ancientsData[i].name) {
			firstStage = ancientsData[i].firstStage;
			secondStage = ancientsData[i].secondStage;
			thirdStage = ancientsData[i].thirdStage;
		}
	}

	setTimeout(showDataCard, 2000);
}

function reloadBtn() {
	location.reload();
	return false;
}

