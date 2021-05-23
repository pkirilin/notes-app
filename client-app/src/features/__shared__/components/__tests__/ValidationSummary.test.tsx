import React from 'react';
import { render } from '@testing-library/react';
import {
  ValidationSummary,
  ValidationSummaryDetail,
} from '../ValidationSummary';
import { renderConnected } from '../../../../test-utils';

describe('ValidationSummary component', () => {
  test('should render nothing if not visible', () => {
    // Act
    const { container } = render(
      <ValidationSummary isVisible={false} details={[]}></ValidationSummary>,
    );

    // Assert
    expect(container.hasChildNodes()).toBeFalsy();
  });

  test('should render validation details if visible', () => {
    // Arrange
    const details: ValidationSummaryDetail[] = [
      {
        isValid: false,
        validationMessage: 'Message 1',
      },
      {
        isValid: false,
        validationMessage: 'Message 2',
      },
    ];

    // Act
    const { getByText } = renderConnected(
      <ValidationSummary
        isVisible={true}
        details={details}
      ></ValidationSummary>,
    );
    const message1 = getByText('Message 1');
    const message2 = getByText('Message 2');

    // Assert
    expect(message1).toBeInTheDocument();
    expect(message2).toBeInTheDocument();
  });
});
