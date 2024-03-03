import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("toggle-switch")
export class ToggleSwitchElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  on: boolean = localStorage.getItem('dark') === 'true'; // Check if already in dark mode
  
  toggleLabel() {
    return this.on ? "ON" : "OFF";
  }

  render() {
    return html`
      <div class="switch-container">
        <label class="switch">
          <input type="checkbox" @click=${this._handleChange} .checked=${this.on}/>
          <span class="slider round"></span>
        </label>
        <div class="label">${this.toggleLabel()}</div>
      </div>
    `;
  }

static styles = css`
  :host {
    display: block;
  }
  .switch-container {
    display: flex;
    align-items: center;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  .slider.round:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white; /* Change circle color to white */
    transition: .4s;
    border-radius: 50%;
  }
  input:checked + .slider:before {
    transform: translateX(26px);
    background-color: #333333; /* Change circle color to gray when checked */
  }
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  .label {
    margin-left: 10px;
  }
`;

  _handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const isDarkMode = target?.checked; // Determine if the switch is toggled to enable dark mode

    // Update localStorage
    localStorage.setItem('dark', String(isDarkMode));

    this.on = isDarkMode;

    if (isDarkMode) {
      document.querySelectorAll('body, header, toggle-switch, p, h1, h2, a').forEach(element => {
        element.classList.add('dark-mode');
      });
    } else {
      document.querySelectorAll('body, header, toggle-switch, p, h1, h2, a').forEach(element => {
        element.classList.remove('dark-mode');
      });
    }
  }  
}
