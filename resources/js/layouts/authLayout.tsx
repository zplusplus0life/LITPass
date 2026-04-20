import {usePage, Link} from '@inertiajs/react';
import {useState} from 'react';
import Dropdown from '@/components/Dropdown';
import * as Route from '@/routes/index';
import {index as planIndex} from '@/routes/plans';
import {edit as profileEdit} from '@/routes/profile';
import {indeks as bookIndex} from '@/routes/books';
import NavLink from '@/components/NavLink';

export default function AuthLayout({header, children}: any){
    const user = usePage().props.auth.user;
    const route = usePage().props.route as string;
    const [showData, setData] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="ms-3">
                                {user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={profileEdit().url}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={Route.logout().url}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) : (
                                    <div className="space-x-4">
                                        <Link
                                        href={Route.login().url}
                                        className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                                        >
                                        Log in
                                        </Link>
                                        <Link
                                            href={Route.register().url}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150"
                                        >
                                        Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    )
}