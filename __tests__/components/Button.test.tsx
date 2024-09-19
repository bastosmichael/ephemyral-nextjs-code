import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button component', () => {
  it('should render the button with the correct label', () => {
    const { getByText } = render(<Button label="Submit" onClick={() => {}} />);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should call onClick function when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button label="Click Me" onClick={onClick} />);
    
    fireEvent.click(getByText('Click Me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
