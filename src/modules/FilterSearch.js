export const filter = (e, items, searchMatch) => {
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