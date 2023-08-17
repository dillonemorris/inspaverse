'use client'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()
  return (
    <a onClick={router.back} className="cursor-pointer">
      Back
    </a>
  )
}
