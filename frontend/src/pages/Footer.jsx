import { Link } from "react-router-dom"
const Footer = () => {

    return (
        <div className="bg-blue-600 fixed bottom-0 left-0 right-0 p-2 h-fit text-white text-wrap">
            <div className="flex justify-between">
                <div className="text-wrap">
                    <h1 className="ms-5 text-3xl font-bold ">GTTI</h1>
                    <p className="ms-5">GTII company ltd is company that sells foods </p>
                    <div className="flex mt-3 ms-5">
                        <input type="text" className="w-full border border-white py-2 rounded-lg" />
                        <button>subcribe</button>
                    </div>
                </div>
                <div className="grid space-y-3">
                    <h1 className="text-xl font-bold">Navs</h1>
                    <Link className="hover:underline" to={'/food-list'}>Foods</Link>
                    <Link className="hover:underline" to={'/import-list'}>Import</Link>
                    <Link className="hover:underline" to={'/export-list'}>Export</Link>
                    <Link className="hover:underline" to={'/report'}>Report</Link>
                </div>
                
                <div className="">
                    <h1 className="text-xl font-bold">My Account</h1>
                    <Link className="hover:underline block mb-2 mt-3 font" to={'/login'} >Login</Link>
                    <Link className="hover:underline" to={'/register'}>Register</Link>
                </div>

                <div className="p-2">
                    <h1 className="mb-3 font-bold text-xl">Contact</h1>
                    <a href="mailto:niyomugaboetiene53@gmail.com" className="hover:underline">niyomugaboetiene53@gmail.com</a>
                    <p className="mt-4">+250 728 184 299</p>
                </div>
            </div>
<hr />
            <div className="mt-2">
               <p className="text-center font-bold"> &copy; 2026 GTTI Company ltd. All right reserved</p>
            </div>
        </div>
    )
}

export default Footer;