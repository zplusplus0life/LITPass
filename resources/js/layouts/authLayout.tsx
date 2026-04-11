import {usePage} from '@inertiajs/react';
import {useState} from 'react';
import * as Route from '@/routes/index';
import {index as planIndex} from '@/routes/plans';
import {indeks as bookIndex} from '@/routes/books';
import NavLink from '@/components/NavLink';

export default function AuthLayout({header, children}: any){
    const user = usePage().props.auth.user;
    const route = usePage().props.route as string;
    const [showData, setData] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">

                        <div className="hidde space-x-8 sm:ms-10 sm:flex">
                            
                            {user && (
                                <NavLink 
                                href={Route.dashboard().url}
                                active={route === 'dashboard'}>
                                    Dashboard
                                </NavLink>
                            )}
                            <NavLink 
                            href={bookIndex().url}
                            active={route.startsWith('book.*')}>
                                Books Catalog
                            </NavLink>


                            <NavLink 
                            href={planIndex().url}
                            active={route === 'plans.index'}>
                                Membership Plans
                            </NavLink>


                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    )
}