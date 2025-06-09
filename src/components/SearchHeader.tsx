
import { useState } from 'react';
import { Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface SearchHeaderProps {
  categoria: string;
  setCategoria: (categoria: string) => void;
  onBuscar: () => void;
  isLoading: boolean;
}

const categoriasSugeridas = [
  'pet',
  'moda fitness', 
  'suplementos',
  'eletrônicos',
  'casa e jardim',
  'beleza',
  'esportes',
  'infantil'
];

export const SearchHeader = ({ categoria, setCategoria, onBuscar, isLoading }: SearchHeaderProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoria.trim()) {
      toast({
        title: "Categoria obrigatória",
        description: "Por favor, digite uma categoria para buscar",
        variant: "destructive",
      });
      return;
    }
    onBuscar();
  };

  const handleSugestaoClick = (sugestao: string) => {
    setCategoria(sugestao);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Ex: pet, moda fitness, suplementos"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="pl-10 h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              size="lg"
              disabled={isLoading}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Buscando...
                </div>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Buscar
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 flex items-center gap-1 mr-2">
            <Tag className="h-4 w-4" />
            Sugestões:
          </span>
          {categoriasSugeridas.map((sugestao) => (
            <button
              key={sugestao}
              type="button"
              onClick={() => handleSugestaoClick(sugestao)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors duration-200 border border-gray-200 hover:border-blue-300"
              disabled={isLoading}
            >
              {sugestao}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};
