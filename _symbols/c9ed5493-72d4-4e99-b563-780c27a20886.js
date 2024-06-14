function noop(){}function assign(e,t){for(const n in t)e[n]=t[n];return e}function run(e){return e()}function blank_object(){return Object.create(null)}function run_all(e){e.forEach(run)}function is_function(e){return"function"==typeof e}function safe_not_equal(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let src_url_equal_anchor;function src_url_equal(e,t){return src_url_equal_anchor||(src_url_equal_anchor=document.createElement("a")),src_url_equal_anchor.href=t,e===src_url_equal_anchor.href}function is_empty(e){return 0===Object.keys(e).length}function exclude_internal_props(e){const t={};for(const n in e)"$"!==n[0]&&(t[n]=e[n]);return t}function null_to_empty(e){return null==e?"":e}let is_hydrating=!1;function start_hydrating(){is_hydrating=!0}function end_hydrating(){is_hydrating=!1}function upper_bound(e,t,n,o){for(;e<t;){const r=e+(t-e>>1);n(r)<=o?e=r+1:t=r}return e}function init_hydrate(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if("HEAD"===e.nodeName){const e=[];for(let n=0;n<t.length;n++){const o=t[n];void 0!==o.claim_order&&e.push(o)}t=e}const n=new Int32Array(t.length+1),o=new Int32Array(t.length);n[0]=-1;let r=0;for(let e=0;e<t.length;e++){const i=t[e].claim_order,a=(r>0&&t[n[r]].claim_order<=i?r+1:upper_bound(1,r,(e=>t[n[e]].claim_order),i))-1;o[e]=n[a]+1;const c=a+1;n[c]=e,r=Math.max(c,r)}const i=[],a=[];let c=t.length-1;for(let e=n[r]+1;0!=e;e=o[e-1]){for(i.push(t[e-1]);c>=e;c--)a.push(t[c]);c--}for(;c>=0;c--)a.push(t[c]);i.reverse(),a.sort(((e,t)=>e.claim_order-t.claim_order));for(let t=0,n=0;t<a.length;t++){for(;n<i.length&&a[t].claim_order>=i[n].claim_order;)n++;const o=n<i.length?i[n]:null;e.insertBefore(a[t],o)}}function append_hydration(e,t){if(is_hydrating){for(init_hydrate(e),(void 0===e.actual_end_child||null!==e.actual_end_child&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);null!==e.actual_end_child&&void 0===e.actual_end_child.claim_order;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?void 0===t.claim_order&&t.parentNode===e||e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else t.parentNode===e&&null===t.nextSibling||e.appendChild(t)}function insert_hydration(e,t,n){is_hydrating&&!n?append_hydration(e,t):t.parentNode===e&&t.nextSibling==n||e.insertBefore(t,n||null)}function detach(e){e.parentNode&&e.parentNode.removeChild(e)}function element(e){return document.createElement(e)}function svg_element(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function text(e){return document.createTextNode(e)}function space(){return text(" ")}function empty(){return text("")}function attr(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}const always_set_through_set_attribute=["width","height"];function set_attributes(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const o in t)null==t[o]?e.removeAttribute(o):"style"===o?e.style.cssText=t[o]:"__value"===o?e.value=e[o]=t[o]:n[o]&&n[o].set&&-1===always_set_through_set_attribute.indexOf(o)?e[o]=t[o]:attr(e,o,t[o])}function set_svg_attributes(e,t){for(const n in t)attr(e,n,t[n])}function children(e){return Array.from(e.childNodes)}function init_claim_info(e){void 0===e.claim_info&&(e.claim_info={last_index:0,total_claimed:0})}function claim_node(e,t,n,o,r=!1){init_claim_info(e);const i=(()=>{for(let o=e.claim_info.last_index;o<e.length;o++){const i=e[o];if(t(i)){const t=n(i);return void 0===t?e.splice(o,1):e[o]=t,r||(e.claim_info.last_index=o),i}}for(let o=e.claim_info.last_index-1;o>=0;o--){const i=e[o];if(t(i)){const t=n(i);return void 0===t?e.splice(o,1):e[o]=t,r?void 0===t&&e.claim_info.last_index--:e.claim_info.last_index=o,i}}return o()})();return i.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,i}function claim_element_base(e,t,n,o){return claim_node(e,(e=>e.nodeName===t),(e=>{const t=[];for(let o=0;o<e.attributes.length;o++){const r=e.attributes[o];n[r.name]||t.push(r.name)}t.forEach((t=>e.removeAttribute(t)))}),(()=>o(t)))}function claim_element(e,t,n){return claim_element_base(e,t,n,element)}function claim_svg_element(e,t,n){return claim_element_base(e,t,n,svg_element)}function claim_text(e,t){return claim_node(e,(e=>3===e.nodeType),(e=>{const n=""+t;if(e.data.startsWith(n)){if(e.data.length!==n.length)return e.splitText(n.length)}else e.data=n}),(()=>text(t)),!0)}function claim_space(e){return claim_text(e," ")}function set_data(e,t){t=""+t,e.data!==t&&(e.data=t)}function custom_event(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,o,t),r}let current_component;function set_current_component(e){current_component=e}function get_current_component(){if(!current_component)throw new Error("Function called outside component initialization");return current_component}function onMount(e){get_current_component().$$.on_mount.push(e)}function onDestroy(e){get_current_component().$$.on_destroy.push(e)}function createEventDispatcher(){const e=get_current_component();return(t,n,{cancelable:o=!1}={})=>{const r=e.$$.callbacks[t];if(r){const i=custom_event(t,n,{cancelable:o});return r.slice().forEach((t=>{t.call(e,i)})),!i.defaultPrevented}return!0}}const dirty_components=[],binding_callbacks=[];let render_callbacks=[];const flush_callbacks=[],resolved_promise=Promise.resolve();let update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function add_render_callback(e){render_callbacks.push(e)}const seen_callbacks=new Set;let flushidx=0;function flush(){if(0!==flushidx)return;const e=current_component;do{try{for(;flushidx<dirty_components.length;){const e=dirty_components[flushidx];flushidx++,set_current_component(e),update(e.$$)}}catch(e){throw dirty_components.length=0,flushidx=0,e}for(set_current_component(null),dirty_components.length=0,flushidx=0;binding_callbacks.length;)binding_callbacks.pop()();for(let e=0;e<render_callbacks.length;e+=1){const t=render_callbacks[e];seen_callbacks.has(t)||(seen_callbacks.add(t),t())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,seen_callbacks.clear(),set_current_component(e)}function update(e){if(null!==e.fragment){e.update(),run_all(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(add_render_callback)}}function flush_render_callbacks(e){const t=[],n=[];render_callbacks.forEach((o=>-1===e.indexOf(o)?t.push(o):n.push(o))),n.forEach((e=>e())),render_callbacks=t}const outroing=new Set;let outros;function group_outros(){outros={r:0,c:[],p:outros}}function check_outros(){outros.r||run_all(outros.c),outros=outros.p}function transition_in(e,t){e&&e.i&&(outroing.delete(e),e.i(t))}function transition_out(e,t,n,o){if(e&&e.o){if(outroing.has(e))return;outroing.add(e),outros.c.push((()=>{outroing.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}else o&&o()}function get_spread_update(e,t){const n={},o={},r={$$scope:1};let i=e.length;for(;i--;){const a=e[i],c=t[i];if(c){for(const e in a)e in c||(o[e]=1);for(const e in c)r[e]||(n[e]=c[e],r[e]=1);e[i]=c}else for(const e in a)r[e]=1}for(const e in o)e in n||(n[e]=void 0);return n}function create_component(e){e&&e.c()}function claim_component(e,t){e&&e.l(t)}function mount_component(e,t,n,o){const{fragment:r,after_update:i}=e.$$;r&&r.m(t,n),o||add_render_callback((()=>{const t=e.$$.on_mount.map(run).filter(is_function);e.$$.on_destroy?e.$$.on_destroy.push(...t):run_all(t),e.$$.on_mount=[]})),i.forEach(add_render_callback)}function destroy_component(e,t){const n=e.$$;null!==n.fragment&&(flush_render_callbacks(n.after_update),run_all(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(e,t){-1===e.$$.dirty[0]&&(dirty_components.push(e),schedule_update(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function init(e,t,n,o,r,i,a,c=[-1]){const s=current_component;set_current_component(e);const l=e.$$={fragment:null,ctx:[],props:i,update:noop,not_equal:r,bound:blank_object(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:blank_object(),dirty:c,skip_bound:!1,root:t.target||s.$$.root};a&&a(l.root);let u=!1;if(l.ctx=n?n(e,t.props||{},((t,n,...o)=>{const i=o.length?o[0]:n;return l.ctx&&r(l.ctx[t],l.ctx[t]=i)&&(!l.skip_bound&&l.bound[t]&&l.bound[t](i),u&&make_dirty(e,t)),n})):[],l.update(),u=!0,run_all(l.before_update),l.fragment=!!o&&o(l.ctx),t.target){if(t.hydrate){start_hydrating();const e=children(t.target);l.fragment&&l.fragment.l(e),e.forEach(detach)}else l.fragment&&l.fragment.c();t.intro&&transition_in(e.$$.fragment),mount_component(e,t.target,t.anchor,t.customElement),end_hydrating(),flush()}set_current_component(s)}class SvelteComponent{$destroy(){destroy_component(this,1),this.$destroy=noop}$on(e,t){if(!is_function(t))return noop;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!is_empty(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const matchIconName=/^[a-z0-9]+(-[a-z0-9]+)*$/,stringToIcon=(e,t,n,o="")=>{const r=e.split(":");if("@"===e.slice(0,1)){if(r.length<2||r.length>3)return null;o=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const e=r.pop(),n=r.pop(),i={provider:r.length>0?r[0]:o,prefix:n,name:e};return t&&!validateIconName(i)?null:i}const i=r[0],a=i.split("-");if(a.length>1){const e={provider:o,prefix:a.shift(),name:a.join("-")};return t&&!validateIconName(e)?null:e}if(n&&""===o){const e={provider:o,prefix:"",name:i};return t&&!validateIconName(e,n)?null:e}return null},validateIconName=(e,t)=>!!e&&!(""!==e.provider&&!e.provider.match(matchIconName)||!(t&&""===e.prefix||e.prefix.match(matchIconName))||!e.name.match(matchIconName)),defaultIconDimensions=Object.freeze({left:0,top:0,width:16,height:16}),defaultIconTransformations=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),defaultIconProps=Object.freeze({...defaultIconDimensions,...defaultIconTransformations}),defaultExtendedIconProps=Object.freeze({...defaultIconProps,body:"",hidden:!1});function mergeIconTransformations(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const o=((e.rotate||0)+(t.rotate||0))%4;return o&&(n.rotate=o),n}function mergeIconData(e,t){const n=mergeIconTransformations(e,t);for(const o in defaultExtendedIconProps)o in defaultIconTransformations?o in e&&!(o in n)&&(n[o]=defaultIconTransformations[o]):o in t?n[o]=t[o]:o in e&&(n[o]=e[o]);return n}function getIconsTree(e,t){const n=e.icons,o=e.aliases||Object.create(null),r=Object.create(null);return(t||Object.keys(n).concat(Object.keys(o))).forEach((function e(t){if(n[t])return r[t]=[];if(!(t in r)){r[t]=null;const n=o[t]&&o[t].parent,i=n&&e(n);i&&(r[t]=[n].concat(i))}return r[t]})),r}function internalGetIconData(e,t,n){const o=e.icons,r=e.aliases||Object.create(null);let i={};function a(e){i=mergeIconData(o[e]||r[e],i)}return a(t),n.forEach(a),mergeIconData(e,i)}function parseIconSet(e,t){const n=[];if("object"!=typeof e||"object"!=typeof e.icons)return n;e.not_found instanceof Array&&e.not_found.forEach((e=>{t(e,null),n.push(e)}));const o=getIconsTree(e);for(const r in o){const i=o[r];i&&(t(r,internalGetIconData(e,r,i)),n.push(r))}return n}const optionalPropertyDefaults={provider:"",aliases:{},not_found:{},...defaultIconDimensions};function checkOptionalProps(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function quicklyValidateIconSet(e){if("object"!=typeof e||null===e)return null;const t=e;if("string"!=typeof t.prefix||!e.icons||"object"!=typeof e.icons)return null;if(!checkOptionalProps(e,optionalPropertyDefaults))return null;const n=t.icons;for(const e in n){const t=n[e];if(!e.match(matchIconName)||"string"!=typeof t.body||!checkOptionalProps(t,defaultExtendedIconProps))return null}const o=t.aliases||Object.create(null);for(const e in o){const t=o[e],r=t.parent;if(!e.match(matchIconName)||"string"!=typeof r||!n[r]&&!o[r]||!checkOptionalProps(t,defaultExtendedIconProps))return null}return t}const dataStorage=Object.create(null);function newStorage(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function getStorage(e,t){const n=dataStorage[e]||(dataStorage[e]=Object.create(null));return n[t]||(n[t]=newStorage(e,t))}function addIconSet(e,t){return quicklyValidateIconSet(t)?parseIconSet(t,((t,n)=>{n?e.icons[t]=n:e.missing.add(t)})):[]}function addIconToStorage(e,t,n){try{if("string"==typeof n.body)return e.icons[t]={...n},!0}catch(e){}return!1}let simpleNames=!1;function allowSimpleNames(e){return"boolean"==typeof e&&(simpleNames=e),simpleNames}function getIconData(e){const t="string"==typeof e?stringToIcon(e,!0,simpleNames):e;if(t){const e=getStorage(t.provider,t.prefix),n=t.name;return e.icons[n]||(e.missing.has(n)?null:void 0)}}function addIcon(e,t){const n=stringToIcon(e,!0,simpleNames);if(!n)return!1;return addIconToStorage(getStorage(n.provider,n.prefix),n.name,t)}function addCollection(e,t){if("object"!=typeof e)return!1;if("string"!=typeof t&&(t=e.provider||""),simpleNames&&!t&&!e.prefix){let t=!1;return quicklyValidateIconSet(e)&&(e.prefix="",parseIconSet(e,((e,n)=>{n&&addIcon(e,n)&&(t=!0)}))),t}const n=e.prefix;if(!validateIconName({provider:t,prefix:n,name:"a"}))return!1;return!!addIconSet(getStorage(t,n),e)}const defaultIconSizeCustomisations=Object.freeze({width:null,height:null}),defaultIconCustomisations=Object.freeze({...defaultIconSizeCustomisations,...defaultIconTransformations}),unitsSplit=/(-?[0-9.]*[0-9]+[0-9.]*)/g,unitsTest=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function calculateSize(e,t,n){if(1===t)return e;if(n=n||100,"number"==typeof e)return Math.ceil(e*t*n)/n;if("string"!=typeof e)return e;const o=e.split(unitsSplit);if(null===o||!o.length)return e;const r=[];let i=o.shift(),a=unitsTest.test(i);for(;;){if(a){const e=parseFloat(i);isNaN(e)?r.push(i):r.push(Math.ceil(e*t*n)/n)}else r.push(i);if(i=o.shift(),void 0===i)return r.join("");a=!a}}function splitSVGDefs(e,t="defs"){let n="";const o=e.indexOf("<"+t);for(;o>=0;){const r=e.indexOf(">",o),i=e.indexOf("</"+t);if(-1===r||-1===i)break;const a=e.indexOf(">",i);if(-1===a)break;n+=e.slice(r+1,i).trim(),e=e.slice(0,o).trim()+e.slice(a+1)}return{defs:n,content:e}}function mergeDefsAndContent(e,t){return e?"<defs>"+e+"</defs>"+t:t}function wrapSVGContent(e,t,n){const o=splitSVGDefs(e);return mergeDefsAndContent(o.defs,t+o.content+n)}const isUnsetKeyword=e=>"unset"===e||"undefined"===e||"none"===e;function iconToSVG(e,t){const n={...defaultIconProps,...e},o={...defaultIconCustomisations,...t},r={left:n.left,top:n.top,width:n.width,height:n.height};let i=n.body;[n,o].forEach((e=>{const t=[],n=e.hFlip,o=e.vFlip;let a,c=e.rotate;switch(n?o?c+=2:(t.push("translate("+(r.width+r.left).toString()+" "+(0-r.top).toString()+")"),t.push("scale(-1 1)"),r.top=r.left=0):o&&(t.push("translate("+(0-r.left).toString()+" "+(r.height+r.top).toString()+")"),t.push("scale(1 -1)"),r.top=r.left=0),c<0&&(c-=4*Math.floor(c/4)),c%=4,c){case 1:a=r.height/2+r.top,t.unshift("rotate(90 "+a.toString()+" "+a.toString()+")");break;case 2:t.unshift("rotate(180 "+(r.width/2+r.left).toString()+" "+(r.height/2+r.top).toString()+")");break;case 3:a=r.width/2+r.left,t.unshift("rotate(-90 "+a.toString()+" "+a.toString()+")")}c%2==1&&(r.left!==r.top&&(a=r.left,r.left=r.top,r.top=a),r.width!==r.height&&(a=r.width,r.width=r.height,r.height=a)),t.length&&(i=wrapSVGContent(i,'<g transform="'+t.join(" ")+'">',"</g>"))}));const a=o.width,c=o.height,s=r.width,l=r.height;let u,d;null===a?(d=null===c?"1em":"auto"===c?l:c,u=calculateSize(d,s/l)):(u="auto"===a?s:a,d=null===c?calculateSize(u,l/s):"auto"===c?l:c);const f={},p=(e,t)=>{isUnsetKeyword(t)||(f[e]=t.toString())};p("width",u),p("height",d);const h=[r.left,r.top,s,l];return f.viewBox=h.join(" "),{attributes:f,viewBox:h,body:i}}const regex=/\sid="(\S+)"/g,randomPrefix="IconifyId"+Date.now().toString(16)+(16777216*Math.random()|0).toString(16);let counter=0;function replaceIDs(e,t=randomPrefix){const n=[];let o;for(;o=regex.exec(e);)n.push(o[1]);if(!n.length)return e;const r="suffix"+(16777216*Math.random()|Date.now()).toString(16);return n.forEach((n=>{const o="function"==typeof t?t(n):t+(counter++).toString(),i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+i+')([")]|\\.[a-z])',"g"),"$1"+o+r+"$3")})),e=e.replace(new RegExp(r,"g"),"")}const storage=Object.create(null);function setAPIModule(e,t){storage[e]=t}function getAPIModule(e){return storage[e]||storage[""]}function createAPIConfig(e){let t;if("string"==typeof e.resources)t=[e.resources];else if(t=e.resources,!(t instanceof Array&&t.length))return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:!0===e.random,index:e.index||0,dataAfterTimeout:!1!==e.dataAfterTimeout}}const configStorage=Object.create(null),fallBackAPISources=["https://api.simplesvg.com","https://api.unisvg.com"],fallBackAPI=[];for(;fallBackAPISources.length>0;)1===fallBackAPISources.length||Math.random()>.5?fallBackAPI.push(fallBackAPISources.shift()):fallBackAPI.push(fallBackAPISources.pop());function addAPIProvider(e,t){const n=createAPIConfig(t);return null!==n&&(configStorage[e]=n,!0)}function getAPIConfig(e){return configStorage[e]}configStorage[""]=createAPIConfig({resources:["https://api.iconify.design"].concat(fallBackAPI)});const detectFetch=()=>{let e;try{if(e=fetch,"function"==typeof e)return e}catch(e){}};let fetchModule=detectFetch();function calculateMaxLength(e,t){const n=getAPIConfig(e);if(!n)return 0;let o;if(n.maxURL){let e=0;n.resources.forEach((t=>{const n=t;e=Math.max(e,n.length)}));const r=t+".json?icons=";o=n.maxURL-e-n.path.length-r.length}else o=0;return o}function shouldAbort(e){return 404===e}const prepare=(e,t,n)=>{const o=[],r=calculateMaxLength(e,t),i="icons";let a={type:i,provider:e,prefix:t,icons:[]},c=0;return n.forEach(((n,s)=>{c+=n.length+1,c>=r&&s>0&&(o.push(a),a={type:i,provider:e,prefix:t,icons:[]},c=n.length),a.icons.push(n)})),o.push(a),o};function getPath(e){if("string"==typeof e){const t=getAPIConfig(e);if(t)return t.path}return"/"}const send=(e,t,n)=>{if(!fetchModule)return void n("abort",424);let o=getPath(t.provider);switch(t.type){case"icons":{const e=t.prefix,n=t.icons.join(",");o+=e+".json?"+new URLSearchParams({icons:n}).toString();break}case"custom":{const e=t.uri;o+="/"===e.slice(0,1)?e.slice(1):e;break}default:return void n("abort",400)}let r=503;fetchModule(e+o).then((e=>{const t=e.status;if(200===t)return r=501,e.json();setTimeout((()=>{n(shouldAbort(t)?"abort":"next",t)}))})).then((e=>{"object"==typeof e&&null!==e?setTimeout((()=>{n("success",e)})):setTimeout((()=>{404===e?n("abort",e):n("next",r)}))})).catch((()=>{n("next",r)}))},fetchAPIModule={prepare:prepare,send:send};function sortIcons(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort(((e,t)=>e.provider!==t.provider?e.provider.localeCompare(t.provider):e.prefix!==t.prefix?e.prefix.localeCompare(t.prefix):e.name.localeCompare(t.name)));let o={provider:"",prefix:"",name:""};return e.forEach((e=>{if(o.name===e.name&&o.prefix===e.prefix&&o.provider===e.provider)return;o=e;const r=e.provider,i=e.prefix,a=e.name,c=n[r]||(n[r]=Object.create(null)),s=c[i]||(c[i]=getStorage(r,i));let l;l=a in s.icons?t.loaded:""===i||s.missing.has(a)?t.missing:t.pending;const u={provider:r,prefix:i,name:a};l.push(u)})),t}function removeCallback(e,t){e.forEach((e=>{const n=e.loaderCallbacks;n&&(e.loaderCallbacks=n.filter((e=>e.id!==t)))}))}function updateCallbacks(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout((()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const o=e.provider,r=e.prefix;t.forEach((t=>{const i=t.icons,a=i.pending.length;i.pending=i.pending.filter((t=>{if(t.prefix!==r)return!0;const a=t.name;if(e.icons[a])i.loaded.push({provider:o,prefix:r,name:a});else{if(!e.missing.has(a))return n=!0,!0;i.missing.push({provider:o,prefix:r,name:a})}return!1})),i.pending.length!==a&&(n||removeCallback([e],t.id),t.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),t.abort))}))})))}let idCounter=0;function storeCallback(e,t,n){const o=idCounter++,r=removeCallback.bind(null,n,o);if(!t.pending.length)return r;const i={id:o,icons:t,callback:e,abort:r};return n.forEach((e=>{(e.loaderCallbacks||(e.loaderCallbacks=[])).push(i)})),r}function listToIcons(e,t=!0,n=!1){const o=[];return e.forEach((e=>{const r="string"==typeof e?stringToIcon(e,t,n):e;r&&o.push(r)})),o}var defaultConfig={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function sendQuery(e,t,n,o){const r=e.resources.length,i=e.random?Math.floor(Math.random()*r):e.index;let a;if(e.random){let t=e.resources.slice(0);for(a=[];t.length>1;){const e=Math.floor(Math.random()*t.length);a.push(t[e]),t=t.slice(0,e).concat(t.slice(e+1))}a=a.concat(t)}else a=e.resources.slice(i).concat(e.resources.slice(0,i));const c=Date.now();let s,l="pending",u=0,d=null,f=[],p=[];function h(){d&&(clearTimeout(d),d=null)}function g(){"pending"===l&&(l="aborted"),h(),f.forEach((e=>{"pending"===e.status&&(e.status="aborted")})),f=[]}function m(e,t){t&&(p=[]),"function"==typeof e&&p.push(e)}function _(){l="failed",p.forEach((e=>{e(void 0,s)}))}function b(){f.forEach((e=>{"pending"===e.status&&(e.status="aborted")})),f=[]}function y(){if("pending"!==l)return;h();const o=a.shift();if(void 0===o)return f.length?void(d=setTimeout((()=>{h(),"pending"===l&&(b(),_())}),e.timeout)):void _();const r={status:"pending",resource:o,callback:(t,n)=>{!function(t,n,o){const r="success"!==n;switch(f=f.filter((e=>e!==t)),l){case"pending":break;case"failed":if(r||!e.dataAfterTimeout)return;break;default:return}if("abort"===n)return s=o,void _();if(r)return s=o,void(f.length||(a.length?y():_()));if(h(),b(),!e.random){const n=e.resources.indexOf(t.resource);-1!==n&&n!==e.index&&(e.index=n)}l="completed",p.forEach((e=>{e(o)}))}(r,t,n)}};f.push(r),u++,d=setTimeout(y,e.rotate),n(o,t,r.callback)}return"function"==typeof o&&p.push(o),setTimeout(y),function(){return{startTime:c,payload:t,status:l,queriesSent:u,queriesPending:f.length,subscribe:m,abort:g}}}function initRedundancy(e){const t={...defaultConfig,...e};let n=[];function o(){n=n.filter((e=>"pending"===e().status))}return{query:function(e,r,i){const a=sendQuery(t,e,r,((e,t)=>{o(),i&&i(e,t)}));return n.push(a),a},find:function(e){return n.find((t=>e(t)))||null},setIndex:e=>{t.index=e},getIndex:()=>t.index,cleanup:o}}function emptyCallback$1(){}const redundancyCache=Object.create(null);function getRedundancyCache(e){if(!redundancyCache[e]){const t=getAPIConfig(e);if(!t)return;const n={config:t,redundancy:initRedundancy(t)};redundancyCache[e]=n}return redundancyCache[e]}function sendAPIQuery(e,t,n){let o,r;if("string"==typeof e){const t=getAPIModule(e);if(!t)return n(void 0,424),emptyCallback$1;r=t.send;const i=getRedundancyCache(e);i&&(o=i.redundancy)}else{const t=createAPIConfig(e);if(t){o=initRedundancy(t);const n=getAPIModule(e.resources?e.resources[0]:"");n&&(r=n.send)}}return o&&r?o.query(t,r,n)().abort:(n(void 0,424),emptyCallback$1)}const browserCacheVersion="iconify2",browserCachePrefix="iconify",browserCacheCountKey=browserCachePrefix+"-count",browserCacheVersionKey=browserCachePrefix+"-version",browserStorageHour=36e5,browserStorageCacheExpiration=168,browserStorageLimit=50;function getStoredItem(e,t){try{return e.getItem(t)}catch(e){}}function setStoredItem(e,t,n){try{return e.setItem(t,n),!0}catch(e){}}function removeStoredItem(e,t){try{e.removeItem(t)}catch(e){}}function setBrowserStorageItemsCount(e,t){return setStoredItem(e,browserCacheCountKey,t.toString())}function getBrowserStorageItemsCount(e){return parseInt(getStoredItem(e,browserCacheCountKey))||0}const browserStorageConfig={local:!0,session:!0},browserStorageEmptyItems={local:new Set,session:new Set};let browserStorageStatus=!1;function setBrowserStorageStatus(e){browserStorageStatus=e}let _window="undefined"==typeof window?{}:window;function getBrowserStorage(e){const t=e+"Storage";try{if(_window&&_window[t]&&"number"==typeof _window[t].length)return _window[t]}catch(e){}browserStorageConfig[e]=!1}function iterateBrowserStorage(e,t){const n=getBrowserStorage(e);if(!n)return;const o=getStoredItem(n,browserCacheVersionKey);if(o!==browserCacheVersion){if(o){const e=getBrowserStorageItemsCount(n);for(let t=0;t<e;t++)removeStoredItem(n,browserCachePrefix+t.toString())}return setStoredItem(n,browserCacheVersionKey,browserCacheVersion),void setBrowserStorageItemsCount(n,0)}const r=Math.floor(Date.now()/browserStorageHour)-browserStorageCacheExpiration,i=e=>{const o=browserCachePrefix+e.toString(),i=getStoredItem(n,o);if("string"==typeof i){try{const n=JSON.parse(i);if("object"==typeof n&&"number"==typeof n.cached&&n.cached>r&&"string"==typeof n.provider&&"object"==typeof n.data&&"string"==typeof n.data.prefix&&t(n,e))return!0}catch(e){}removeStoredItem(n,o)}};let a=getBrowserStorageItemsCount(n);for(let t=a-1;t>=0;t--)i(t)||(t===a-1?(a--,setBrowserStorageItemsCount(n,a)):browserStorageEmptyItems[e].add(t))}function initBrowserStorage(){if(!browserStorageStatus){setBrowserStorageStatus(!0);for(const e in browserStorageConfig)iterateBrowserStorage(e,(e=>{const t=e.data,n=getStorage(e.provider,t.prefix);if(!addIconSet(n,t).length)return!1;const o=t.lastModified||-1;return n.lastModifiedCached=n.lastModifiedCached?Math.min(n.lastModifiedCached,o):o,!0}))}}function updateLastModified(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const n in browserStorageConfig)iterateBrowserStorage(n,(n=>{const o=n.data;return n.provider!==e.provider||o.prefix!==e.prefix||o.lastModified===t}));return!0}function storeInBrowserStorage(e,t){function n(n){let o;if(!browserStorageConfig[n]||!(o=getBrowserStorage(n)))return;const r=browserStorageEmptyItems[n];let i;if(r.size)r.delete(i=Array.from(r).shift());else if(i=getBrowserStorageItemsCount(o),i>=browserStorageLimit||!setBrowserStorageItemsCount(o,i+1))return;const a={cached:Math.floor(Date.now()/browserStorageHour),provider:e.provider,data:t};return setStoredItem(o,browserCachePrefix+i.toString(),JSON.stringify(a))}browserStorageStatus||initBrowserStorage(),t.lastModified&&!updateLastModified(e,t.lastModified)||Object.keys(t.icons).length&&(t.not_found&&delete(t=Object.assign({},t)).not_found,n("local")||n("session"))}function emptyCallback(){}function loadedNewIcons(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout((()=>{e.iconsLoaderFlag=!1,updateCallbacks(e)})))}function loadNewIcons(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout((()=>{e.iconsQueueFlag=!1;const{provider:t,prefix:n}=e,o=e.iconsToLoad;let r;if(delete e.iconsToLoad,!o||!(r=getAPIModule(t)))return;r.prepare(t,n,o).forEach((n=>{sendAPIQuery(t,n,(t=>{if("object"!=typeof t)n.icons.forEach((t=>{e.missing.add(t)}));else try{const n=addIconSet(e,t);if(!n.length)return;const o=e.pendingIcons;o&&n.forEach((e=>{o.delete(e)})),storeInBrowserStorage(e,t)}catch(e){console.error(e)}loadedNewIcons(e)}))}))})))}const loadIcons=(e,t)=>{const n=sortIcons(listToIcons(e,!0,allowSimpleNames()));if(!n.pending.length){let e=!0;return t&&setTimeout((()=>{e&&t(n.loaded,n.missing,n.pending,emptyCallback)})),()=>{e=!1}}const o=Object.create(null),r=[];let i,a;return n.pending.forEach((e=>{const{provider:t,prefix:n}=e;if(n===a&&t===i)return;i=t,a=n,r.push(getStorage(t,n));const c=o[t]||(o[t]=Object.create(null));c[n]||(c[n]=[])})),n.pending.forEach((e=>{const{provider:t,prefix:n,name:r}=e,i=getStorage(t,n),a=i.pendingIcons||(i.pendingIcons=new Set);a.has(r)||(a.add(r),o[t][n].push(r))})),r.forEach((e=>{const{provider:t,prefix:n}=e;o[t][n].length&&loadNewIcons(e,o[t][n])})),t?storeCallback(t,n,r):emptyCallback};function mergeCustomisations(e,t){const n={...e};for(const e in t){const o=t[e],r=typeof o;e in defaultIconSizeCustomisations?(null===o||o&&("string"===r||"number"===r))&&(n[e]=o):r===typeof n[e]&&(n[e]="rotate"===e?o%4:o)}return n}const separator=/[\s,]+/;function flipFromString(e,t){t.split(separator).forEach((t=>{switch(t.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0}}))}function rotateFromString(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function o(e){for(;e<0;)e+=4;return e%4}if(""===n){const t=parseInt(e);return isNaN(t)?0:o(t)}if(n!==e){let t=0;switch(n){case"%":t=25;break;case"deg":t=90}if(t){let r=parseFloat(e.slice(0,e.length-n.length));return isNaN(r)?0:(r/=t,r%1==0?o(r):0)}}return t}function iconToHTML(e,t){let n=-1===e.indexOf("xlink:")?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const e in t)n+=" "+e+'="'+t[e]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function encodeSVGforURL(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function svgToData(e){return"data:image/svg+xml,"+encodeSVGforURL(e)}function svgToURL(e){return'url("'+svgToData(e)+'")'}const defaultExtendedIconCustomisations={...defaultIconCustomisations,inline:!1},svgDefaults={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},commonProps={display:"inline-block"},monotoneProps={"background-color":"currentColor"},coloredProps={"background-color":"transparent"},propsToAdd={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},propsToAddTo={"-webkit-mask":monotoneProps,mask:monotoneProps,background:coloredProps};for(const e in propsToAddTo){const t=propsToAddTo[e];for(const n in propsToAdd)t[e+"-"+n]=propsToAdd[n]}function fixSize(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function render(e,t){const n=mergeCustomisations(defaultExtendedIconCustomisations,t),o=t.mode||"svg",r="svg"===o?{...svgDefaults}:{};-1===e.body.indexOf("xlink:")&&delete r["xmlns:xlink"];let i="string"==typeof t.style?t.style:"";for(let e in t){const o=t[e];if(void 0!==o)switch(e){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[e]=!0===o||"true"===o||1===o;break;case"flip":"string"==typeof o&&flipFromString(n,o);break;case"color":i=i+(i.length>0&&";"!==i.trim().slice(-1)?";":"")+"color: "+o+"; ";break;case"rotate":"string"==typeof o?n[e]=rotateFromString(o):"number"==typeof o&&(n[e]=o);break;case"ariaHidden":case"aria-hidden":!0!==o&&"true"!==o&&delete r["aria-hidden"];break;default:if("on:"===e.slice(0,3))break;void 0===defaultExtendedIconCustomisations[e]&&(r[e]=o)}}const a=iconToSVG(e,n),c=a.attributes;if(n.inline&&(i="vertical-align: -0.125em; "+i),"svg"===o){Object.assign(r,c),""!==i&&(r.style=i);let e=0,n=t.id;return"string"==typeof n&&(n=n.replace(/-/g,"_")),{svg:!0,attributes:r,body:replaceIDs(a.body,n?()=>n+"ID"+e++:"iconifySvelte")}}const{body:s,width:l,height:u}=e,d="mask"===o||"bg"!==o&&-1!==s.indexOf("currentColor"),f={"--svg":svgToURL(iconToHTML(s,{...c,width:l+"",height:u+""}))},p=e=>{const t=c[e];t&&(f[e]=fixSize(t))};p("width"),p("height"),Object.assign(f,commonProps,d?monotoneProps:coloredProps);let h="";for(const e in f)h+=e+": "+f[e]+";";return r.style=h+i,{svg:!1,attributes:r}}if(allowSimpleNames(!0),setAPIModule("",fetchAPIModule),"undefined"!=typeof document&&"undefined"!=typeof window){initBrowserStorage();const e=window;if(void 0!==e.IconifyPreload){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";"object"==typeof t&&null!==t&&(t instanceof Array?t:[t]).forEach((e=>{try{("object"!=typeof e||null===e||e instanceof Array||"object"!=typeof e.icons||"string"!=typeof e.prefix||!addCollection(e))&&console.error(n)}catch(e){console.error(n)}}))}if(void 0!==e.IconifyProviders){const t=e.IconifyProviders;if("object"==typeof t&&null!==t)for(let e in t){const n="IconifyProviders["+e+"] is invalid.";try{const o=t[e];if("object"!=typeof o||!o||void 0===o.resources)continue;addAPIProvider(e,o)||console.error(n)}catch(e){console.error(n)}}}}function checkIconState(e,t,n,o,r){function i(){t.loading&&(t.loading.abort(),t.loading=null)}if("object"==typeof e&&null!==e&&"string"==typeof e.body)return t.name="",i(),{data:{...defaultIconProps,...e}};let a;if("string"!=typeof e||null===(a=stringToIcon(e,!1,!0)))return i(),null;const c=getIconData(a);if(!c)return!n||t.loading&&t.loading.name===e||(i(),t.name="",t.loading={name:e,abort:loadIcons([a],o)}),null;i(),t.name!==e&&(t.name=e,r&&!t.destroyed&&r(e));const s=["iconify"];return""!==a.prefix&&s.push("iconify--"+a.prefix),""!==a.provider&&s.push("iconify--"+a.provider),{data:c,classes:s}}function generateIcon(e,t){return e?render({...defaultIconProps,...e},t):null}function create_if_block$1(e){let t;function n(e,t){return e[0].svg?create_if_block_1:create_else_block}let o=n(e),r=o(e);return{c(){r.c(),t=empty()},l(e){r.l(e),t=empty()},m(e,n){r.m(e,n),insert_hydration(e,t,n)},p(e,i){o===(o=n(e))&&r?r.p(e,i):(r.d(1),r=o(e),r&&(r.c(),r.m(t.parentNode,t)))},d(e){r.d(e),e&&detach(t)}}}function create_else_block(e){let t,n=[e[0].attributes],o={};for(let e=0;e<n.length;e+=1)o=assign(o,n[e]);return{c(){t=element("span"),this.h()},l(e){t=claim_element(e,"SPAN",{}),children(t).forEach(detach),this.h()},h(){set_attributes(t,o)},m(e,n){insert_hydration(e,t,n)},p(e,r){set_attributes(t,o=get_spread_update(n,[1&r&&e[0].attributes]))},d(e){e&&detach(t)}}}function create_if_block_1(e){let t,n=e[0].body+"",o=[e[0].attributes],r={};for(let e=0;e<o.length;e+=1)r=assign(r,o[e]);return{c(){t=svg_element("svg"),this.h()},l(e){t=claim_svg_element(e,"svg",{}),children(t).forEach(detach),this.h()},h(){set_svg_attributes(t,r)},m(e,o){insert_hydration(e,t,o),t.innerHTML=n},p(e,i){1&i&&n!==(n=e[0].body+"")&&(t.innerHTML=n),set_svg_attributes(t,r=get_spread_update(o,[1&i&&e[0].attributes]))},d(e){e&&detach(t)}}}function create_fragment$1(e){let t,n=e[0]&&create_if_block$1(e);return{c(){n&&n.c(),t=empty()},l(e){n&&n.l(e),t=empty()},m(e,o){n&&n.m(e,o),insert_hydration(e,t,o)},p(e,[o]){e[0]?n?n.p(e,o):(n=create_if_block$1(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:noop,o:noop,d(e){n&&n.d(e),e&&detach(t)}}}function instance$1(e,t,n){const o={name:"",loading:null,destroyed:!1};let r,i=!1,a=0;const c=e=>{"function"==typeof t.onLoad&&t.onLoad(e);createEventDispatcher()("load",{icon:e})};function s(){n(3,a++,a)}return onMount((()=>{n(2,i=!0)})),onDestroy((()=>{n(1,o.destroyed=!0,o),o.loading&&(o.loading.abort(),n(1,o.loading=null,o))})),e.$$set=e=>{n(6,t=assign(assign({},t),exclude_internal_props(e)))},e.$$.update=()=>{{const e=checkIconState(t.icon,o,i,s,c);n(0,r=e?generateIcon(e.data,t):null),r&&e.classes&&n(0,r.attributes.class=("string"==typeof t.class?t.class+" ":"")+e.classes.join(" "),r)}},t=exclude_internal_props(t),[r,o,i,a]}let Component$1=class extends SvelteComponent{constructor(e){super(),init(this,e,instance$1,create_fragment$1,safe_not_equal,{})}};function create_if_block(e){let t,n;return t=new Component$1({props:{icon:e[1].icon}}),{c(){create_component(t.$$.fragment)},l(e){claim_component(t.$$.fragment,e)},m(e,o){mount_component(t,e,o),n=!0},p(e,n){const o={};2&n&&(o.icon=e[1].icon),t.$set(o)},i(e){n||(transition_in(t.$$.fragment,e),n=!0)},o(e){transition_out(t.$$.fragment,e),n=!1},d(e){destroy_component(t,e)}}}function create_fragment(e){let t,n,o,r,i,a,c,s,l,u,d,f,p,h,g,m,_,b,y,v,I,S,w,x=e[1].name+"",k=e[1].icon&&create_if_block(e);return{c(){t=element("section"),n=element("div"),o=element("img"),i=space(),a=element("img"),s=space(),l=element("div"),u=element("h1"),d=space(),f=element("h2"),p=space(),h=element("a"),k&&k.c(),g=space(),m=element("span"),_=text(x),v=space(),I=element("img"),this.h()},l(e){t=claim_element(e,"SECTION",{id:!0});var r=children(t);n=claim_element(r,"DIV",{class:!0});var c=children(n);o=claim_element(c,"IMG",{class:!0,src:!0}),i=claim_space(c),a=claim_element(c,"IMG",{class:!0,src:!0}),s=claim_space(c),l=claim_element(c,"DIV",{class:!0});var b=children(l);u=claim_element(b,"H1",{class:!0}),children(u).forEach(detach),d=claim_space(b),f=claim_element(b,"H2",{class:!0}),children(f).forEach(detach),p=claim_space(b),h=claim_element(b,"A",{href:!0,class:!0});var y=children(h);k&&k.l(y),g=claim_space(y),m=claim_element(y,"SPAN",{});var S=children(m);_=claim_text(S,x),S.forEach(detach),y.forEach(detach),b.forEach(detach),v=claim_space(c),I=claim_element(c,"IMG",{class:!0,src:!0}),c.forEach(detach),r.forEach(detach),this.h()},h(){attr(o,"class","center svelte-75tsdj"),src_url_equal(o.src,r=e[2].big.url)||attr(o,"src",r),attr(a,"class","left svelte-75tsdj"),src_url_equal(a.src,c=e[2].left.url)||attr(a,"src",c),attr(u,"class","heading svelte-75tsdj"),attr(f,"class","subheading svelte-75tsdj"),attr(h,"href",b=e[1].url),attr(h,"class",y=null_to_empty("button"+(e[1].icon?" with_icon":""))+" svelte-75tsdj"),attr(l,"class","content svelte-75tsdj"),attr(I,"class","right svelte-75tsdj"),src_url_equal(I.src,S=e[2].right.url)||attr(I,"src",S),attr(n,"class","section-container svelte-75tsdj"),attr(t,"id",e[0])},m(r,c){insert_hydration(r,t,c),append_hydration(t,n),append_hydration(n,o),append_hydration(n,i),append_hydration(n,a),append_hydration(n,s),append_hydration(n,l),append_hydration(l,u),u.innerHTML=e[3],append_hydration(l,d),append_hydration(l,f),f.innerHTML=e[4],append_hydration(l,p),append_hydration(l,h),k&&k.m(h,null),append_hydration(h,g),append_hydration(h,m),append_hydration(m,_),append_hydration(n,v),append_hydration(n,I),w=!0},p(e,[n]){(!w||4&n&&!src_url_equal(o.src,r=e[2].big.url))&&attr(o,"src",r),(!w||4&n&&!src_url_equal(a.src,c=e[2].left.url))&&attr(a,"src",c),(!w||8&n)&&(u.innerHTML=e[3]),(!w||16&n)&&(f.innerHTML=e[4]),e[1].icon?k?(k.p(e,n),2&n&&transition_in(k,1)):(k=create_if_block(e),k.c(),transition_in(k,1),k.m(h,g)):k&&(group_outros(),transition_out(k,1,1,(()=>{k=null})),check_outros()),(!w||2&n)&&x!==(x=e[1].name+"")&&set_data(_,x),(!w||2&n&&b!==(b=e[1].url))&&attr(h,"href",b),(!w||2&n&&y!==(y=null_to_empty("button"+(e[1].icon?" with_icon":""))+" svelte-75tsdj"))&&attr(h,"class",y),(!w||4&n&&!src_url_equal(I.src,S=e[2].right.url))&&attr(I,"src",S),(!w||1&n)&&attr(t,"id",e[0])},i(e){w||(transition_in(k),w=!0)},o(e){transition_out(k),w=!1},d(e){e&&detach(t),k&&k.d()}}}function instance(e,t,n){let{props:o}=t,{id:r}=t,{action:i}=t,{images:a}=t,{heading:c}=t,{subheading:s}=t;return e.$$set=e=>{"props"in e&&n(5,o=e.props),"id"in e&&n(0,r=e.id),"action"in e&&n(1,i=e.action),"images"in e&&n(2,a=e.images),"heading"in e&&n(3,c=e.heading),"subheading"in e&&n(4,s=e.subheading)},[r,i,a,c,s,o]}class Component extends SvelteComponent{constructor(e){super(),init(this,e,instance,create_fragment,safe_not_equal,{props:5,id:0,action:1,images:2,heading:3,subheading:4})}}export{Component as default};