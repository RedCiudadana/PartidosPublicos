import { helper as buildHelper } from '@ember/component/helper';


export function isNumeric([value]/*, hash*/) {
  return !isNaN(value);
}

export default buildHelper(isNumeric);
