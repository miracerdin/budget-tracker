import Header from '@/app/_components/Header';
import Hero from '@/app/_components/Hero';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Hero />
    </div>
  );
}
