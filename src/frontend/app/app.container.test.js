import chai from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import {createStore} from 'redux';

import reducers from 'reducers';

chai.use(chaiEnzyme());

global.jestExpect = global.expect;
global.expect = chai.expect;

// Components
import ConnectedAppContainer, {AppContainer} from './app.container';

describe('>>> APP CONTAINER --- shallow component with mock store', () => {
  let store, wrapper;

  beforeEach(() => {
    store = createStore(reducers);
    
    wrapper = shallow(
      <ConnectedAppContainer store={store} />
    );
  });

  it('+++ render the DUMP component', () => {
    jestExpect(wrapper.length).toEqual(1);
  });

  it('+++ contains LinearProgressbar component', () => {
    let find = wrapper.find(AppContainer);
    expect(
      find
    ).to.have.length(1);
  });
});