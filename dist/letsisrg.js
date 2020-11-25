setTimeout(function(){if(window.$letsisrg){var e=$letsisrg,t=!!e.ignoreVersion,o=!!e.ignoreTested,r=!!e.ignoreTime,n=!!e.testOnIos,i=!!e.testOnBots,s=!!e.forceTest,a=e.messageLink,l=e.messageHtml,c=e.serviceName,d=e.defaultLanguage;"render"in e&&("function"==typeof e.render&&(y=e.render),e.render||(y=function(){}));var g=e.testUrl,f=e.testConnectivityUrl,p=e.callback}if(location.href.indexOf("#test-letsisrg")>-1)return k({skipped:!0,reason:"In test mode"}),void setTimeout(y,1);function u(e,t){if(t.test(navigator.userAgent))return e+" detected"}if(!s){var h;if(x("Closed")&&(h="User has closed message"),i||(h=h||u("Bot",/Pagespeed|pingdom|Preview|ktxn|dynatrace|Ruxit|PhantomJS|Headless|Lighthouse|bot|spider|archiver|transcoder|crawl|checker|monitoring|prerender|screenshot|python-|php|uptime|validator|fetcher|facebook|slurp|google|yahoo|node|mail.ru|github|cloudflare|addthis|thumb|proxy|feed|fetch|favicon|link|http|scrape|seo|page|search console|AOLBuild|Teoma|Expeditor/i)),!t){var m="Sufficient version of ";h=h||u(m+"Firefox",/Firefox\/([5-9]\d|\d{3,})/i)||u(m+"Android",/Android (\d\d|9|8|7\.1\.[0-9])/i)||u(m+"macOS",/OS X (\d{3,}|[2-9]\d|1[1-9]|10_1[3-9]|10_12_)/i)}if(n||(h=h||u("iOS",/iP(hone|[ao]d)/i)),!r&&(new Date).getTime()>1633010475e3&&(h=h||"DST Root CA X3 has already expired, skipping ISRG Root X1 test."),!o&&x("Ok")&&(h=h||"The browser has already been tested OK"),h)return k({skipped:!0,reason:h}),void console.log(h+", skipping ISRG Root X1 test.")}var v=(new Date).getTime();function k(e){if("function"==typeof p)try{p(e)}catch(e){}}function w(e,t,o){var r=!1,n=new XMLHttpRequest;n.onerror=function(){r||(r=!0,t(n))},n.onload=function(){r||(r=!0,o(n))},n.open("HEAD",e),n.send()}function b(e){return e[navigator.language.toLowerCase()]||e[navigator.language.toLowerCase().slice(0,2)]||e[d]||e.en}function y(){var e=b({en:'You might not be able to use many web services:service: after 2021-9-30. <a class="letsisrg__link" href=":link:" target="_blank" rel="noopener">More information.</a>',zh:'\u60a8\u7684\u8bbe\u5907\u5728 2021 \u5e74 9 \u6708 30 \u65e5\u4e4b\u540e\u53ef\u80fd\u65e0\u6cd5\u4f7f\u7528:service:\u4e00\u4e9b\u7f51\u7edc\u670d\u52a1\u3002<a class="letsisrg__link" href=":link:" target="_blank" rel="noopener">\u4e86\u89e3\u66f4\u591a\u4fe1\u606f \u2192</a>'});e=e.replace(":link:",a||"https://letsencrypt.org/2020/11/06/own-two-feet.html"),e=c?e.replace(":service:",b({en:", including :name:,",zh:" :name: \u7b49"}).replace(":name:",c)):e.replace(":service:","");var t=l||e,o='<a class="letsisrg__link letsisrg__close" href="javascript:;">'+b({en:"[Close]",zh:"[\u5173\u95ed]"})+"</a>",r=document.createElement("div");r.className="letsisrg",r.innerHTML="<style>.letsisrg{position:fixed;bottom:0;top:auto;left:0;right:0;border-top:1px solid #e0e0e0;border-top-left-radius:4px;border-top-right-radius:4px;padding:8px;font-family:sans-serif;background-color:#ffc;}.letsisrg--hidden{display:none;}.letsisrg__close{float:right;}</style>"+t+o,document.body.appendChild(r);for(var n=r.childNodes,i=0;i<n.length;i++)n[i]&&n[i].className&&n[i].className.indexOf&&n[i].className.indexOf("letsisrg__close")>-1&&(n[i].onclick=function(e){_("Closed",168),r.className="letsisrg letsisrg--hidden",e.preventDefault()})}function x(e){var t=window.localStorage&&localStorage["isrgRoot"+e];return!isNaN(t)&&Number(t)>(new Date).getTime()}function _(e,t){window.localStorage&&(localStorage["isrgRoot"+e]=""+((new Date).getTime()+36e5*t))}w(g||"https://valid.isrgrootx1.top/",function(){(new Date).getTime()-v>1e4?k({error:"Connection timed out."}):w(f||"https://isrgrootx1.netlify.app/",function(){console.log("No internet connectivity is detected."),k({error:"Network error."})},function(){k({supported:!1}),y()})},function(){k({supported:!0}),_("Ok",168)})},50);