import { createConnection } from "../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT id_produto, nome, descricao, preco, quantidade_estoque FROM Produto");

    // Mapear os produtos para garantir que o preço seja um número
    const produtos = rows.map(produto => ({
      ...produto,
      preco: parseFloat(produto.preco), // Converte para número
      ativo: true, // Considerando que todos os produtos iniciam como ativos
    }));

    return new Response(
      JSON.stringify({ produtos }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar produtos", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { nome, descricao, preco, quantidade_estoque } = await req.json();

    // Validar se todos os campos estão presentes
    if (!nome || !descricao || !preco || quantidade_estoque == null) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();

    // Inserir o produto no banco de dados
    const [result] = await connection.execute(
      "INSERT INTO Produto (nome, descricao, preco, quantidade_estoque) VALUES (?, ?, ?, ?)",
      [nome, descricao, preco, quantidade_estoque]
    );

    const newProduto = {
      id_produto: result.insertId,
      nome,
      descricao,
      preco,
      quantidade_estoque,
      ativo: true, // Produto é criado como ativo por padrão
    };

    return new Response(
      JSON.stringify({ message: "Produto criado com sucesso", produto: newProduto }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao criar produto", details: error.message }),
      { status: 500 }
    );
  }
}
