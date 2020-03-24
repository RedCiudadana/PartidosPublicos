'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "misalud",
    short_name: "misalud",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "maskable_icon.png",
        type: "image/png",
        sizes: "303x303"
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
