import Image from 'next/image';
import ListLayout from '../components/layout/ListLayout';

export default function Custom404() {
    return (
        <ListLayout>
            <div className="w-100vw h-100vh">
            <Image src="https://cdn.dribbble.com/users/3167939/screenshots/10422336/media/b618a0e73996c3b24b58b2db1c881ee3.png" layout="fill" objectFit='cover'  alt="404" />
            </div>
        </ListLayout>
    )
}