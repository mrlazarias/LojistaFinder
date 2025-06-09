import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Lojista {
  id: string;
  nome_loja: string;
  link: string;
  plataforma: string;
  categoria: string;
  data_extracao: string;
  imagem?: string;
}

interface ResultsListProps {
  resultados: Lojista[];
}

export const ResultsList = ({ resultados }: ResultsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<
    "nome_loja" | "plataforma" | "data_extracao"
  >("nome_loja");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 6;

  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPlataformaColor = (plataforma: string) => {
    switch (plataforma.toLowerCase()) {
      case "shopee":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "mercado livre":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const sortedResults = [...resultados].sort((a, b) => {
    if (sortBy === "data_extracao") {
      return sortOrder === "asc"
        ? new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        : new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
    }
    return sortOrder === "asc"
      ? a[sortBy].localeCompare(b[sortBy])
      : b[sortBy].localeCompare(a[sortBy]);
  });

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = sortedResults.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: typeof sortBy) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Resultados Encontrados
        </h2>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {resultados.length} lojista{resultados.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Select
          value={sortBy}
          onValueChange={(value: typeof sortBy) => handleSort(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nome_loja">Nome da Loja</SelectItem>
            <SelectItem value="plataforma">Plataforma</SelectItem>
            <SelectItem value="data_extracao">Data de Extração</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {sortOrder === "asc" ? "Crescente" : "Decrescente"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedResults.map((lojista) => (
          <Card
            key={lojista.id}
            className="group relative flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-200 overflow-hidden"
          >
            {lojista.imagem && (
              <div className="h-40 bg-gray-50 flex items-center justify-center">
                <img
                  src={lojista.imagem}
                  alt={lojista.nome_loja}
                  className="h-32 object-contain transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1 flex flex-col p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900 truncate">
                  {lojista.nome_loja}
                </h3>
                <a
                  href={lojista.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-emerald-600 transition-colors"
                  title="Visitar loja"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                  {lojista.categoria}
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                  {lojista.plataforma}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-auto">
                {formatarData(lojista.data_extracao)}
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300 pointer-events-none transition-all duration-200"></div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  );
};
