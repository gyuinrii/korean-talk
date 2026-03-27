export function getFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  const raw = localStorage.getItem('kpop-favorites')
  return new Set(raw ? JSON.parse(raw) : [])
}

export function toggleFavorite(korean: string): Set<string> {
  const favs = getFavorites()
  if (favs.has(korean)) favs.delete(korean)
  else favs.add(korean)
  localStorage.setItem('kpop-favorites', JSON.stringify(Array.from(favs)))
  return favs
}
