'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavigationButtonsProps {
  prev?: string
  next?: string
}

export function NavigationButtons({ prev, next }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8 pt-4 border-t">
      {prev ? (
        <Link href={prev}>
          <motion.button
            whileHover={{ x: -3 }}
            className="btn btn-ghost gap-2"
          >
            <ArrowLeft size={16} />
            Previous Lesson
          </motion.button>
        </Link>
      ) : (
        <div /> // Spacer
      )}

      {next && (
        <Link href={next}>
          <motion.button
            whileHover={{ x: 3 }}
            className="btn btn-primary gap-2"
          >
            Next Lesson
            <ArrowRight size={16} />
          </motion.button>
        </Link>
      )}
    </div>
  )
} 