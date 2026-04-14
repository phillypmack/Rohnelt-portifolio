'use client'

import { useState, useEffect } from 'react'

interface TypewriterProps {
  words: string[]
  className?: string
  speed?: number
  delayBetweenWords?: number
  cursor?: boolean
}

export function Typewriter({
  words,
  className = '',
  speed = 80,
  delayBetweenWords = 2000,
  cursor = true,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  const currentWord = words[wordIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        }, speed)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, delayBetweenWords)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, speed / 2)
      } else {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentWord, speed, delayBetweenWords, wordIndex])

  useEffect(() => {
    if (!cursor) return

    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [cursor])

  return (
    <span className={className}>
      {displayText}
      {cursor && <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>|</span>}
    </span>
  )
}
