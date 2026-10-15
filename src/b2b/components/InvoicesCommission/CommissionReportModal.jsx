import { X, BarChart2, Download, TrendingUp, PieChart, CheckCircle2 } from 'lucide-react'
import { COMMISSION_BREAKDOWN } from '../../data/commissionData'

export default function CommissionReportModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0d2b59] px-5 sm:px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Partner Financial Report</h3>
              <p className="text-xs text-white/70">Fiscal Cycle: Q3 - Q4 2025</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3">
              <span className="text-[11px] text-blue-700 block">Total Revenue Generated</span>
              <h4 className="text-xl font-bold text-blue-900 mt-1">$28,450.00</h4>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3">
              <span className="text-[11px] text-emerald-700 block">Partner Share Earned</span>
              <h4 className="text-xl font-bold text-emerald-900 mt-1">$4,850.75</h4>
            </div>
            <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3">
              <span className="text-[11px] text-purple-700 block">Effective Commission</span>
              <h4 className="text-xl font-bold text-purple-900 mt-1">17.05%</h4>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Category Breakdown
            </h4>
            <div className="space-y-2">
              {COMMISSION_BREAKDOWN.categories.map((c) => (
                <div key={c.name} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="font-semibold text-slate-800">{c.name}</span>
                    <span className="text-slate-400">({c.count} transactions)</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">{c.amount}</span>
                    <span className="text-slate-500 ml-2">({c.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">Certified by ABL Finance Division</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => alert('Downloading official Excel / CSV export')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#0d2b59] hover:bg-[#071933] rounded-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
