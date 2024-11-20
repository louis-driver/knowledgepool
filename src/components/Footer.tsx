import "./styles/Footer.css"

export default function Footer() {
    return (
        <footer>
            <section className="section-mission">
                <div className="logo-svg"></div>
                <div >
                    <h1>KnowledgePool</h1>
                    <p>A platform dedicated to keeping <i>every</i> drop of knowledge clean, because <b>nobody</b> wants to swim in a <i>dirty</i> pool.</p>
                </div>
            </section>
            <section className="section-contact">
                <h1>Contact</h1>
                <ul>
                    <li>emailgoeshere@email.com</li>
                    <li>1-800-111-1111</li>
                </ul>
            </section>
        </footer>
    )
}