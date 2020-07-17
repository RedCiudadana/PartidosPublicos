import Component from '@glimmer/component';

export default class ImgWithFallback extends Component {
  fallbackImageEvent(event) {
    const target = event.target;

    console.log(...arguments);
    console.log('fallback?');

    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='100%' height='100%' fill='rgb(236,241,255)' fill-opacity='0.5' stroke-opacity='0.8'/%3E%3C/svg%3E`;
  }
}
