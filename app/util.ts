export const DOMAIN = 'https://inspaverse.vercel.app/'

export const API_QUOTES_BASE = 'https://api.quotable.io'
export const API_QUOTES = `${API_QUOTES_BASE}/quotes`
export const API_RANDOM_QUOTE = `${API_QUOTES}/random`
export const API_TAGS = `${API_QUOTES_BASE}/tags`

export const fetcher = (url: URL) => fetch(url).then((res) => res.json())

export type Tag = {
  name: string
  slug: string
  color: TagColors
}

export enum TagColors {
  GRAY = 'gray',
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  INDIGO = 'indigo',
  PURPLE = 'purple',
  PINK = 'pink',
}

export const getColorVariant = (
  color: TagColors,
  isActive: boolean
): string => {
  const colorVariant = colorVariants[color]

  return colorVariant[isActive ? 'active' : 'base']
}

const colorVariants = {
  [TagColors.GRAY]: {
    base: 'bg-gray-400/10 text-gray-300 ring-gray-400/20 hover:bg-transparent',
    active: 'bg-gray-200/80 hover:bg-gray-200/80 text-gray-800 ring-gray-500',
  },
  [TagColors.RED]: {
    base: 'bg-red-400/10 text-red-400 ring-red-400/20 hover:bg-transparent',
    active: 'bg-red-200/80 hover:bg-red-200/80 text-red-800 ring-red-600',
  },
  [TagColors.YELLOW]: {
    base: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20 hover:bg-transparent',
    active:
      'bg-yellow-100/80 hover:bg-yellow-100/80 text-yellow-800 ring-yellow-600',
  },
  [TagColors.GREEN]: {
    base: 'bg-green-400/10 text-green-400 ring-green-400/20 hover:bg-transparent',
    active:
      'bg-green-200/80 hover:bg-green-200/80 text-green-900 ring-green-600',
  },
  [TagColors.BLUE]: {
    base: 'bg-blue-400/10 text-blue-400 ring-blue-400/20 hover:bg-transparent',
    active: 'bg-blue-200/90 hover:bg-blue-200/90 text-blue-800 ring-blue-600',
  },
  [TagColors.INDIGO]: {
    base: 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/20 hover:bg-transparent',
    active: 'bg-indigo-200 hover:bg-indigo-200 text-indigo-800 ring-indigo-600',
  },
  [TagColors.PURPLE]: {
    base: 'bg-purple-400/10 text-purple-400 ring-purple-400/20 hover:bg-transparent',
    active:
      'bg-purple-200/90 hover:bg-purple-200/90 text-purple-800 ring-purple-600',
  },
  [TagColors.PINK]: {
    base: 'bg-pink-400/10 text-pink-400 ring-pink-400/20 hover:bg-transparent',
    active: 'bg-pink-200/90 hover:bg-pink-200/90 text-pink-800 ring-pink-600',
  },
}
