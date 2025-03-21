import { createConnection } from "../../lib/mysql";

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      "SELECT id_compra, id_fornecedor, DATE_FORMAT(data_compra, '%Y-%m-%d %H:%i:%s') AS data_compra, valor_total FROM Compra"
    );

    // Adicionando a propriedade 'ativo' como true por padrão
    const compras = rows.map(compra => ({
      ...compra,
      ativo: true, // Considerando que todas as compras iniciam como ativas
    }));

    return new Response(
      JSON.stringify({ compras }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar compras", details: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { id_fornecedor, valor_total } = await req.json();

    if (!id_fornecedor || valor_total == null) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    // Verificando se valor_total é um número válido
    if (isNaN(valor_total)) {
      return new Response(
        JSON.stringify({ error: "Valor total inválido." }),
        { status: 400 }
      );
    }

    const connection = await createConnection();
    const [result] = await connection.execute(
      "INSERT INTO Compra (id_fornecedor, data_compra, valor_total) VALUES (?, NOW(), ?)",
      [id_fornecedor, parseFloat(valor_total)] // Garantindo que valor_total é numérico
    );

    const newCompra = {
      id_compra: result.insertId,
      id_fornecedor,
      data_compra: new Date().toISOString(),
      valor_total: parseFloat(valor_total),
      ativo: true, // Compra criada como ativa por padrão
    };

    return new Response(
      JSON.stringify({ message: "Compra registrada com sucesso", compra: newCompra }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar compra:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao registrar compra", details: error.message }),
      { status: 500 }
    );
  }
}
