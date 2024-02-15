class Employee {
  constructor(name, type) {
    // this.validateType(type); // 5. 검증로직 삭제 -> switch문의 default로 대체
    this._name = name;
    // this._type = type; // 4. 슈퍼클래스 필드 삭제
  }
  // validateType(arg) { // 5. 검증로직 삭제 -> switch문의 default로 대체
  //   if (!['engineer', 'manager', 'salesperson'].includes(arg)) {
  //     throw new Error(`${arg}라는 직원 유형이 없습니다.`)
  //   }
  // }

  // get type() { // 4. 슈퍼클래스 게터 삭제
  //   return this._type;
  // }

  toString() {
    return `${this._name} (${this.type})`; // 1. 필드를 자가 캡슐화하기 : 이 클래스의 게터에서 사용.
  }
}

// 2. 값에 해당하는 서브클래스 만들기. 타입코드 게터 메서드를 오버라이드하여 리터럴값을 반환.
class Engineer extends Employee {
  get type() {
    return 'engineer';
  }
}

class Salesperson extends Employee {
  get type() {
    return 'salesperson';
  }
}

class Manager extends Employee {
  get type() {
    return 'maneger';
  }
}

function createEmployee(name, type) {
  // 3. 타입코드와 서브클래스를 매핑하는 선택로직 만들기
  switch (type) {
    case 'engineer':
      return new Engineer(name);
    case 'salesperson':
      return new Salesperson(name);
    case 'manager':
      return new Manager(name);
    default:
      throw new Error(`${type}라는 직원 유형이 없습니다.`);
  }
  // return new Employee(name,type)
}
