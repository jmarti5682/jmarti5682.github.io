import WelcomeSection from "../components/WelcomeSection";
import AboutMe from "../components/AboutMe";
import Project from "../components/Project";
import Contact from "../components/Contact";
import BlogGrid from "../components/BlogGrid";
import PhotoCarousel from "../components/PhotoCarousel";

export default function Home() {
    return (
        <div className="page">
            <PhotoCarousel />

            <section className="section">
                <WelcomeSection />
            </section>

            <section className="section">
                <AboutMe />
            </section>

            <section className="section">
                <BlogGrid />
            </section>

            <section className="section">
                <Project />
            </section>

            <section className="section">
                <Contact />
            </section>
        </div>
    );
}
