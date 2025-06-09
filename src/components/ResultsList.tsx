import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Calendar, ExternalLink, Store, Tag } from "lucide-react";
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
            className="p-6 hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 group"
          >
            <div className="space-y-4">
              {lojista.imagem && (
                <img
                  src={lojista.imagem}
                  alt={lojista.nome_loja}
                  className="w-full h-24 object-contain mb-2 rounded"
                  loading="lazy"
                />
              )}
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
                <a
                  href={lojista.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {lojista.categoria}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatarData(lojista.data_extracao)}
                  </span>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-sm inline-flex items-center gap-1 ${getPlataformaColor(
                    lojista.plataforma
                  )} border`}
                >
                  {lojista.plataforma}
                </div>
              </div>
            </div>
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
