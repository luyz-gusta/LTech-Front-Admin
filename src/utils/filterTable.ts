export default function filterTable<T extends { nome: string }>(
  setTextInput: (text: string) => void,
  textFilter: string,
  setItem: (item: T[]) => void,
  itensFixed: T[]
) {
  setTextInput(textFilter);

  if (textFilter.length === 0) {
    setItem(itensFixed);
    return;
  }

  const filteredItems = itensFixed.filter((item) =>
    item.nome.toLowerCase().includes(textFilter.toLowerCase())
  );

  setItem(filteredItems || []);
}
