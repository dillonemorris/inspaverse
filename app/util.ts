export const API_QUOTES_BASE = 'https://api.quotable.io'
export const API_QUOTES = `${API_QUOTES_BASE}/quotes`
export const API_RANDOM_QUOTE = `${API_QUOTES}/random`
export const API_TAGS = `${API_QUOTES_BASE}/tags`

export const fetcher = (url: URL) => fetch(url).then((res) => res.json())

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

export type Tag = {
  name: string
  slug: string
  color: (typeof TagColors)[keyof typeof TagColors]
}
