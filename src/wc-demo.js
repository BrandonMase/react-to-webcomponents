export class WCDemo extends HTMLElement {
  static get observedAttributes () {
    return ['title', 'link', 'desc', 'src']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return }
    if (oldValue !== newValue) {
      this[name] = newValue
    }
  }

  get title () { return this.getAttribute('title') }
  set title (value) {
    this.setAttribute('title', value)
    this.setTitle()
  }

  get link () { return this.getAttribute('link') }
  set link (value) {
    this.setAttribute('link', value)
    this.setLink()
  }

  get desc () { return this.getAttribute('desc') }
  set desc (value) {
    this.setAttribute('desc', value)
    this.setDescription()
  }

  get src () { return this.getAttribute('src') }
  set src (value) {
    this.setAttribute('src', value)
    this.setSrc()
  }
  constructor () {
    super()
    const template = document.createElement('template')
    template.innerHTML = <div>hi</div>
    this.appendChild( <div>hi</div>)
    const div = document.createElement('div')
    div.innerHTML = `<h4>hi</h4>`
    this.appendChild(div)
    this.__initialized = null
  }
  static template () {
    return `
      <div id="container">
      <h4>hi
      ${this.title}
      </h4>
       </div>
      `
  }
}

customElements.define('wc-demo', WCDemo)