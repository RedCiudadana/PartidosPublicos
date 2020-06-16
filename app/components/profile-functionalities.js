import Component from '@glimmer/component';
import { A } from "@ember/array";
import { debug } from "@ember/debug";

export default class ProfileFunctionalities extends Component {
  init(
    { model: { profile, /* profiles, elections,  */candidates, comissioners } }
  ) {
    super.init(...arguments);
    this.set("links", A([]));

    this.set("breadcrumbs", A([]));

    if (profile._internalModel.modelName === "institution") {
      this.links.pushObjects([
        {
          route: "perfil.index",
          img: "img/i-estrado.png",
          text: "Información general"
        },
        // {
        //   route: "perfil.autoridades",
        //   img: "img/i-personas.png",
        //   text: "Autoridades",
        //   disabled: profiles.length < 1
        // },
        // {
        //   route: "perfil.elecciones",
        //   img: "img/i-personas.png",
        //   text: "Comisiones de Postulación",
        //   disabled: elections.length < 1
        // }
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

      profile
        .get("institution")
        .then(institution => {
          this.breadcrumbs.pushObjects([
            {
              route: "perfil",
              model: ["instituciones", institution.get("id")],
              text: institution.get("nombre")
            }
          ]);
        })
        .catch(() => {
          profile
            .get("election")
            .then(() => {
              profile.get("election").then(election => {
                this.breadcrumbs.pushObjects([
                  {
                    route: "perfil",
                    model: ["elecciones", election.get("id")],
                    text: election.nombre
                  }
                ]);
              });
            })
            .catch(() => {
              profile
                .get("comission")
                .then(() => {
                  profile.get("comission").then(comission => {
                    this.breadcrumbs.pushObjects([
                      {
                        route: "perfil",
                        model: ["elecciones", comission.get("id")],
                        text: comission.get("nombre")
                      }
                    ]);
                  });
                })
                .catch(() =>
                  debug(
                    `Profile ${profile.get(
                      "id"
                    )} don't have institution, election or comission.`
                  )
                );
            });
        });
    }

    if (profile._internalModel.modelName === "election") {
      this.links.pushObjects([
        {
          route: "perfil.index",
          img: "img/i-estrado.png",
          text: "Información general"
        },
        {
          route: "perfil.candidatos",
          img: "img/i-personas.png",
          text: "Candidatos",
          disabled: candidates.length < 1
        },
        {
          route: "perfil.comisionados",
          img: "img/i-personas.png",
          text: "Comisionados",
          disabled: comissioners.length < 1
        }
      ]);
    }
  }
}
