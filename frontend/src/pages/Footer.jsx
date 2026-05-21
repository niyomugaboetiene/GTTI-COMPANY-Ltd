import { Link } from "react-router-dom"
const Footer = () => {

    return (
        <div className="bg-blue-600 fixed bottom-0 left-0 right-0 p-2 h-fit text-white text-wrap">
            <div className="flex justify-between">
                <div className="text-wrap">
                    <h1 className="ms-5 text-3xl font-bold ">GTTI</h1>
                    <p className="ms-5">GTII company ltd is company that sells foods </p>
                </div>
                <div className="grid space-y-3">
                    <h1 className="text-xl font-bold">Navs</h1>
                    <Link className="hover:underline">Foods</Link>
                    <Link className="hover:underline">Import</Link>
                    <Link className="hover:underline">Export</Link>
                    <Link className="hover:underline">Report</Link>
                </div>

                <div className="p-2">
                    <h1 className="mb-3">Contact</h1>
                    <a href="mailto:niyomugaboetiene53@gmail.com" className="hover:underline">niyomugaboetiene53@gmail.com</a>
                    <p>+250 728 184 299</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;