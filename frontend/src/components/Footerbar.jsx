import React from 'react'
import { Link } from "react-router-dom";

const Footerbar = () => {
    return (
        <div>

            <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <Link to="/about-us" className="link link-hover">
                        About us
                    </Link>
                    <Link to="/contact-us" className="link link-hover">
                        Contact
                    </Link>
                    <a className="link link-hover">Terms and Condition</a>

                </nav>


                <aside>
                    <p>Developed and Design by Rakshit Rathod @Dapan Software Solution</p>
                </aside>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Abugoad Youth Connect Team</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footerbar