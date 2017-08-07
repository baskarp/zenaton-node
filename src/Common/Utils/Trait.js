// Mixin traits into an Object (another trait)
const mixin = (object, ...traits) => {
	let _traits = [];
	if (object._traits) {
		Array.prototype.push.apply(_traits, object._traits);
	}
	let props = {
		_traits: {
			value: _traits,
			writable: true,
			configurable: true
		}
	};
	for (let trait of traits) {
		if (trait._traits) {
			Array.prototype.push.apply(_traits, trait._traits);
		}
		for (let name of Object.getOwnPropertyNames(trait)) {
			if (name !== "_traits" && ! object.hasOwnProperty(name)) {
				props[name] = {
					value: trait[name],
					writable: true,
					configurable: true
				};
			}
		}
		_traits.push(trait);
	}
	Object.defineProperties(object, props);
	return object;
}

// Mixin traits into a class. class Foo extends mixinClass(Base, Trait1) {}
const mixinClass = (baseClass, ...traits) => {
	class traitedClass extends baseClass {};
	mixin.apply(this, [traitedClass.prototype].concat(traits));
	return traitedClass;
}

// Checks to see if a class or trait has a trait
const hasTrait = (object, trait) => {
	let _traits;
	if (typeof object === "function") {
		_traits = object.prototype._traits;
	} else {
		_traits = object._traits;
	}
	return Array.isArray(_traits) && _traits.indexOf(trait) >= 0;
}


export { mixin, mixinClass, hasTrait };