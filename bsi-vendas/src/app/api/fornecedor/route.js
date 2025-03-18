import { createConnection } from "../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT id_fornecedor, nome FROM Fornecedor");

    // Adicionando a propriedade 'ativo' como true por padrão
    const fornecedores = rows.map(fornecedor => ({
      ...fornecedor,
      ativo: true, // Considerando que todos os fornecedores iniciam como ativos
    }));

    return new Response(
      JSON.stringify({ fornecedores }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar fornecedores", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { nome, email, telefone, endereco } = await req.json();

    // Validar se todos os campos estão presentes
    if (!nome || !email || !telefone || !endereco) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();

    // Inserir o fornecedor no banco de dados
    const [result] = await connection.execute(
      "INSERT INTO Fornecedor (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)",
      [nome, email, telefone, endereco]
    );

    const newFornecedor = {
      id_fornecedor: result.insertId,
      nome,
      email,
      telefone,
      endereco,
      ativo: true, // Fornecedor é criado como ativo por padrão
    };

    return new Response(
      JSON.stringify({ message: "Fornecedor criado com sucesso", fornecedor: newFornecedor }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar fornecedor:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao cadastrar fornecedor", details: error.message }),
      { status: 500 }
    );
  }
}
