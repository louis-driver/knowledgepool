import Link from "next/link"
import "./styles/Navbar.css"

export default function Navbar() {
    return (
        <nav>
            <h1 className="logo">KnowledgePool</h1>
            <ul className="link-list">
                <li><Link href={`/post`}>Knowledge Drops</Link></li>
                <li><Link href={`/review`}>Filter Drops</Link></li>
                <li><Link href={`/post/reviews`}>My Drops</Link></li>
            </ul>
        </nav>
    )
}