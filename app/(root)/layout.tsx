import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" height={38} width={32} />
          <h2 className="text-primary-100">Prepwise</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
