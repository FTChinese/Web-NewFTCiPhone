(function(){var window=this;var aa="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},g;if("function"==typeof Object.setPrototypeOf)g=Object.setPrototypeOf;else{var k;a:{var ba={H:!0},ca={};try{ca.__proto__=ba;k=ca.H;break a}catch(a){}k=!1}g=k?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var da=g,ea=function(a,b){a.prototype=aa(b.prototype);a.prototype.constructor=a;if(da)da(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.K=b.prototype},l=this,m=function(a){return"string"==typeof a},ha=function(){if(null===n)a:{var a=l.document;if((a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&fa.test(a)){n=a;break a}n=""}return n},fa=/^[\w+/_-]+[=]{0,2}$/,n=null,ia=function(a){a=a.split(".");for(var b=l,c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b},ja=function(){},p=function(a){a.l=void 0;a.g=function(){return a.l?a.l:a.l=new a}},q=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ka="closure_uid_"+(1E9*Math.random()>>>0),la=0,r=function(a,b){function c(){}c.prototype=b.prototype;a.K=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.L=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var t=function(a,b){for(var c=a.length,d=m(a)?a.split(""):a,e=0;e<c;e++)e in d&&b.call(void 0,d[e],e,a)},ma=function(a,b){for(var c=a.length,d=[],e=0,f=m(a)?a.split(""):a,h=0;h<c;h++)if(h in f){var v=f[h];b.call(void 0,v,h,a)&&(d[e++]=v)}return d},oa=function(a,b){for(var c=a.length,d=Array(c),e=m(a)?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));return d},pa=function(a,b){a:{for(var c=a.length,d=m(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:m(a)?a.charAt(b):a[b]},qa=function(a,b){a:{var c=a.length,d=m(a)?a.split(""):a;for(--c;0<=c;c--)if(c in d&&b.call(void 0,d[c],c,a)){b=c;break a}b=-1}return 0>b?null:m(a)?a.charAt(b):a[b]};var ra=function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},sa=function(a,b){var c=0;a=ra(String(a)).split(".");b=ra(String(b)).split(".");for(var d=Math.max(a.length,b.length),e=0;0==c&&e<d;e++){var f=a[e]||"",h=b[e]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==f[0].length&&0==h[0].length)break;c=w(0==f[1].length?0:parseInt(f[1],10),0==h[1].length?0:parseInt(h[1],10))||w(0==f[2].length,0==h[2].length)||w(f[2],h[2]);f=f[3];h=h[3]}while(0==c)}return c},w=function(a,b){return a<b?-1:a>b?1:0};var x;a:{var ta=l.navigator;if(ta){var ua=ta.userAgent;if(ua){x=ua;break a}}x=""};var va=function(a){var b={},c;for(c in a)b[c]=a[c];return b};var y=function(a){y[" "](a);return a};y[" "]=ja;var z=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}};var A=function(){this.b="";this.f=wa};A.prototype.c=!0;A.prototype.a=function(){return this.b};var xa=function(a){return a instanceof A&&a.constructor===A&&a.f===wa?a.b:"type_error:TrustedResourceUrl"},wa={};var B=function(){this.m="";this.G=ya};B.prototype.c=!0;B.prototype.a=function(){return this.m};var za=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,ya={},Aa=function(a){var b=new B;b.m=a;return b};Aa("about:blank");var Ba=function(a,b){a.src=xa(b);(b=ha())&&a.setAttribute("nonce",b)};var Da=function(a){Ca();var b=new A;b.b=a;return b},Ca=ja;var Ha=function(a,b){if(!Ea()&&!Fa()){var c=Math.random();if(c<b)return c=Ga(l),a[Math.floor(c*a.length)]}return null},Ga=function(a){if(!a.crypto)return Math.random();try{var b=new Uint32Array(1);a.crypto.getRandomValues(b);return b[0]/65536/65536}catch(c){return Math.random()}},Ia=function(){var a=C(210),b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b))return!1;return!0},Fa=z(function(){return-1!=x.indexOf("Google Web Preview")||1E-4>Math.random()}),Ea=z(function(){return-1!=x.indexOf("MSIE")}),Ja=/^(-?[0-9.]{1,30})$/,Ka=function(a,b){return Ja.test(a)&&(a=Number(a),!isNaN(a))?a:void 0==b?null:b},La=function(){try{return ha()}catch(a){}};var Ma=function(){return l.googletag||(l.googletag={})},Na=function(a,b){var c=Ma();c.hasOwnProperty(a)||(c[a]=b)};var D={173:"pubads.g.doubleclick.net",174:"securepubads.g.doubleclick.net",7:.02,13:1500,23:.001,24:200,37:.01,38:.001,58:1,66:1E-5,71:.05,76:"",124:1,129:.05,134:.01,135:.005,143:.005,187:.01,150:".google.cn",179:0,211:!1,196:.001,234:5E-4,236:5E-4,197:.001,152:[],172:null,191:"001901081935550",192:"021812261943070",190:"011812261943070",180:null,219:[],230:{},210:{},227:{},226:[],241:{},202:"",214:.05,215:.01,220:!1,228:"//www.googletagservices.com/pubconsole/",242:!1,244:!1,243:-1};D[6]=function(a,b){try{for(var c=null;c!=a;c=a,a=a.parent)switch(a.location.protocol){case "https:":return!0;case "file:":return!!b;case "http:":return!1}}catch(d){}return!0}(window);D[49]=(new Date).getTime();D[36]=/^true$/.test("false");D[46]=/^true$/.test("true");D[148]=/^true$/.test("false");D[221]=/^true$/.test("");D[204]=Ka("{{MOD}}",-1);var E=function(){for(var a in D)this[a]=D[a]};p(E);var C=function(a){return E.g()[a]},F=function(a,b){E.g()[a]=b},Oa=Ma(),Pa=E.g(),Qa=Oa._vars_,Ra;for(Ra in Qa)Pa[Ra]=Qa[Ra];Oa._vars_=Pa;var Sa=function(){return Ka("0")||0};Na("getVersion",function(){return"287"});var G=function(){},Ta="function"==typeof Uint8Array,J=function(a,b,c,d){a.b=null;b||(b=[]);a.M=void 0;a.f=-1;a.a=b;a:{if(b=a.a.length){--b;var e=a.a[b];if(!(null===e||"object"!=typeof e||"array"==q(e)||Ta&&e instanceof Uint8Array)){a.h=b-a.f;a.c=e;break a}}a.h=Number.MAX_VALUE}a.w={};if(c)for(b=0;b<c.length;b++)e=c[b],e<a.h?(e+=a.f,a.a[e]=a.a[e]||I):(Ua(a),a.c[e]=a.c[e]||I);if(d&&d.length)for(b=0;b<d.length;b++)Va(a,d[b])},I=[],Ua=function(a){var b=a.h+a.f;a.a[b]||(a.c=a.a[b]={})},Wa=function(a,b){if(b<a.h){b+=a.f;var c=a.a[b];return c===I?a.a[b]=[]:c}if(a.c)return c=a.c[b],c===I?a.c[b]=[]:c},Xa=function(a,b){if(b<a.h){b+=a.f;var c=a.a[b];return c===I?a.a[b]=[]:c}c=a.c[b];return c===I?a.c[b]=[]:c},K=function(a,b,c){a=Wa(a,b);return null==a?c:a},Ya=function(a,b,c){b<a.h?a.a[b+a.f]=c:(Ua(a),a.c[b]=c)},Va=function(a,b){for(var c,d,e=0;e<b.length;e++){var f=b[e],h=Wa(a,f);null!=h&&(c=f,d=h,Ya(a,f,void 0))}return c?(Ya(a,c,d),c):0},L=function(a,b,c){a.b||(a.b={});if(!a.b[c]){var d=Wa(a,c);d&&(a.b[c]=new b(d))}return a.b[c]},M=function(a,b,c){a.b||(a.b={});if(!a.b[c]){for(var d=Xa(a,c),e=[],f=0;f<d.length;f++)e[f]=new b(d[f]);a.b[c]=e}b=a.b[c];b==I&&(b=a.b[c]=[]);return b};var Za=function(a,b){a=[a];for(var c=b.length-1;0<=c;--c)a.push(typeof b[c],b[c]);return a.join("\x0B")};var $a=function(){var a=window,b=-1;try{a.localStorage&&(b=parseInt(a.localStorage.getItem("google_experiment_mod"),10))}catch(c){return null}if(0<=b&&1E3>b)return b;if(Fa())return null;b=Math.floor(1E3*Ga(a));try{if(a.localStorage)return a.localStorage.setItem("google_experiment_mod",""+b),b}catch(c){}return null};var ab=function(a,b){var c=void 0===c?{}:c;this.error=a;this.context=b.context;this.line=b.line||-1;this.msg=b.message||"";this.file=b.file||"";this.id=b.id||"jserror";this.meta=c};var N=null,bb=function(){if(null===N){N="";try{var a="";try{a=l.top.location.hash}catch(c){a=l.location.hash}if(a){var b=a.match(/\bdeid=([\d,]+)/);N=b?b[1]:""}}catch(c){}}return N};var db=function(a){J(this,a,cb,null)};r(db,G);var fb=function(a){J(this,a,eb,null)};r(fb,G);var O=function(a){J(this,a,gb,hb)};r(O,G);var ib=function(a){J(this,a,null,null)};r(ib,G);var kb=function(a){J(this,a,jb,null)};r(kb,G);var P=function(a){J(this,a,lb,mb)};r(P,G);var cb=[2],eb=[2];fb.prototype.getId=function(){return K(this,1,0)};var gb=[5],hb=[[1,2,3,6]],jb=[4],lb=[2,8],mb=[[3,4,5],[6,7]];var nb=function(a){return null!=a?!a:a},ob=function(a,b){for(var c=!1,d=0;d<a.length;d++){var e=a[d].call();if(e==b)return e;null==e&&(c=!0)}if(!c)return!b},qb=function(a,b){var c=M(a,P,2);if(!c.length)return pb(a,b);a=K(a,1,0);if(1==a)return nb(qb(c[0],b));c=oa(c,function(a){return function(){return qb(a,b)}});switch(a){case 2:return ob(c,!1);case 3:return ob(c,!0)}},pb=function(a,b){var c=Va(a,mb[0]);a:{switch(c){case 3:var d=K(a,3,0);break a;case 4:d=K(a,4,0);break a;case 5:d=K(a,5,0);break a}d=void 0}if(d&&(b=(b=b[c])&&b[d])){try{var e=b.apply(null,Xa(a,8))}catch(f){return}b=K(a,1,0);if(4==b)return!!e;d=null!=e;if(5==b)return d;a:{switch(c){case 4:a=+K(a,6,0);break a;case 5:a=K(a,7,"");break a}a=void 0}if(null!=a){if(6==b)return e===a;if(9==b)return 0==sa(e,a);if(d)switch(b){case 7:return e<a;case 8:return e>a;case 12:return(new RegExp(a)).test(e);case 10:return-1==sa(e,a);case 11:return 1==sa(e,a)}}}},rb=function(a,b){return!a||!(!b||!qb(a,b))};var sb=function(a,b){switch(b){case 1:return K(a,1,0);case 2:return K(a,2,0);case 3:return K(a,3,0);case 6:return K(a,6,0);default:return null}},tb=function(a,b){if(!a)return null;switch(b){case 1:return K(a,1,!1);case 2:return+K(a,2,0);case 3:return K(a,3,"");case 6:return Xa(a,4);default:return null}},ub=z(function(){var a="";try{a=l.top.location.hash}catch(c){a=l.location.hash}var b={};if(a=(a=/\bdflags=({.*})(&|$)/.exec(a))&&a[1])try{b=JSON.parse(decodeURIComponent(a))}catch(c){}return b}),R=function(a,b,c){var d=ub();if(d[a]&&null!=d[a][b])return d[a][b];b=Q.g().a[a][b];if(!b)return c;b=new O(b);b=vb(b);a=tb(b,a);return null!=a?a:c},vb=function(a){var b=Q.g().b;if(b){var c=qa(M(a,ib,5),function(a){return rb(L(a,P,1),b)});if(c)return L(c,kb,2)}return L(a,kb,4)},Q=function(){var a={};this.a=(a[1]={},a[2]={},a[3]={},a[6]={},a);this.b=null};p(Q);var wb=function(a,b){return R(3,a,void 0===b?"":b)},xb=function(a){var b=Q.g().a;t(a,function(a){var c=Va(a,hb[0]),e=sb(a,c);e&&(b[c][e]=a.a)})};var yb=function(a,b){var c=this,d=void 0===b?{}:b;b=void 0===d.u?!1:d.u;var e=void 0===d.A?{}:d.A;d=void 0===d.D?[]:d.D;this.h=a;this.w=b;this.b=e;this.a=null;this.f=d;this.c={};if(a=bb())a=a.split(",")||[],t(a,function(a){(a=parseInt(a,10))&&(c.c[a]=!0)})},Ab=function(a,b){var c=a.h[b];c&&(delete a.h[b],t(c,function(b){b=new db(b);rb(L(b,P,3),a.a)&&(b=zb(a,b))&&(a.f.push(b.getId()),(b=M(b,O,2))&&xb(b))}))},zb=function(a,b){var c=M(b,fb,2),d=a.a,e=d?ma(c,function(a){return rb(L(a,P,3),d)}):c,f=e.length;if(!f)return null;c=K(b,4,0);b=f*K(b,1,0);if(!c)return Bb(a,e,b/1E3);f=null!=a.b[c]?a.b[c]:1E3;if(0>=f)return null;e=Bb(a,e,b/f);a.b[c]=e?0:f-b;return e},Bb=function(a,b,c){var d=a.c,e=pa(b,function(a){return!!d[a.getId()]});return e?e:a.w?null:Ha(b,c)};var Cb=z(function(){var a=l.navigator&&l.navigator.userAgent||"";a=a.toLowerCase();return-1!=a.indexOf("firefox/")||-1!=a.indexOf("chrome/")||-1!=a.indexOf("opr/")}),S=function(a,b,c,d,e){d=void 0===d?"":d;var f=a.createElement("link");try{f.rel=c;if(-1!=c.toLowerCase().indexOf("stylesheet"))var h=xa(b);else{if(b instanceof A)var v=xa(b);else{if(b instanceof B)var u=b instanceof B&&b.constructor===B&&b.G===ya?b.m:"type_error:SafeUrl";else{if(b instanceof B)var H=b;else b="object"==typeof b&&b.c?b.a():String(b),za.test(b)||(b="about:invalid#zClosurez"),H=Aa(b);u=H.a()}v=u}h=v}f.href=h}catch(na){return}d&&"preload"==c&&(f.as=d);e&&(f.nonce=e);if(a=a.getElementsByTagName("head")[0])try{a.appendChild(f)}catch(na){}};var Db=/^\.google\.(com?\.)?[a-z]{2,3}$/,Eb=/\.(cn|com\.bi|do|sl|ba|by|ma|am)$/,Fb=function(a){return Db.test(a)&&!Eb.test(a)},Gb=function(a){return a.replace(/[\W]/g,function(a){return"&#"+a.charCodeAt()+";"})},T=l,Hb=function(a,b){a="https://"+("adservice"+b+"/adsid/integrator."+a);b=["domain="+encodeURIComponent(l.location.hostname)];U[3]>=+new Date&&b.push("adsid="+encodeURIComponent(U[1]));return a+"?"+b.join("&")},U,V,W=function(){T=l;U=T.googleToken=T.googleToken||{};var a=+new Date;U[1]&&U[3]>a&&0<U[2]||(U[1]="",U[2]=-1,U[3]=-1,U[4]="",U[6]="");V=T.googleIMState=T.googleIMState||{};Fb(V[1])||(V[1]=".google.com");"array"==q(V[5])||(V[5]=[]);"boolean"==typeof V[6]||(V[6]=!1);"array"==q(V[7])||(V[7]=[]);"number"==typeof V[8]||(V[8]=0)},Ib=function(a){try{a()}catch(b){l.setTimeout(function(){throw b;},0)}},Kb=function(a){"complete"==l.document.readyState||"loaded"==l.document.readyState||l.document.currentScript&&l.document.currentScript.async?Jb(3):a()},Lb=0,X={i:function(){return 0<V[8]},o:function(){V[8]++},B:function(){0<V[8]&&V[8]--},C:function(){V[8]=0},j:function(){},F:function(){return!1},v:function(){return V[5]},s:Ib},Y={i:function(){return V[6]},o:function(){V[6]=!0},B:function(){V[6]=!1},C:function(){V[6]=!1},j:function(){},F:function(){return".google.com"!=V[1]&&2<++Lb},v:function(){return V[7]},s:function(a){Kb(function(){Ib(a)})}},Jb=function(a){if(1E-5>Math.random()){l.google_image_requests||(l.google_image_requests=[]);var b=l.document.createElement("img");b.src="https://pagead2.googlesyndication.com/pagead/gen_204?id=imerr&err="+a;l.google_image_requests.push(b)}};X.j=function(){if(!X.i()){var a=l.document,b=function(b){b=Hb("js",b);var c=La();S(a,b,"preload","script",c);c=a.createElement("script");c.type="text/javascript";c.onerror=function(){return l.processGoogleToken({},2)};b=Da(b);Ba(c,b);try{(a.head||a.body||a.documentElement).appendChild(c),X.o()}catch(h){}},c=V[1];b(c);".google.com"!=c&&b(".google.com");b={};var d=(b.newToken="FBT",b);l.setTimeout(function(){return l.processGoogleToken(d,1)},1E3)}};Y.j=function(){if(!Y.i()){var a=l.document,b=Hb("sync.js",V[1]);S(a,b,"preload","script");b=Gb(b);var c=y("script"),d="",e=La();e&&(d='nonce="'+Gb(e)+'"');var f="<"+c+' src="'+b+'" '+d+"></"+c+">"+("<"+c+" "+d+'>processGoogleTokenSync({"newToken":"FBS"},5);</'+c+">");Kb(function(){a.write(f);Y.o()})}};var Mb=function(a){W();U[3]>=+new Date&&U[2]>=+new Date||a.j()},Ob=function(){l.processGoogleToken=l.processGoogleToken||function(a,b){return Nb(X,a,b)};Mb(X)},Pb=function(){l.processGoogleTokenSync=l.processGoogleTokenSync||function(a,b){return Nb(Y,a,b)};Mb(Y)},Nb=function(a,b,c){b=void 0===b?{}:b;c=void 0===c?0:c;var d=b.newToken||"",e="NT"==d,f=parseInt(b.freshLifetimeSecs||"",10),h=parseInt(b.validLifetimeSecs||"",10),v=b["1p_jar"]||"";b=b.pucrd||"";W();1==c?a.C():a.B();if(!d&&a.F())Fb(".google.com")&&(V[1]=".google.com"),a.j();else{var u=T.googleToken=T.googleToken||{},H=0==c&&d&&m(d)&&!e&&"number"==typeof f&&0<f&&"number"==typeof h&&0<h&&m(v);e=e&&!a.i()&&(!(U[3]>=+new Date)||"NT"==U[1]);var na=!(U[3]>=+new Date)&&0!=c;if(H||e||na)e=+new Date,f=e+1E3*f,h=e+1E3*h,Jb(c),u[5]=c,u[1]=d,u[2]=f,u[3]=h,u[4]=v,u[6]=b,W();if(H||!a.i()){c=a.v();for(d=0;d<c.length;d++)a.s(c[d]);c.length=0}}};var Qb=function(){this.a=null},Rb=function(a,b){a.a=b};Qb.prototype.b=function(a,b,c,d,e){if(Math.random()>(void 0===c?.01:c))return!1;b.error&&b.meta&&b.id||(b=new ab(b,{context:a,id:void 0===e?"gpt_exception":e}));if(d||this.a)b.meta={},this.a&&this.a(b.meta),d&&d(b.meta);l.google_js_errors=l.google_js_errors||[];l.google_js_errors.push(b);l.error_rep_loaded||(b=l.document,a=b.createElement("script"),Ba(a,Da(l.location.protocol+"//pagead2.googlesyndication.com/pagead/js/err_rep.js")),(b=b.getElementsByTagName("script")[0])&&b.parentNode&&b.parentNode.insertBefore(a,b),l.error_rep_loaded=!0);return!1};var Sb=function(a,b){var c=void 0===c?a.b:c;try{b()}catch(d){if(!c.call(a,420,d,.01,void 0,"gpt_exception"))throw d;}};var Tb=function(a){if(!a.google_ltobserver){var b=new a.PerformanceObserver(function(b){var c=a.google_lt_queue=a.google_lt_queue||[];t(b.getEntries(),function(a){return c.push(a)})});b.observe({entryTypes:["longtask"]});a.google_ltobserver=b}};var Ub=function(a){var b=a;b=void 0===b?l:b;if(b=(b=b.performance)&&b.now?b.now():null)b={label:"1",type:9,value:b},a=a.google_js_reporting_queue=a.google_js_reporting_queue||[],1024>a.length&&a.push(b)};var Vb=[[28,null,null,[1]],[38,null,null,[1]],[null,7,null,[null,.1]],[40,null,null,[1]],[61,null,null,[1]],[46,null,null,[1]],[null,null,8,[null,null,"/pagead/js/rum.js"]],[11,null,null,[1]],[48,null,null,[1]],[18,null,null,[1]],[39,null,null,[1]],[30,null,null,[1]],[25,null,null,[1]],[3,null,null,[1]],[null,8,null,[null,-1]],[15,null,null,[1]],[null,11,null,[null,10]],[null,2,null,[null,1E3]],[45,null,null,[]],[null,null,2,[null,null,"1-0-31"]],[21,null,null,[1]],[7,null,null,[1]],[94,null,null,[1]],[103,null,null,[1]]];var Wb=function(){yb.call(this,C(210),{u:C(211),A:C(227),D:C(226)})};ea(Wb,yb);var Xb=function(){return C(36)};var Yb=function(a,b){var c=b||Za;return function(){var b=this||l;b=b.closure_memoize_cache_||(b.closure_memoize_cache_={});var e=c(a[ka]||(a[ka]=++la),arguments);return b.hasOwnProperty(e)?b[e]:b[e]=a.apply(this,arguments)}}(function(a){return a&&a.src?/^(?:https?:)?\/\/www\.googletagservices\.com\/tag\/js\/gpt(?:_[a-z]+)*\.js/.test(a.src)?0:1:2},function(a,b){return a+"\x0B"+(b[0]&&b[0].src)}),Zb=function(){return 0===Yb(C(172))};var $b=function(){var a={};this[3]=(a[8]=function(a){return!!ia(a)},a[3]=Zb,a[2]=Xb,a[9]=function(a){a=ia(a);var b;if(b="function"==q(a))a=a&&a.toString&&a.toString(),b=m(a)&&-1!=a.indexOf("[native code]");return b},a[10]=function(){return window==window.top},a);a={};this[4]=(a[1]=function(){return C(204)},a[4]=Sa,a[2]=function(){return 287},a[5]=function(){var a=$a();return null!=a?a:void 0},a);a={};this[5]=(a[2]=function(){return window.location.href},a[3]=function(){try{return window.top.location.hash}catch(b){return""}},a)};p($b);var ac={3:[[null,[[1337,[[82,null,null,[1]],[null,null,8,[null,null,"/pagead/js/rum_debug.js"]]]]]],[1,[[20194812,[[20,null,null,[1]]]],[20194813]],null,3],[500,[[21060697],[21060698,[[87,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,8,null,null,null,null,["Uint8Array"]],[4,null,11]]]],[100,[[21061497],[21061498,[[86,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,9,null,null,null,null,["requestAnimationFrame"]]]]],[10,[[21061505],[21061506,[[82,null,null,[1]]]]]],[100,[[21061545],[21061546,[[79,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,8,null,null,null,null,["google_ltobserver"]]]]],[50,[[21061763],[21061764,[[5,null,null,[1]]]]]],[50,[[21061999],[21062E3,[[81,null,null,[1]]]]],[2,[[4,null,6,null,null,null,null,["21061508"]],[4,null,10]]]],[1,[[21062059,[[null,null,null,[null,null,null,["50","50","50","50","50"]],null,2]]],[21062060,[[null,null,null,[null,null,null,"25 25 25 25 25 25 25 25 25 25".split(" ")],null,2]]],[21062061,[[null,null,null,[null,null,null,["125","125","125","125"]],null,2]]],[22321847],[22321848,[[null,null,null,[null,null,null,"50 50 50 50 50 50 50 50 50 50".split(" ")],null,2]]],[22322161,[[null,null,null,[null,null,null,["250","250"]],null,2]]]]],[50,[[21062068,[[58,null,null,[1]]]],[21062069]]],[1E3,[[21062150,null,[2,[[8,null,null,1,null,9],[7,null,null,1,null,15]]]],[21062151,[[null,null,null,[null,null,null,["50","50","50","50","50"]],null,2]],[2,[[8,null,null,1,null,14],[7,null,null,1,null,20]]]],[21062152,[[null,null,null,[null,null,null,"50 50 50 50 50 50 50 50 50 50".split(" ")],null,2]],[2,[[8,null,null,1,null,19],[7,null,null,1,null,25]]]],[21062153,[[null,null,null,[null,null,null,"25 25 25 25 25 25 25 25 25 25".split(" ")],null,2]],[2,[[8,null,null,1,null,24],[7,null,null,1,null,30]]]]],[4,null,3]],[null,[[21062156],[21062157,[[15,null,null,[1]]]]]],[10,[[21062185],[21062186,[[24,null,null,[1]]]]]],[1,[[21062261],[21062262,[[92,null,null,[1]],[33,null,null,[1]]]]],null,8],[50,[[21062287],[21062288,[[56,null,null,[1]],[53,null,null,[1]],[52,null,null,[1]],[67,null,null,[1]],[27,null,null,[1]],[88,null,null,[1]],[29,null,null,[1]],[14,null,null,[1]],[12,null,null,[1]],[63,null,null,[1]]]]],null,4],[1,[[21062330],[21062331,[[null,8,null,[null,800]]]],[21062332,[[null,8,null,[null,1E4]]]]],null,3],[10,[[21062352],[21062353,[[20,null,null,[1]]]]],[1,[[4,null,1]]],3],[50,[[21062377],[21062378,[[11,null,null,[]]]]]],[1,[[21062398],[21062399,[[null,13,null,[null,1]]]],[21062400,[[null,13,null,[null,1]]]],[21062593,[[null,13,null,[null,2]]]]]],[5,[[21062414],[21062415,[[64,null,null,[1]]]]]],[1,[[21062416],[21062417,[[37,null,null,[1]]]]]],[50,[[21062420],[21062421,[[42,null,null,[1]]]]]],[50,[[21062452],[21062453,[[43,null,null,[1]]]]]],[50,[[21062454],[21062456,[[51,null,null,[1]]]]]],[1,[[21062495],[21062496,[[47,null,null,[1]]]]]],[1,[[21062500],[21062501,[[null,6,null,[null,1]],[53,null,null,[1]],[52,null,null,[1]],[27,null,null,[1]],[88,null,null,[1]],[29,null,null,[1]],[26,null,null,[1]],[14,null,null,[1]],[12,null,null,[1]],[63,null,null,[1]]]]],null,4],[50,[[21062576],[21062577,[[20,null,null,[],[[[1,[[4,null,1]]],[1]]]]]]],null,3],[10,[[21062667],[21062668,[[62,null,null,[1]],[68,null,null,[1]]]],[21062841,[[62,null,null,[1]],[68,null,null,[1]]]]]],[1,[[21062693],[21062694,[[65,null,null,[1]]]]]],[10,[[21062697],[21062698,[[72,null,null,[1]]]]]],[50,[[21062722],[21062723,[[69,null,null,[1]]]]],null,9],[10,[[21062724],[21062725,[[67,null,null,[1]]]]]],[null,[[21062738],[21062739,[[null,null,null,[null,null,null,["v","1-0-31"]],null,1]]],[21062740,[[null,null,2,[null,null,"1-0-31"]]]]]],[10,[[21062745],[21062748,[[null,11,null,[null,60]]]],[21062862,[[null,11,null,[null,40]]]]]],[10,[[21062751],[21062752,[[null,15,null,[null,1]]]],[21062753,[[null,15,null,[null,2]]]]]],[10,[[21062796],[21062797,null,[4,null,8,null,null,null,null,["Map"]]]]],[50,[[21062818],[21062819,[[93,null,null,[1]]]]]],[1,[[21062828],[21062829]],[2,[[4,null,7],[8,null,null,2,null,278],[7,null,null,2,null,1E3]]],9],[50,[[21062830],[21062831,[[90,null,null,[1]]]]]],[50,[[21062832],[21062833,[[89,null,null,[1]]]]]],[50,[[21062834],[21062835,[[92,null,null,[1]],[33,null,null,[1]]]]],[4,null,2],8],[10,[[21062844],[21062845]]],[50,[[21062854],[21062855,[[100,null,null,[1]]]]]],[1,[[21062856],[21062857,[[99,null,null,[1]]]]],[2,[[8,null,null,2,null,278],[7,null,null,2,null,1E3]]]],[10,[[21062859],[21062860,[[92,null,null,[1]]]]],null,8],[50,[[21062886],[21062887,[[91,null,null,[1]]]]]],[10,[[21062888],[21062889,[[101,null,null,[1]]]]]],[5,[[21062899],[21062900,[[98,null,null,[1]]]],[21062901,[[98,null,null,[1]]]]]],[5,[[21062916,[[98,null,null,[1]]]],[21062917,[[98,null,null,[1]]]]]],[1,[[21062937],[21062947,[[12,null,null,[1]]]],[21062948,[[12,null,null,[1]]]]],[4,null,10],4],[1,[[21062949],[21062950,[[108,null,null,[1]]]]]],[10,[[21062957],[21062958,[[102,null,null,[1]]]]]],[10,[[21062959],[21062960,[[106,null,null,[1]]]]]],[1,[[21062970],[21062971,[[109,null,null,[1]]]]],[2,[[8,null,null,2,null,289],[7,null,null,2,null,1E3]]]],[3,[[21062979],[21062980],[21062981]],[2,[[4,null,7],[8,null,null,2,null,278],[7,null,null,2,null,1E3]]],9],[10,[[21063015],[21063016,[[97,null,null,[1]]]]]],[1E3,[[22316437,null,[2,[[8,null,null,1,null,-1],[7,null,null,1,null,5]]]],[22316438,null,[2,[[8,null,null,1,null,4],[7,null,null,1,null,10]]]]],[4,null,3]],[10,[[22322686],[22322687,[[null,3,null,[null,.01]]]]]],[100,[[22325465],[22325466,[[80,null,null,[1]]]]],[4,null,6,null,null,null,null,["21060611"]]],[10,[[53887176],[53887177]]],[1,[[108809132],[108809133,[[45,null,null,[1]]]]]]],4:[[null,[[21062304],[21062305,[[34,null,null,[1]]]]]],[null,[[21062804],[21062805,[[8,null,null,[1]]]],[21062806,[[55,null,null,[1]]]]]],[null,[[21062807],[21062808,[[8,null,null,[1]],[55,null,null,[1]]]]]],[null,[[21062846],[21062847,[[74,null,null,[1]]]],[21062848,[[75,null,null,[1]]]],[21062849,[[74,null,null,[1]],[75,null,null,[1]]]]]],[null,[[21062983],[21062984,[[96,null,null,[1]]]],[21062985,[[96,null,null,[1]],[8,null,null,[1]],[55,null,null,[1]]]]]]],5:[[500,[[21060610],[21060611,[[77,null,null,[1]],[78,null,null,[1]],[85,null,null,[1]],[76,null,null,[1]]]]],[4,null,6,null,null,null,null,["21061508"]]],[null,[[21061212],[21061213,[[16,null,null,[1]]]],[21061214,[[17,null,null,[1]]]],[21061277,[[17,null,null,[1]],[16,null,null,[1]]]]]],[1,[[21061590,[[null,null,6,[null,null,"21061590"]]]],[21061591,[[59,null,null,[1]]]]],null,1],[1,[[21062549,[[null,null,5,[null,null,"ob"]],[null,null,6,[null,null,"ob"]]]],[21062550,[[null,null,4,[null,null,"/gpt/pubads_impl_ob_"]]]]],null,1],[50,[[21062749],[21062750,[[95,null,null,[1]]]]]],[1E3,[[21062763,[[56,null,null,[1]],[53,null,null,[1]],[52,null,null,[1]],[67,null,null,[1]],[27,null,null,[1]],[88,null,null,[1]],[29,null,null,[1]],[14,null,null,[1]],[12,null,null,[1]],[63,null,null,[1]]]]],[12,null,null,null,3,null,"googEnableStrictApi"],4],[1E3,[[21062785,[[23,null,null,[]]],[7,null,null,5,null,50]],[21062786,[[23,null,null,[1]]],[8,null,null,5,null,949]]],[2,[[12,null,null,null,2,null,"today\\.line\\.me/.+/article"],[4,null,8,null,null,null,null,["_gmptnl"]]]],7],[1E3,[[21062812,[[23,null,null,[1]]]]],[2,[[12,null,null,null,2,null,"today\\.line\\.me/.+/article"],[4,null,8,null,null,null,null,["_gmptnl"]]]],7],[1E3,[[21062903,[[92,null,null,[1]],[33,null,null,[1]]],[12,null,null,null,3,null,"googDisableSync"]]],null,8],[10,[[21063024,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063024"]],[null,12,null,[null,287]],[null,null,7,[null,null,"21063024"]],[60,null,null,[1]],[null,null,6,[null,null,"21063024"]]]],[21063025,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063025"]],[null,12,null,[null,291]],[null,null,7,[null,null,"21063025"]],[60,null,null,[1]],[null,null,6,[null,null,"21063025"]]]]],null,1],[10,[[21063026,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063026"]],[null,12,null,[null,287]],[null,null,7,[null,null,"21063026"]],[60,null,null,[1]],[null,null,6,[null,null,"21063026"]]]],[21063027,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063027"]],[null,12,null,[null,292]],[null,null,7,[null,null,"21063027"]],[60,null,null,[1]],[null,null,6,[null,null,"21063027"]]]]],null,1],[10,[[21063028,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063028"]],[null,12,null,[null,287]],[null,null,7,[null,null,"21063028"]],[60,null,null,[1]],[null,null,6,[null,null,"21063028"]]]],[21063029,[[null,7,null,[null,1]],[null,null,5,[null,null,"21063029"]],[null,12,null,[null,293]],[null,null,7,[null,null,"21063029"]],[60,null,null,[1]],[null,null,6,[null,null,"21063029"]]]]],null,1]],6:[[50,[[21062920],[21062921,[[null,14,null,[null,1]]]]]]],7:[[10,[[21061507],[21061508,[[83,null,null,[1]],[84,null,null,[1]]]]]],[1E3,[[21062473,[[null,null,5,[null,null,"21062473"]],[null,null,6,[null,null,"21062473"]]],[6,null,null,4,null,2]],[21062474,null,[6,null,null,4,null,3]]],[4,null,3],1],[1E3,[[21062475,null,[6,null,null,4,null,1]]],[4,null,3],1]]};var bc=function(a){var b={I:Vb,J:ac};a=a||b;Ia()&&F(210,va(a.J));Wb.call(this);var c=this;b=$b.g();b[3][6]=function(a){a:{var b=c.f;a=parseInt(a,10);if(m(b))b=m(a)&&1==a.length?b.indexOf(a,0):-1;else{for(var d=0;d<b.length;d++)if(d in b&&b[d]===a){b=d;break a}b=-1}}return 0<=b};this.a=b;C(219).length||F(219,a.I);Q.g().b=b;F(241,b);xb(oa(C(219),function(a){return new O(a)}));F(230,Q.g().a)};ea(bc,Wb);y("partner.googleadservices.com");var cc=y("www.googletagservices.com"),Z=function(){return C(46)&&!C(6)?"http://pubads.g.doubleclick.net":"https://securepubads.g.doubleclick.net"},dc=function(a){var b=a.currentScript;return"complete"!=a.readyState&&"loaded"!=a.readyState&&!(b&&b.async)},fc=function(){var a=C(76);if(a)return a;a=Z();var b=wb(4,"/gpt/pubads_impl_"),c=ec()||R(2,12,0)||"287",d=wb(5);a=a+b+c+".js";d&&(a+="?"+d);F(76,a);return a},gc=function(a,b){var c;if(!(c=a.currentScript))a:{if(a=a.scripts)for(c=0;c<a.length;c++){var d=a[c];if(-1<d.src.indexOf(cc+"/tag/js/gpt")){c=d;break a}}c=null}F(172,c);b=new bc(b);Ab(b,7);Ab(b,5);R(1,59,!1)&&(F(173,cc),F(174,cc));b=C(150);W();Fb(b)&&(V[1]=b)},hc=function(){return navigator.getBattery?navigator.getBattery().then(function(a){F(243,a.level);F(244,a.charging);F(242,!0)}):null},ec=function(){var a="";if(!C(148))return a;try{var b="";try{b=l.top.location.hash}catch(d){b=l.location.hash}if(b){var c=b.match(/\bgptv=(\d+)/);a=c?c[1]:""}}catch(d){}return a},ic=function(a,b){var c=Ma(),d=c.fifWin||window;a=a||d.document;Na("cmd",[]);if(c.evalScripts)c.evalScripts();else{gc(a,b);d.PerformanceObserver&&d.PerformanceLongTaskTiming&&Tb(d);Ub(d);b=fc();if(dc(a)){d="gpt-impl-"+Math.random();try{var e='<script id="'+d+'" src="'+b+'">\x3c/script>';R(1,17,!1)&&Cb()&&(e+='<link rel="preconnect" href="'+Z()+'">');a.write(e)}catch(f){}a.getElementById(d)&&(c._loadStarted_=!0,F(220,!1),R(2,4,0)||Pb())}c._loadStarted_||(R(2,4,0)||Ob(),R(1,16,!1)&&S(a,b,"preload","script"),R(1,108,!1)&&(d=wb(6),e=ec()||R(2,12,0)||"287",d=Z()+"/gpt/"+("pubads_impl_rendering_"+e+".js")+(d?"?"+d:""),S(a,d,"preload","script")),d=a.createElement("script"),d.src=b,d.async=!0,(a.head||a.body||a.documentElement).appendChild(d),R(1,17,!1)&&Cb()&&S(a,Z(),"preconnect"),F(220,!0),c._loadStarted_=!0);(a=hc())&&a.catch(function(a){var b=new Qb;Rb(b,function(a){a.methodId=501});b.b(501,a)})}};(function(a,b){var c=new Qb;Rb(c,function(a){a.methodId=420});Sb(c,function(){return ic(a,b)})})();}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this)
