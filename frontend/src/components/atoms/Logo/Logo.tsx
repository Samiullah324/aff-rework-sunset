import { useAppContent } from '@hooks/useContent'
import './Logo.css'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

export const Logo = ({ size = 'lg', className = '' }: LogoProps) => {
  const appContent = useAppContent()

  return (
    <div className={`logo logo--${size} ${className}`}>
      <span className="logo-text">{appContent.name}</span>
    </div>
  )
}
