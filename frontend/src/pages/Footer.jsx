import { Link } from "react-router-dom"
const Footer = () => {

    return (
        <div className="bg-blue-600 fixed bottom-0 left-0 right-0">
            <div>
                <div>
                    <h1>GTTI</h1>
                    <p>GTII company ltd is company that sells foods </p>
                </div>
                <div>
                    <h1>Navs</h1>
                    <Link>Foods</Link>
                    <Link>Import</Link>
                    <Link>Export</Link>
                    <Link>Report</Link>
                </div>

                <div>
                    <h1>Contact</h1>
                    <a href="">niyomugaboetiene53@gmail.com</a>
                    <p>+250 728 184 299</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;