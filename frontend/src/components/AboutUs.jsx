import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center px-4 py-10">
            <div className="max-w-3xl text-center space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                    About Us
                </h1>

                <p className="text-lg leading-relaxed text-base-content">
                    Welcome to <span className="font-semibold">Abugoad Youth Connect</span>,
                    a community-driven platform created to bring together people from{" "}
                    <span className="font-semibold">11 Villages of Abugoad Jain Samaj</span>.
                    Our main motive is simple yet powerful:{" "}
                    <span className="italic">“Apno ki Apno se Pehchan”</span>.
                </p>

                <div className="card bg-base-100 shadow-xl p-6 text-left">
                    <h2 className="text-xl font-semibold mb-3 text-secondary">
                        Our Mission
                    </h2>
                    <p>
                        We aim to create a digital space where people can reconnect,
                        strengthen bonds, and build new relationships within our
                        community. Whether it’s for social connections, cultural exchange,
                        or mutual support — this platform is your place to stay connected.
                    </p>
                </div>

                <div className="card bg-base-100 shadow-xl p-6 text-left">
                    <h2 className="text-xl font-semibold mb-3 text-secondary">
                        What We Offer
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Connect people from all 11 villages of Abugoad</li>
                        <li>Promote unity, trust, and cultural heritage</li>
                        <li>Enable families to know and recognize each other better</li>

                    </ul>
                </div>

                <p className="text-lg font-medium mt-6">
                    Together, we are building stronger bonds and keeping our roots alive
                    through meaningful connections.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
