import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Hello from './Hello';

describe('Hello World:', function () {
  it('renders without exploding', () => {
    expect(shallow(<Hello />)).toHaveLength(1);
  });

  it('should render with default text', function () {
    const component = shallow(<Hello />);

    expect(component).toIncludeText('Hiya');
    expect(component).toIncludeText('Bud :)');
  });

  it('should render with our props', function () {
    const component = shallow(
      <Hello friend="Fred"/>
    );

    expect(component).toIncludeText('Hiya');
    expect(component).toIncludeText('Fred');
    expect(component).not.toIncludeText('Bud :)');
  })

  it('should render to match the snapshot', function () {
    const component = renderer.create(
      <Hello friend="Fritz"/>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

});
