const startTimer = (oncomplete, duration) => {
  let timeoutId = null;
  const startTime = Date.now();

  const timeoutHandler = () => {
    if (Date.now() - startTime >= duration) {
      oncomplete();
      window.cancelAnimationFrame(timeoutId);
    } else {
      timeoutId = requestAnimationFrame(timeoutHandler);
    }
  };

  timeoutId = requestAnimationFrame(timeoutHandler);
}

class ColorPicker extends HTMLElement {
  // Must be static to observe attribute changes
  static get observedAttributes() {
    return ["color"];
  }

  constructor() {
    super();
    
    this.__color = document.createElement('span');
    this.__name = document.createElement("span");

    this.__color.classList.add('color');
    this.__name.classList.add('name');
    
    requestAnimationFrame(() => {
      this.append(this.__color, this.__name)
      this.addEventListener('click', e => {
        this.toggleAttribute('copied');
        
        navigator.clipboard.writeText(this._color);
        
        startTimer(
          _ => this.removeAttribute('copied'),
          500
        )
      })
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color" && oldValue !== newValue) this.update(newValue);
  }

  update(color) {
    if (!color) return;
    this._color = color;
    this.__color.style.backgroundColor = `var(${color})`;
    this.__name.textContent = color;
  }
}

const colorpicker = "color-picker";
customElements.define(colorpicker, ColorPicker);
