import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

interface Props {
  title?: string
}

const NotFoundPage = (props: Props)=> {
  const {
    title = 'The page you are looking for does not exist'
  } = props
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        {title}
      </p>

      <Button onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  )
}

export default NotFoundPage
