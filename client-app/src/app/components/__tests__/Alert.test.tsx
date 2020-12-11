import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from '../Alert';

describe('Alert component', () => {
  test('should return nothing if not visible', () => {
    // Act
    const { container } = render(<Alert isVisible={false}></Alert>);

    // Assert
    expect(container.hasChildNodes()).toBeFalsy();
  });

  test('should show message passed as a child if visible', () => {
    // Arrange
    const message = 'Hello from alert!';

    // Act
    const { getByText } = render(<Alert isVisible={true}>{message}</Alert>);

    // Assert
    expect(getByText(message)).toBeInTheDocument();
  });
});
