import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { ResultsList } from "@/components/ResultsList";
import { SearchHeader } from "@/components/SearchHeader";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { searchSellers } from "@/services/api";
import { useState } from "react";

interface Lojista {
  id: string;
  nome_loja: string;
  link: string;
  plataforma: string;
  categoria: string;
  data_extracao: string;
}

const Index = () => {
  const [categoria, setCategoria] = useState("");
  const [resultados, setResultados] = useState<Lojista[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleBuscar = async (plataforma?: string) => {
    if (!categoria.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma categoria para buscar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Primeiro, buscar dados existentes no Supabase
      let query = supabase
        .from("lojistas")
        .select("*")
        .ilike("categoria", `%${categoria.trim()}%`)
        .order("nome_loja", { ascending: true });

      if (plataforma) {
        query = query.eq("plataforma", plataforma);
      }

      const { data: existingData, error: supabaseError } = await query;

      if (supabaseError) {
        throw supabaseError;
      }

      // Se não houver dados ou se os dados forem antigos, fazer nova extração
      const shouldExtract =
        !existingData ||
        existingData.length === 0 ||
        existingData.some((item) => {
          const extractionDate = new Date(item.data_extracao);
          const oneDayAgo = new Date();
          oneDayAgo.setDate(oneDayAgo.getDate() - 1);
          return extractionDate < oneDayAgo;
        });

      if (shouldExtract && (!plataforma || plataforma === "Shopee")) {
        setIsExtracting(true);
        toast({
          title: "Extraindo dados",
          description: "Buscando novos lojistas na Shopee...",
        });

        try {
          const newData = await searchSellers(categoria.trim());
          setResultados(newData);

          toast({
            title: "Extração concluída",
            description: `Foram encontrados ${newData.length} novos lojistas na Shopee`,
          });
        } catch (error) {
          console.error("Erro na extração:", error);
          toast({
            title: "Erro na extração",
            description:
              "Não foi possível extrair novos dados da Shopee. Mostrando dados existentes.",
            variant: "destructive",
          });
          setResultados(existingData || []);
        } finally {
          setIsExtracting(false);
        }
      } else {
        setResultados(existingData || []);
      }

      if (existingData && existingData.length > 0) {
        toast({
          title: "Sucesso",
          description: `Encontrados ${
            existingData.length
          } lojistas para a categoria "${categoria}"${
            plataforma ? ` na plataforma ${plataforma}` : ""
          }`,
        });
      } else if (!shouldExtract) {
        toast({
          title: "Nenhum resultado",
          description: `Não foram encontrados lojistas para a categoria "${categoria}"${
            plataforma ? ` na plataforma ${plataforma}` : ""
          }`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      setResultados([]);
      toast({
        title: "Erro na busca",
        description:
          "Não foi possível realizar a busca. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header moderno */}
      <header className="w-full bg-black to-emerald-600 py-6 shadow-md mb-8">
        <div className="container mx-auto flex items-center justify-between px-4">
          <span className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="#fff" />
              <path
                d="M8 24V12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v12"
                stroke="#059669"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M12 20v-4a4 4 0 0 1 4-4v0a4 4 0 0 1 4 4v4"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span>LojistaFinder</span>
          </span>
          <span className="text-white text-sm opacity-80"></span>
        </div>
      </header>
      {/* Fim do header */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Extração de
              <span className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {" "}
                Lojistas
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre e extraia dados de lojistas organizados por categoria de
              produtos
            </p>
          </div>

          <SearchHeader
            categoria={categoria}
            setCategoria={setCategoria}
            onBuscar={handleBuscar}
            isLoading={isLoading || isExtracting}
          />

          <div className="mt-8">
            {isLoading || isExtracting ? (
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
