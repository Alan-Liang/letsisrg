setTimeout(function () {
  if (window.$letsisrg) {
    var cfg = $letsisrg
    var ignoreVersion = !!cfg.ignoreVersion
    var ignoreTested = !!cfg.ignoreTested
    var ignoreTime = !!cfg.ignoreTime
    var testOnIos = !!cfg.testOnIos
    var testOnBots = !!cfg.testOnBots
    var force = !!cfg.forceTest
    var link = cfg.messageLink
    var html = cfg.messageHtml
    var serviceName = cfg.serviceName
    var defaultLang = cfg.defaultLanguage
    if ('render' in cfg) {
      if (typeof cfg.render === 'function') render = cfg.render
      if (!cfg.render) render = function () {}
    }
    var testUrl = cfg.testUrl
    var testConnectivityUrl = cfg.testConnectivityUrl
    var callback = cfg.callback
  }
  var testMode = location.href.indexOf('#test-letsisrg') > -1
  if (testMode) {
    call({ skipped: true, reason: 'In test mode' })
    setTimeout(render, 1)
    return
  }
  function ignore (reason, re) { if (re.test(navigator.userAgent)) return reason + ' detected' }
  if (!force) {
    var skip
    if (getProperty('Closed')) skip = 'User has closed message'
    // https://github.com/browser-update/browser-update/blob/master/scripts/update.js
    if (!testOnBots) skip = skip || ignore('Bot', /Pagespeed|pingdom|Preview|ktxn|dynatrace|Ruxit|PhantomJS|Headless|Lighthouse|bot|spider|archiver|transcoder|crawl|checker|monitoring|prerender|screenshot|python-|php|uptime|validator|fetcher|facebook|slurp|google|yahoo|node|mail.ru|github|cloudflare|addthis|thumb|proxy|feed|fetch|favicon|link|http|scrape|seo|page|search console|AOLBuild|Teoma|Expeditor/i)
    if (!ignoreVersion) {
      var ver = 'Sufficient version of '
      skip = skip
        || ignore(ver + 'Firefox', /Firefox\/([5-9]\d|\d{3,})/i)
        || ignore(ver + 'Android', /Android (\d\d|9|8|7\.1\.[0-9])/i)
        || ignore(ver + 'macOS', /OS X (\d{3,}|[2-9]\d|1[1-9]|10_1[3-9]|10_12_)/i)
    }
    // iOS could find the DST signature path by itself
    if (!testOnIos) skip = skip || ignore('iOS', /iP(hone|[ao]d)/i)
    // don't show after 2021-9-30
    if (!ignoreTime && new Date().getTime() > 1633010475000) skip = skip || 'DST Root CA X3 has already expired, skipping ISRG Root X1 test.'
    if (!ignoreTested && getProperty('Ok')) skip = skip || 'The browser has already been tested OK'
    if (skip) {
      call({ skipped: true, reason: skip })
      console.log(skip + ', skipping ISRG Root X1 test.')
      return
    }
  }

  var start = new Date().getTime()
  request(testUrl || 'https://valid.isrgrootx1.top/', function () {
    // ignore timeouts
    if (new Date().getTime() - start > 10 * 1000) {
      call({ error: 'Connection timed out.' })
      return
    }
    // test connectivity
    request(testConnectivityUrl || 'https://isrgrootx1.netlify.app/', function () {
      // no connectivity, ignore
      console.log('No internet connectivity is detected.')
      call({ error: 'Network error.' })
    }, function () {
      // has connectivity but does not support ISRG Root X1
      call({ supported: false })
      render()
    })
  }, function () {
    // test ok!
    call({ supported: true })
    setProperty('Ok', 168)
  })

  function call (p) { if (typeof callback === 'function') try { callback(p) } catch (_) {} }

  function request (url, onerror, onload) {
    var completed = false
    var req = new XMLHttpRequest()
    req.onerror = function () {
      if (completed) return
      completed = true
      onerror(req)
    }
    req.onload = function () {
      if (completed) return
      completed = true
      onload(req)
    }
    req.open('HEAD', url)
    req.send()
  }

  function translate (messages) {
    return messages[navigator.language.toLowerCase()] || messages[navigator.language.toLowerCase().slice(0, 2)] || messages[defaultLang] || messages.en
  }
  function render () {
    var baseMsg = translate({
      'en': 'You might not be able to use many web services:service: after 2021-9-30. <a class="letsisrg__link" href=":link:" target="_blank" rel="noopener">More information.</a>',
      'zh': '您的设备在 2021 年 9 月 30 日之后可能无法使用:service:一些网络服务。<a class="letsisrg__link" href=":link:" target="_blank" rel="noopener">了解更多信息 →</a>',
    })
    baseMsg = baseMsg.replace(':link:', link || 'https://letsencrypt.org/2020/11/06/own-two-feet.html')
    if (serviceName) baseMsg = baseMsg.replace(':service:', translate({
      'en': ', including :name:,',
      'zh': ' :name: 等',
    }).replace(':name:', serviceName))
    else baseMsg = baseMsg.replace(':service:', '')
    var msg = html || baseMsg
    var close = '<a class="letsisrg__link letsisrg__close" href="javascript:;">' + translate({
      'en': '[Close]',
      'zh': '[关闭]',
    }) + '</a>'
    var styles = '<style>.letsisrg{position:fixed;bottom:0;top:auto;left:0;right:0;border-top:1px solid #e0e0e0;border-top-left-radius:4px;border-top-right-radius:4px;padding:8px;font-family:sans-serif;background-color:#ffc;}.letsisrg--hidden{display:none;}.letsisrg__close{float:right;}</style>'
    var container = document.createElement('div')
    container.className = 'letsisrg'
    container.innerHTML = styles + msg + close
    document.body.appendChild(container)
    var children = container.childNodes
    for (var i = 0; i < children.length; i++) {
      if (children[i] && children[i].className && children[i].className.indexOf && children[i].className.indexOf('letsisrg__close') > -1) {
        children[i].onclick = function (e) {
          setProperty('Closed', 168)
          container.className = 'letsisrg letsisrg--hidden'
          e.preventDefault()
        }
      }
    }
  }

  function getProperty (name) {
    var exp = window.localStorage && localStorage['isrgRoot' + name]
    if (isNaN(exp)) return false
    return Number(exp) > new Date().getTime()
  }
  function setProperty (name, hours) {
    if (window.localStorage) localStorage['isrgRoot' + name] = '' + (new Date().getTime() + 3600000 * hours)
  }
}, 50)
