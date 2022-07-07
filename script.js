let clothesNotWardrobe = [];
globalShelveId = 0;
globalTrempelId = 0;
globalHangerId = 0;

function generateShelveId() {
	globalShelveId++;
	return globalShelveId;
};

function generateTrempelId() {
	globalTrempelId++;
	return globalTrempelId;
};

function generateHangerId() {
	globalHangerId++;
	return globalHangerId;
};

class Wardrobe {
	constructor(numberOfShelves, numberOfTrempels) {
		this.addShelve(numberOfShelves);
		this.addTrempel(numberOfTrempels);
	}

	shelves = []
	maxShelves = 10
	trempels = []
	maxTrempels = 5

	removeShelve(shelveIdFound) {
		let shelveIndex = this.shelves.findIndex(shelve => shelve.shelveId == shelveIdFound);
		if (shelveIndex != -1) {
			this.shelves.splice(shelveIndex, 1);
		}
	}

	addShelve(numberOfShelves) {
		for (let i = 0; i < numberOfShelves; i++) {
			if (this.shelves.length < this.maxShelves) {
				let shelve = new Shelve(this.shelves);
				this.shelves.push(shelve);
			}
		}
	}

	removeTrempel(trempelIdFound) {
		let trempelIndex = this.trempels.findIndex(trempel => trempel.trempelId == trempelIdFound);
		if (trempelIndex != -1) {
			this.trempels.splice(trempelIndex, 1);
		}
	}

	addTrempel(numberOfTrempels) {
		for (let i = 0; i < numberOfTrempels; i++) {
			if (this.trempels.length < this.maxTrempels) {
				let trempel = new Trempel(this.trempels);
				this.trempels.push(trempel);
			}
		}
	}

	searchClothe(clotheFound) {
		for (let i = 0; i < this.shelves.length; i++) {
			let clotheFind = this.shelves[i].clotheShelve.find(clothe => clothe == clotheFound);
			let numberShelve = this.shelves[i].shelveId;
			if (clotheFind) {
				console.log('Одежда по полке c id:', numberShelve);
				return;
			}
		}

		for (let i = 0; i < this.trempels.length; i++) {
			let numberTrempel = this.trempels[i].trempelId;
			for (let j = 0; j < this.trempels[i].hangers.length; j++) {
				let clotheFind = this.trempels[i].hangers[j].clotheHanger.find(clothe => clothe == clotheFound);
				let numberHanger = this.trempels[i].hangers[j].hangerId;
				if (clotheFind) {
					console.log('Есть на тремпеле с id:', numberTrempel, ', на вешалке с id:', numberHanger);
					return;
				}
			}
		}
		console.log('В гардеробе нет');
	}
}

class Shelve {
	constructor(numberClothes) {
		this.addClothe(numberClothes);
		this.shelveId = generateShelveId();
	}
	maxClothesShelve = 10
	clotheShelve = []

	removeClothe(clotheIdFound) {
		let clotheIndex = this.clotheShelve.findIndex(clothe => clothe == clotheIdFound);
		if (clotheIndex != -1) {
			clothesNotWardrobe.push(this.clotheShelve[clotheIndex]);
			this.clotheShelve.splice(clotheIndex, 1);
		}
	}

	addClothe(numberClothes) {
		for (let i = 0; i < numberClothes; i++) {
			if ((this.clotheShelve.length < this.maxClothesShelve) && (clothesNotWardrobe.length != 0)) {
				let clothe = clothesNotWardrobe[clothesNotWardrobe.length - 1];
				clothesNotWardrobe.pop();
				this.clotheShelve.push(clothe);
			}
		}
	}
}

class Trempel {
	constructor(numberHangers) {
		this.addHangers(numberHangers);
		this.trempelId = generateTrempelId();
	}
	maxHangers = 4
	hangers = []

	removeHanger(hangerIdFound) {
		let hangerIndex = this.hangers.findIndex(hanger => hanger == hangerIdFound);
		if (hangerIndex != -1) {
			this.hangers.splice(hangerIndex, 1);
		}
	}

	addHangers(numberHangers, typeHanger) {
		for (let i = 0; i < numberHangers; i++) {
			if (this.hangers.length < this.maxHangers) {
				let hanger = new Hanger(typeHanger);
				this.hangers.push(hanger);
			}
		}
	}
}

class Hanger {
	constructor(typeHanger) {
		this.typeHanger = typeHanger;// 1 - 1 вещь, 2 - 2
		this.hangerId = generateHangerId();
		this.maxClothesHanger = this.typeHanger;
	}

	clotheHanger = []

	removeClothe(clotheFound) {
		let clotheIndex = this.clotheHanger.findIndex(clothe => clothe == clotheFound);
		if (clotheIndex != -1) {
			clothesNotWardrobe.push(this.clotheHanger[clotheIndex]);
			this.clotheHanger.splice(clotheIndex, 1);
		}
	}

	addClothe(numberClothe) {
		for (let i = 0; i < numberClothe; i++) {
			if ((this.clotheHanger.length < this.maxClothesHanger) && (clothesNotWardrobe.length != 0)) {
				let clothe = clothesNotWardrobe[clothesNotWardrobe.length - 1];
				clothesNotWardrobe.pop();
				this.clotheHanger.push(clothe);
			}
		}
	}
}

function addClotheNotWardrobe(counter) {
	for (let i = 0; i < counter; i++) {
		clothesNotWardrobe.push(i);
	}
};

addClotheNotWardrobe(41);
console.log('Одежда не в гардеробе:', clothesNotWardrobe);

let wardrobe1 = new Wardrobe(11, 6);
wardrobe1.removeShelve(6);
wardrobe1.removeTrempel(3);

wardrobe1.shelves.find(shelve => shelve.shelveId == 2)?.addClothe(5);
wardrobe1.shelves.find(shelve => shelve.shelveId == 3)?.addClothe(7);
wardrobe1.shelves.find(shelve => shelve.shelveId == 4)?.addClothe(11);

wardrobe1.shelves.find(shelve => shelve.shelveId == 3)?.removeClothe(30);

wardrobe1.trempels.find(trempel => trempel.trempelId == 1)?.addHangers(2, 2);
wardrobe1.trempels.find(trempel => trempel.trempelId == 2)?.addHangers(2, 2);
wardrobe1.trempels.find(trempel => trempel.trempelId == 4)?.addHangers(4, 1);

wardrobe1.trempels.find(trempel => trempel.trempelId == 1)?.hangers.find(hanger => hanger.hangerId == 1)?.addClothe(1);
wardrobe1.trempels.find(trempel => trempel.trempelId == 2)?.hangers.find(hanger => hanger.hangerId == 3)?.addClothe(2);
wardrobe1.trempels.find(trempel => trempel.trempelId == 4)?.hangers.find(hanger => hanger.hangerId == 6)?.addClothe(3);

wardrobe1.trempels.find(trempel => trempel.trempelId == 2)?.hangers.find(hanger => hanger.hangerId == 3)?.removeClothe(18);
wardrobe1.trempels.find(trempel => trempel.trempelId == 2)?.hangers.find(hanger => hanger.hangerId == 3)?.removeClothe(17);

console.log(wardrobe1);

wardrobe1.searchClothe(20);

console.log('Одежда не в гардеробе:', clothesNotWardrobe);