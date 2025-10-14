import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex justify-between border-b-2 p-6 bg-black m-0">
            <div>
                <h1 className="font-bold text-2xl text-gray-400">Creditsea</h1>
            </div>
            <div className="flex gap-4 font-bold text-base text-gray-400">
                <Link to="/uploads" className="border p-2 rounded-lg hover:bg-gray-50 hover:text-black">Uploads</Link>
                <Link to="/reports" className="border p-2 rounded-lg hover:bg-gray-50 hover:text-black">Reports</Link>
            </div>
        </header>
    )
}