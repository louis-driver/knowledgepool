import "./styles/ParsedContent.css"

// Representation of how form data will be strucutred more or less once the dynamic form is created
const testStructureProps = [
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

// A function to parse the variable content that can be submitted in posts
export default async function ParsedContent(props: { content: any; }) {
    console.log("parseContent received:", props.content);

    // Convert JSON into an array of keys and data
    const contentValues: any[] = Object.values(props.content);
    console.log("Values:", contentValues);

    // TODO Refactor to use React Components and Props for each element type
    return (
        <section className="content-section">
        {contentValues.map((element, index) => {
            /* TODO make post form submission correspond JSON data to html elements for parsing variable data  */
            const htmlElement = Object.keys(element)[0];
            const htmlContent = Object.values(element)[0];

            // Base concept for parsing dynamically created forms
            if (htmlElement == 'h2') {
                return (
                    <h2 key={index} className="content-heading">{htmlContent}</h2>
                )
            }
            else if (htmlElement == 'p') {
                return (
                    <p key={index} className="content-paragraph">{htmlContent}</p>
                )
            }
            else if (htmlElement == 'ul') {
                console.log("List contentValues", htmlContent);
                return (
                    <ul key={index} className="content-ul">{htmlContent.map((li, i) =>
                        <li key={i} className="content-li">{li.li}</li>
                    )}</ul>
                )
            }
            else if (htmlElement == 'ol') {
                return (
                    <ol key={index} className="content-ol">{htmlContent.map((li, i) =>
                        <li key={i} className="content-li">{li.li}</li>
                    )}</ol>
                )
            }
            // Placeholder content mapping for non-dynamic form 
            else if (Object.keys(props.content)[index] == 'data') {
                return (<p key={index} className="content-paragraph">{props.content.data}</p>)
            }
            else if (Object.keys(props.content)[index] == 'text') {
                return (<p key={index} className="content-paragraph">{props.content.text}</p>)
            }
            else if (Object.keys(props.content)[index] == 'resources') {
                return (
                    <div key={index}>
                        <h2 className="content-heading">Resources</h2>
                        <p className="content-paragraph">{props.content.resources}</p>
                    </div>
                )
            }
        })}
        </section>
    );
}