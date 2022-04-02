import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';
import userEvent from '@testing-library/user-event';

function TestButton() {
  const [count, setCount] = useState(0);

  return (
    <Button
      data-testid="Button"
      onClick={() => setCount(count + 1)}
    >
      {count}
    </Button>
  );
}

describe('Button', () => {
  it('Rendered', async () => {
    render(
      <TestButton />
    );
    const item = await screen.findByTestId('Button');
    expect(item).toBeTruthy();
  });

  it('prop: onClick', async () => {
    render(
      <TestButton />
    );
    const item = await screen.findByTestId('Button');
    expect(item.textContent).toBe('0');
    fireEvent.click(item);
    expect(item.textContent).toBe('1');
  });
});
