import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ParsedContent from '@/components/ParsedContent';
import { ParsableHTMLElement } from '@/types/parsedContent';

/**
 * How form data should be strucutred more or less.
 * Each name corresponds to an html tag
 * Each value should be the content and attributes of the tag
*/
const testStructureProps: ParsableHTMLElement[] = [
    {h2: "The Benefits of Regular Exercise"},
    {p: "Regular exercise is essential for maintaining both physical and mental health. Engaging in consistent physical activity helps reduce the risk of chronic diseases, such as heart disease and diabetes, and boosts overall energy levels. Furthermore, exercise can improve mood and mental clarity, making it an important part of a healthy lifestyle."},
    {p: "Here's a second paragraph."},
    {h2: "Steps to Regularly Exercise"},
    {ol: [{li: "Mark time in your calendar"}, {li: "Exercise on the days you said you would"}, {li: "Find a buddy to hold each other accountable"}]},
    {h2: "Top Benefits"},
    {ul: [{li: "Helps manage stress"}, {li: "Boosts mental health by releasing endorphins"}, {li: "Improves cardiovascular health"}, {li: "Strengthens muscles and bones"}]},
    {h2: "How to Start an Exercise Routine"},
    {p: "Starting an exercise routine can seem daunting, but with the right approach, it can be enjoyable and rewarding. Begin by setting realistic goals, such as walking for 20 minutes a day, and gradually increase the duration or intensity of your workouts. It’s important to choose activities that you enjoy, so you can stay motivated over time."},
]

describe('ParsedContent component with testStructureProps', () => {
    test('renders each h2', () => {
        render(<ParsedContent content={testStructureProps} />)
        const h2Elements = screen.getAllByRole('heading', {level: 2})

        h2Elements.map(h2 => {
            expect(h2).toBeInTheDocument()
        })

        //Expect there to be an h2 for each of the four h2 in testStructureProps
        expect(h2Elements.length).toBe(4)
    })

    test('renders dynamic content with h2, p, ul, and ol tags correctly', () => {
        render(<ParsedContent content={testStructureProps} />);
    
        // Check if h2, p, ul, and ol elements are rendered properly
        expect(screen.getByText('The Benefits of Regular Exercise')).toBeInTheDocument();
        expect(screen.getByText('Regular exercise is essential for maintaining both physical and mental health. Engaging in consistent physical activity helps reduce the risk of chronic diseases, such as heart disease and diabetes, and boosts overall energy levels. Furthermore, exercise can improve mood and mental clarity, making it an important part of a healthy lifestyle.')).toBeInTheDocument();
        expect(screen.getByText('Here\'s a second paragraph.')).toBeInTheDocument();
        expect(screen.getByText('Steps to Regularly Exercise')).toBeInTheDocument();
        expect(screen.getByText('Mark time in your calendar')).toBeInTheDocument();
        expect(screen.getByText('Exercise on the days you said you would')).toBeInTheDocument();
        expect(screen.getByText('Find a buddy to hold each other accountable')).toBeInTheDocument();
        expect(screen.getByText('Top Benefits')).toBeInTheDocument();
        expect(screen.getByText('Helps manage stress')).toBeInTheDocument();
        expect(screen.getByText('Boosts mental health by releasing endorphins')).toBeInTheDocument();
        expect(screen.getByText('Improves cardiovascular health')).toBeInTheDocument();
        expect(screen.getByText('Strengthens muscles and bones')).toBeInTheDocument();
        expect(screen.getByText('How to Start an Exercise Routine')).toBeInTheDocument();
    });
  
    test('renders list items in ol correctly', () => {
        render(<ParsedContent content={testStructureProps} />);
    
        // Test that ol and ul elements have the correct list items
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(7); // There should be 6 list items in total, 3 in ol and 3 in ul
    
        // Check if all list items are in the document
        expect(listItems[0]).toHaveTextContent('Mark time in your calendar');
        expect(listItems[1]).toHaveTextContent('Exercise on the days you said you would');
        expect(listItems[2]).toHaveTextContent('Find a buddy to hold each other accountable');
        expect(listItems[3]).toHaveTextContent('Helps manage stress');
        expect(listItems[4]).toHaveTextContent('Boosts mental health by releasing endorphins');
        expect(listItems[5]).toHaveTextContent('Improves cardiovascular health');
        expect(listItems[6]).toHaveTextContent('Strengthens muscles and bones');
    });
  
});

describe('ParsedContent component with NonDynamicContent', () => {
    const testNonDynamicContent = {
        text: "This is a placeholder text.",
        resources: "These are some resources."
    };
    
    test('renders non-dynamic content correctly', () => {
        render(<ParsedContent content={testNonDynamicContent} />);
    
        // Test that the correct content appears for non-dynamic content
        expect(screen.getByText('This is a placeholder text.')).toBeInTheDocument();
        expect(screen.getByText('These are some resources.')).toBeInTheDocument();
    
        // Also check if the Resources section is rendered
        expect(screen.getByText('Resources')).toBeInTheDocument();
    });
});

describe('ParsedContent component with malformed content', () => {
    const invalidContent = [{ unsupported: "Invalid element" }];

    test('renders error message for malformed content', () => {
        render(<ParsedContent content={invalidContent} />);
      
        // The component should display an error message for unsupported content
        expect(screen.getByText('Content could not be parsed. Please Contact support@email.com or fill out this form that doesn\'t exist')).toBeInTheDocument();
        
        // Expect the malformed content to be shown in stringified format
        expect(screen.getByText(JSON.stringify(invalidContent)));
    });
    
    test('renders stringified malformed content', () => {
        render(<ParsedContent content={invalidContent} />);

        // Expect the malformed content to be shown in stringified format
        expect(screen.getByText(JSON.stringify(invalidContent)));
    })
});