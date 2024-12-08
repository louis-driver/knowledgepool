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

export interface NonDynamicContent {
    text: string,
    resources: string
}

export interface ParsableHTMLElement {
    h2?: string 
    p?: string
    ol?: li[]
    ul?: li[]
}

export interface li {
    li: string
}

export function isParsableArray(value: any): value is ParsableHTMLElement[] {
    return (
        value &&
        Array.isArray(value) &&
        value.every(
            (item: any) =>
                item.h2 ||
                item.p ||
                item.ol ||
                item.ul
        ) 
    )
}

export function isNonDynamicContent(value: any): value is NonDynamicContent {
    return (
        value &&
        value.text &&
        value.resources
    )
}