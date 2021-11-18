import { Volcano } from "./volcano/headers";

export const filter = (e: any, items: any, searchMatch: any) => {
    var a, i, txtValue;
    const searchItem = e.target.value.toUpperCase();
    const list = document.getElementsByName(items);
    for (i = 0; i < list.length; i++) {
        a = document.getElementsByName(searchMatch)[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(searchItem) > -1) {
          list[i].hidden = false;
        } else {
          list[i].hidden = true;
        }
    }
}

export const searchVolcano = (query: string, volcanoes: Volcano[]): Volcano[] => {
  if(!query || query === '') {
    return volcanoes;
  };

  const results = volcanoes.map((volcano) => {
    let regex = new RegExp(query.toLowerCase());
    if(regex.test(volcano.name.toLowerCase())) {
      return volcano
    };
    return null;
  });
  return results.filter(Boolean) as Volcano[];
};
