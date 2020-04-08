import Bowser from 'bowser';

const browser = Bowser.getParser(window.navigator.userAgent);
export const isMac = browser.getOS().name === 'macOS';
export const isFirefox = browser.getBrowserName() === 'Firefox';

export default browser;
