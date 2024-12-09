import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KnowledgeDrop from '@/components/KnowledgeDrop';
import { PostForDisplay } from "@/types/post";
import { dateToFormatted } from '@/app/lib/convert';

const testProps: PostForDisplay = {
    post_id: 19,
    username: 'jdoe',
    response_to: null,
    title: 'The Importance of Sleep',
    summary: 'Getting enough sleep is crucial for physical and mental well-being.',
    content: [
      { h2: 'Content is passed to a ParsedContent component, so this doesn\'t test the content' }
    ],
    create_time: '2024-11-22T22:39:32.000Z'
}

describe('KnowledgeDrop component', () => {

    test('renders post title', () => {
      render(<KnowledgeDrop post={testProps} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(testProps.title);
    });
  
    test('renders author and date correctly', () => {
      render(<KnowledgeDrop post={testProps} />);
      const formattedDate = dateToFormatted(new Date(testProps.create_time));
      expect(screen.getByText(`${testProps.username}`)).toBeInTheDocument();
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });
  
    test('does not render "In Response To" link when response_to is null', () => {
      render(<KnowledgeDrop post={testProps} />);
      const responseLink = screen.queryByRole('link');
      expect(responseLink).toBeNull();
    });
  
    test('renders summary section correctly', () => {
      render(<KnowledgeDrop post={testProps} />);
      expect(screen.getByText('Snapshot')).toBeInTheDocument();
      expect(screen.getByText(testProps.summary)).toBeInTheDocument();
    });
});