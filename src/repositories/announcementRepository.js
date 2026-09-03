import { announcements } from '../mock/announcements.js'
import { settle } from './localStore.js'

export async function listAnnouncements(audience = 'all') {
  const visible = announcements.filter((item) => item.audience === 'all' || item.audience === audience)
  return settle([...visible].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)), 0)
}
