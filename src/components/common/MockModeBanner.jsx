import { isMockMode } from '@/services/supabase'
import { AlertCircle } from 'lucide-react'

export default function MockModeBanner() {
  if (!isMockMode) return null

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-sm text-yellow-800">
          <AlertCircle className="h-4 w-4" />
          <span>
            <strong>DEMO MOD:</strong> Sahte verilerle çalışıyorsunuz. Gerçek Supabase yapılandırması için .env dosyasını düzenleyin.
          </span>
        </div>
      </div>
    </div>
  )
}
