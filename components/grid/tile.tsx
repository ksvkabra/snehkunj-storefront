import { Image as ImageType } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

type GridTileImageProps = {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  src?: string | null;
  fill?: boolean;
  sizes?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  background?: 'white' | 'pink' | 'purple' | 'black' | 'purple-dark' | 'blue' | 'cyan' | 'ocher';
};

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  src,
  fill,
  sizes,
  alt,
  width,
  height,
  priority,
  background = 'white'
}: GridTileImageProps) {
  const backgroundClasses = {
    white: 'bg-white',
    pink: 'bg-pink-50',
    purple: 'bg-purple-50',
    black: 'bg-black',
    'purple-dark': 'bg-purple-900',
    blue: 'bg-blue-50',
    cyan: 'bg-cyan-50',
    ocher: 'bg-ocher-50'
  };

  const imageClasses = 'object-cover';
  const labelClasses = 'absolute bottom-0 left-0 flex w-full px-4 pb-4 @container';
  const labelTextClasses = 'flex items-center rounded-full border bg-white/70 px-2 py-1 text-xs font-semibold text-black backdrop-blur-md dark:border-white/10 dark:bg-black/70 dark:text-white';

  return (
    <div
      className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black ${
        isInteractive ? 'cursor-pointer' : ''
      } ${backgroundClasses[background]}`}
    >
      {src ? (
        <>
          {fill ? (
            <Image
              className={`${imageClasses} transition duration-300 ease-in-out group-hover:scale-105`}
              alt={alt || ''}
              src={src}
              fill
              sizes={sizes}
              priority={priority}
            />
          ) : (
            <Image
              className={`${imageClasses} transition duration-300 ease-in-out group-hover:scale-105`}
              alt={alt || ''}
              src={src}
              width={width}
              height={height}
              sizes={sizes}
              priority={priority}
            />
          )}
          {label ? (
            <div className={`${labelClasses} ${label.position === 'center' ? 'justify-center' : 'justify-between'}`}>
              <div className={`${labelTextClasses} flex items-center gap-2`}>
                <span>{label.title}</span>
                <span className="ml-auto text-xs font-medium text-black/60 dark:text-white/60">
                  {label.amount}
                </span>
              </div>
            </div>
          ) : null}
          {active ? (
            <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container">
              <div className="flex items-center rounded-full border bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-400"></span>
                Active
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-sm text-gray-500">No image</div>
        </div>
      )}
    </div>
  );
}

export function GridTileImageLink({
  item,
  href,
  size = 'full',
  priority,
  background
}: {
  item: {
    title: string;
    handle: string;
    featuredImage: ImageType;
    priceRange: {
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  };
  href: string;
  size?: 'full' | 'half';
  priority?: boolean;
  background?: 'white' | 'pink' | 'purple' | 'black' | 'purple-dark' | 'blue' | 'cyan' | 'ocher';
}) {
  return (
    <Link href={href} className="group inline-block h-full w-full">
      <GridTileImage
        src={item.featuredImage?.url}
        fill
        sizes={
          size === 'full'
            ? '(min-width: 1024px) 66vw, 100vw'
            : '(min-width: 1024px) 33vw, 100vw'
        }
        alt={item.title}
        priority={priority}
        background={background}
        label={{
          title: item.title,
          amount: item.priceRange.maxVariantPrice.amount,
          currencyCode: item.priceRange.maxVariantPrice.currencyCode
        }}
      />
    </Link>
  );
}
