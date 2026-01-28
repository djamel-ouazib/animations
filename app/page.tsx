'use client'
import { div } from 'motion/react-client'
import FamilyDrawer from './ui/familyDrawer'
import { useMemo, useState } from 'react'
type setIsAnnimationProps = {
    setIsAnnimation: React.Dispatch<React.SetStateAction<string>>
}
export default function Home() {
    const [isAnnimation, setIsAnnimation] = useState<string>('Default')
    const annimation = useMemo(() => {
        switch (isAnnimation) {
            case 'Default':
                return <Button setIsAnnimation={setIsAnnimation}></Button>
            case 'Drawer':
                return <FamilyDrawer setIsAnnimation={setIsAnnimation} />
        }
    }, [isAnnimation])
    return <div>{annimation}</div>
}

const Button = ({ setIsAnnimation }: setIsAnnimationProps) => {
    return (
        <div>
            <button
                onClick={() => setIsAnnimation('Drawer')}
                className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium cursor-pointer"
            >
                See the annimation
            </button>
        </div>
    )
}
