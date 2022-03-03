$( document ).ready(function() {
var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function() {
        var i, s, h, sl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            h.innerHTML = this.innerHTML;
          }
        }
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      e.stopPropagation();
      select_hide = document.getElementsByClassName('select-hide')[0];
      if (select_hide.style.visibility != "visible") {
        select_hide.style.opacity = "1";
        select_hide.style.visibility = "visible";
        select_hide.style.height = "auto";
      }else{
        select_hide.style.visibility = "hidden";
        select_hide.style.opacity = "0";
      }
      this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl;
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {}
     else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
      select_hide.style.visibility = "hidden";
      select_hide.style.opacity = "0";
      select_hide.style.height = "0%";
    }
}
document.addEventListener("click", closeAllSelect);
});