import React from 'react';
import Matrix from './Matrix';
import { shallow } from 'enzyme';


describe('render', () => {
  it('renders four div with class row', () => {
    const wrapper = shallow(<Matrix/>);
    expect(wrapper.find('div.row')).to.have.lengthOf(4);
  });
});
