import { X, CheckCircle2, DollarSign, Calendar, FileText, Download, Printer } from 'lucide-react'

export default function CommissionDetailModal({ commission, onClose }) {
  if (!commission) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0d2b59] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Commission Voucher</h3>
              <p className="text-xs text-white/70">Ref: {commission.referenceNo}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-700 font-medium">Net Credited Amount</span>
              <h4 className="text-2xl font-black text-emerald-800">{commission.amount}</h4>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              {commission.status}
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white text-xs">
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Transaction Date</span>
              <span className="font-semibold text-slate-800">{commission.date}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Service Category</span>
              <span className="font-semibold text-slate-800">{commission.description}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Client / Application</span>
              <span className="font-semibold text-slate-800">{commission.applicant || 'Md. Saiful Islam'}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Gross Booking Value</span>
              <span className="font-semibold text-slate-800">{commission.bookingValue || '$1,600.00'}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Partner Commission Rate</span>
              <span className="font-semibold text-emerald-600">{commission.rate || '20%'}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Disbursement Method</span>
              <span className="font-semibold text-slate-800">{commission.paidVia || 'City Bank Settlement'}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-lg cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => alert('Downloading official commission tax certificate')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#0d2b59] hover:bg-[#071933] rounded-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
