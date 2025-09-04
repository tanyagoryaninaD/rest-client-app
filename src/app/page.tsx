import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>
        <h1>Home</h1>
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
