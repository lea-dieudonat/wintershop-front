import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { Navigation } from './components/layout/Navigation'
import { AppRouter } from './router'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <AppRouter />
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
