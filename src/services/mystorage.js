class MyStorage {
	constructor() {
		this.baseURL = "@GitCompare:";
	}

	get(name = null) {
		name = `${this.baseURL}` + name;
		return JSON.parse(localStorage.getItem(name));
	}

	set(name = null, value = null) {
		name = `${this.baseURL}` + name;
		return localStorage.setItem(name, JSON.stringify(value));
	}
}

export default new MyStorage();
