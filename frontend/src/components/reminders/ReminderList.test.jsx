import React from 'react';
import { render, screen } from '@testing-library/react';
import ReminderList from './ReminderList';

const mockReminders = [
  { id: 1, task: 'Water plants', due_date: '2024-07-01T10:00:00Z' },
  { id: 2, task: 'Fertilize garden', due_date: '2024-07-05T10:00:00Z' },
];

describe('ReminderList', () => {
  test('renders list of reminders', () => {
    render(<ReminderList reminders={mockReminders} />);

    expect(screen.getByText(/Water plants/i)).toBeInTheDocument();
    expect(screen.getByText(/Fertilize garden/i)).toBeInTheDocument();
  });

  test('renders no reminders message when list is empty', () => {
    render(<ReminderList reminders={[]} />);
    expect(screen.getByText(/No reminders found/i)).toBeInTheDocument();
  });
});
