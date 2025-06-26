import clsx from 'clsx';

export default function Prose({
  className,
  html
}: {
  className?: string;
  html: string;
}) {
  return (
    <div
      className={clsx(
        'prose prose-neutral',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
