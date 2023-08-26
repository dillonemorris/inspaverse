'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Error() {
  return (
    <div>
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="mb-4 text-sm font-medium text-red-800">
              Whoops, we could not find that quote...
            </h3>
            <Link
              href="/"
              className="rounded-md bg-red-100 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
