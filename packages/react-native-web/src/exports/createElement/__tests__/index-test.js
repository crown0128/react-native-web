/* eslint-env jasmine, jest */

import createElement from '..';
import React from 'react';
import { render, shallow } from 'enzyme';

describe('modules/createElement', () => {
  test('renders different DOM elements', () => {
    let component = render(createElement('span'));
    expect(component).toMatchSnapshot();
    component = render(createElement('main'));
    expect(component).toMatchSnapshot();
  });

  describe('prop "accessibilityRole"', () => {
    test('and string component type', () => {
      const component = shallow(createElement('span', { accessibilityRole: 'link' }));
      expect(component.find('a').length).toBe(1);
    });

    test('and function component type', () => {
      const Custom = () => <div />;
      const component = shallow(createElement(Custom, { accessibilityRole: 'link' }));
      expect(component.find('div').length).toBe(1);
    });

    const testRole = ({ accessibilityRole, disabled }) => {
      [{ key: 'Enter' }, { key: ' ' }].forEach(({ key }) => {
        test(`"onClick" is ${disabled ? 'not ' : ''}called when "${key}" key is pressed`, () => {
          const onClick = jest.fn();
          const component = shallow(
            createElement('span', { accessibilityRole, disabled, onClick })
          );
          component.find('span').simulate('keyPress', {
            isDefaultPrevented() {},
            nativeEvent: {},
            preventDefault() {},
            key
          });
          expect(onClick).toHaveBeenCalledTimes(disabled ? 0 : 1);
        });
      });
    };

    describe('value is "button" and disabled is "true"', () => {
      testRole({ accessibilityRole: 'button', disabled: true });
    });

    describe('value is "button" and disabled is "false"', () => {
      testRole({ accessibilityRole: 'button', disabled: false });
    });

    describe('value is "menuitem" and disabled is "true"', () => {
      testRole({ accessibilityRole: 'menuitem', disabled: true });
    });

    describe('value is "menuitem" and disabled is "false"', () => {
      testRole({ accessibilityRole: 'menuitem', disabled: false });
    });
  });
});
