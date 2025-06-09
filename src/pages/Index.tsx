
import { useState } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { ResultsList } from '@/components/ResultsList';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';

interface Lojista {
  id: string;
  nome_loja: string;
  link: string;
  plataforma: string;
  categoria: string;
  data_extracao: string;
}

const Index = () => {
  const [categoria, setCategoria] = useState('');
  const [resultados, setResultados] = useState<Lojista[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleBuscar = async () => {
    if (!categoria.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      // Simulação de dados para demonstração
      // Em produção, aqui seria a chamada para o webhook/API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const dadosSimulados: Lojista[] = [
        {
          id: '1',
          nome_loja: 'Pet Shop Center',
          link: 'https://petshop-center.com.br',
          plataforma: 'Shopee',
          categoria: categoria,
          data_extracao: new Date().toISOString()
        },
        {
          id: '2', 
          nome_loja: 'Mundo Pet',
          link: 'https://mundopet.com.br',
          plataforma: 'Mercado Livre',
          categoria: categoria,
          data_extracao: new Date().toISOString()
        },
        {
          id: '3',
          nome_loja: 'Pet & Cia',
          link: 'https://petecia.com.br',
          plataforma: 'Shopee',
          categoria: categoria,
          data_extracao: new Date().toISOString()
        }
      ];
      
      setResultados(dadosSimulados);
      console.log('Busca realizada para categoria:', categoria);
      
    } catch (error) {
      console.error('Erro na busca:', error);
      setResultados([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Extração de
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"> Lojistas</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre e extraia dados de lojistas organizados por categoria de produtos
            </p>
          </div>

          <SearchHeader 
            categoria={categoria}
            setCategoria={setCategoria}
            onBuscar={handleBuscar}
            isLoading={isLoading}
          />

          <div className="mt-8">
            {isLoading ? (
              <LoadingState />
            ) : hasSearched ? (
              resultados.length > 0 ? (
                <ResultsList resultados={resultados} />
              ) : (
                <EmptyState categoria={categoria} />
              )
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg">
                  Digite uma categoria e clique em "Buscar" para começar
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
