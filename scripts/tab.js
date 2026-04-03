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
    const content = this.container.querySelector(selector);
    content.classList.add('active');
  }
}

const tabs = new Tabs(document.querySelector('.tab-container'));
tabs.init();