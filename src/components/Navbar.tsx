import Link from "next/link"

export default function Navbar() {
    return (
        <nav>
            <h1>KnowledgePool</h1>
            <ul>
                <li><Link href={`/post`}>Knowledge Drops</Link></li>
                <li><Link href={`/review`}>Filter Drops</Link></li>
                <li><Link href={`/post/reviews`}>My Drops</Link></li>
            </ul>
        </nav>
    )
}