import { isNonDynamicContent, isParsableArray, li, NonDynamicContent, ParsableHTMLElement } from "@/types/parsedContent";
import "./styles/ParsedContent.css"

// Representation of how form data will be strucutred more or less once the dynamic form is created
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

interface Props {
    content: ParsableHTMLElement[] | NonDynamicContent
}

// A function to parse the variable content that can be submitted in posts
export default function ParsedContent({content}: Props) {
    
    // TODO Refactor to use React Components and Props for each element type
    // Parse each of the dynamically created html tags to generate a page
    if (isParsableArray(content)) {
        return (
            <section className="content-section">
            {content.map((element: ParsableHTMLElement, index: number) => {
                const htmlElement = Object.keys(element)[0];
                const htmlContent = Object.values(element)[0];

                // Base concept for parsing dynamically created forms
                if (htmlElement === 'h2') {
                    return (
                        <h2 key={index} className="content-heading">{htmlContent}</h2>
                    )
                }
                else if (htmlElement === 'p') {
                    return (
                        <p key={index} className="content-paragraph">{htmlContent}</p>
                    )
                }
                else if (htmlElement === 'ul' || htmlElement === 'ol') {
                    const listItems = (htmlContent as li[]).map((liItem, i) => (
                        <li key={i} className="content-li">{liItem.li}</li>
                    ));

                    if (htmlElement === 'ul') {
                        return (
                            <ul key={index} className="content-ul">{listItems}</ul>
                        );
                    } else {
                        return (
                            <ol key={index} className="content-ol">{listItems}</ol>
                        );
                    }
                }
                // In case of unsupported element, return it's content
                return (
                    <>
                        <p>Content could not be parsed. Please Contact support@email.com or fill out this form that doesn't exist</p>
                        <p>{JSON.stringify(content)}</p>
                    </>
                )
            })}
            </section>
        );
    }
    else if (isNonDynamicContent(content)) {
        // Placeholder content mapping for non-dynamic form 
        return (
            <section>
                <p className="content-paragraph">{content.text}</p>
            
                <div>
                    <h2 className="content-heading">Resources</h2>
                    <p className="content-paragraph">{content.resources}</p>
                </div>
            </section>
        )
    }
    else {
        return (
            <>
                <p>Content could not be parsed. Please Contact support@email.com or fill out this form that doesn't exist</p>
                <p>{JSON.stringify(content)}</p>
            </>
        )
    }
}