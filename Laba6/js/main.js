class Block {
  constructor(color, width, height, image) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  createElement() {
    const div = document.createElement("div");
    div.className = "block";
    div.style.backgroundColor = this.color;
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.dataset.color = this.color;
    div.dataset.size = this.getSizeCategory();

    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";

    const img = document.createElement("img");
    img.src = this.image;
    img.alt = "Изображение блока";
    imgContainer.appendChild(img);

    div.appendChild(imgContainer);
    return div;
  }

  getSizeCategory() {
    const area = this.width * this.height;
    if (area < 15000) return "small";
    if (area < 25000) return "medium";
    return "large";
  }
}

class SpecialBlock extends Block {
  constructor(color, width, height, image, label) {
    super(color, width, height, image);
    this.label = label;
  }

  createElement() {
    const el = super.createElement();
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = this.label;
    el.appendChild(label);
    return el;
  }
}

class BlockManager {
  constructor() {
    this.set1 = new Set();
    this.container = document.getElementById("container");
    this.selector = document.getElementById("blockSelector");
    this.colorFilter = document.getElementById("colorFilter");
    this.sizeFilter = document.getElementById("sizeFilter");
    this.colors = ["red", "blue", "green", "orange", "purple", "brown"];
    this.images = [
      "images/1.jpg",
      "images/2.jpg",
      "images/3.jpg",
      "images/4.jpg",
      "images/5.jpg",
      "images/6.jpg"
    ];

    this.init();
  }

  init() {
    for (let i = 0; i < 6; i++) {
      const block = new SpecialBlock(
        this.colors[i],
        100 + i * 10,
        100 + i * 10,
        this.images[i],
        `Блок ${i + 1}`
      );
      this.set1.add(block);
    }

    this.populateSelector();
    this.populateColorFilter();
    this.bindEvents();
  }

  populateSelector() {
    this.selector.innerHTML = "";
    let index = 0;
    this.set1.forEach((block) => {
      const option = document.createElement("option");
      option.textContent = `Блок ${index + 1}`;
      option.value = index;
      this.selector.appendChild(option);
      index++;
    });
  }

  populateColorFilter() {
    this.colors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      this.colorFilter.appendChild(option);
    });
  }

  bindEvents() {
    document.getElementById("addBlockBtn").onclick = () => this.addRandomBlock();
    this.selector.onchange = () => this.showBlockByIndex(this.selector.value);
    this.colorFilter.onchange = () => this.applyFilters();
    this.sizeFilter.onchange = () => this.applyFilters();
  }

  showBlockByIndex(index) {
    this.container.innerHTML = "";
    const block = Array.from(this.set1)[index];
    if (block) this.container.appendChild(block.createElement());
  }

  addRandomBlock() {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const width = 100 + Math.floor(Math.random() * 150);
    const height = 100 + Math.floor(Math.random() * 150);
    const image = this.images[Math.floor(Math.random() * this.images.length)];
    const label = "Новый блок";
    const block = new SpecialBlock(color, width, height, image, label);
    this.set1.add(block);
    this.container.appendChild(block.createElement());
    this.populateSelector();
  }

  applyFilters() {
    const color = this.colorFilter.value;
    const size = this.sizeFilter.value;

    this.container.innerHTML = "";
    this.set1.forEach(block => {
      const el = block.createElement();
      const elColor = el.dataset.color;
      const elSize = el.dataset.size;

      const matchesColor = color === "all" || color === elColor;
      const matchesSize = size === "all" || size === elSize;

      if (matchesColor && matchesSize) {
        this.container.appendChild(el);
      }
    });
  }
}

window.onload = () => new BlockManager();
