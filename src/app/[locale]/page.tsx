import Image from 'next/image';

import LocaleSwitcher from '@/components/localeSwitcher/LocaleSwitcher';
import { Link } from '@/i18n/navigation';

export default function Home() {
  return (
    <div className="root">
      <main>
        <LocaleSwitcher />
        <Link href={'/'}>
          <Image src="/logo.svg" alt="Logo" width={30} height={30} priority />
        </Link>
        <Link href={'/sign-up'}>
          <p>Sign Up</p>
        </Link>
        <Link href={'/sign-in'}>
          <p>Sign In</p>
        </Link>
      </main>
      <footer></footer>
    </div>
  );
}
