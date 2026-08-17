import HeroInteractive from "../HomePage/HeroInteractiveNew";

const HeroSection = () => {
    return (
        <section className="bnrnmn relative flex h-[70vh] items-center py-24 text-black xl:h-screen">
            <div className="absolute left-0 top-0 -z-20 h-full w-full bg-bglight" />

            <video
                className="absolute left-0 top-0 -z-10 h-full w-full object-cover transition-opacity duration-300"
                style={{ opacity: 0 }}
                loop
                muted
                playsInline
                preload="none"
                poster="/assets/videos/home_poster.jpg"
                id="hero-video"
            >
                <source src="/assets/videos/home_banner_v2.mp4" type="video/mp4" />
            </video>

            {/* Scrim: radial vignette, fades in with the video */}
            <div
                id="hero-overlay"
                className="absolute left-0 top-0 -z-[5] h-full w-full transition-opacity duration-300"
                style={{
                    opacity: 0,
                    background:
                        "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)",
                }}
            />


            <div className="container mx-auto px-4">
                <div className="hero-heading-wrapper">
                    <HeroInteractive />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;