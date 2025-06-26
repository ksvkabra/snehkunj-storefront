'use client';

import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import type { SanityChatSection } from '../../sanity/lib/types/content-section';

interface ChatPromptSectionProps {
  data: SanityChatSection;
}

export default function ChatPromptSection({ data }: ChatPromptSectionProps) {
  const {
    chatTextBlock,
    highlightedInstruction,
    textAlign = 'center',
    textColor = 'text-black',
    backgroundColor = 'bg-holicraft-cream',
    paddingTop = 'pt-6',
    paddingBottom = 'pb-6',
    customClassName = '',
  } = data;

  return (
    <motion.section
      className={`${backgroundColor} ${paddingTop} ${paddingBottom} ${customClassName}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="container-holicraft">
        <div className={`text-${textAlign} ${textColor}`}>
          {/* Chat Icon and Main Text */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-2xl">💬</span>
            {chatTextBlock && chatTextBlock.length > 0 && (
              <div className="font-dm-sans font-bold text-lg md:text-xl">
                <PortableText value={chatTextBlock} />
              </div>
            )}
          </div>

          {/* Highlighted Instruction */}
          {highlightedInstruction && (
            <motion.div
              className="font-dm-sans font-medium text-base md:text-lg opacity-90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {highlightedInstruction}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
} 