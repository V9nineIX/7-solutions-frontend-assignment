import { render, screen, fireEvent, act } from '@testing-library/react';
import TodoList from '../app/components/todoList/index';
import { TODO_LIST } from '@/constants';

jest.useFakeTimers();

describe('TodoList Component', () => {
  it('renders all initial items in the main list', () => {
    render(<TodoList />);

    TODO_LIST.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('moves fruit item to fruit list when clicked', () => {
    render(<TodoList />);

    // Click on Apple (a fruit)
    const appleButton = screen.getByText('Apple');
    fireEvent.click(appleButton);

    // Apple should now be in the fruit list
    const fruitList = screen.getByText('Fruit').parentElement;
    expect(fruitList).toContainElement(screen.getByText('Apple'));
  });

  it('moves vegetable item to vegetable list when clicked', () => {
    render(<TodoList />);

    // Click on Broccoli (a vegetable)
    const broccoliButton = screen.getByText('Broccoli');
    fireEvent.click(broccoliButton);

    // Broccoli should now be in the vegetable list
    const vegetableList = screen.getByText('Vegetable').parentElement;
    expect(vegetableList).toContainElement(screen.getByText('Broccoli'));
  });

  it('moves item back to main list after 5 seconds', () => {
    render(<TodoList />);

    // Click on Apple
    const appleButton = screen.getByText('Apple');
    fireEvent.click(appleButton);

    // Apple should be in fruit list
    const fruitList = screen.getByText('Fruit').parentElement;
    expect(fruitList).toContainElement(screen.getByText('Apple'));

    // Fast forward 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Apple should be back in main list
    const mainList = screen.getByText('Apple').parentElement?.parentElement;
    const length = TODO_LIST.length - 1;
    expect(mainList?.children[length]).toContainElement(screen.getByText('Apple'));
  });

  it('moves vegetable item back to bottom of main list when clicked in vegetable list', () => {
    render(<TodoList />);

    // Move Broccoli to vegetable list
    const broccoliButton = screen.getByText('Broccoli');
    fireEvent.click(broccoliButton);

    // Verify Broccoli is in vegetable list
    const vegetableList = screen.getByText('Vegetable').parentElement;
    expect(vegetableList).toContainElement(screen.getByText('Broccoli'));

    // Click Broccoli in vegetable list to move it back
    const broccoliInVegetableList = screen.getByText('Broccoli');
    fireEvent.click(broccoliInVegetableList);

    // Broccoli should be back in main list at the bottom
    const mainList = screen.getByText('Broccoli').parentElement?.parentElement;
    expect(mainList?.children[mainList.children.length - 1]).toContainElement(screen.getByText('Broccoli'));
  });

});
