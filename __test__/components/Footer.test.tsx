import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer component', () => {
    test('renders footer graphic correctly', () => {
        render(<Footer />);
        
        // Check that the image is in the document with the correct src and class
        const footerGraphic = screen.getByRole('img');
        expect(footerGraphic).toHaveAttribute('src', '/pool-footer.svg');
        expect(footerGraphic).toHaveClass('footer-graphic');
    });

    test('renders mission content correctly', () => {
        render(<Footer />);
        
        // Check that the title is rendered
        expect(screen.getByText('KnowledgePool')).toBeInTheDocument();
        
        // Check the paragraph text with <i> and <b> tags
        const paragraph = screen.getByText(/A platform dedicated to keeping/);
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveTextContent('every');
        expect(paragraph).toHaveTextContent('nobody');
        expect(paragraph).toHaveTextContent('dirty');
        
        // Check that the <i> and <b> tags are present in the paragraph
        const everyItalicText = screen.getByText('every');
        expect(everyItalicText.tagName).toBe('I');
        
        const boldText = screen.getByText('nobody');
        expect(boldText.tagName).toBe('B');

        const dirtyItalicText = screen.getByText('dirty');
        expect(dirtyItalicText.tagName).toBe('I');
    });

    test('renders contact section correctly', () => {
        render(<Footer />);
        
        // Check the Contact heading
        expect(screen.getByText('Contact')).toBeInTheDocument();
        
        // Check the contact information list items
        expect(screen.getByText('emailgoeshere@email.com')).toBeInTheDocument();
        expect(screen.getByText('1-800-111-1111')).toBeInTheDocument();
    });
});
