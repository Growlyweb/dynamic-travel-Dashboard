import { VisaStatusBadge } from './StatusBadge'
import DetailsModal from './DetailsModal'
import { buildVisaTimeline, formatDate } from '../data/customerData'

export default function VisaDetailsModal({ application, onClose }) {
  return (
    <DetailsModal
      title={`${application.country} ${application.visaType}`}
      subtitle={`Application ${application.id}`}
      badge={<VisaStatusBadge status={application.status} />}
      rows={[
        ['Country', application.country],
        ['Visa type', application.visaType],
        ['Applied on', formatDate(application.appliedDate)],
        ['Planned travel', formatDate(application.travelDate)],
      ]}
      timeline={buildVisaTimeline(application.status)}
      onClose={onClose}
    />
  )
}
