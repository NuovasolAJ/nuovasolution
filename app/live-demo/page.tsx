import { type Metadata } from 'next';
import { Nav } from '@/components/ui/nav';
import { Footer } from '@/components/ui/footer';
import LiveDemoClient from '@/components/live-demo/live-demo-client';

export const metadata: Metadata = {
  title: 'Live Demo — NuovaSolution',
  description: 'See exactly how NuovaSolution qualifies, scores, and responds to real estate inquiries in real time. Try any lead message in any language.',
  openGraph: {
    title: 'Live Demo — NuovaSolution',
    description: 'See exactly how NuovaSolution qualifies, scores, and responds to real estate inquiries in real time.',
    type: 'website',
  },
};

export default function LiveDemoPage() {
  return (
    <>
      <Nav />
      <main>
        <LiveDemoClient />
      </main>
      <Footer />
    </>
  );
}
