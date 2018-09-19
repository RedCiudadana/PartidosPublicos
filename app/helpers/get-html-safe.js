import { isNone } from '@ember/utils';
import { get } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { helper as buildHelper } from '@ember/component/helper';

export function getHtmlSafe([object, propertyName]) {
  if (isNone(object)) {
    return '';
  }

  let frenteAFrente = get(object, 'frenteAFrente');

  if (isNone(frenteAFrente)) {
    return '';
  }

  return htmlSafe(get(frenteAFrente, propertyName));
}

export default buildHelper(getHtmlSafe);
