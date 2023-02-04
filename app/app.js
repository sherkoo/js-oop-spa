class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("hashchange", this.loadRoute.bind(this));
  }

  addRoute(path, component) {
    this.routes[path] = component;
    console.log("test");
  }

  loadRoute() {
    const path = window.location.hash.substr(1) || "/";
    const component = this.routes[path];
    if (component) {
      component.render();
    } else {
      console.error(`Route not found for path: ${path}`);
    }
  }
}

class Component {
  render() {
    this.element.innerHTML = this.template();
  }

  template() {
    throw new Error("You must implement the template method in your component");
  }
}

class Templates {
  header() {
    return `
      <nav>
        <ul>
          <a href="/app">Home</a>
          <a href="#/about">About</a>
        </ul>
      </nav>
    `;
  }

  message(words) {
    return `
      <div>
        <h2>${words}</h2>
      </div>
    `;
  }
}

let t = new Templates();

class HomePage extends Component {
  constructor(element) {
    super();
    this.element = element;
  }

  template() {
    return `
      ${t.message("Welcome to the home page")}
      ${t.header()}
      <p>This is a simple example of a SPA in JavaScript without a framework</p>
    `;
  }
}

class AboutPage extends Component {
  constructor(element) {
    super();
    this.element = element;
  }

  template() {
    return `
      ${t.message("this is the about page")}
      ${t.header()}
      <p>This is an example of a SPA built in JavaScript without a framework</p>
    `;
  }
}

const router = new Router();
const homePage = new HomePage(document.getElementById("root"));
const aboutPage = new AboutPage(document.getElementById("root"));
router.addRoute("/", homePage);
router.addRoute("/about", aboutPage);
router.loadRoute();
