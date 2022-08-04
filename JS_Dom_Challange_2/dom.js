document.body.style.cssText = "font-family: Arial; margin: 0";
// Create Header
let header = document.createElement("header");
let brand = document.createElement("h2");
let ul = document.createElement("ul");
header.className = "header";
document.body.prepend(header);
header.appendChild(brand);
brand.textContent = "Elzero";
header.appendChild(ul);
for (let i = 1; i < 5; i++) {
  ele = document.createElement("li");
  ul.appendChild(ele);
  ele.id = `li-${i}`;
  ele.style.cssText = "margin-right: 10px; color: #607d8b; font-size: 18px";
}
document.getElementById("li-1").innerHTML = "Home";
document.getElementById("li-2").innerHTML = "About";
document.getElementById("li-3").innerHTML = "Services";
document.getElementById("li-4").innerHTML = "Contact";

// Css For Header
document.querySelector("header").style.cssText =
  "display: flex; justify-content: space-between; align-items: center;";
document.querySelector("h2").style.cssText =
  "color: #009688; font-size: 30px; margin:5px; font-weight: bold";
document.querySelector("ul").style.cssText = "display: flex; list-style: none";

// Start Body
let myBody = document.createElement("div");
document.querySelector('.header').after(myBody); // Add Body After Header
myBody.classList.add("body");
myBody.style.cssText = "display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); background-color: #EEE; padding: 20px;"
for (let a = 1; a < 16; a++) {
  let box = document.createElement("div");
  let p = document.createElement("p");
  let span = document.createElement("span");
  myBody.appendChild(box);
  box.appendChild(p);
  box.appendChild(span);
  p.textContent = a;
  p.style.cssText = "font-size: 25px; font-weight: bold; margin: 5px";
  span.textContent = "Product";
  box.style.cssText = "background-color: #FFF; text-align: center; padding: 20px;"
  span.style.color = "#607d8b" 
}
let myBox = document.createElement("div");

// Start Footer
let foot = document.createElement("footer");
let footText = document.createTextNode("Copyright 2021");
foot.style.cssText =
  "color: #FFF; background-color: #009688; padding: 8px; text-align: center; font-size: 20px";
foot.appendChild(footText);
document.querySelector('.body').after(foot);

