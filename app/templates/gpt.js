(function(){var window=this;var aa="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},ba;if("function"==typeof Object.setPrototypeOf)ba=Object.setPrototypeOf;else{var ca;a:{var da={I:!0},ea={};try{ea.__proto__=da;ca=ea.I;break a}catch(a){}ca=!1}ba=ca?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var fa=ba,ha=function(a,b){a.prototype=aa(b.prototype);a.prototype.constructor=a;if(fa)fa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.L=b.prototype},g=this,k=function(a){return"string"==typeof a},ja=function(){if(null===l)a:{var a=g.document;if((a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&ia.test(a)){l=a;break a}l=""}return l},ia=/^[\w+/_-]+[=]{0,2}$/,l=null,ka=function(a){a=a.split(".");for(var b=g,c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b},la=function(){},ma=function(a){a.l=void 0;a.g=function(){return a.l?a.l:a.l=new a}},m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},na="closure_uid_"+(1E9*Math.random()>>>0),oa=0,n=function(a,b){function c(){}c.prototype=b.prototype;a.L=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.M=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var p=function(a,b){for(var c=a.length,d=k(a)?a.split(""):a,e=0;e<c;e++)e in d&&b.call(void 0,d[e],e,a)},qa=function(a,b){for(var c=a.length,d=[],e=0,f=k(a)?a.split(""):a,h=0;h<c;h++)if(h in f){var v=f[h];b.call(void 0,v,h,a)&&(d[e++]=v)}return d},ra=function(a,b){for(var c=a.length,d=Array(c),e=k(a)?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));return d},sa=function(a,b){a:{for(var c=a.length,d=k(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:k(a)?a.charAt(b):a[b]},ta=function(a,b){a:{var c=a.length,d=k(a)?a.split(""):a;for(--c;0<=c;c--)if(c in d&&b.call(void 0,d[c],c,a)){b=c;break a}b=-1}return 0>b?null:k(a)?a.charAt(b):a[b]};var ua=function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},wa=function(a,b){var c=0;a=ua(String(a)).split(".");b=ua(String(b)).split(".");for(var d=Math.max(a.length,b.length),e=0;0==c&&e<d;e++){var f=a[e]||"",h=b[e]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==f[0].length&&0==h[0].length)break;c=va(0==f[1].length?0:parseInt(f[1],10),0==h[1].length?0:parseInt(h[1],10))||va(0==f[2].length,0==h[2].length)||va(f[2],h[2]);f=f[3];h=h[3]}while(0==c)}return c},va=function(a,b){return a<b?-1:a>b?1:0};var q;a:{var xa=g.navigator;if(xa){var ya=xa.userAgent;if(ya){q=ya;break a}}q=""};var za=function(a){var b={},c;for(c in a)b[c]=a[c];return b};var r=function(a){r[" "](a);return a};r[" "]=la;var u=function(){},Aa="function"==typeof Uint8Array,x=function(a,b,c,d){a.a=null;b||(b=[]);a.N=void 0;a.f=-1;a.b=b;a:{if(b=a.b.length){--b;var e=a.b[b];if(!(null===e||"object"!=typeof e||"array"==m(e)||Aa&&e instanceof Uint8Array)){a.h=b-a.f;a.c=e;break a}}a.h=Number.MAX_VALUE}a.w={};if(c)for(b=0;b<c.length;b++)e=c[b],e<a.h?(e+=a.f,a.b[e]=a.b[e]||w):(Ba(a),a.c[e]=a.c[e]||w);if(d&&d.length)for(b=0;b<d.length;b++)Ca(a,d[b])},w=[],Ba=function(a){var b=a.h+a.f;a.b[b]||(a.c=a.b[b]={})},y=function(a,b){if(b<a.h){b+=a.f;var c=a.b[b];return c===w?a.b[b]=[]:c}if(a.c)return c=a.c[b],c===w?a.c[b]=[]:c},z=function(a,b,c){a=y(a,b);return null==a?c:a},Da=function(a,b,c){b<a.h?a.b[b+a.f]=c:(Ba(a),a.c[b]=c)},Ca=function(a,b){for(var c,d,e=0;e<b.length;e++){var f=b[e],h=y(a,f);null!=h&&(c=f,d=h,Da(a,f,void 0))}return c?(Da(a,c,d),c):0},A=function(a,b,c){a.a||(a.a={});if(!a.a[c]){var d=y(a,c);d&&(a.a[c]=new b(d))}return a.a[c]},B=function(a,b,c){a.a||(a.a={});if(!a.a[c]){for(var d=y(a,c),e=[],f=0;f<d.length;f++)e[f]=new b(d[f]);a.a[c]=e}b=a.a[c];b==w&&(b=a.a[c]=[]);return b};var C=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}};var D=function(){this.b="";this.f=Ea};D.prototype.c=!0;D.prototype.a=function(){return this.b};var Fa=function(a){return a instanceof D&&a.constructor===D&&a.f===Ea?a.b:"type_error:TrustedResourceUrl"},Ea={};var E=function(){this.m="";this.H=Ga};E.prototype.c=!0;E.prototype.a=function(){return this.m};var Ha=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Ga={},Ia=function(a){var b=new E;b.m=a;return b};Ia("about:blank");var Ja=function(a,b){a.src=Fa(b);(b=ja())&&a.setAttribute("nonce",b)};var La=function(a){Ka();var b=new D;b.b=a;return b},Ka=la;var Ma=function(a,b){a=[a];for(var c=b.length-1;0<=c;--c)a.push(typeof b[c],b[c]);return a.join("\x0B")};var Qa=function(a,b){if(!Na()&&!Oa()){var c=Math.random();if(c<b)return c=Pa(g),a[Math.floor(c*a.length)]}return null},Pa=function(a){if(!a.crypto)return Math.random();try{var b=new Uint32Array(1);a.crypto.getRandomValues(b);return b[0]/65536/65536}catch(c){return Math.random()}},Ra=function(){var a=G(210),b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b))return!1;return!0},Oa=C(function(){return-1!=q.indexOf("Google Web Preview")||1E-4>Math.random()}),Na=C(function(){return-1!=q.indexOf("MSIE")}),Sa=/^(-?[0-9.]{1,30})$/,Ta=function(a,b){return Sa.test(a)&&(a=Number(a),!isNaN(a))?a:void 0==b?null:b},Ua=function(){try{return ja()}catch(a){}};var Va=function(){var a=window,b=-1;try{a.localStorage&&(b=parseInt(a.localStorage.getItem("google_experiment_mod"),10))}catch(c){return null}if(0<=b&&1E3>b)return b;if(Oa())return null;b=Math.floor(1E3*Pa(a));try{if(a.localStorage)return a.localStorage.setItem("google_experiment_mod",""+b),b}catch(c){}return null};var Wa=function(a,b){var c=void 0===c?{}:c;this.error=a;this.context=b.context;this.line=b.line||-1;this.msg=b.message||"";this.file=b.file||"";this.id=b.id||"jserror";this.meta=c};var H=null,Xa=function(){if(null===H){H="";try{var a="";try{a=g.top.location.hash}catch(c){a=g.location.hash}if(a){var b=a.match(/\bdeid=([\d,]+)/);H=b?b[1]:""}}catch(c){}}return H};var Za=function(a){x(this,a,Ya,null)};n(Za,u);var ab=function(a){x(this,a,$a,null)};n(ab,u);var I=function(a){x(this,a,bb,cb)};n(I,u);var db=function(a){x(this,a,null,null)};n(db,u);var fb=function(a){x(this,a,eb,null)};n(fb,u);var K=function(a){x(this,a,gb,hb)};n(K,u);var Ya=[2],$a=[2];ab.prototype.getId=function(){return z(this,1,0)};var bb=[5],cb=[[1,2,3,6]],eb=[4],gb=[2,8],hb=[[3,4,5],[6,7]];var ib=function(a){return null!=a?!a:a},jb=function(a,b){for(var c=!1,d=0;d<a.length;d++){var e=a[d].call();if(e==b)return e;null==e&&(c=!0)}if(!c)return!b},lb=function(a,b){var c=B(a,K,2);if(!c.length)return kb(a,b);a=z(a,1,0);if(1==a)return ib(lb(c[0],b));c=ra(c,function(a){return function(){return lb(a,b)}});switch(a){case 2:return jb(c,!1);case 3:return jb(c,!0)}},kb=function(a,b){var c=Ca(a,hb[0]);a:{switch(c){case 3:var d=z(a,3,0);break a;case 4:d=z(a,4,0);break a;case 5:d=z(a,5,0);break a}d=void 0}if(d&&(b=(b=b[c])&&b[d])){try{var e=b.apply(null,y(a,8))}catch(f){return}b=z(a,1,0);if(4==b)return!!e;d=null!=e;if(5==b)return d;a:{switch(c){case 4:a=+z(a,6,0);break a;case 5:a=z(a,7,"");break a}a=void 0}if(null!=a){if(6==b)return e===a;if(9==b)return 0==wa(e,a);if(d)switch(b){case 7:return e<a;case 8:return e>a;case 12:return(new RegExp(a)).test(e);case 10:return-1==wa(e,a);case 11:return 1==wa(e,a)}}}},mb=function(a,b){return!a||!(!b||!lb(a,b))};var L=function(a){this.a=a},nb=new L(1),ob=new L(2),pb=new L(3),qb=new L(4),M=function(a,b,c){c.hasOwnProperty(a.a)||Object.defineProperty(c,String(a.a),{value:b})};var rb=function(a,b){switch(b){case 1:return z(a,1,0);case 2:return z(a,2,0);case 3:return z(a,3,0);case 6:return z(a,6,0);default:return null}},sb=function(a,b){if(!a)return null;switch(b){case 1:return z(a,1,!1);case 2:return+z(a,2,0);case 3:return z(a,3,"");case 6:return y(a,4);default:return null}},tb=C(function(){var a="";try{a=g.top.location.hash}catch(c){a=g.location.hash}var b={};if(a=(a=/\bdflags=({.*})(&|$)/.exec(a))&&a[1])try{b=JSON.parse(decodeURIComponent(a))}catch(c){}return b}),O=function(a,b,c){var d=tb();if(d[a]&&null!=d[a][b])return d[a][b];b=N.g().a[a][b];if(!b)return c;b=new I(b);b=ub(b);a=sb(b,a);return null!=a?a:c},ub=function(a){var b=N.g().b;if(b){var c=ta(B(a,db,5),function(a){return mb(A(a,K,1),b)});if(c)return A(c,fb,2)}return A(a,fb,4)},N=function(){var a={};this.a=(a[1]={},a[2]={},a[3]={},a[6]={},a);this.b=null};ma(N);var vb=function(a,b){return O(3,a,void 0===b?"":b)},wb=function(a){var b=N.g().a;p(a,function(a){var c=Ca(a,cb[0]),e=rb(a,c);e&&(b[c][e]=a.b)})};var xb=function(a,b){var c=this,d=void 0===b?{}:b;b=void 0===d.u?!1:d.u;var e=void 0===d.A?{}:d.A;d=void 0===d.D?[]:d.D;this.h=a;this.w=b;this.c=e;this.a=null;this.f=d;this.b={};if(a=Xa())a=a.split(",")||[],p(a,function(a){(a=parseInt(a,10))&&(c.b[a]=!0)})},P=function(a,b){var c=a.h[b];c&&(delete a.h[b],p(c,function(b){b=new Za(b);mb(A(b,K,3),a.a)&&(b=yb(a,b))&&(a.f.push(b.getId()),(b=B(b,I,2))&&wb(b))}))},yb=function(a,b){var c=B(b,ab,2),d=a.a,e=d?qa(c,function(a){return mb(A(a,K,3),d)}):c,f=e.length;if(!f)return null;c=z(b,4,0);b=f*z(b,1,0);if(!c)return zb(a,e,b/1E3);f=null!=a.c[c]?a.c[c]:1E3;if(0>=f)return null;e=zb(a,e,b/f);a.c[c]=e?0:f-b;return e},zb=function(a,b,c){var d=a.b,e=sa(b,function(a){return!!d[a.getId()]});return e?e:a.w?null:Qa(b,c)},Ab=function(a){var b=G(245);M(nb,function(b){a.b[b]=!0},b);M(ob,function(b){return void P(a,b)},b);M(pb,function(){return a.f},b);M(qb,function(b){a.a=b},b)};var Bb=C(function(){var a=g.navigator&&g.navigator.userAgent||"";a=a.toLowerCase();return-1!=a.indexOf("firefox/")||-1!=a.indexOf("chrome/")||-1!=a.indexOf("opr/")}),Q=function(a,b,c,d,e){d=void 0===d?"":d;var f=a.createElement("link");try{f.rel=c;if(-1!=c.toLowerCase().indexOf("stylesheet"))var h=Fa(b);else{if(b instanceof D)var v=Fa(b);else{if(b instanceof E)var t=b instanceof E&&b.constructor===E&&b.H===Ga?b.m:"type_error:SafeUrl";else{if(b instanceof E)var J=b;else b="object"==typeof b&&b.c?b.a():String(b),Ha.test(b)||(b="about:invalid#zClosurez"),J=Ia(b);t=J.a()}v=t}h=v}f.href=h}catch(pa){return}d&&"preload"==c&&(f.as=d);e&&f.setAttribute("nonce",e);if(a=a.getElementsByTagName("head")[0])try{a.appendChild(f)}catch(pa){}};var Cb=/^\.google\.(com?\.)?[a-z]{2,3}$/,Db=/\.(cn|com\.bi|do|sl|ba|by|ma|am)$/,Eb=function(a){return Cb.test(a)&&!Db.test(a)},Fb=function(a){return a.replace(/[\W]/g,function(a){return"&#"+a.charCodeAt()+";"})},R=g,Gb=function(a,b){a="https://"+("adservice"+b+"/adsid/integrator."+a);b=["domain="+encodeURIComponent(g.location.hostname)];T[3]>=+new Date&&b.push("adsid="+encodeURIComponent(T[1]));return a+"?"+b.join("&")},T,U,V=function(){R=g;T=R.googleToken=R.googleToken||{};var a=+new Date;T[1]&&T[3]>a&&0<T[2]||(T[1]="",T[2]=-1,T[3]=-1,T[4]="",T[6]="");U=R.googleIMState=R.googleIMState||{};Eb(U[1])||(U[1]=".google.com");"array"==m(U[5])||(U[5]=[]);"boolean"==typeof U[6]||(U[6]=!1);"array"==m(U[7])||(U[7]=[]);"number"==typeof U[8]||(U[8]=0)},Hb=function(a){try{a()}catch(b){g.setTimeout(function(){throw b;},0)}},Jb=function(a){"complete"==g.document.readyState||"loaded"==g.document.readyState||g.document.currentScript&&g.document.currentScript.async?Ib(3):a()},Kb=0,W={i:function(){return 0<U[8]},o:function(){U[8]++},B:function(){0<U[8]&&U[8]--},C:function(){U[8]=0},j:function(){},G:function(){return!1},v:function(){return U[5]},s:Hb},X={i:function(){return U[6]},o:function(){U[6]=!0},B:function(){U[6]=!1},C:function(){U[6]=!1},j:function(){},G:function(){return".google.com"!=U[1]&&2<++Kb},v:function(){return U[7]},s:function(a){Jb(function(){Hb(a)})}},Ib=function(a){if(1E-5>Math.random()){g.google_image_requests||(g.google_image_requests=[]);var b=g.document.createElement("img");b.src="https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err="+a;g.google_image_requests.push(b)}};W.j=function(){if(!W.i()){var a=g.document,b=function(b){b=Gb("js",b);var c=Ua();Q(a,b,"preload","script",c);c=a.createElement("script");c.type="text/javascript";c.onerror=function(){return g.processGoogleToken({},2)};b=La(b);Ja(c,b);try{(a.head||a.body||a.documentElement).appendChild(c),W.o()}catch(h){}},c=U[1];b(c);".google.com"!=c&&b(".google.com");b={};var d=(b.newToken="FBT",b);g.setTimeout(function(){return g.processGoogleToken(d,1)},1E3)}};X.j=function(){if(!X.i()){var a=g.document,b=Gb("sync.js",U[1]);Q(a,b,"preload","script");b=Fb(b);var c=r("script"),d="",e=Ua();e&&(d='nonce="'+Fb(e)+'"');var f="<"+c+' src="'+b+'" '+d+"></"+c+">"+("<"+c+" "+d+'>processGoogleTokenSync({"newToken":"FBS"},5);</'+c+">");Jb(function(){a.write(f);X.o()})}};var Lb=function(a){V();T[3]>=+new Date&&T[2]>=+new Date||a.j()},Nb=function(){g.processGoogleToken=g.processGoogleToken||function(a,b){return Mb(W,a,b)};Lb(W)},Ob=function(){g.processGoogleTokenSync=g.processGoogleTokenSync||function(a,b){return Mb(X,a,b)};Lb(X)},Mb=function(a,b,c){b=void 0===b?{}:b;c=void 0===c?0:c;var d=b.newToken||"",e="NT"==d,f=parseInt(b.freshLifetimeSecs||"",10),h=parseInt(b.validLifetimeSecs||"",10),v=b["1p_jar"]||"";b=b.pucrd||"";V();1==c?a.C():a.B();if(!d&&a.G())Eb(".google.com")&&(U[1]=".google.com"),a.j();else{var t=R.googleToken=R.googleToken||{},J=0==c&&d&&k(d)&&!e&&"number"==typeof f&&0<f&&"number"==typeof h&&0<h&&k(v);e=e&&!a.i()&&(!(T[3]>=+new Date)||"NT"==T[1]);var pa=!(T[3]>=+new Date)&&0!=c;if(J||e||pa)e=+new Date,f=e+1E3*f,h=e+1E3*h,Ib(c),t[5]=c,t[1]=d,t[2]=f,t[3]=h,t[4]=v,t[6]=b,V();if(J||!a.i()){c=a.v();for(d=0;d<c.length;d++)a.s(c[d]);c.length=0}}};var Pb=function(){this.a=null},Qb=function(a,b){a.a=b};Pb.prototype.b=function(a,b,c,d,e){if(Math.random()>(void 0===c?.01:c))return!1;b.error&&b.meta&&b.id||(b=new Wa(b,{context:a,id:void 0===e?"gpt_exception":e}));if(d||this.a)b.meta={},this.a&&this.a(b.meta),d&&d(b.meta);g.google_js_errors=g.google_js_errors||[];g.google_js_errors.push(b);g.error_rep_loaded||(b=g.document,a=b.createElement("script"),Ja(a,La(g.location.protocol+"//pagead2.googlesyndication.com/pagead/js/err_rep.js")),(b=b.getElementsByTagName("script")[0])&&b.parentNode&&b.parentNode.insertBefore(a,b),g.error_rep_loaded=!0);return!1};var Rb=function(a,b){var c=void 0===c?a.b:c;try{b()}catch(d){if(!c.call(a,420,d,.01,void 0,"gpt_exception"))throw d;}};var Sb=function(a){if(!a.google_ltobserver){var b=new a.PerformanceObserver(function(b){var c=a.google_lt_queue=a.google_lt_queue||[];p(b.getEntries(),function(a){return c.push(a)})});b.observe({entryTypes:["longtask"]});a.google_ltobserver=b}};var Tb=function(a){var b=a;b=void 0===b?g:b;if(b=(b=b.performance)&&b.now?b.now():null)b={label:"1",type:9,value:b},a=a.google_js_reporting_queue=a.google_js_reporting_queue||[],1024>a.length&&a.push(b)};var Ub=[[28,null,null,[1]],[38,null,null,[1]],[null,7,null,[null,.1]],[40,null,null,[1]],[72,null,null,[1]],[5,null,null,[1]],[null,14,null,[null,1]],[56,null,null,[1]],[61,null,null,[1]],[53,null,null,[1]],[52,null,null,[1]],[69,null,null,[1]],[46,null,null,[1]],[null,null,8,[null,null,"/pagead/js/rum.js"]],[11,null,null,[1]],[48,null,null,[1]],[18,null,null,[1]],[39,null,null,[1]],[30,null,null,[1]],[3,null,null,[1]],[null,8,null,[null,-1]],[15,null,null,[1]],[null,11,null,[null,10]],[null,2,null,[null,1E3]],[106,null,null,[1]],[45,null,null,[]],[null,null,2,[null,null,"1-0-32"]],[21,null,null,[1]],[7,null,null,[1]],[94,null,null,[1]],[27,null,null,[1]],[29,null,null,[1]],[14,null,null,[1]],[12,null,null,[1]],[63,null,null,[1]]];var Vb=function(){return g.googletag||(g.googletag={})},Wb=function(a,b){var c=Vb();c.hasOwnProperty(a)||(c[a]=b)};var Y={173:"pubads.g.doubleclick.net",174:"securepubads.g.doubleclick.net",7:.02,13:1500,23:.001,24:200,37:.01,38:.001,58:1,66:1E-5,71:.05,76:"",124:1,129:.05,134:.01,135:.005,143:.005,187:.01,150:".google.cn",179:0,211:!1,196:.001,234:5E-4,236:5E-4,197:.001,152:[],172:null,191:"001902081532110",192:"021901312147090",190:"011901312147090",245:{},180:null,219:[],230:{},210:{},227:{},226:[],241:{},202:"",214:.05,215:.01,220:!1,228:"//www.googletagservices.com/pubconsole/",242:!1,244:!1,243:-1};Y[6]=function(a,b){try{for(var c=null;c!=a;c=a,a=a.parent)switch(a.location.protocol){case "https:":return!0;case "file:":return!!b;case "http:":return!1}}catch(d){}return!0}(window);Y[49]=(new Date).getTime();Y[36]=/^true$/.test("false");Y[46]=/^true$/.test("true");Y[148]=/^true$/.test("false");Y[221]=/^true$/.test("");Y[204]=Ta("{{MOD}}",-1);var Xb=function(){for(var a in Y)this[a]=Y[a]};ma(Xb);var G=function(a){return Xb.g()[a]},Z=function(a,b){Xb.g()[a]=b},Yb=Vb(),Zb=Xb.g(),$b=Yb._vars_,ac;for(ac in $b)Zb[ac]=$b[ac];Yb._vars_=Zb;var bc=function(){xb.call(this,G(210),{u:G(211),A:G(227),D:G(226)})};ha(bc,xb);var cc=function(){return G(36)};var dc=function(a,b){var c=b||Ma;return function(){var b=this||g;b=b.closure_memoize_cache_||(b.closure_memoize_cache_={});var e=c(a[na]||(a[na]=++oa),arguments);return b.hasOwnProperty(e)?b[e]:b[e]=a.apply(this,arguments)}}(function(a){return a&&a.src?/^(?:https?:)?\/\/www\.googletagservices\.com\/tag\/js\/gpt(?:_[a-z]+)*\.js/.test(a.src)?0:1:2},function(a,b){return a+"\x0B"+(b[0]&&b[0].src)}),ec=function(){return 0===dc(G(172))};var fc=function(){return Ta("0")||0};Wb("getVersion",function(){return"304"});var gc=function(){var a={};this[3]=(a[8]=function(a){return!!ka(a)},a[3]=ec,a[2]=cc,a[9]=function(a){a=ka(a);var b;if(b="function"==m(a))a=a&&a.toString&&a.toString(),b=k(a)&&-1!=a.indexOf("[native code]");return b},a[10]=function(){return window==window.top},a);a={};this[4]=(a[1]=function(){return G(204)},a[4]=fc,a[2]=function(){return 304},a[5]=function(){var a=Va();return null!=a?a:void 0},a);a={};this[5]=(a[2]=function(){return window.location.href},a[3]=function(){try{return window.top.location.hash}catch(b){return""}},a)};ma(gc);var hc={3:[[null,[[1337,[[82,null,null,[1]],[null,null,8,[null,null,"/pagead/js/rum_debug.js"]]]]]],[1,[[20194812,[[20,null,null,[1]]]],[20194813]],null,3],[500,[[21060697],[21060698,[[87,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,8,null,null,null,null,["Uint8Array"]],[4,null,11]]]],[100,[[21061497],[21061498,[[86,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,9,null,null,null,null,["requestAnimationFrame"]]]]],[10,[[21061505],[21061506,[[82,null,null,[1]]]]]],[100,[[21061545],[21061546,[[79,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,8,null,null,null,null,["google_ltobserver"]]]]],[50,[[21061999],[21062E3,[[81,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,10]]]],[1,[[21062059,[[null,null,null,[null,null,null,["50","50","50","50","50"]],null,2]]],[21062060,[[null,null,null,[null,null,null,"25 25 25 25 25 25 25 25 25 25".split(" ")],null,2]]],[21062061,[[null,null,null,[null,null,null,["125","125","125","125"]],null,2]]],[22321847],[22321848,[[null,null,null,[null,null,null,"50 50 50 50 50 50 50 50 50 50".split(" ")],null,2]]],[22322161,[[null,null,null,[null,null,null,["250","250"]],null,2]]]]],[50,[[21062068,[[58,null,null,[1]]]],[21062069]]],[1E3,[[21062150,null,[2,[[8,null,null,1,null,9],[7,null,null,1,null,15]]]],[21062151,[[null,null,null,[null,null,null,["50","50","50","50","50"]],null,2]],[2,[[8,null,null,1,null,14],[7,null,null,1,null,20]]]],[21062152,[[null,null,null,[null,null,null,"50 50 50 50 50 50 50 50 50 50".split(" ")],null,2]],[2,[[8,null,null,1,null,19],[7,null,null,1,null,25]]]],[21062153,[[null,null,null,[null,null,null,"25 25 25 25 25 25 25 25 25 25".split(" ")],null,2]],[2,[[8,null,null,1,null,24],[7,null,null,1,null,30]]]]],[4,null,3]],[null,[[21062156],[21062157,[[15,null,null,[1]]]]]],[10,[[21062185],[21062186,[[24,null,null,[1]]]]]],[10,[[21062261],[21062262,[[92,null,null,[1]],[33,null,null,[1]]]]],null,8],[10,[[21062287,[[56,null,null,[]],[53,null,null,[]],[52,null,null,[]],[27,null,null,[]],[88,null,null,[]],[29,null,null,[]],[14,null,null,[]],[12,null,null,[]],[63,null,null,[]]]],[21062288,[[88,null,null,[1]]]]],null,4],[1,[[21062330],[21062331,[[null,8,null,[null,800]]]],[21062332,[[null,8,null,[null,1E4]]]]],null,3],[10,[[21062352],[21062353,[[20,null,null,[1]]]]],[1,[[4,null,1]]],3],[50,[[21062377],[21062378,[[11,null,null,[]]]]]],[1,[[21062398],[21062399,[[null,13,null,[null,1]]]],[21062400,[[null,13,null,[null,1]]]],[21062593,[[null,13,null,[null,2]]]]]],[50,[[21062414],[21062415,[[64,null,null,[1]]]]]],[1,[[21062416],[21062417,[[37,null,null,[1]]]]]],[50,[[21062420],[21062421,[[42,null,null,[1]]]]]],[50,[[21062452],[21062453,[[43,null,null,[1]]]]]],[50,[[21062454],[21062456,[[51,null,null,[1]]]]]],[1,[[21062495],[21062496,[[47,null,null,[1]]]]]],[10,[[21062500],[21062501,[[null,6,null,[null,1]],[88,null,null,[1]],[26,null,null,[1]]]]],null,4],[50,[[21062576],[21062577,[[20,null,null,[],[[[1,[[4,null,1]]],[1]]]]]]],null,3],[1,[[21062693],[21062694,[[65,null,null,[1]]]]]],[10,[[21062724],[21062725,[[67,null,null,[1]]]]]],[null,[[21062738],[21062739,[[null,null,null,[null,null,null,["v","1-0-32"]],null,1]]],[21062740,[[null,null,2,[null,null,"1-0-32"]]]]]],[10,[[21062745],[21062748,[[null,11,null,[null,60]]]],[21062862,[[null,11,null,[null,40]]]]]],[10,[[21062751],[21062752,[[null,15,null,[null,1]]]],[21062753,[[null,15,null,[null,2]]]]]],[10,[[21062796],[21062797,null,[4,null,8,null,null,null,null,["Map"]]]]],[50,[[21062818],[21062819,[[93,null,null,[1]]]]]],[50,[[21062832],[21062833,[[89,null,null,[1]]]]]],[50,[[21062834],[21062835,[[92,null,null,[1]],[33,null,null,[1]]]]],[4,null,2],8],[10,[[21062844],[21062845]]],[50,[[21062854],[21062855,[[100,null,null,[1]]]]]],[10,[[21062859],[21062860,[[92,null,null,[1]]]]],null,8],[50,[[21062886],[21062887,[[91,null,null,[1]]]]]],[10,[[21062888],[21062889,[[101,null,null,[1]]]]]],[5,[[21062899],[21062900,[[98,null,null,[1]]]],[21062901,[[98,null,null,[1]]]]]],[5,[[21062916,[[98,null,null,[1]]]],[21062917,[[98,null,null,[1]]]]]],[null,[[21062937],[21062947,[[12,null,null,[1]]]],[21062948,[[12,null,null,[1]]]]],[4,null,10],4],[1,[[21062949],[21062950,[[108,null,null,[1]]]]]],[10,[[21062957],[21062958,[[102,null,null,[1]]]]]],[1,[[21062970],[21062971,[[109,null,null,[1]]]]]],[10,[[21062975],[21062977,[[104,null,null,[1]]]]]],[1,[[21063011],[21063012,[[117,null,null,[1]]]]],[3,[[2,[[8,null,null,2,null,297],[7,null,null,2,null,1E3]]],[8,null,null,2,null,2019013100]]]],[50,[[21063015],[21063016,[[97,null,null,[1]]]]]],[50,[[21063041],[21063042,[[62,null,null,[1]],[68,null,null,[1]],[107,null,null,[1]]]],[21063043,[[107,null,null,[1]]]]]],[50,[[21063044],[21063045,[[110,null,null,[1]]]]]],[5,[[21063046],[21063047],[21063048]],[4,null,7],9],[250,[[21063065],[21063066,[[116,null,null,[1]]]]],[3,[[2,[[8,null,null,2,null,294],[7,null,null,2,null,1E3]]],[8,null,null,2,null,2019013100]]]],[10,[[21063094],[21063095],[21063096]],[4,null,7],9],[50,[[21063101],[21063102,[[72,null,null,[]]]]]],[1,[[21063105],[21063106,[[65,null,null,[1]]]],[21063107,[[65,null,null,[1]],[71,null,null,[1]]]]]],[10,[[21063115],[21063116,[[115,null,null,[1]]]]],[3,[[2,[[8,null,null,2,null,294],[7,null,null,2,null,1E3]]],[8,null,null,2,null,2019013100]]]],[50,[[21063129],[21063130,[[5,null,null,[]]]]]],[250,[[21063137,[[88,null,null,[1]]]]],null,4],[50,[[21063138,[[null,14,null,[null,1]]]],[21063139,[[null,14,null,[null,1]],[121,null,null,[1]]]]]],[1,[[21063145],[21063146,[[112,null,null,[1]]]]]],[1,[[21063147],[21063148,[[99,null,null,[1]]]]],[3,[[2,[[8,null,null,2,null,304],[7,null,null,2,null,1E3]]],[8,null,null,2,null,2019020401]]]],[50,[[21063156],[21063157,[[69,null,null,[]]]]]],[50,[[21063158],[21063159,[[90,null,null,[1]]]]]],[1E3,[[21063165,null,[3,[[6,null,null,1,null,0],[6,null,null,1,null,5]]]],[21063166,[[null,14,null,[null,1]],[114,null,null,[1]]],[3,[[6,null,null,1,null,1],[6,null,null,1,null,6]]]]],[4,null,3]],[1,[[21063195],[21063196,[[122,null,null,[1]]]]],null,8],[1E3,[[22316437,null,[2,[[8,null,null,1,null,-1],[7,null,null,1,null,5]]]],[22316438,null,[2,[[8,null,null,1,null,4],[7,null,null,1,null,10]]]]],[4,null,3]],[10,[[22322686],[22322687,[[null,3,null,[null,.01]]]]]],[100,[[22325465],[22325466,[[80,null,null,[1]]]]],[4,null,6,null,null,null,null,["21060611"]]],[50,[[53887176],[53887177]]],[1,[[108809132],[108809133,[[45,null,null,[1]]]]]],[10,[[370204054],[370204055,[[113,null,null,[1]]]]]],[null,[[370204058],[370204059,[[119,null,null,[1]]]]]]],4:[[null,[[21062304],[21062305,[[34,null,null,[1]]]]]],[null,[[21062804],[21062805,[[8,null,null,[1]]]],[21062806,[[55,null,null,[1]]]]]],[null,[[21062807],[21062808,[[8,null,null,[1]],[55,null,null,[1]]]]]],[null,[[21062846],[21062847,[[74,null,null,[1]]]],[21062848,[[75,null,null,[1]]]],[21062849,[[74,null,null,[1]],[75,null,null,[1]]]]]],[null,[[21062983],[21062984,[[96,null,null,[1]]]],[21062985,[[96,null,null,[1]],[8,null,null,[1]],[55,null,null,[1]]]]]],[null,[[21063037],[21063038,[[105,null,null,[1]]]]]],[null,[[21063039],[21063040,[[70,null,null,[1]]]]]]],5:[[500,[[21060610],[21060611,[[77,null,null,[1]],[78,null,null,[1]],[85,null,null,[1]],[76,null,null,[1]]]]],[4,null,6,null,null,null,null,["21061508"]]],[null,[[21061212],[21061213,[[16,null,null,[1]]]],[21061214,[[17,null,null,[1]]]],[21061277,[[17,null,null,[1]],[16,null,null,[1]]]]]],[1,[[21061590,[[null,null,6,[null,null,"21061590"]]]],[21061591,[[59,null,null,[1]]]]],null,1],[10,[[21062549,[[null,null,5,[null,null,"ob"]],[null,null,6,[null,null,"ob"]]]],[21062550,[[null,null,4,[null,null,"/gpt/pubads_impl_ob_"]]]]],null,1],[1E3,[[21062763,[[88,null,null,[1]]]]],[12,null,null,null,3,null,"googEnableStrictApi"],4],[1E3,[[21062785,[[23,null,null,[]]],[7,null,null,5,null,50]],[21062786,[[23,null,null,[1]]],[8,null,null,5,null,949]]],[2,[[12,null,null,null,2,null,"today\\.line\\.me/.+/article"],[4,null,8,null,null,null,null,["_gmptnl"]]]],7],[1E3,[[21062812,[[23,null,null,[1]]]]],[2,[[12,null,null,null,2,null,"today\\.line\\.me/.+/article"],[4,null,8,null,null,null,null,["_gmptnl"]]]],7],[1E3,[[21062903,[[92,null,null,[1]],[33,null,null,[1]]],[12,null,null,null,3,null,"googDisableSync"]]],null,8],[10,[[21063186,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063186"]],[null,12,null,[null,304]],[null,null,7,[null,null,"21063186"]],[60,null,null,[1]],[null,null,6,[null,null,"21063186"]]]],[21063187,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063187"]],[null,12,null,[null,306]],[null,null,7,[null,null,"21063187"]],[60,null,null,[1]],[null,null,6,[null,null,"21063187"]]]]],null,1],[100,[[21063188,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063188"]],[null,12,null,[null,304]],[null,null,7,[null,null,"21063188"]],[60,null,null,[1]],[null,null,6,[null,null,"21063188"]]]],[21063189,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063189"]],[null,12,null,[null,301]],[null,null,7,[null,null,"21063189"]],[60,null,null,[1]],[null,null,6,[null,null,"21063189"]]]]],null,1]],6:[[10,[[21063049],[21063050],[21063051]],[3,[[4,null,6,null,null,null,null,["21062415"]],[4,null,6,null,null,null,null,["21062414"]]]]],[50,[[21063160],[21063161,[[null,14,null,[]]]]]]],7:[[10,[[21061507],[21061508,[[83,null,null,[1]],[84,null,null,[1]]]]]],[1E3,[[21063179,[[null,null,5,[null,null,"21063179"]],[null,null,6,[null,null,"21063179"]]],[6,null,null,4,null,2]],[21063180,null,[6,null,null,4,null,3]]],[1,[[4,null,3]]],1],[1E3,[[21063190,null,[6,null,null,4,null,1]]],null,1],[1E3,[[21063191,[[null,null,5,[null,null,"21063191"]],[null,null,6,[null,null,"21063191"]]],[6,null,null,4,null,2]],[21063192,null,[6,null,null,4,null,3]]],[4,null,3],1]],8:[[1E3,[[21063177,null,[4,null,6,null,null,null,null,["21063186"]]]],[4,null,3]],[1E3,[[21063178,null,[4,null,6,null,null,null,null,["21063187"]]]],[4,null,3]]]};var ic=function(a){var b={J:Ub,K:hc};a=a||b;Ra()&&Z(210,za(a.K));bc.call(this);var c=this;b=gc.g();b[3][6]=function(a){a:{var b=c.f;a=parseInt(a,10);if(k(b))b=k(a)&&1==a.length?b.indexOf(a,0):-1;else{for(var d=0;d<b.length;d++)if(d in b&&b[d]===a){b=d;break a}b=-1}}return 0<=b};this.a=b;G(219).length||Z(219,a.J);N.g().b=b;Z(241,b);wb(ra(G(219),function(a){return new I(a)}));Z(230,N.g().a);Ab(this)};ha(ic,bc);r("partner.googleadservices.com");var jc=r("www.googletagservices.com"),kc=function(){return G(46)&&!G(6)?"http://pubads.g.doubleclick.net":"https://securepubads.g.doubleclick.net"},lc=function(a){var b=a.currentScript;return"complete"!=a.readyState&&"loaded"!=a.readyState&&!(b&&b.async)},nc=function(){var a=G(76);if(a)return a;a=kc();var b=vb(4,"/gpt/pubads_impl_"),c=mc()||O(2,12,0)||"304",d=vb(5);a=a+b+c+".js";d&&(a+="?"+d);Z(76,a);return a},oc=function(a,b){var c;if(!(c=a.currentScript))a:{if(a=a.scripts)for(c=0;c<a.length;c++){var d=a[c];if(-1<d.src.indexOf(jc+"/tag/js/gpt")){c=d;break a}}c=null}Z(172,c);b=new ic(b);P(b,7);P(b,5);P(b,8);O(1,59,!1)&&(Z(173,jc),Z(174,jc));b=G(150);V();Eb(b)&&(U[1]=b)},pc=function(){return navigator.getBattery?navigator.getBattery().then(function(a){Z(243,a.level);Z(244,a.charging);Z(242,!0)}):null},mc=function(){var a="";if(!G(148))return a;try{var b="";try{b=g.top.location.hash}catch(d){b=g.location.hash}if(b){var c=b.match(/\bgptv=(\d+)/);a=c?c[1]:""}}catch(d){}return a},qc=function(a,b){var c=Vb(),d=c.fifWin||window;a=a||d.document;Wb("cmd",[]);if(c.evalScripts)c.evalScripts();else{oc(a,b);d.PerformanceObserver&&d.PerformanceLongTaskTiming&&Sb(d);Tb(d);b=nc();if(lc(a)){d="gpt-impl-"+Math.random();try{var e='<script id="'+d+'" src="'+b+'">\x3c/script>';O(1,17,!1)&&Bb()&&(e+='<link rel="preconnect" href="'+kc()+'">');a.write(e)}catch(f){}a.getElementById(d)&&(c._loadStarted_=!0,Z(220,!1),O(2,4,0)||Ob())}c._loadStarted_||(O(2,4,0)||Nb(),O(1,16,!1)&&Q(a,b,"preload","script"),O(1,108,!1)&&(d=vb(6),e=mc()||O(2,12,0)||"304",d=kc()+"/gpt/"+("pubads_impl_rendering_"+e+".js")+(d?"?"+d:""),Q(a,d,"preload","script")),d=a.createElement("script"),d.src=b,d.async=!0,(a.head||a.body||a.documentElement).appendChild(d),O(1,17,!1)&&Bb()&&Q(a,kc(),"preconnect"),Z(220,!0),c._loadStarted_=!0);(a=pc())&&a.catch(function(a){var b=new Pb;Qb(b,function(a){a.methodId=501});b.b(501,a)})}};(function(a,b){var c=new Pb;Qb(c,function(a){a.methodId=420});Rb(c,function(){return qc(a,b)})})();}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this)
