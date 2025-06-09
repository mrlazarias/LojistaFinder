
import { Search, Store } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 animate-pulse">
            <Search className="h-8 w-8 text-blue-600 animate-bounce" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Buscando lojistas...
          </h3>
          <p className="text-gray-600 mb-6">
            Estamos extraindo dados de lojistas para você
          </p>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <Store className="h-5 w-5" />
            <span className="font-medium">Processando dados...</span>
          </div>
          <p className="text-sm text-blue-600">
            Estamos coletando informações das principais plataformas de e-commerce
          </p>
        </div>
      </div>
    </div>
  );
};
