'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid'

export const BackButton = () => {
  const router = useRouter()
  return (
    <button
      aria-label="Previous quote button"
      onClick={router.back}
      className="cursor-pointer"
    >
      <ArrowLeftCircleIcon className="h-7 w-7 text-white-400" />
    </button>
  )
}
