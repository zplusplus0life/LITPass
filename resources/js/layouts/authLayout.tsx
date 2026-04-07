
import {useState} from 'react';

export default function AuthLayout({header, children}: any){
    
    const [showData, setData] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                </div>
            </nav>
            <main>{children}</main>
        </div>
    )
}