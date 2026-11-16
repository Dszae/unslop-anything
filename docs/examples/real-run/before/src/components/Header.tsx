import { library, member } from '../data'
import { Icon } from './Icon'

const nav = ['Home', 'Browse', 'My loans', 'Community']

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-moss-700 text-paper">
            <Icon name="wrench" className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-semibold">Maple Street</span>
            <span className="block text-[11px] uppercase tracking-[0.14em] text-ink/55">Tool Library</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item, i) => (
            <a
              key={item}
              href="#"
              aria-current={i === 0 ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                i === 0 ? 'bg-moss-100 text-moss-900' : 'text-ink/65 hover:bg-ink/5 hover:text-ink'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-moss-50 px-3 py-1.5 text-xs font-medium text-moss-700 lg:flex">
            <span className="size-1.5 rounded-full bg-moss-600" />
            {library.hoursToday}
          </span>
          <button className="relative grid size-10 place-items-center rounded-full text-ink/70 hover:bg-ink/5" aria-label="Notifications">
            <Icon name="bell" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-clay-500 ring-2 ring-paper" />
          </button>
          <span className="grid size-10 place-items-center rounded-full bg-clay-500 text-sm font-semibold text-white" title={`${member.firstName}'s account`}>
            {member.initials}
          </span>
        </div>
      </div>
    </header>
  )
}
