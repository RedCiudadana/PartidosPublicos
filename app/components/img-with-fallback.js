import Component from '@ember/component';

export default Component.extend({
  fallbackImageEvent(event) {
    const target = event.target;

    target.src = 'https://via.placeholder.com/300';
  }
});
