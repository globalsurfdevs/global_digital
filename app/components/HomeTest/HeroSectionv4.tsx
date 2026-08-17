import HeroInteractive from "../HomePage/HeroInteractiveNew";

const HeroSection = () => {
    return (
        <section className="bnrnmn relative flex h-[70vh] items-center py-24 text-black xl:h-screen">
            <div className="absolute left-0 top-0 -z-20 h-full w-full bg-bglight" />

            <video
                className="absolute left-0 top-0 -z-10 h-full w-full object-cover grayscale transition-opacity duration-300"
                style={{ opacity: 0 }}
                loop
                muted
                playsInline
                preload="none"
                poster="/assets/videos/home_poster.jpg"
                id="hero-video"
            >
                <source src="/assets/GS_Digital-banner.mp4" type="video/mp4" />
            </video>

            {/* Scrim: fades in with the video, dark greyish-black */}
            <div
                id="hero-overlay"
                className="absolute left-0 top-0 -z-[5] h-full w-full bg-gradient-to-r from-black/70 via-black/50 to-black/20 transition-opacity duration-300"
                style={{ opacity: 0 }}
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