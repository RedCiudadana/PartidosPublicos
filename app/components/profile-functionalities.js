import Component from "@ember/component";
import { A } from "@ember/array";

export default Component.extend({
  init({ model: { profile, profiles, elections, candidates } }) {
    this._super(...arguments);
    this.set(
      "links",
      A([])
    );

    if (profile._internalModel.modelName === "institution") {
      this.links.pushObjects([
        {
          route: "perfil.index",
          img: "img/i-estrado.png",
          text: "Información general"
        },
        {
          route: "perfil.autoridades",
          img: "img/i-personas.png",
          text: "Autoridades",
          disabled: profiles.length < 1
        },
        {
          route: "perfil.elecciones",
          img: "img/i-personas.png",
          text: "Elecciones",
          disabled: elections.length < 1
        }
      ]);
    }

    if (profile._internalModel.modelName === "profile") {
      this.links.pushObjects([
        {
          route: "perfil.index",
          img: "img/i-estrado.png",
          text: "Información general"
        }
      ]);
        //   { route: 'perfil.frente-a-frente', img: '', text: 'Compara'},
    }

    if (profile._internalModel.modelName === "election") {
      this.links.pushObjects([
        {
          route: "perfil.candidatos",
          img: "",
          text: "Candidatos",
          disabled: candidates.length < 1
        }
      ]);
    }
  }
});
