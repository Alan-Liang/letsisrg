Let's ISRG
==========

Remind users to install [ISRG Root X1][le] (if they need to). Inspired by <https://browser-update.org>.

See [demo].

## How it works

We can already issue certificates on ISRG Root X1 using the preferred chain option. This script tries to load `https://valid.isrgrootx1.top` to see if the browser detects an error. If the request failed, the script tries to load `https://isrgrootx1.netlify.app` to see if network is connected. If there is network connection but there is an error loading the first URL, there is a big chance that ISRG Root X1 is not recognized by the browser.

## Usage

CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/letsisrg/dist/letsisrg.js"></script>
```
or, import:
```javascript
import 'letsisrg' // require('letsisrg')
```

## Options

Options are stored in the `window.$letsisrg` object. The main script executes 50ms after script load, so you can specify options after `import`ing:

```javascript
import 'letsisrg'
window.$letsisrg = { defaultLanguage: 'zh' }
```

options (all optional):
- `messageLink`: the `href` on the "Learn more" link, not sanitized.
- `messageHtml`: the HTML of the reminder.
- `serviceName`: The reminder will include this `string` if this option is set, do not set if your site is not using a Let's Encrypt certificate.
- `defaultLanguage`: The fallback language code, defaults to `en`.
- `render`: pass a custom reminder render function here if you need.
- `noStyles`: when passed `true`, the script will not insert the stylesheet to the document; you should include your own stylesheet or else the reminder would appear at the very bottom at your site with no styles.
- `testUrl`: the URL to perform the main test, should be using a ISRG Root X1-signed certificate.
- `testConnectivityUrl`: the URL to perform the network connectivity check.
- `callback`: a function to be performed after the test. payload would be one of:
  - `{ skipped: true, reason: '...' }` if the test is not performed.
  - `{ error: '...' }` if an error occurred in the test.
  - `{ supported: true }` if ISRG Root X1 is supported.
  - `{ supported: false }` if ISRG Root X1 is not supported.
- `ignoreVersion`: skip browser version test.
- `ignoreTested`: by default, when a test succeeded, we will not test again in a week. Pass `true` to this option to skip the check.
- `ignoreTime`: by default, no reminder will be shown if DST Root CA X3 has already expired. Pass `true` to this option to skip the check. You may also want to enable `testOnIos`.
- `testOnIos`: iOS could figure out the signing path to DST by itself, so checking in iOS before DST expiry is meaningless. Pass `true` to also test on iOS.
- `testOnBots`: bots may have extremely old browsers, and showing the reminder on bot visits may cause the reminder to be shown on search engines. Pass `true` to also test on bots.
- `forceTest`: ignore all pre-checks, forces to perform the test.

Additionally, the reminder is always shown if the URL on script load contains `#test-letsisrg`.

## Content Security Policy (CSP)

If you use a CSP, this script will need an `unsafe-inline` directive for `style-src`. You can use your own styles and specify `noStyles` if you do not want to include the directive.

## Caveats

- May have false positives when network is unstable.
- Currently there are no way to test on iOS.
- Windows and macOS support is untested.

## LICENSE

MIT-style

[le]: https://letsencrypt.org/2020/11/06/own-two-feet.html
[demo]: https://alan-liang.github.io/letsisrg/demo/
