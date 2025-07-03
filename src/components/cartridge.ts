class Cartridge extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(): void {
    // link stylesheet
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "styles/cartridge.css");

    //shadow root
    const shadow = this.attachShadow({ mode: "open" });

    //container
    const container = document.createElement("div");
    container.setAttribute("id", "cartridge");

    const faceClasses = ["front", "back", "left", "right", "top", "bottom"];
    faceClasses.forEach((faceClass) => {
      const face = document.createElement("div");
      face.classList.add("face", faceClass);
      container.appendChild(face);
    });

    const coverArt = document.createElement("img");

    shadow.appendChild(linkElem);

    container.appendChild(coverArt);
    shadow.appendChild(container);
  }
}

customElements.define("game-cartridge", Cartridge);
