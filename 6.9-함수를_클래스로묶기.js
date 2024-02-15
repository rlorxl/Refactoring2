const reading = {
  customer: 'ivan',
  quantity: 10,
  month: 5,
  year: 2017,
};

// 클라이언트 1
{
  const aReading = acauireReading();
  const baseCharge = aReading.baseCharge;
}

// 클라이언트 2
{
  // const aReading = acauireReading();
  // const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
  const rawReading = acauireReading();
  const aReading = new Reading(rawReading);
  const taxableCharge = aReading.taxableCharge;
}

// 클라이언트 3
{
  const rawReading = acauireReading();
  const aReading = new Reading(rawReading);
  // const basicChargeAmount = calculateBaseCharge(aReading);
  const basicChtaargeAmount = aReading.baseCharge;

  // function calculateBaseCharge(aReading) {
  //   return baseRate(aReading.month, aReading.year);
  // }
}

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this.customer;
  }
  get quantity() {
    return this.quantity;
  }
  get month() {
    return this.month;
  }
  get year() {
    return this.year;
  }
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}
