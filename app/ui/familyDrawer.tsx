'use client'

import { useMemo, useRef, useState } from 'react'
import { Drawer } from 'vaul'
import useMeasureLib from 'react-use-measure'
import { AnimatePresence, motion, number } from 'motion/react'
import { DefaultView, Key, Phrase, RemoveWallet } from '../components/component'
import { CloseIcon } from '../utils/icons'
type setIsAnnimationProps = {
    setIsAnnimation: React.Dispatch<React.SetStateAction<string>>
}
export default function FamilyDrawer({
    setIsAnnimation,
}: setIsAnnimationProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState('default')
    const [elementRef, bounds] = useMeasureLib()
    const previousHeightRef = useRef<number | null>(null)
    const content = useMemo(() => {
        switch (view) {
            case 'default':
                return <DefaultView setView={setView} />
            case 'remove':
                return <RemoveWallet setView={setView} />

            case 'phrase':
                return <Phrase setView={setView} />
            case 'key':
                return <Key setView={setView} />
        }
    }, [view])

    const opacityDuration = useMemo(() => {
        const MIN_DURATION = 0.15
        const MAX_DURATION = 0.27
        if (!previousHeightRef.current) {
            previousHeightRef.current = bounds.height
            return MIN_DURATION
        }
        const heightDifference = Math.abs(
            Number(bounds.height) - Number(previousHeightRef.current)
        )
        previousHeightRef.current = bounds.height
        const duration = Math.min(
            Math.max(heightDifference / 500, MIN_DURATION),
            MAX_DURATION
        )
        return duration
    }, [bounds.height])

    return (
        <>
            <button
                className=" cursor-pointer fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium"
                onClick={() => setIsOpen(true)}
                style={{ fontFamily: 'Open Runde' }}
            >
                Try it out
            </button>
            <button
                className="fixed top-4/5 left-1/2 -translate-x-1/2 border px-4 py-2 border-gray-200 hover:bg-gray-100/70 rounded-full cursor-pointer"
                onClick={() => setIsAnnimation('Default')}
                style={{ fontFamily: 'Open Runde' }}
            >
                Go Back
            </button>
            <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
                <Drawer.Portal>
                    <Drawer.Overlay
                        className="fixed inset-0 z-10 bg-black/30"
                        onClick={() => setIsOpen(false)}
                    />
                    <Drawer.Content
                        asChild
                        className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-hidden md:mx-auto md:w-full"
                    >
                        <motion.div animate={{ height: bounds.height }}>
                            <Drawer.Close asChild>
                                <button
                                    data-vaul-no-drag=""
                                    className="absolute cursor-pointer right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
                                >
                                    <CloseIcon />
                                </button>
                            </Drawer.Close>
                            <div
                                ref={elementRef}
                                className="px-6 pb-6 pt-2.5 antialiased"
                                style={{ fontFamily: 'Open Runde' }}
                            >
                                <AnimatePresence
                                    initial={false}
                                    mode="popLayout"
                                    custom={view}
                                >
                                    <motion.div
                                        key={view}
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{
                                            duration: opacityDuration,
                                            ease: [0.26, 0.08, 0.25, 1],
                                        }}
                                    >
                                        {content}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </>
    )
}
