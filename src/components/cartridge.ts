class Cartridge extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(): void {
    //cart container
    const container = document.createElement("div");
    container.setAttribute("id", "cartridge");
    container.setAttribute("class", "obj-3d");

    //shape faces
    const faceClasses = ["front", "back", "left", "right", "top", "bottom"];

    //construct cart shape
    let frontFace: HTMLDivElement;
    faceClasses.forEach((faceClass) => {
      const face = document.createElement("div");
      face.classList.add("face", faceClass);
      container.appendChild(face);

      if (faceClass === "front") {
        frontFace = face;
      }
    });

    // construct label

    const labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");

    const imgUrl =
      this.getAttribute("img") ??
      "https://as2.ftcdn.net/jpg/02/51/95/53/1000_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg";
    const img = document.createElement("img");
    img.src = imgUrl;
    labelContainer.append(img);

    frontFace!.appendChild(labelContainer);

    this.appendChild(container);
  }
}

customElements.define("game-cartridge", Cartridge);
