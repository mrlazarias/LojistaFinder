import { Store } from "lucide-react";

interface EmptyStateProps {
  categoria: string;
}

export const EmptyState = ({ categoria }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <img
        src="/empty-state-illustration.svg"
        alt="Nenhum resultado"
        className="w-32 mb-4 opacity-80"
      />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Nenhum lojista encontrado
      </h3>
      <p className="text-gray-600 mb-4">Tente outros termos ou categorias.</p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
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
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full font-semibold shadow hover:from-blue-700 hover:to-emerald-700 transition-all"
      >
        Nova busca
      </button>
    </div>
  );
};
