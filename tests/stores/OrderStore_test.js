import Reflux from 'reflux';
import {
  storeIsDefined,
  storeHasData,
  storeHasMethod,
  storeCheckCommonUsage,
  storeHasDefaultValue,
  makeCheckStoreData,
  makeStoreHasMethod
}
from '../refluxTestHelpers';
import {
  expect
}
from 'chai';

import OrderStore from '../../app/stores/OrderStore';

describe('Order Store Test', () => {
  const successfulRes = {
    Success: true,
    Result: [1, 2, 3]
  };

  const errorMsg = 'error message';

  const failedRes = {
    Success: false,
    ErrorMsg: errorMsg
  };

  const checkOrderStoreData = makeCheckStoreData(OrderStore);
  const orderStoreHasMethod = makeStoreHasMethod(OrderStore);

  beforeEach(() => {
    OrderStore.data = {
      hintMessage: '',
      flag: '',
    };
  });

  it('has store', () => {
    storeIsDefined(OrderStore);
    storeHasData(OrderStore);
  });



  it('store has methods', () => {
    const methods = [
      'onListOrders',
      'onGetOrder',
      'onComfirmOrder',
      'onBookOrder',
      'onCloseOrder',
      'onFailed'
    ];
    methods.forEach((method) => {
      orderStoreHasMethod(method);
    })
  });
});