import clsx from 'clsx';
import { ElementType } from 'react';

export default function Section({
  children,
  className,
  as: Component = 'section'
}: {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Component className={clsx('mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8', className)}>
      {children}
    </Component>
  );
}
