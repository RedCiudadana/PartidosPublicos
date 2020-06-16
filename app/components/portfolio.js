import { classNames, classNameBindings } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { oneWay, alias } from '@ember/object/computed';
import Component from '@glimmer/component';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import { isBlank } from '@ember/utils';

@classNames('container-fluid')
@classNameBindings('background')
export default class Portfolio extends Component {
  colSize = '10';
  offset = '1';
  fit = true;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if(
      this.pagination === false
      || isBlank(this.pagination) && this.profiles.length < 50) {
      this.set('perPage', this.profiles.length);
    }

    if (!isNaN(this.paginationSize)) {
      this.set('perPage', this.paginationSize);
    }
  }

  @computed('bg')
  get background() {
    return `bg-${this.bg}`;
  }

  // Pagination
  queryParams = ["page", "perPage"];

  // page: 1,
  // perPage: 24,


  @pagedArray('profiles')
  content;

  // binding the property on the paged array
  // to the query params on the controller
  @alias("content.page")
  page;

  @alias("content.perPage")
  perPage;

  @oneWay("content.totalPages")
  totalPages;
}
