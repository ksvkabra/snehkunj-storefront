'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

// Type for the footer data
interface FooterData {
  _id: string;
  title: string;
  isActive: boolean;
  columns: Array<{
    heading: string;
    links: Array<{
      label: string;
      url: string;
      external: boolean;
    }>;
  }>;
  socialLinks: Array<{
    platform: string;
    customPlatform?: string;
    url: string;
    icon?: any;
  }>;
  companyInfo?: {
    logo?: any;
    tagline?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  styling?: {
    backgroundColor?: string;
    textColor?: string;
    linkColor?: string;
    hoverColor?: string;
  };
}

interface FooterClientProps {
  footer: FooterData | null;
}

export default function FooterClient({ footer }: FooterClientProps) {
  if (!footer) {
    return (
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
      >
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">HoliCraft</span>
              <div className="h-6 w-6">🎨</div>
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2024 HoliCraft. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    );
  }

  const {
    columns = [],
    socialLinks = [],
    companyInfo,
    styling = {}
  } = footer;

  // Apply styling from Sanity
  const bgColor = styling.backgroundColor || 'bg-gray-900';
  const textColor = styling.textColor || 'text-white';
  const linkColor = styling.linkColor || 'text-blue-400';
  const hoverColor = styling.hoverColor || 'hover:text-blue-300';

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`border-t border-neutral-700 ${bgColor} ${textColor}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {companyInfo?.logo && (
              <div className="flex items-center">
                <img
                  src={urlFor(companyInfo.logo).url()}
                  alt="HoliCraft Logo"
                  className="h-8 w-auto"
                />
              </div>
            )}
            {companyInfo?.tagline && (
              <p className="text-sm font-medium">{companyInfo.tagline}</p>
            )}
            {companyInfo?.description && (
              <p className="text-sm opacity-80">{companyInfo.description}</p>
            )}
            {companyInfo?.address && (
              <p className="text-sm opacity-80">{companyInfo.address}</p>
            )}
            {companyInfo?.phone && (
              <p className="text-sm opacity-80">
                <a href={`tel:${companyInfo.phone}`} className={`${linkColor} ${hoverColor}`}>
                  {companyInfo.phone}
                </a>
              </p>
            )}
            {companyInfo?.email && (
              <p className="text-sm opacity-80">
                <a href={`mailto:${companyInfo.email}`} className={`${linkColor} ${hoverColor}`}>
                  {companyInfo.email}
                </a>
              </p>
            )}
          </motion.div>

          {/* Footer Columns */}
          {columns.map((column, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                {column.heading}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.url}
                      className={`text-sm opacity-80 transition-colors ${linkColor} ${hoverColor}`}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 border-t border-neutral-700 pt-8"
          >
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`opacity-80 transition-opacity ${linkColor} ${hoverColor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.icon ? (
                    <img
                      src={urlFor(social.icon).url()}
                      alt={social.platform}
                      className="h-6 w-6"
                    />
                  ) : (
                    <span className="text-lg">
                      {social.platform === 'facebook' && '📘'}
                      {social.platform === 'twitter' && '🐦'}
                      {social.platform === 'instagram' && '📷'}
                      {social.platform === 'linkedin' && '💼'}
                      {social.platform === 'youtube' && '📺'}
                      {social.platform === 'pinterest' && '📌'}
                      {social.platform === 'tiktok' && '🎵'}
                      {social.platform === 'custom' && '🔗'}
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 border-t border-neutral-700 pt-8"
        >
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-xs opacity-60">
              &copy; 2024 HoliCraft. All rights reserved.
            </p>
            <p className="text-xs opacity-60">
              Handcrafted in Jaipur, ships globally
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
} 