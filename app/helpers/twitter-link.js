import { helper } from '@ember/component/helper';

export function twitterLink(params/*, hash*/) {
    let twitterProfile = params[0].replace('https://twitter.com/', '');
    let cutIndex = twitterProfile.indexOf('?');
    twitterProfile = twitterProfile.slice(0, cutIndex);
  return twitterProfile;
}

export default helper(twitterLink);
