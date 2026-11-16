const paths = {
  drill: 'M3 7h11l2 2h3v3h-3l-2 2H9l-1 7H5l1-7H3z M19 10.5h2',
  ladder: 'M7 3 5 21 M17 3l2 18 M6.6 7h10.8 M6.2 11h11.6 M5.8 15h12.4 M5.4 19h13.2',
  water: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  saw: 'M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M5.6 18.4l2.1-2.1 M16.3 7.7l2.1-2.1 M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  wrench: 'M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z',
  leaf: 'M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z M5 19l7-7',
  hammer: 'M14 4l6 6-2 2-6-6z M13 7 4 16a2.1 2.1 0 0 0 3 3l9-9',
  tent: 'M12 4 3 20h18L12 4z M12 4v16 M9 20l3-6 3 6',
  search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z M20 20l-4-4',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4z M10 21h4',
  calendar: 'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4',
  clock: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z M12 7v5l3 2',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  pin: 'M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z M12 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  heart: 'M12 20s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.3-8 11-8 11z',
  plus: 'M12 5v14 M5 12h14',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
