
import { Store, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Lojista {
  id: string;
  nome_loja: string;
  link: string;
  plataforma: string;
  categoria: string;
  data_extracao: string;
}

interface ResultsListProps {
  resultados: Lojista[];
}

export const ResultsList = ({ resultados }: ResultsListProps) => {
  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPlataformaColor = (plataforma: string) => {
    switch (plataforma.toLowerCase()) {
      case 'shopee':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'mercado livre':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Resultados Encontrados
        </h2>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {resultados.length} lojista{resultados.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resultados.map((lojista) => (
          <Card key={lojista.id} className="p-6 hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Store className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {lojista.nome_loja}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                  <a 
                    href={lojista.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                  >
                    {lojista.link}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{lojista.categoria}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getPlataformaColor(lojista.plataforma)}`}>
                    {lojista.plataforma}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatarData(lojista.data_extracao)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
