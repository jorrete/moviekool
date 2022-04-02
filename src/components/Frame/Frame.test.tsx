import { render, screen, fireEvent } from '@testing-library/react';
import Frame from '.';

function TestFrame() {
  return (
    <Frame
      data-testid="Frame"
    >
      <div>foo</div>
      <div>bar</div>
    </Frame>
  );
}

describe('Frame', () => {
  it('Has childrens', async () => {
    render(
      <TestFrame />
    );

    const item = await screen.findByTestId('Frame');
    expect(item.children).toHaveLength(2);
  });
});
