import Link from "next/link"
import "./styles/Navbar.css"

export default function Navbar() {
    return (
        <nav>
            <div className="logo">
                <div className="logo-image" />
                <h1 className="logo-text">KnowledgePool</h1>
            </div>
            <ul className="link-list">
                <li><Link href={`/post`}>The Pool</Link></li>
                <li><Link href={`/review`}>Filtration System</Link></li>
                <li><Link href={`/post/reviews`}>My Drops</Link></li>
                <li><Link href={`/post/submit`}>Create A Drop</Link></li>
            </ul>
        </nav>
    )
}