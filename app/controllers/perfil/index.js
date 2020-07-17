import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import pagesNumbersByPage from 'partidospublicos/utils/pagination/pagesNumbersByPage';

const array_chunks = (array, chunk_size) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map(begin => array.slice(begin, begin + chunk_size));

export default class IndexController extends Controller {
  page = 1;
  size = 10;

  init() {
    super.init(...arguments);
    // False is not collapsed
    this.set('presupuesto', false);
    this.set('experiencia', false);
    this.set('partidos', false);
    this.set('isCollapsedComissioners', false);
    this.set('misionYVision', false);
  }

  @computed('model.compras')
  get chunks() {
    return array_chunks(this.model.compras, this.size);
  }

  @computed('chunks', 'page')
  get comprasPaginated() {
    return this.chunks[this.page - 1];
  }

  @computed('chunks', 'page')
  get pages() {
    return pagesNumbersByPage(this.chunks.length, this.page);
  }

  @action
  selectPage(page) {
    this.set('page', page);
  }

  @action
  prevPage() {
    this.set('page', this.page > 1 ? this.page - 1 : 1);
  }

  @action
  nextPage() {
    this.set('page', this.page < this.chunks.length ? this.page + 1 : this.chunks.length)
  }
}
