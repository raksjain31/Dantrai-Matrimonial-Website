import React from "react";

const contacts = [

    {
        name: "Bipin Khemchandji Chauhan",
        City: "Chennai",
        role: "Admin",
        phone: "+91 94440 34805",
        email: "",
    },
    {
        name: "Hasmukh Fojmalji Jagani",
        City: "Mumbai",
        role: "Admin",
        phone: "+91 99304 12345",
        email: "",
    },
    {
        name: "Bharat Nainmalji Jagani",
        City: "Chennai",
        role: "Admin",
        phone: "+91 98406 13116",
        email: "",
    },
    {
        name: "Rakshit Prakashchand Rathod",
        City: "Surat",
        role: "Admin",
        phone: "+91 90335 05143",
        email: "raksjain31@gmail.com",
    },
];

const ContactUs = () => {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
                Contact Us
            </h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {contacts.map((person, idx) => (
                    <div key={idx} className="card bg-base-200 shadow-lg rounded-2xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-lg md:text-xl font-semibold">
                                {person.name}
                            </h2>
                            <p className="text-sm text-gray-500">{person.role}</p>
                            <p className="text-sm text-gray-500 font-semibold">{person.City}</p>
                            <div className="mt-3 space-y-1 text-sm md:text-base">
                                <p>
                                    📞 <a href={`tel:${person.phone}`} className="hover:underline">
                                        {person.phone}
                                    </a>
                                </p>
                                <p>
                                    ✉️{" "}
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="hover:underline"
                                    >
                                        {person.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactUs;
