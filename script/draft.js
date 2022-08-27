function randomDeck() {
	//  1 этап
	function creatStage1(green, brown, blue) {
		const stage1 = [];

		randomaserDeck(green); // перемешали
		creatSubDeck(dataNumberCard[0], green, stage1); // добавили в колоду этапа

		randomaserDeck(brown);
		creatSubDeck(dataNumberCard[1], brown, stage1);

		randomaserDeck(blue);
		creatSubDeck(dataNumberCard[2], blue, stage1);

		randomaserDeck(stage1); // снова перемешали всю колоду

		return cardDeck.push(stage1); // запушили в колоду в стопку
	}

	//  2 этап
	function creatStage2(green, brown, blue) {
		const stage2 = [];

		randomaserDeck(green); // перемешали
		creatSubDeck(dataNumberCard[3], green, stage2); // добавили в колоду этапа

		randomaserDeck(brown);
		creatSubDeck(dataNumberCard[4], brown, stage2);

		randomaserDeck(blue);
		creatSubDeck(dataNumberCard[5], blue, stage2);

		randomaserDeck(stage2); // снова перемешали всю колоду

		return cardDeck.push(stage2); // запушили в колоду в стопку
	}

	//  3 этап 
	function creatStage3(green, brown, blue) {
		const stage3 = [];

		randomaserDeck(green); // перемешали
		creatSubDeck(dataNumberCard[6], green, stage3); // добавили в колоду этапа

		randomaserDeck(brown);
		creatSubDeck(dataNumberCard[7], brown, stage3);

		randomaserDeck(blue);
		creatSubDeck(dataNumberCard[8], blue, stage3);

		randomaserDeck(stage3); // снова перемешали всю колоду

		return cardDeck.push(stage3); // запушили в колоду в стопку
	}

	creatStage1(cardsDataGreen, cardsDataBrown, cardsDataBlue); // функция создания колоды для уровня 
	creatStage2(cardsDataGreen, cardsDataBrown, cardsDataBlue);
	creatStage3(cardsDataGreen, cardsDataBrown, cardsDataBlue);

}


// узнаем нужное для древнег кол - во карт
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
/**
 * Собирает все карты древнего.
 * @param {number} id Идентификатор древнего
 * @returns Массив из 9 карт.
 */
function setDataAnc(id) {
	const ancient = ancientsData.filter(({ name }) => name === id)[0];

	for (const [name, value] of Object.entries(ancient)) {
		if (name.endsWith("Stage")) {
			for (const number of Object.values(value)) {
				dataNumberCard.push(number);
			}
		}
	}

	return dataNumberCard;
}