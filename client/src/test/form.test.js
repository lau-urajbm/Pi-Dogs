import React from 'react';
import Creation from '../components./Creation/Creation'
import { Provider } from 'react-redux';

describe('<Creation/>', ()=>{
    let wrapper;
  beforeEach(() => {
    wrapper = mount(<Provider><Creation /></Provider>);
  });
  it('debe tener un label que diga: "Nombre de la raza:"',()=>{
    expect(wrapper.find('label').at(0).text()).toEqual('Nombre de la raza:');
  })
})