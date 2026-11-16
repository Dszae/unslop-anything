import type { IconName } from './components/Icon'

export type Category = 'Power tools' | 'Ladders & access' | 'Cleaning' | 'Garden' | 'Hand tools' | 'Outdoors'

export interface Tool {
  id: string
  name: string
  detail: string
  category: Category
  icon: IconName
  tone: string
  available: number
  total: number
  nextFreeInDays?: number
  popular?: boolean
}

export interface Loan {
  toolId: string
  borrowedDaysAgo: number
  dueInDays: number
  extended?: boolean
}

export interface Reservation {
  toolId: string
  pickup: string
  ready: boolean
}

export const member = {
  firstName: 'Priya',
  initials: 'PR',
  since: 'March 2024',
  borrowsThisYear: 23,
  savedEstimate: 1480,
}

export const library = {
  name: 'Maple Street Tool Library',
  address: '41 Maple St, rear garage',
  hoursToday: 'Open today 4–7 pm',
}

export const tools: Tool[] = [
  { id: 'drill', name: 'Cordless drill', detail: 'DeWalt 20V, two batteries, bit set', category: 'Power tools', icon: 'drill', tone: 'bg-amber-100 text-amber-800', available: 2, total: 3, popular: true },
  { id: 'ladder', name: 'Extension ladder', detail: '24 ft aluminium, rated 300 lb', category: 'Ladders & access', icon: 'ladder', tone: 'bg-sky-100 text-sky-800', available: 0, total: 1, nextFreeInDays: 3 },
  { id: 'washer', name: 'Pressure washer', detail: '2,700 PSI gas, 4 nozzles', category: 'Cleaning', icon: 'water', tone: 'bg-cyan-100 text-cyan-800', available: 0, total: 1, nextFreeInDays: 5, popular: true },
  { id: 'tilesaw', name: 'Wet tile saw', detail: '7 in blade, stand included', category: 'Power tools', icon: 'saw', tone: 'bg-rose-100 text-rose-800', available: 1, total: 1 },
  { id: 'stepladder', name: 'Step ladder', detail: '6 ft fibreglass', category: 'Ladders & access', icon: 'ladder', tone: 'bg-sky-100 text-sky-800', available: 2, total: 2 },
  { id: 'hedge', name: 'Hedge trimmer', detail: 'Electric, 22 in blade', category: 'Garden', icon: 'leaf', tone: 'bg-lime-100 text-lime-800', available: 1, total: 2 },
  { id: 'socket', name: 'Socket set', detail: '94 pieces, metric + SAE', category: 'Hand tools', icon: 'wrench', tone: 'bg-stone-200 text-stone-700', available: 1, total: 1 },
  { id: 'carpet', name: 'Carpet cleaner', detail: 'Upright deep cleaner', category: 'Cleaning', icon: 'water', tone: 'bg-cyan-100 text-cyan-800', available: 1, total: 1, popular: true },
  { id: 'tiller', name: 'Garden tiller', detail: 'Front-tine, 21 in width', category: 'Garden', icon: 'leaf', tone: 'bg-lime-100 text-lime-800', available: 0, total: 1, nextFreeInDays: 1 },
  { id: 'sledge', name: 'Demolition kit', detail: 'Sledge, pry bar, gloves', category: 'Hand tools', icon: 'hammer', tone: 'bg-stone-200 text-stone-700', available: 1, total: 1 },
  { id: 'tent', name: 'Event canopy', detail: '10 × 10 ft pop-up', category: 'Outdoors', icon: 'tent', tone: 'bg-orange-100 text-orange-800', available: 2, total: 2 },
  { id: 'jigsaw', name: 'Jigsaw', detail: 'Variable speed, 5 blades', category: 'Power tools', icon: 'saw', tone: 'bg-rose-100 text-rose-800', available: 1, total: 1 },
]

export const loans: Loan[] = [
  { toolId: 'washer', borrowedDaysAgo: 3, dueInDays: 1 },
  { toolId: 'socket', borrowedDaysAgo: 1, dueInDays: 4 },
]

export const reservations: Reservation[] = [
  { toolId: 'tilesaw', pickup: 'Thu, Nov 19 · 4–7 pm', ready: true },
  { toolId: 'ladder', pickup: 'Sat, Nov 21 · 10 am–1 pm', ready: false },
]

export const notices = [
  { title: 'Repair café this Saturday', body: 'Bring a broken lamp or a dull blade. Volunteers on hand 10 am–2 pm.', when: 'Sat, Nov 21' },
  { title: 'New in: wet tile saw', body: 'Donated by the Okafor family. Already reserved twice.', when: '3 days ago' },
]

export const toolById = (id: string) => tools.find((t) => t.id === id)!
