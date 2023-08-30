function elem(id) {
	return document.getElementById(id);
}
class NumberGenerator {
	/**
	 *
	 * @param {number} min Smallest number to get
	 * @param {number} max Biggest number to get
	 * @param {string} did ID of the Display element
	 */
	constructor(min, max, did, bid) {
		this.display = elem(did);
		this.number = 0;
		this.minValue = min;
		this.maxValue = max;

		this.generate();
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
	}
	get() {
		return this.number;
	}
}

let GAME_STATE = {
	generator: new NumberGenerator(
		1,
		999,
		"number_display",
		"number_gen_activate"
	),
	fields: [],
};

for (let i = 1; i <= 20; i++) {
	let e = elem("field_" + i);
	let f = elem("num_" + i);

	e.onclick = () => {
		placeOnField(i - 1);
	};

	GAME_STATE.fields.push({ field: e, value: null, text: f });
}

function placeOnField(id) {
	let currentNum = GAME_STATE.generator.get();
	GAME_STATE.fields[id].text.innerText = currentNum;
	GAME_STATE.fields[id].field.onclick = () => {};

	GAME_STATE.generator.generate();
}
