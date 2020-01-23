import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import pagesNumberByPage from 'justiciapedia/utils/pagination/pagesNumbersByPage';

const resolver = {
  institution: 'instituciones',
  election: 'elecciones',
  profile: 'perfiles'
};

const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

/**
 * This has pagination logic that maybe should will be abstracted.
 */
export default class PerfilesController extends Controller {
  @tracked page = 1;
  @tracked size = 12;

  get chunks() {
    return array_chunks(this.model.profiles, this.size);
  }

  get profiles() {
    return this.chunks[this.page - 1];
  }

  get pages() {
    return pagesNumberByPage(this.chunks.length, this.page);
  }

  @action
  toProfile(profile) {
    this.transitionToRoute('perfil', resolver[profile._internalModel.modelName], profile.id);
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
    this.page = this.page < this.chunks.length ? this.page + 1 : this.chunks.length;
  }
}
