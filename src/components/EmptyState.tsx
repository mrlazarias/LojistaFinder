
import { SearchX, Store } from 'lucide-react';

interface EmptyStateProps {
  categoria: string;
}

export const EmptyState = ({ categoria }: EmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <SearchX className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum lojista encontrado
          </h3>
          <p className="text-gray-600">
            Não encontramos lojistas para a categoria "{categoria}".
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <Store className="h-5 w-5" />
            <span className="font-medium">Dicas para melhorar sua busca:</span>
          </div>
          <ul className="text-sm text-blue-600 text-left space-y-1">
            <li>• Tente termos mais específicos</li>
            <li>• Use categorias como "pet", "fitness", "suplementos"</li>
            <li>• Verifique a ortografia</li>
            <li>• Experimente sinônimos ou termos relacionados</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
