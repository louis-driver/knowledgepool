
// Representation of how form data will be strucutred more or less once the dynamic form is created
const testStructureProps = [
    {h2: "Heading 2"},
    {p: "This is a paragraph"},
    {ol: [{li: "List item"}, {li: "List item 2"}]},
    {ul: [{li: "List item"}, {li: "List item 2"}]},
    {h2: "Another Heading 2"},
    {p: "This is another paragraph"},
]

// A function to parse the variable content that can be submitted in posts
export default async function ParsedContent(props: { content: any; }) {
    console.log("parseContent received:", props.content);

    // Convert JSON into an array of keys and data
    const contentValues: any[] = Object.values(props.content);
    console.log("Values:", contentValues);

    // TODO Refactor to use React Components and Props for each element type
    return (
        <>
        {contentValues.map((element, index) => {
            /* TODO make post form submission correspond JSON data to html elements for parsing variable data  */
            const htmlElement = Object.keys(element)[0];
            const htmlContent = Object.values(element)[0];

            // Placeholder content mapping for non-dynamic form 
            if (Object.keys(props.content)[index] == 'data') {
                return (<p key={index}>{props.content.data}</p>)
            }
            else if (Object.keys(props.content)[index] == 'text') {
                return (<p key={index}>{props.content.text}</p>)
            }
            else if (Object.keys(props.content)[index] == 'resources') {
                return (<p key={index}>{props.content.resources}</p>)
            }
            // Base concept for parsing dynamically created forms
            else if (htmlElement == 'h2') {
                return (
                    <h2 key={index}>{htmlContent}</h2>
                )
            }
            else if (htmlElement == 'p') {
                return (
                    <p key={index}>{htmlContent}</p>
                )
            }
            else if (htmlElement == 'ul') {
                console.log("List contentValues", htmlContent);
                return (
                    <ul key={index}>{htmlContent.map((li, i) =>
                        <li key={i}>{li.li}</li>
                    )}</ul>
                )
            }
            else if (htmlElement == 'ol') {
                return (
                    <ol key={index}>{htmlContent.map((li, i) =>
                        <li key={i}>{li.li}</li>
                    )}</ol>
                )
            }
        })}
        </>
    );
}