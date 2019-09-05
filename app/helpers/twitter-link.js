import { helper } from '@ember/component/helper';

export function twitterLink(params/*, hash*/) {
    let twitterProfile = params[0].replace('https://twitter.com/', '');
    let cutIndex = twitterProfile.indexOf('?');
    twitterProfile = cutIndex > 0 ? twitterProfile.slice(0, cutIndex): twitterProfile;
  return twitterProfile;
}

export default helper(twitterLink);
