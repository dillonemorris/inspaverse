import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/20/solid'

export default function Loading() {
  return (
    <div className="flex items-center h-64 w-[672px]">
      <ArrowLeftCircleIcon className="h-7 w-7 text-white-400" />
      <div className="animate-pulse flex flex-col w-full items-center">
        <div className="h-4 bg-slate-700 rounded-full w-48 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded-full w-96 mb-4"></div>
        <div className="h-4 bg-slate-700 rounded-full w-80"></div>
      </div>
      <ArrowRightCircleIcon className="h-7 w-7 text-white-400" />
    </div>
  )
}
