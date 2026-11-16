import { useMemo, useState } from 'react'
import { tools, type Category, type Tool } from '../data'
import { Icon } from './Icon'

const categories: ('All' | Category)[] = ['All', 'Power tools', 'Ladders & access', 'Cleaning', 'Garden', 'Hand tools', 'Outdoors']

function ToolCard({ tool }: { tool: Tool }) {
  const [saved, setSaved] = useState(false)
  const free = tool.available > 0

  return (
    <article className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lg hover:shadow-ink/5">
      <div className={`relative grid h-28 place-items-center rounded-xl ${tool.tone}`}>
        <Icon name={tool.icon} className="size-11 transition group-hover:scale-110" />
        {tool.popular && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-ink/70">
            Popular
          </span>
        )}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${tool.name} from wishlist` : `Save ${tool.name} to wishlist`}
          className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/80 text-ink/60 hover:text-clay-600"
        >
          <Icon name="heart" className={`size-4 ${saved ? 'fill-clay-500 text-clay-500' : ''}`} />
        </button>
      </div>

      <h3 className="mt-3 font-medium">{tool.name}</h3>
      <p className="text-sm text-ink/55">{tool.detail}</p>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className={`flex items-center gap-1.5 text-xs font-medium ${free ? 'text-moss-700' : 'text-ink/50'}`}>
          <span className={`size-2 rounded-full ${free ? 'bg-moss-600' : 'bg-ink/25'}`} />
          {free
            ? `${tool.available} of ${tool.total} in`
            : `Back in ${tool.nextFreeInDays} day${tool.nextFreeInDays === 1 ? '' : 's'}`}
        </span>
        <button
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            free ? 'bg-moss-700 text-white hover:bg-moss-900' : 'border border-ink/15 text-ink/75 hover:bg-ink/5'
          }`}
        >
          {free ? 'Borrow' : 'Join queue'}
        </button>
      </div>
    </article>
  )
}

export function Catalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tools.filter(
      (t) =>
        (category === 'All' || t.category === category) &&
        (!onlyAvailable || t.available > 0) &&
        (!q || `${t.name} ${t.detail}`.toLowerCase().includes(q)),
    )
  }, [query, category, onlyAvailable])

  return (
    <section aria-labelledby="catalog-heading" className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="catalog-heading" className="font-display text-2xl font-semibold">On the shelf</h2>
          <p className="text-sm text-ink/55">{tools.length} tools shared by 140 neighbours</p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="size-4 accent-moss-700"
          />
          Available now
        </label>
      </div>

      <div className="relative">
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search drills, ladders, saws…"
          className="w-full rounded-xl border border-ink/15 bg-white py-3 pl-12 pr-4 text-[15px] outline-none placeholder:text-ink/40 focus:border-moss-600 focus:ring-4 focus:ring-moss-600/15"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              category === c ? 'bg-ink text-paper' : 'bg-white text-ink/70 ring-1 ring-ink/10 hover:ring-ink/25'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ink/20 px-6 py-12 text-center">
          <p className="font-medium">Nothing matches that yet.</p>
          <p className="mt-1 text-sm text-ink/55">Ask the library to add it — requests shape what we buy next.</p>
          <button className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-moss-700 px-4 py-2 text-sm font-medium text-white hover:bg-moss-900">
            <Icon name="plus" className="size-4" /> Request a tool
          </button>
        </div>
      )}
    </section>
  )
}
