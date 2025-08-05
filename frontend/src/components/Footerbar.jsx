import React from 'react'

const Footerbar = () => {
    return (
        <div>

            <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Terms and Condition</a>

                </nav>

                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Abougoad Youth Connect Team</p>
                </aside>
                <aside>
                    <p>Developed and Design by Rakshit Rathod @Dapan Software Solution</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footerbar