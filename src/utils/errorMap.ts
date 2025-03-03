import { z, ZodErrorMap } from "zod";

const errorMap: ZodErrorMap = (issue) => {
  const { code, path } = issue;
  const caminho = path.join(".");

  let mensagem = "Erro desconhecido.";

  switch (code) {
    case "invalid_type":
      mensagem = `O campo '${caminho}' deveria ser do tipo ${
        issue.expected ?? "desconhecido"
      }, mas recebeu ${issue.received}.`;
      break;
    case "invalid_string":
      mensagem = `O campo '${caminho}' é inválido.`;
      break;
    case "too_small":
      mensagem = `O campo '${caminho}' deve ter pelo menos ${
        issue.minimum ?? 0
      } caracteres.`;
      break;
    case "too_big":
      mensagem = `O campo '${caminho}' deve ter no máximo ${
        issue.maximum ?? 0
      } caracteres.`;
      break;
    case "invalid_enum_value":
      mensagem = `O valor fornecido para '${caminho}' não é permitido.`;
      break;
    case "unrecognized_keys":
      mensagem = `Chaves não reconhecidas no objeto: ${
        issue.keys?.join(", ") || "nenhuma"
      }.`;
      break;
    default:
      mensagem = `Erro desconhecido em '${caminho}'.`;
  }

  return { message: mensagem };
};

z.setErrorMap(errorMap);
