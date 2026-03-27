export function getLearned(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  const raw = localStorage.getItem('kpop-learned')
  return new Set(raw ? JSON.parse(raw) : [])
}

export function markLearned(korean: string): Set<string> {
  const learned = getLearned()
  learned.add(korean)
  localStorage.setItem('kpop-learned', JSON.stringify(Array.from(learned)))
  return learned
}

export function toggleLearned(korean: string): Set<string> {
  const learned = getLearned()
  if (learned.has(korean)) learned.delete(korean)
  else learned.add(korean)
  localStorage.setItem('kpop-learned', JSON.stringify(Array.from(learned)))
  return learned
}

export function isLearned(korean: string): boolean {
  return getLearned().has(korean)
}
