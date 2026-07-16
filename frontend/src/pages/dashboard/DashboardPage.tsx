import { useAuth } from '@hooks/useAuth'
import { useDashboardContent, useCommonContent } from '@hooks/useContent'
import { DashboardLayout } from '@components/templates/DashboardLayout'
import { Inbox } from 'lucide-react'
import './DashboardPage.css'

const DashboardPage = () => {
  const { user } = useAuth()
  const dashboardContent = useDashboardContent()
  const commonContent = useCommonContent()

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>{dashboardContent.welcome.title}, {user?.email?.split('@')[0] || 'User'}!</h1>
            <p>{dashboardContent.welcome.subtitle}</p>
          </div>
          <div className="user-avatar">
            <div className="avatar-circle">
              <span>{user?.email?.[0]?.toUpperCase() || 'U'}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-empty-state">
          <div className="empty-state-icon">
            <Inbox size={48} />
          </div>
          <h2>{dashboardContent.emptyState.title}</h2>
          <p>{dashboardContent.emptyState.description}</p>
          <span className="empty-state-hint">{commonContent.messages.noData}</span>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
