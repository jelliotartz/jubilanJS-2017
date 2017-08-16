import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './EmployeeActionCreator'
import * as types from './EmployeeActionTypes'
import moxios from 'moxios'

/*
Let's take a look at what we are doing here.
  First we're testing that the synchronous actions are creating packets of type LIST and GET.
  Then in the asynchronous tests we are using moxios to http response for our axois requests,
    and we're using the redux-mock-store's configureMockStore
    to mock our redux store so we can dispatch or actions and test them.
  Finally, we are using those mocks to see that the async actions generate the packets we expect when dispatched.
*/

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('synchronous actions', () => {
  it('list should send objects', () =>{
    expect(
      actions.list(['p1', 'p2'])
    ).toEqual(
      {
        type: types.LIST,
        employees: ['p1', 'p2']
      }
    )
  });

  it('get should send object', () =>{
    expect(
      actions.get('p1')
    ).toEqual(
      {
        type: types.GET,
        employee: 'p1'
      }
    )
  });
});

describe('async actions', () => {
  beforeEach(function () {
    moxios.install()
  });

  afterEach(function () {
    moxios.uninstall()
  });

  it('creates LIST when fetching employees has been done', () => {
    moxios.stubRequest('/api/users', {
      status: 200,
      response: ['employee1', 'employee2']
    });


    const expectedActions = [
      {type: types.LIST, employees: ['employee1', 'employee2']}
    ]
    const store = mockStore({employees: []})

    return store.dispatch(actions.listEmployees())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  });


  it('create GET when requesting single employee', () => {
    moxios.stubRequest('/api/users/1', {
      status: 200,
      response: 'employee1'
    });


    const expectedActions = [
      {type: types.GET, employee: 'employee1'}
    ]
    const store = mockStore({employees: []})

    return store.dispatch(actions.getEmployee(1))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })

  });


  it('create GET when updating a employee', () => {
    moxios.stubRequest('/api/users/1', {
      status: 200,
      response: 'employee1'
    });

    const expectedActions = [
      {type: types.GET, employee: 'employee1'}
    ]
    const store = mockStore({employees: []})

    return store.dispatch(actions.updateEmployee({_id: 1}))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })

  });

  it('create GET when removing a employee', () => {
    moxios.stubRequest('/api/users/1', {
      status: 200,
      response: 'employee1'
    });

    const expectedActions = [
      {type: types.GET, employee: 'employee1'}
    ]
    const store = mockStore({employees: []})

    return store.dispatch(actions.removeEmployee({_id: 1}))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })

  });

  it('create GET when restoring a employee', () => {
    moxios.stubRequest('/api/users/1', {
      status: 200,
      response: 'employee1'
    });

    const expectedActions = [
      {type: types.GET, employee: 'employee1'}
    ]
    const store = mockStore({employees: []})

    return store.dispatch(actions.restoreEmployee({_id: 1}))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })

  });
});
