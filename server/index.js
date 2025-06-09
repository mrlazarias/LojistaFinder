const express = require("express");
const cors = require("cors");
const { getJson } = require("serpapi");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Verifica se a chave da API está configurada
if (!process.env.SERPAPI_KEY) {
  console.error("⚠️ SERPAPI_KEY não encontrada no arquivo .env");
  console.error("Por favor, crie um arquivo .env com sua chave da SerpAPI:");
  console.error("SERPAPI_KEY=sua_chave_aqui");
  process.exit(1);
}

app.post("/api/search-sellers", async (req, res) => {
  try {
    const { categoria } = req.body;
    if (!categoria) {
      return res.status(400).json({ error: "Categoria é obrigatória" });
    }

    console.log("\n=== Iniciando busca para categoria:", categoria, "===");

    // Busca no Google Shopping
    const searchResults = await getJson({
      api_key: process.env.SERPAPI_KEY,
      engine: "google_shopping",
      q: categoria,
      location: "Brazil",
      google_domain: "google.com.br",
      gl: "br",
      hl: "pt-br",
      num: "100",
    });

    if (!searchResults?.shopping_results) {
      console.error("Resposta da API:", JSON.stringify(searchResults, null, 2));
      throw new Error("Nenhum resultado encontrado");
    }

    console.log(
      `\n✓ Encontrados ${searchResults.shopping_results.length} produtos`
    );

    // Log dos primeiros 5 produtos
    searchResults.shopping_results.slice(0, 5).forEach((item, index) => {
      console.log(`\nProduto ${index + 1}:`);
      console.log(`  Nome: ${item.title || "N/A"}`);
      console.log(`  Preço: ${item.price || "N/A"}`);
      console.log(`  Loja: ${item.source || "N/A"}`);
      console.log(`  Link: ${item.link || "N/A"}`);
    });

    // Agrupa resultados por vendedor
    const sellerMap = new Map();

    searchResults.shopping_results.forEach((item) => {
      if (!item.source) return;

      const baseUrl = item.link ? new URL(item.link).origin : null;

      if (!sellerMap.has(item.source)) {
        sellerMap.set(item.source, {
          nome_loja: item.source,
          link: baseUrl || "#",
          plataforma: item.source,
          categoria: categoria,
          data_extracao: new Date().toISOString(),
          produtos: [],
          total_produtos: 0,
          preco_medio: 0,
          preco_minimo: Infinity,
          preco_maximo: -Infinity,
        });
      }

      const seller = sellerMap.get(item.source);
      const preco = extrairPreco(item.price);

      seller.produtos.push({
        nome: item.title || "N/A",
        preco: preco,
        link: item.link || "#",
      });

      seller.total_produtos++;
      seller.preco_minimo = Math.min(seller.preco_minimo, preco);
      seller.preco_maximo = Math.max(seller.preco_maximo, preco);
      seller.preco_medio =
        seller.produtos.reduce((acc, prod) => acc + prod.preco, 0) /
        seller.produtos.length;
    });

    // Converte o Map em array e formata os resultados
    const results = Array.from(sellerMap.values())
      .map((seller) => ({
        nome_loja: seller.nome_loja,
        link: seller.link,
        plataforma: seller.plataforma,
        categoria: seller.categoria,
        data_extracao: seller.data_extracao,
      }))
      .filter(
        (seller) =>
          seller.nome_loja &&
          seller.link &&
          seller.plataforma &&
          seller.categoria &&
          seller.data_extracao
      );

    console.log(
      `\n✓ Processamento finalizado - ${results.length} lojas encontradas\n`
    );

    res.json(results);
  } catch (error) {
    console.error("\n❌ Erro na extração:", error);

    const errorMessage = error.message || "Erro desconhecido";
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      error: "Erro ao buscar vendedores",
      details: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
});

// Função para extrair o preço de uma string
function extrairPreco(priceStr) {
  if (!priceStr) return 0;

  try {
    // Remove "R$", pontos e espaços, e substitui vírgula por ponto
    const cleanPrice = priceStr
      .replace(/R\$\s*/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const price = parseFloat(cleanPrice);
    return isNaN(price) ? 0 : price;
  } catch (error) {
    return 0;
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
