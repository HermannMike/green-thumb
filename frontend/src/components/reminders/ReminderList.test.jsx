import React from 'react';
import { render, screen } from '@testing-library/react';
import ReminderList from './ReminderList';

const mockReminders = [
  {
    id: 1,
    task: 'Water the plants',
    due_date: '2024-12-31T23:59:59.000Z',
    plant_name: 'Fern',
    plant_image_url: 'https://example.com/fern.jpg',
  },
  {
    id: 2,
    task: 'Fertilize the garden',
    due_date: '2024-11-30T12:00:00.000Z',
    plant_name: 'Rose',
    plant_image_url: 'https://example.com/rose.jpg',
  },
];

describe('ReminderList Component', () => {
  test('renders reminders with task and plant name', () => {
    render(<ReminderList reminders={mockReminders} />);
    mockReminders.forEach((reminder) => {
      expect(screen.getByText(reminder.task)).toBeInTheDocument();
      expect(screen.getByText(reminder.plant_name)).toBeInTheDocument();
    });
  });

  test('renders plant images with correct alt text', () => {
    render(<ReminderList reminders={mockReminders} />);
    mockReminders.forEach((reminder) => {
      const img = screen.getByAltText(reminder.plant_name);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', reminder.plant_image_url);
    });
  });

  test('renders no reminders message when list is empty', () => {
    render(<ReminderList reminders={[]} />);
    expect(screen.getByText(/No reminders found/i)).toBeInTheDocument();
  });
});
