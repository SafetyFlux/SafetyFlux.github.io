class Tabs {
  constructor(container) {
    this.container = container;
    this.tabs = container.querySelectorAll('.tab');
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        this.toggleTabs(e);
        this.toggleContent(e);
      });
    })
  }

  toggleTabs(e) {
    this.tabs.forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
  }

  toggleContent(e) {
    this.container.querySelectorAll('.content').forEach(item => {
      item.classList.remove('active');
    });

    const selector = e.target.getAttribute('data-target');
    const content = this.container.querySelector(`#${selector}`);
    content.classList.add('active');

    loadMedia(`/data/${selector}.json`, selector);
  }
}

async function loadMedia(jsonPath, containerId) {
  const res = await fetch(jsonPath);
  const data = await res.json();

  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data.forEach(item => {
    const element = createMediaElement(item);
    container.appendChild(element);
  })
}

function createMediaElement(item) {
  const div = document.createElement("div");
  div.classList.add("media-item");

  div.innerHTML = `
    <div class="media-item-row top">
      <img class="media-image" src="${item.image}">
      <p class="media-summary">${item.summary}</p>
    </div>
    <div class="media-item-row middle">
      <h2 class="media-title">${item.title}</h2>
    </div>
    <div class="media-item-row bottom">
      <p class="media-status">${item.status ?? "N/A"}</p>
      <p class="media-rating">${item.rating ?? "?"} / 10</p>
    </div>
  `;

  return div;
}

const tabs = new Tabs(document.querySelector('.tab-container'));
tabs.init();

loadMedia("/data/games.json", "games");