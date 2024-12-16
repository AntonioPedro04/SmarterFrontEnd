class HeaderView extends HTMLElement {
  #navMenu;
  #navToggle;
  #navClose;

  addNavToggleEvent() {
    this.#navToggle.addEventListener('click', () => {
      this.#navMenu.classList.add('show-menu');
    });
  }
  addNavCloseEvent() {
    this.#navClose.addEventListener('click', () => {
      this.#navMenu.classList.remove('show-menu');
    });
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<style>
    .header {
      position: sticky;
      width: 100%;
      top: 0;
      left: 0;
      background-color: var(--black-color);
      z-index: (--z-fixed);
    }
    
    .nav {
      position: relative;
      height: var(--header-height);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: height 0.2s;
    }
    
    .nav__logo {
      color: var(--white-color);
      font-weight: var(--font-medium);
    }
    
    .nav__close,
    .nav__toggle {
      color: var(--white-color);
      font-size: 1.5rem;
      cursor: pointer;
    }
      html {
        scroll-behavior: smooth;
      }
      
      ul {
        list-style: none;
      }
      
      a {
        text-decoration: none;
      }
    
    @media screen and (max-width: 1150px) {
      .nav__menu {
        position: fixed;
        left: -100%;
        top: 0;
        background-color: var(--black-color);
        width: 100%;
        height: 100%;
        padding: 6rem 3.5rem 4.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: left 0.4s;
      }
      .nav__item {
        transform: translateX(-150px);
        visibility: hidden;
        transition: transform 0.4s ease-out, visibility 0.4s;
      }
    
      .nav__item:nth-child(1) {
        transition-delay: 0.1s;
      }
    
      .nav__item:nth-child(2) {
        transition-delay: 0.2s;
      }
    
      .nav__item:nth-child(3) {
        transition-delay: 0.3s;
      }
    }
    
    .nav__list,
    .nav__social {
      display: flex;
    }
    
    .nav__list {
      flex-direction: column;
      row-gap: 3rem;
    }
    
    .nav__link {
      position: relative;
      color: var(--white-color);
      font-size: var(--h1-font-size);
      font-weight: var(--font-medium);
      display: inline-flex;
      align-items: center;
      transition: opacity 0.4s;
    }
    
    .nav__link i {
      font-size: 2rem;
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s, visibility 0.4s;
    }
    
    .nav__link span {
      position: relative;
      transition: margin 0.4s;
    }
    
    .nav__link span::after {
      content: '';
      left: 0;
      bottom: -6px;
      width: 0;
      height: 2px;
      position: absolute;
      background-color: var(--white-color);
      transition: width 0.4s ease-out;
    }
    
    .nav__link:hover span {
      margin-left: 2.5rem;
    }
    
    .nav__link:hover i {
      opacity: 1;
      visibility: visible;
    }
    
    .nav__link:hover span::after {
      width: 100%;
    }
    
    .nav__list:has(.nav__link:hover) .nav__link:not(:hover) {
      opacity: 0.4;
    }
    
    .nav__close {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
    }
    
    .nav__social {
      column-gap: 1rem;
    }
    
    .nav__social-link {
      color: var(--white-color);
      font-size: 1.5rem;
      transition: transform 0.4s;
    }
    
    .nav__social-link:hover {
      transform: translateY(-0.25rem);
    }
    
    .show-menu {
      left: 0;
    }
    
    .show-menu .nav__item {
      visibility: visible;
      transform: translateX(0);
    }
    
    .container {
      max-width: 1120px;
      margin-inline: 1.5rem;
    }
    
    @media screen and (min-width: 1150px) {
      .container {
        margin-inline: auto;
      }
    
      .nav {
        height: calc(var(--header-height) + 2rem);
      }
    
      .nav__toggle,
      .nav__close {
        display: none;
      }
    
      .nav__link {
        font-size: var(--normal-font-size);
      }
    
      .nav__link i {
        font-size: 1.5rem;
      }
    
      .nav__list {
        flex-direction: row;
        column-gap: 3.5rem;
      }
    
      .nav__menu {
        display: flex;
        align-items: center;
        column-gap: 3.5rem;
      }
    }
    </style>
    <header class="header" id="header">
    <nav class="nav container">
      <a href="#" class="nav__logo">
      Smarter
    </a
      >
      <div class="nav__menu" id="nav-menu">
        <ul class="nav__list">
          <li class="nav__item">
            <a href="homePage.html" class="nav__link">
              <i class="ri-arrow-right-up-line"></i>
              <span>Home</span>
            </a>
          </li>
    
          <li class="nav__item">
            <a href="#" class="nav__link">
              <i class="ri-arrow-right-up-line"></i>
              <span>Courses</span>
            </a>
          </li>
    
          <li class="nav__item">
            <a href="ranks.html" class="nav__link">
              <i class="ri-arrow-right-up-line"></i>
              <span>Ranks</span>
            </a>
          </li>
        </ul>
    
        <div class="nav__close" id="nav-close">
          <i class="ri-close-large-line"></i>
        </div>
    
        <div class="nav__social">
          <a
            href="https://www.instagram.com"
            target="_blank"
            class="nav__social-link"
          >
            <i class="ri-instagram-line"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            class="nav__social-link"
            ><i class="ri-github-line"></i
          ></a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            class="nav__social-link"
            ><i class="ri-dribbble-line"></i
          ></a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            class="nav__social-link"
          >
            <i class="ri-linkedin-box-line"></i>
          </a>
        </div>
      </div>
      <div class="nav__toggle" id="nav-toggle">
        <i class="ri-menu-line"></i>
      </div>
    </nav>
    </header>
    `;
    this.#navClose = document.getElementById('nav-close');
    this.#navMenu = document.getElementById('nav-menu');
    this.#navToggle = document.getElementById('nav-toggle');
    this.addNavToggleEvent();
    this.addNavCloseEvent();
  }
}

customElements.define('header-component', HeaderView);

export default new HeaderView();
