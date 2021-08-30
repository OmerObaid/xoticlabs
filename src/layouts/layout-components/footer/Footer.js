import React from 'react';
import footerLogo from "../../../assets/images/footer-icons/footer-logo.png";

const Footer = () => {
    return (
        <footer >            
            <main className="cont">
                <img src={footerLogo} alt="footer logo" />
                <p className="copyright">Copyright © {new Date().getFullYear()} Xotic Labs</p>
            </main>
        </footer>
    );
}
export default Footer;
