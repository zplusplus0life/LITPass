import {subs, PropsBuku} from '@/types';
import AuthLayout from '@/layouts/authLayout';
export default function index({buku, isSubscribed}  : {buku: PropsBuku, isSubscribed: subs}) {

    return (
        <>
      <AuthLayout>

      </AuthLayout>
        </>
    )
}