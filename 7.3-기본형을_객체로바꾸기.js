class Order {
  constructor(data) {
    this._priority = data.priority;
  }
  get priorityString() {
    return this._priority.toString();
  }
  set priority(aString) {
    return (this._priority = new Priority(aString));
  }
}

class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
  }
}

const orders = new Order(data);
const highPriorityCount = orders.filter(
  (o) => 'high' === o.priorityString || 'rush' === o.priorityString
).length;
