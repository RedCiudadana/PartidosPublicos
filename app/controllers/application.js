import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    shareOnTwitter() {
      window.open(
        this.model.config.twitterShareLink,
        'twitter',
        'width=450, height=250'
      );
    }
  }
});
