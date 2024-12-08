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
    {p: "Regular exercise is essential for maintaining both physical and mental health. Engaging in consistent physical activity helps reduce the risk of chronic diseases, such as heart disease and diabetes, and boosts overall energy levels. Furthermore, exercise can improve mood and mental clarity, making it an important part of a healthy lifestyle."},
    {h2: "Steps to Regularly Exercise"},
    {ol: [{li: "Mark time in your calendar"}, {li: "Excerise on the days you said you would"}, {li: "Find a buddy to hold eahc other accountable"}]},
    {h2: "Top Benefits"},
    {ul: [{li: "Helps manage stress"}, {li: "Boosts mental health by releasing endorphins"}, {li: "Improves cardiovascular health"}, {li: "Strengthens muscles and bones"}]},
    {h2: "How to Start an Exercise Routine"},
    {p: "Starting an exercise routine can seem daunting, but with the right approach, it can be enjoyable and rewarding. Begin by setting realistic goals, such as walking for 20 minutes a day, and gradually increase the duration or intensity of your workouts. It’s important to choose activities that you enjoy, so you can stay motivated over time."},
]


describe('ParsedContent', () => {
    it('renders each h2', () => {
        render(<ParsedContent content={testStructureProps} />)
        const h2Elements = screen.getAllByRole('heading', {level: 2})

        h2Elements.map(h2 => {
            expect(h2).toBeInTheDocument()
        })

        //Expect there to be an h2 for each of the four h2 in testStructureProps
        expect(h2Elements.length).toBe(4)
    })
})