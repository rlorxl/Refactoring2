// const low = aRoom.daysTempRange.low;
// const high = aRoom.daysTempRange.high;
if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
  alert('방 온도가 지정 범위를 벗어났습니다.');

class HeatingPlan {
  withinRange(bottom, top) {
    return (
      bottom >= this._temperatureRange.low && top <= this._temperatureRange.high
    );
  }
  xxNEWwithinRange(aNumberRange) {
    // return this.withinRange(aNumberRange.low, aNumberRange.high)
    return (
      aNumberRange.low >= this._temperatureRange.low &&
      aNumberRange.high <= this._temperatureRange.high
    );
  }
}
