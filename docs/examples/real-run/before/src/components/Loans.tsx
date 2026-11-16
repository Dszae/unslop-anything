import { useState } from 'react'
import { loans, reservations, toolById, type Loan } from '../data'
import { Icon } from './Icon'

function dueLabel(days: number) {
  if (days <= 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `Due in ${days} days`
}

function LoanCard({ loan }: { loan: Loan }) {
  const tool = toolById(loan.toolId)
  const [extended, setExtended] = useState(false)
  const due = loan.dueInDays + (extended ? 3 : 0)
  const length = loan.borrowedDaysAgo + due
  const progress = Math.round((loan.borrowedDaysAgo / length) * 100)
  const urgent = due <= 1

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_1px_0_rgba(31,42,36,0.04)]">
      <div className="flex items-start gap-4">
        <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${tool.tone}`}>
          <Icon name={tool.icon} className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium">{tool.name}</h3>
          <p className="truncate text-sm text-ink/55">{tool.detail}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            urgent ? 'bg-clay-50 text-clay-600' : 'bg-moss-50 text-moss-700'
          }`}
        >
          {dueLabel(due)}
        </span>
      </div>

      <div>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink/8">
          <div
            className={`h-full rounded-full ${urgent ? 'bg-clay-500' : 'bg-moss-600'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink/50">
          Day {loan.borrowedDaysAgo} of {length}
          {extended && ' · extended 3 days'}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setExtended(true)}
          disabled={extended}
          className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-sm font-medium transition hover:bg-ink/5 disabled:cursor-default disabled:border-transparent disabled:bg-moss-50 disabled:text-moss-700"
        >
          {extended ? 'Extended' : 'Extend 3 days'}
        </button>
        <button className="flex-1 rounded-lg bg-ink px-3 py-2 text-sm font-medium text-paper transition hover:bg-moss-900">
          Plan return
        </button>
      </div>
    </article>
  )
}

export function Loans() {
  return (
    <section aria-labelledby="loans-heading" className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 id="loans-heading" className="font-display text-2xl font-semibold">Out with you</h2>
        <a href="#" className="text-sm font-medium text-moss-700 hover:underline">Loan history</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {loans.map((loan) => (
          <LoanCard key={loan.toolId} loan={loan} />
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-ink/20 p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink/70">
          <Icon name="calendar" className="size-4" /> Reserved
        </h3>
        <ul className="divide-y divide-ink/10">
          {reservations.map((r) => {
            const tool = toolById(r.toolId)
            return (
              <li key={r.toolId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${tool.tone}`}>
                  <Icon name={tool.icon} className="size-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{tool.name}</p>
                  <p className="text-xs text-ink/55">Pick up {r.pickup}</p>
                </div>
                {r.ready ? (
                  <span className="flex items-center gap-1 rounded-full bg-moss-600 px-2.5 py-1 text-xs font-semibold text-white">
                    <Icon name="check" className="size-3.5" /> Ready
                  </span>
                ) : (
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/60">Waiting on return</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
