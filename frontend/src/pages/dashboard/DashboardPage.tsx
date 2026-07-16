import { useAuth } from '@hooks/useAuth'
import { useDashboardContent } from '@hooks/useContent'
import { DashboardLayout } from '@components/templates/DashboardLayout'
import './DashboardPage.css'

const DashboardPage = () => {
  const { user } = useAuth()
  const dashboardContent = useDashboardContent()

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
          <p className="dashboard-empty-state__message">{dashboardContent.emptyState.message}</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
