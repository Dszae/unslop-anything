import { library, member, notices } from '../data'
import { Icon } from './Icon'

export function Sidebar() {
  return (
    <aside className="space-y-5">
      <div className="overflow-hidden rounded-2xl bg-moss-900 p-6 text-paper">
        <p className="text-xs uppercase tracking-[0.14em] text-paper/60">Your year at the library</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="font-display text-4xl font-semibold">{member.borrowsThisYear}</p>
            <p className="text-sm text-paper/70">tools borrowed</p>
          </div>
          <div>
            <p className="font-display text-4xl font-semibold">${member.savedEstimate.toLocaleString()}</p>
            <p className="text-sm text-paper/70">not spent buying</p>
          </div>
        </div>
        <p className="mt-5 border-t border-paper/15 pt-4 text-sm text-paper/70">
          Member since {member.since}. Every tool you return on time keeps the queue short for the next neighbour.
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-ink/70">Visit</h2>
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-start gap-2.5">
            <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-ink/45" />
            {library.address}
          </li>
          <li className="flex items-start gap-2.5">
            <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-ink/45" />
            <span>
              Mon, Wed, Thu 4–7 pm
              <br />
              Sat 10 am–1 pm
            </span>
          </li>
        </ul>
        <p className="mt-4 rounded-lg bg-clay-50 px-3 py-2.5 text-sm text-clay-600">
          Returning the pressure washer? Please run clean water through it first.
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold text-ink/70">Noticeboard</h2>
        <ul className="space-y-4">
          {notices.map((n) => (
            <li key={n.title}>
              <p className="text-xs text-ink/45">{n.when}</p>
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-ink/60">{n.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
