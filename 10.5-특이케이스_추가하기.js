{
  {
    class Site {
      constructor(customer) {
        this._customer = customer;
      }
      get customer() {
        // return this._customer;
        return this._customer === '미확인 고객'
          ? new UnkownCustomer()
          : this._customer; // 5. 특이케이스일 때 UnkownCustomer객체를 반환하도록 수정
      }
    }

    class Customer {
      get isUnknown() {
        return false;
      } // 1. 미확인 고객인지 나타내는 메서드 추가
      get name() {}
      get billingPlan() {}
      set billingPlan(arg) {}
      get paymentHistory() {}
    }

    // 2. 미확인 고객 전용 클래스 만들기
    class UnkownCustomer {
      get isUnknown() {
        return false;
      }
      get name() {
        // 6. name반환 메서드 추가
        return '거주자';
      }
      get billingPlan() {
        return CustomElementRegistry.billingPlans.basic;
      }
      set billingPlan(arg) {
        // 아무일도 일어나지 않는 세터
      }
      get paymentHistory() {
        return new NullPaymentHistory();
      }
    }

    // 8.
    class NullPaymentHistory {
      get weekDelinquentInlastYear() {
        return 0;
      }
    }

    const site = new Site(customerArg);
    const aCustomer = site.customer;

    // 클라이언트1
    {
      let customerName;
      // if (aCustomer === '미확인 고객') customerName = '거주자'; // 4. 케이스 확인을 isUnknown함수를 사용하도록 수정
      // if (isUnknown(aCustomer)) customerName = '거주자'; 7. 조건부 코드 삭제
      // else
      customerName = aCustomer.name;
    }
    // 클라이언트2
    {
      const plan =
        // aCustomer === '미확인 고객'
        isUnknown(aCustomer)
          ? CustomElementRegistry.billingPlans.basic
          : aCustomer.billingPlan;
    }
    // 클라이언트3
    {
      // if (aCustomer !== '미확인 고객') aCustomer.billingPlan = newPlan;
      if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;
    }
    // 클라이언트4
    {
      const weekDelinquent =
        // aCustomer === '미확인 고객'
        // isUnknown(aCustomer)
        //   ? 0
        //   : aCustomer.paymentHistory.weeksDelinquentInLastYear;
        aCustomer.paymentHistory.weekDelinquentInlastYear;
    }

    // 3. isUnkown함수
    function isUnknown(arg) {
      if (!(arg instanceof Customer || arg instanceof UnkownCustomer))
        throw new Error(`잘못된 값과 비교: <${arg}>`);

      return arg === '미확인 고객';
    }
  }

  /* ---------------------------------------- // 주석없는 버전 // ---------------------------------------- */
  {
    class Site {
      constructor(customer) {
        this._customer = customer;
      }
      get customer() {
        return this._customer === '미확인 고객'
          ? new UnkownCustomer()
          : this._customer;
      }
    }

    class Customer {
      get isUnknown() {
        return false;
      }
      get name() {}
      get billingPlan() {}
      set billingPlan(arg) {}
      get paymentHistory() {}
    }

    class UnkownCustomer {
      get isUnknown() {
        return false;
      }
      get name() {
        return '거주자';
      }
      get billingPlan() {
        return CustomElementRegistry.billingPlans.basic;
      }
      set billingPlan(arg) {}

      get paymentHistory() {
        return new NullPaymentHistory();
      }
    }

    class NullPaymentHistory {
      get weekDelinquentInlastYear() {
        return 0;
      }
    }

    const site = new Site(customerArg);
    const aCustomer = site.customer;

    // 클라이언트1
    {
      let customerName = aCustomer.name;
    }
    // 클라이언트2
    {
      const plan = isUnknown(aCustomer)
        ? CustomElementRegistry.billingPlans.basic
        : aCustomer.billingPlan;
    }
    // 클라이언트3
    {
      if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;
    }
    // 클라이언트4
    {
      const weekDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
    }

    function isUnknown(arg) {
      if (!(arg instanceof Customer || arg instanceof UnkownCustomer))
        throw new Error(`잘못된 값과 비교: <${arg}>`);

      return arg === '미확인 고객';
    }
  }
}

/* ---------------------------------------- // 객체 리터럴 이용하기 // ---------------------------------------- */
{
  class Site {
    constructor(customer) {
      this._customer = new Customer(customer);
    }
    get customer() {
      // return this._customer;
      return this._customer === '미확인 고객'
        ? createUnknownCustomer()
        : this._customer;
    }
  }

  class Customer {
    get isUnknown() {
      return false;
    }
    get name() {}
    get billingPlan() {}
    set billingPlan(arg) {}
    get paymentHistory() {}
  }

  // * 미확인 고객 확인 객체를 반환하는 함수. (* 불변으로 만들어야 한다. (freeze()를 이용! -> 아니면 클래스로 만들어야 한다.))
  function createUnknownCustomer() {
    return {
      isUnknown: true,
      name: '거주자',
      billingPlan: CustomElementRegistry.billingPlans.basic,
      paymentHistory: {
        weeksDelinquentInLastYear: 0,
      },
    };
  }

  function isUnknown(arg) {
    // return arg === '미확인 고객';
    return arg.isUnknown;
  }

  // 클라이언트1
  const aCustomer = site.customer;
  {
    // ...
    // let customerName;
    // if (isUnknown(aCustomer)) customerName = '거주자';
    // else customerName = aCustomer.name;
    let customerName = aCustomer.name;
  }
  // 클라이언트2
  {
    // const plan = isUnknown(aCustomer)
    //   ? CustomElementRegistry.billingPlans.basic
    //   : aCustomer.billingPlan;
    const plan = aCustomer.billingPlan;
  }
  // 클라이언트3
  {
    // if (isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;
    const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
  }
  // 클라이언트4
  {
    const weekDelinquent = isUnknown(aCustomer)
      ? 0
      : aCustomer.paymentHistory.weeksDelinquentInLastYear;
  }
}

/* ---------------------------------------- // 변환 함수 이용하기 // ---------------------------------------- */
{
  // * 변환 함수에 통과시킨 데이터 구조를 활용한다.

  // site = enrichSite(rawSite) // rawSite는 json형식과 같은 데이터 구조가 담긴 레코드이다.
  // const aCustomer = site.customer

  function enrichSite(aSite) {
    const result = _.cloneDeep(aSite);
    const unknownCustomer = {
      isUnknown: true,
      name: '거주자',
      billingPlan: registry.billingPlans.basic,
      paymentHistory: {
        weeksDelinquentInLastYear: 0,
      },
    };

    if (isUnknown(result.customer))
      result.customer =
        unknownCustomer; // 함수 내부에서 isUnknown함수가 사용된다.
    else result.customer.isUnknown = false;
    return result;
  }
}
