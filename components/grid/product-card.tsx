import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  imageSrc: string;
  imageAlt?: string;
  price: string;
  badge?: string;
  href: string;
}

export default function ProductCard({ title, imageSrc, imageAlt, price, badge, href }: ProductCardProps) {
  return (
    <Link href={href} className='block transition bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-md'>
      {/* Image */}
      <div className='w-full overflow-hidden rounded-t-xl'>
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          width={500}
          height={500}
          className='object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105'
        />
      </div>

      {/* Content */}
      <div className='px-4 py-4 space-y-1'>
        {badge && <span className='text-xs font-semibold tracking-wide text-blue-600 uppercase'>{badge}</span>}
        <h3 className='text-sm font-medium text-gray-900 line-clamp-2'>{title}</h3>
        <p className='text-xs text-gray-500'>Everyday Drinkware</p>
        <p className='text-sm font-semibold text-gray-900'>{price}</p>
      </div>
    </Link>
  );
}
