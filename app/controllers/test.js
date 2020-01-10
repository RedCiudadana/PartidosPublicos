import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

const data = Array.from(Array(50).keys());

const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

export default class TestController extends Controller {
  @tracked page = 1;
  @tracked size = 20;

  get data() {
    return array_chunks(data, this.size);
  }

  get content() {
    return this.data[this.page - 1];
  }
}
