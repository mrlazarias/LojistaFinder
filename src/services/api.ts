import { supabase } from "@/integrations/supabase/client";

// Interfaces
interface ExtractionResult {
  nome_loja: string;
  link: string;
  plataforma: string;
  categoria: string;
  data_extracao: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  url: string;
  seller?: {
    name: string;
    url: string;
  };
}

interface Category {
  id: string;
  name: string;
  url: string;
}

interface ProductDetail extends Product {
  description?: string;
  available_quantity: number;
  sold_quantity: number;
  condition: string;
  pictures: Array<{ url: string }>;
  attributes: Array<{
    id: string;
    name: string;
    value_name: string;
  }>;
}

const API_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://seu-servidor-producao.com";

export const searchSellers = async (
  categoria: string
): Promise<ExtractionResult[]> => {
  try {
    console.log("Iniciando busca de vendedores para categoria:", categoria);

    const response = await fetch(`${API_URL}/api/search-sellers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoria }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.details || `HTTP error! status: ${response.status}`
      );
    }

    const results: ExtractionResult[] = await response.json();

    if (!Array.isArray(results)) {
      throw new Error("Formato de resposta inválido");
    }

    // Save to Supabase if results exist
    if (results.length > 0) {
      const { error } = await supabase.from("lojistas").upsert(
        results.map((result) => ({
          nome_loja: result.nome_loja,
          link: result.link,
          plataforma: result.plataforma,
          categoria: result.categoria,
          data_extracao: result.data_extracao,
        }))
      );

      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
      }
    }

    return results;
  } catch (error) {
    console.error("Erro na extração:", error);
    throw error;
  }
};
