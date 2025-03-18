import { createConnection } from "../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute("SELECT id_local, nome, endereco FROM Local");

    // Adicionando a propriedade 'ativo' como true por padrão
    const locais = rows.map(local => ({
      ...local,
      ativo: true, // Considerando que todos os locais iniciam como ativos
    }));

    return new Response(
      JSON.stringify({ locais }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar locais:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar locais", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { nome, endereco } = await req.json();

    // Verificação se os campos obrigatórios foram fornecidos
    if (!nome || !endereco) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();

    // Inserir o local no banco de dados
    const [result] = await connection.execute(
      "INSERT INTO Local (nome, endereco) VALUES (?, ?)",
      [nome, endereco]
    );

    const newLocal = {
      id_local: result.insertId,
      nome,
      endereco,
      ativo: true, // Local é criado como ativo por padrão
    };

    return new Response(
      JSON.stringify({ message: "Local criado com sucesso", local: newLocal }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar local:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao cadastrar local", details: error.message }),
      { status: 500 }
    );
  }
}
