import { LitElement, PropertyDeclaration, css, html } from 'lit'
import { customElement, property, query, queryAll } from 'lit/decorators.js'
import React from 'react';
import jsx from 'react/jsx-runtime';
import ReactDOM from 'react-dom/client';
import { App } from './App';



const createWebComponent = (Component: any, React: any, ReactDom: any, props: Array<string>) => {

  @customElement('react-test')
  class ReactWebComponent extends LitElement {
  
  static get properties() {
    let newProps: {[key:string]: any} = {}

    for(let i = 0; i < props.length; i++) {
      newProps[props[i]] = { reflect: true }
    }

    return newProps;
  }

  root: any;
  constructor() {
    super();
    for(let i = 0; i < props.length; i++) {
      const CURR: any = props[i];
      // eslint-disable-line
      this[CURR] = '';
    }
    // console.log(ReactWebComponent.properties)
  }

  disconnectedCallback(): void {
      super.disconnectedCallback();
      this.root.unmount();
  }

  getProps() {
    let p = {};
    props.forEach(e => p[e] = this[e]);
    // console.dir(this);
    return p;

  }

  getChildren() {
   
      return React.createElement('slot');

  }

  render() {
    if(!this.root) {
      this.root = ReactDOM.createRoot(this.renderRoot)
      this.root.render(React.createElement(Component, this.getProps(), this.getChildren()))
    }
    
    this.root.render(React.createElement(Component, this.getProps(), this.getChildren()))
    
  }
}
 
}



createWebComponent(App, React, ReactDOM, ['text'])
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  @property({type: Object})
  hover = {
    name: 'there'
  }

  render() {
    return html`
      <div>
        <button @click=${this._onClick}>Click</button>
        <react-test .text=${this.hover}><h1>what</h1></react-test>
      </div>
    `
  }

  private _onClick() {
    this.count++;
    this.hover.name = "everywhere"
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
