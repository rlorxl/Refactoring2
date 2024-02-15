let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };
export function defaultOwner() {
  return new Person(defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

class Person {
  constructor(data) {
    this._lastname = data.lastName;
    this._firstname = data.firstName;
  }
  get lastName() {
    return this._lastname;
  }
  get firstName() {
    return this._firstname;
  }
}
