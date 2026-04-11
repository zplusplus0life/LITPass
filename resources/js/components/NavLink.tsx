import { InertiaLinkProps, Link } from '@inertiajs/react';


type NavlinkProps = InertiaLinkProps & {
active: boolean;
};


export default function NavLink({
active = false,
children,
...props
}: NavlinkProps) {
    return (
    <Link
       className = {
            'flex items-center border-b-2 px-2 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
            (active
                ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700')
        }
        {...props}>

{children}

    </Link>
    );
}