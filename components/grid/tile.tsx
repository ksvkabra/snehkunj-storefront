import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md',
        {
          'ring-2 ring-holicraft-mustard': active,
        }
      )}
    >
      {props.src && (
        <Image
          className={clsx('h-full w-full object-cover transition-transform duration-300 ease-in-out', {
            'group-hover:scale-105': isInteractive,
          })}
          {...props}
        />
      )}

      {label ? (
        <div
          className={clsx('absolute bottom-0 w-full px-4 py-3 backdrop-blur-sm transition', {
            'bg-white/90': !active,
            'bg-holicraft-mustard/90 text-holicraft-brown': active,
          })}
        >
          <Label title={label.title} amount={label.amount} currencyCode={label.currencyCode} position={label.position} />
        </div>
      ) : null}
    </div>
  );
}
