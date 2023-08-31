function elem(id) {
	return document.getElementById(id);
}

let lostBox = elem("lose_box");
let retryBtn = elem("retry_btn");
let winBox = elem("win_box");
let againBtn = elem("again_btn");

retryBtn.onclick = () => {
	initGame();
};
againBtn.onclick = () => {
	initGame();
};

class NumberGenerator {
	constructor(min, max, did) {
		this.display = elem(did);
		this.number = 0;
		this.minValue = min;
		this.maxValue = max;
	}

	getRandomInt() {
		let min = Math.ceil(this.minValue);
		let max = Math.floor(this.maxValue);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	generate() {
		let num = this.getRandomInt();
		this.number = num;
		this.display.innerText = num;

		let done = true;
		for (let i = 0; i < GAME_STATE.fields.length; i++) {
			const f = GAME_STATE.fields[i];
			if (f.value == num) return this.generate();
			if (f.value == null) {
				done = false;
			}
		}
		if (done) {
			winBox.style.display = "unset";
			return;
		}

		let pa = false;
		for (let i = 0; i < 20; i++) {
			if (canPlaceHere(num, i)) {
				GAME_STATE.fields[i].field.style.color = "green";
				pa = true;
			} else {
				GAME_STATE.fields[i].field.style.color = "red";
			}
		}
		if (!pa) {
			lostBox.style.display = "unset";
		}
	}
	get() {
		return this.number;
	}
}

let GAME_STATE = {
	generator: new NumberGenerator(1, 999, "number_display"),
	fields: [],
};
function initGame() {
	GAME_STATE.fields = [];
	lostBox.style.display = "none";
	winBox.style.display = "none";

	for (let i = 1; i <= 20; i++) {
		let e = elem("field_" + i);
		let f = elem("num_" + i);

		e.onclick = () => {
			placeOnField(i - 1);
		};

		f.innerText = "---";

		GAME_STATE.fields.push({ field: e, value: null, text: f });
	}
	GAME_STATE.generator.generate();
}
initGame();

function placeOnField(id) {
	let currentNum = GAME_STATE.generator.get();

	if (!canPlaceHere(currentNum, id)) return;

	GAME_STATE.fields[id].text.innerText = currentNum;
	GAME_STATE.fields[id].value = currentNum;
	GAME_STATE.fields[id].field.onclick = () => {};

	GAME_STATE.generator.generate();
}

function canPlaceHere(num, id) {
	let ok = true;
	if (GAME_STATE.fields[id].value !== null) return false;
	for (let i = 0; i < id; i++) {
		const field = GAME_STATE.fields[i];
		if (field.value !== null) {
			if (field.value > num) {
				ok = false;
			}
		}
	}
	for (let i = id; i < GAME_STATE.fields.length; i++) {
		const field = GAME_STATE.fields[i];
		if (field.value !== null) {
			if (field.value < num) {
				ok = false;
			}
		}
	}
	return ok;
}
