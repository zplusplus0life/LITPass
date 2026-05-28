import {usePage, Link} from '@inertiajs/react';
import {useState} from 'react';
import Dropdown from '@/components/Dropdown';
import * as Route from '@/routes/index';
import AppLogo from '@/components/app-logo-icon';
import {index as planIndex} from '@/routes/plans';
import {index as AdminPlans} from '@/routes/admin/plans';
import {index as AdminBooks} from '@/routes/admin/books';
import {dashboard as adminDashboard} from '@/routes/admin';
import {indeks as bookIndex} from '@/routes/books';
import NavLink from '@/components/NavLink';

export default function AuthLayout({header, children}: any){
    const user = usePage().props.auth.user;
    const route = usePage().props.route as string;
    const [showData, setData] = useState(false);

    const currentRouteIs = (target: string) => {
        if (target.endsWith('.*')){
            const change = target.replace('.*', '');
            return route.startsWith(change);
        }
        return route === target;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex shrink-0 items-center"> 
                            <Link href="/">
                                <AppLogo className="block h-9 w-auto text-gray-800"></AppLogo>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:ms-10 sm:flex">
                              {user && user.role === 'admin' ? (
                                    <>
                                        <NavLink
                                            href={adminDashboard().url}
                                            active={currentRouteIs('admin.dashboard')}
                                        >
                                            Admin Dashboard
                                        </NavLink>
                                        <NavLink
                                            href={AdminPlans().url}
                                            active={currentRouteIs('admin.plans.index')}
                                        >
                                            Manage Plans
                                        </NavLink>
                                        <NavLink
                                            href={AdminBooks().url}
                                            active={currentRouteIs('admin.books.index')}
                                        >
                                            Manage Books
                                        </NavLink>
                                    </>
                              ) : (
                                <>
                                   {user && (
                                         <NavLink 
                                              href={Route.dashboard().url}
                                              active={currentRouteIs('dashboard')}>
                                             Dashboard
                                        </NavLink>
                                    )}
                                        <NavLink 
                                        href={bookIndex().url}
                                        active={currentRouteIs('books.*')}>
                                            Books Catalog
                                        </NavLink>


                                        <NavLink 
                                        href={planIndex().url}
                                        active={currentRouteIs('plans.subscribe')}>
                                            Membership Plans
                                        </NavLink>
                                </>
                              )}
                            </div>
                         
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="ms-3">
                                {user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="border border-black hover:bg-yellow-100 flex items-center  bg-white px-3 py-2 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
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

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}
            
            <main>{children}</main>
        </div>
    )
}