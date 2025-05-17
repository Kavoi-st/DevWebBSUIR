function createBlock(image, text, size, position) {
  const block = document.createElement("div");
  block.className = "block";
  block.style.width = size + "px";
  block.style.height = size + "px";

  const img = document.createElement("img");
  img.src = "images/" + image;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  block.appendChild(img);
  block.appendChild(paragraph);

  const setPosition = function(pos) {
    block.style.top = "";
    block.style.left = "";
    block.style.right = "";
    block.style.bottom = "";
    block.style.transform = "";

    switch(pos) {
      case "top-left": block.style.top = "10px"; block.style.left = "10px"; break;
      case "top-right": block.style.top = "10px"; block.style.right = "10px"; break;
      case "bottom-left": block.style.bottom = "10px"; block.style.left = "10px"; break;
      case "bottom-right": block.style.bottom = "10px"; block.style.right = "10px"; break;
      case "center": block.style.top = "50%"; block.style.left = "50%"; block.style.transform = "translate(-50%, -50%)"; break;
    }
  };

  setPosition.call(block, position);


  return {
    block: block,
    update: function(newImg, newText, newPos) {
      img.src = "images/" + newImg;
      paragraph.textContent = newText;
      setPosition.call(block, newPos);
    }
  };
}

document.getElementById("createBlock").onclick = function() {
  const img = document.getElementById("imageSelector").value;
  const txt = document.getElementById("textSelector").value;
  const size = parseInt(document.getElementById("sizeSelector").value);
  const pos = document.getElementById("positionSelector").value;

  const { block } = createBlock(img, txt, size, pos);
  document.getElementById("workspace").appendChild(block);
};
