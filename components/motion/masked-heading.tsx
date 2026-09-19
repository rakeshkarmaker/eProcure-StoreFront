'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { CSSProperties, ElementType } from 'react'
import { gsap } from 'gsap'

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum)

type Reveal = 'rise' | 'wipe' | 'fade' | 'none'
type Trigger = 'view' | 'mount' | 'hover'

export interface MaskedHeadingProps {
    text?: string
    tag?: ElementType
    mediaType?: 'image' | 'video'
    src?: string
    poster?: string
    fillScale?: number
    parallax?: number
    drift?: number
    brightness?: number
    saturation?: number
    grayscale?: boolean
    reveal?: Reveal
    duration?: number
    stagger?: number
    trigger?: Trigger
    align?: 'left' | 'center' | 'right'
    weight?: number
    tracking?: number
    lineHeight?: number
    textScale?: number
    className?: string
    style?: CSSProperties
}

export function MaskedHeading({
    text = 'Designed in the details',
    tag = 'h2',
    mediaType = 'image',
    src = '',
    poster = '',
    fillScale = 1.25,
    parallax = 26,
    drift = 18,
    brightness = 1,
    saturation = 1,
    grayscale = false,
    reveal = 'rise',
    duration = 1.1,
    stagger = 0.09,
    trigger = 'view',
    align = 'center',
    weight = 700,
    tracking = -0.03,
    lineHeight = 1.06,
    textScale = 0.115,
    className = '',
    style,
}: MaskedHeadingProps) {
    const rootRef = useRef<HTMLElement | null>(null)
    const wordRefs = useRef<Array<HTMLSpanElement | null>>([])
    const tweenRef = useRef<gsap.core.Tween | null>(null)
    const offsetRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
    const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])
    const mediaSource = mediaType === 'video' ? poster : src

    const updateMediaPosition = useCallback(() => {
        const root = rootRef.current
        if (!root) return
        const { x, y } = offsetRef.current
        root.style.backgroundPosition = `calc(50% + ${x.toFixed(2)}px) calc(50% + ${y.toFixed(2)}px)`
    }, [])

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const resize = () => {
            root.style.fontSize = `${clamp(root.clientWidth * textScale, 32, 88).toFixed(1)}px`
        }
        resize()
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(root)
        return () => resizeObserver.disconnect()
    }, [textScale])

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduceMotion || (drift <= 0 && parallax <= 0)) return

        let frameId = 0
        let lastTime = performance.now()
        let clock = 0
        const frame = (now: number) => {
            const delta = Math.min(0.05, (now - lastTime) / 1000)
            lastTime = now
            clock += delta
            const offset = offsetRef.current
            const driftX = Math.sin(clock * 0.21) * drift
            const driftY = Math.cos(clock * 0.17) * drift * 0.6
            const ease = 1 - Math.exp(-delta / 0.18)
            offset.x += (offset.targetX + driftX - offset.x) * ease
            offset.y += (offset.targetY + driftY - offset.y) * ease
            updateMediaPosition()
            frameId = requestAnimationFrame(frame)
        }
        const handlePointerMove = (event: PointerEvent) => {
            const rect = root.getBoundingClientRect()
            const normalizedX = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1
            const normalizedY = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1
            offsetRef.current.targetX = clamp(normalizedX, -1, 1) * -parallax
            offsetRef.current.targetY = clamp(normalizedY, -1, 1) * -parallax
        }
        const resetPointer = () => {
            offsetRef.current.targetX = 0
            offsetRef.current.targetY = 0
        }
        root.addEventListener('pointermove', handlePointerMove)
        root.addEventListener('pointerleave', resetPointer)
        frameId = requestAnimationFrame(frame)
        return () => {
            cancelAnimationFrame(frameId)
            root.removeEventListener('pointermove', handlePointerMove)
            root.removeEventListener('pointerleave', resetPointer)
        }
    }, [drift, parallax, updateMediaPosition])

    useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const targets = wordRefs.current.filter((word): word is HTMLSpanElement => Boolean(word))
        if (!targets.length) return
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const settle = () => {
            gsap.set(root, { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
            gsap.set(targets, { opacity: 1, clearProps: 'transform' })
        }
        const play = () => {
            tweenRef.current?.kill()
            if (reveal === 'rise') {
                tweenRef.current = gsap.fromTo(targets, { y: '1.1em', opacity: 0 }, { y: 0, opacity: 1, duration, stagger, ease: 'power4.out', overwrite: 'auto', onComplete: () => gsap.set(targets, { clearProps: 'transform' }) })
            } else if (reveal === 'wipe') {
                tweenRef.current = gsap.fromTo(root, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration, ease: 'power3.inOut', overwrite: 'auto' })
            } else if (reveal === 'fade') {
                tweenRef.current = gsap.fromTo(root, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration, ease: 'power3.out', overwrite: 'auto' })
            }
        }

        settle()
        if (reveal === 'none' || reduceMotion) return
        if (trigger === 'hover') {
            root.addEventListener('pointerenter', play)
            return () => { root.removeEventListener('pointerenter', play); tweenRef.current?.kill() }
        }
        if (trigger === 'view') {
            const observer = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return
                play()
                observer.disconnect()
            }, { threshold: 0.25 })
            observer.observe(root)
            return () => { observer.disconnect(); tweenRef.current?.kill() }
        }
        play()
        return () => tweenRef.current?.kill()
    }, [duration, reveal, stagger, trigger, words])

    // Dynamic tag preserves heading semantics selected by caller.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tag = tag as any
    const maskStyle: CSSProperties = mediaSource ? {
        backgroundImage: `linear-gradient(110deg, rgba(199, 210, 254, 0.72), rgba(255, 255, 255, 0.46)), url("${mediaSource}")`,
        backgroundBlendMode: 'screen',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${fillScale * 100}%`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        filter: `brightness(${brightness}) saturate(${saturation})${grayscale ? ' grayscale(1)' : ''}`,
    } : { color: 'currentColor' }

    return (
        <Tag ref={rootRef} className={`relative m-0 w-full overflow-hidden p-0 antialiased [text-wrap:balance] ${className}`.trim()} style={{ textAlign: align, fontWeight: weight, letterSpacing: `${tracking}em`, lineHeight, ...maskStyle, ...style }}>
            {words.map((word, index) => <span key={`${word}-${index}`}><span ref={(element) => { wordRefs.current[index] = element }} className="inline-block">{word}</span>{index < words.length - 1 ? ' ' : null}</span>)}
        </Tag>
    )
}
