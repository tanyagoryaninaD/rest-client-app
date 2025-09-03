import LocaleSwitcher from '@/components/localeSwitcher/LocaleSwitcher';

export default function Home() {
  return (
    <div className="root">
      <main>
        <LocaleSwitcher />
      </main>
      <footer></footer>
    </div>
  );
}
