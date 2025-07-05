import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CarouselItem {
  id: string
  content: React.ReactNode
}

interface CarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  interval?: number
  className?: string
  itemClassName?: string
  showDots?: boolean
  infinite?: boolean
}

export function Carousel({ 
  items, 
  autoPlay = true, 
  interval = 4000, 
  className, 
  itemClassName,
  showDots = false,
  infinite = true 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex(prev => 
        infinite 
          ? (prev + 1) % items.length
          : prev === items.length - 1 ? 0 : prev + 1
      )
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length, infinite])

  if (items.length === 0) return null

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className={itemClassName}
        >
          {items[currentIndex]?.content}
        </motion.div>
      </AnimatePresence>

      {showDots && items.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex 
                  ? "bg-primary-purple" 
                  : "bg-primary-purple/30 hover:bg-primary-purple/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Horizontal scrolling carousel for logos
interface HorizontalCarouselProps {
  items: React.ReactNode[]
  speed?: number
  className?: string
}

export function HorizontalCarousel({ items, speed = 30, className }: HorizontalCarouselProps) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="inline-flex space-x-8"
        animate={{ x: [0, -100 * items.length] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}