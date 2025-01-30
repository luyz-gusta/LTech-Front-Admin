const formatPrice = (input: string) => {
  const numericValue = input.replace(/\D/g, "");

  const formatted = (parseFloat(numericValue) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatted.replace("R$", "").trim();
};

export default formatPrice