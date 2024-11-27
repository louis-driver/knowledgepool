import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1 className="page-title">Welcome to KnowledgePool!</h1>
            <p className="page-paragraph">The time is gone that social media is designed to feed off an endless cycle of users addictively consuming content. At KnowledgePool we want you to come for a swim, and then be on your way. Refreshed and renewed, ready to apply what you’ve learned to your actual life!</p>
            <p>
                <Link href={"/user/signup"} className="form-link">Sign Up Here!</Link>
                <span> or </span>
                <Link href={"/user/submit"} className="form-link">Log In Here</Link>
            </p>
        </main>
    );
}
