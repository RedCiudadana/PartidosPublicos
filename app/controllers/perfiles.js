import Controller from "@ember/controller";
import { isBlank } from "@ember/utils";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import pagesNumbersByPage from 'misalud/utils/pagination/pagesNumbersByPage';

const resolver = {
  institution: "hospitales",
  election: "elecciones",
  profile: "perfiles"
};

const array_chunks = (array, chunk_size) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map(begin => array.slice(begin, begin + chunk_size));

/**
 * This has pagination logic that maybe should will be abstracted.
 */
export default class PerfilesController extends Controller {
  @tracked page = 1;
  @tracked size = 20;

  @tracked isMujer = false;
  @tracked isVaron = false;
  @tracked inInstitution = null;

  init() {
    super.init(...arguments);
    this.institutions = this.store.findAll("institution");
  }

  get filteredData() {
    if (!this.isMujer && !this.isVaron && !this.inInstitution) {
      return this.allProfiles;
    }

    return this.allProfiles.filter(candidate => {
      if (this.isMujer && this.isVaron) {
        return true;
      }

      if (this.isMujer && candidate.get("sexo") !== "Femenino") {
        return false;
      }

      if (this.isVaron && candidate.get("sexo") !== "Masculino") {
        return false;
      }

      if ((this.isMujer || this.isVaron) && isBlank(candidate.get("sexo"))) {
        return false;
      }

      if (
        this.inInstitution &&
        candidate.get("institution.id") !== 0 &&
        candidate.get("institution.id") !== this.inInstitution.get("id")
      ) {
        return false;
      }

      return true;
    });
  }

  get chunks() {
    return array_chunks(this.filteredData, this.size);
  }

  get profiles() {
    return this.chunks[this.page - 1];
  }

  get pages() {
    return pagesNumbersByPage(this.chunks.length, this.page);
  }

  @action
  toProfile(profile) {
    this.transitionToRoute(
      "perfil",
      resolver[profile._internalModel.modelName],
      profile.id
    );
    return false;
  }

  @action
  selectPage(page) {
    this.page = page;
  }

  @action
  prevPage() {
    this.page = this.page > 1 ? this.page - 1 : 1;
  }

  @action
  nextPage() {
    this.page =
      this.page < this.chunks.length ? this.page + 1 : this.chunks.length;
  }
}
