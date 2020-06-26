/* eslint-env jasmine, jest */

import React from 'react';
import View from '../';
import { render } from '@testing-library/react';

describe('components/View', () => {
  test('default', () => {
    const { container } = render(<View />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('non-text is rendered', () => {
    const children = <View testID="1" />;
    const { container } = render(<View>{children}</View>);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('raw text nodes as children', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error');
      console.error.mockImplementation(() => {});
    });

    afterEach(() => {
      console.error.mockRestore();
    });

    test('error logged (single)', () => {
      render(<View>hello</View>);
      expect(console.error).toBeCalled();
    });

    test('error logged (array)', () => {
      render(
        <View>
          <View />
          hello
          <View />
        </View>
      );
      expect(console.error).toBeCalled();
    });
  });

  describe('prop "hitSlop"', () => {
    test('renders a span with negative position offsets', () => {
      const { container } = render(<View hitSlop={{ top: 10, bottom: 10, right: 5, left: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('handles partial offsets', () => {
      const { container } = render(<View hitSlop={{ top: 10 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "pointerEvents"', () => {
    const { container } = render(<View pointerEvents="box-only" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
