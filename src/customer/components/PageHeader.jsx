import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/common/Breadcrumb'

export const primaryButton =
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-px hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

export const outlineButton =
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

export default function PageHeader({ crumb, title, subtitle, action, children }) {
  return (
    <div>
      <Breadcrumb items={[{ label: crumb ?? title }]} />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-body sm:text-base">{subtitle}</p>
        </div>

        {action &&
          (action.to ? (
            <Link to={action.to} className={primaryButton}>
              {action.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <button type="button" onClick={action.onClick} className={primaryButton}>
              {action.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          ))}

        {children}
      </div>
    </div>
  )
}
