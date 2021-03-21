// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

React.useLayoutEffect = React.useEffect;

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  const randomElement =
    '<Box><Box><Box id="content">{element}</div><div id="target" data-target-tag-name={target.tagName}></Box></Box></Box>';

  return {
    ...original,
    createPortal: (node: any) => randomElement,
  };
});
