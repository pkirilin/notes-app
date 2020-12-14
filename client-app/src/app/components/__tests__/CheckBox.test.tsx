import React from 'react';
import { fireEvent, Matcher, render } from '@testing-library/react';
import { CheckBox } from '../CheckBox';

describe('CheckBox component', () => {
  const checkboxMatcher: Matcher = (_, element) =>
    element.getAttribute('type') === 'checkbox';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render label with checkmark', () => {
    // Arrange
    const label = 'Test label';

    // Act
    const { getByText, getByDisplayValue } = render(
      <CheckBox label={label}></CheckBox>,
    );

    // Assert
    expect(getByText(label)).toBeInTheDocument();
    expect(getByDisplayValue(checkboxMatcher)).toBeInTheDocument();
  });

  test('should call onChange function on change event', () => {
    // Arrange
    const onChange = jest.fn();

    // Act
    const { getByDisplayValue } = render(
      <CheckBox onChange={onChange}></CheckBox>,
    );
    fireEvent.click(getByDisplayValue(checkboxMatcher));

    // Assert
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
