import { useState, useRef, useEffect } from 'react'
import type { Status } from '../types/rooming'

export interface Filters {
  status: Status[]
}

interface FilterPopupProps {
  open: boolean
  filters: Filters
  onSave: (filters: Filters) => void
  onClose: () => void
}

const ALL_STATUSES: Status[] = ['Active', 'Closed', 'Cancelled']

export default function FilterPopup({
  open,
  filters,
  onSave,
  onClose,
}: FilterPopupProps) {
  const [local, setLocal] = useState<Filters>(filters)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (open) {
      document.addEventListener('mousedown', onClick)
      return () => document.removeEventListener('mousedown', onClick)
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) setLocal(filters)
  }, [open, filters])

  if (!open) return null

  const toggle = (status: Status) => {
    setLocal((l) =>
      l.status.includes(status)
        ? { status: l.status.filter((s) => s !== status) }
        : { status: [...l.status, status] }
    )
  }

  return (
    <div
      ref={ref}
      className="absolute z-20 top-full mt-2 -right-20 w-48 bg-white border rounded-lg shadow-lg p-4"
    >
      <h2 className="text-xs font-semibold text-gray-500 mb-2">RFP STATUS</h2>
      <div className="space-y-2 mb-4">
        {ALL_STATUSES.map((s) => (
          <label key={s} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={local.status.includes(s)}
              onChange={() => toggle(s)}
              className="form-checkbox h-4 w-4 text-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">{s}</span>
          </label>
        ))}
      </div>
      <button
        onClick={() => {
          onSave(local)
          onClose()
        }}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-sm font-medium"
      >
        Save
      </button>
    </div>
  )
}
