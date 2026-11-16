import { Catalog } from './components/Catalog'
import { Header } from './components/Header'
import { Icon } from './components/Icon'
import { Loans } from './components/Loans'
import { Sidebar } from './components/Sidebar'
import { loans, member, reservations, toolById } from './data'

function Greeting() {
  const dueSoon = loans.filter((l) => l.dueInDays <= 1).map((l) => toolById(l.toolId).name.toLowerCase())
  const ready = reservations.filter((r) => r.ready).map((r) => toolById(r.toolId).name.toLowerCase())

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium text-moss-700">Monday, November 16</p>
        <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Morning, {member.firstName}.
        </h1>
        <p className="mt-3 max-w-xl text-ink/65">
          {dueSoon.length > 0 && <>Your {dueSoon.join(' and ')} is due back tomorrow. </>}
          {ready.length > 0 && <>The {ready.join(' and ')} you reserved is ready to pick up.</>}
        </p>
      </div>
      <a
        href="#catalog-heading"
        className="inline-flex items-center gap-2 self-start rounded-xl bg-clay-500 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-clay-600 md:self-auto"
      >
        Find a tool <Icon name="arrow" className="size-4" />
      </a>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <Greeting />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-12">
            <Loans />
            <Catalog />
          </div>
          <Sidebar />
        </div>
      </main>
      <footer className="border-t border-ink/10 py-8 text-center text-sm text-ink/45">
        Run by volunteers on Maple Street · Lend a tool, borrow a hand
      </footer>
    </div>
  )
}
