import {subs, PropsBuku} from '@/types';
import AppLogo from '@/components/app-logo'

export default function index({buku, isSubscribed}  : {buku: PropsBuku, isSubscribed: subs}) {

    return (
        <>
      <AppLogo />
        </>
    )
}