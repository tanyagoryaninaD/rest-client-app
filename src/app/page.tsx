import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>
        <Link href={'/'}>
          <Image src="/logo.svg" alt="Logo" width={30} height={30} priority />
        </Link>
        <h1>Home</h1>
      </main>
      <footer></footer>
    </div>
  );
}
