(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        factory();
    }
}(this, function() {
	bubble = function(s, defaultEventTypes) {
		var api = {}, r, i, d = document, listeners = {}, listenersObjs = [],
		events = defaultEventTypes || {
			blur: 1, change: 1, click: 1, dblclick: 1, drag: 1, dragend: 1, dragenter: 1, dragleave: 1, dragover: 1, dragstart: 1, drop: 1, focus: 1, fullscreenchange: 1, input: 1, keydown: 1, keypress: 1, keyup: 1, mousedown: 1, mouseenter: 1, mouseleave: 1, mousemove: 1, mouseout: 1, mouseover: 1, mouseup: 1, paste: 1, readystatechange: 1, resize: 1, scroll: 1, touchcancel: 1, touchend: 1, touchenter: 1, touchleave: 1, touchmove: 1, touchstart: 1, transitionend: 1, load: 1, unload: 1
		},
		qs = 'querySelector', attr = 'data-bubble-action', ga = 'getAttribute',
		ael = function(obj, evt, fnc) {
		    if (obj.addEventListener) {
		        obj.addEventListener(evt, fnc, evt === 'focus' || evt === 'blur');
		        return true;
		    } else if (obj.attachEvent) {
		        return obj.attachEvent('on' + evt, fnc);
		    }
		},
		parse = function(str) {
			var actions = str ? str.split(/, ?/g) : [], tmp, r = [], i;
			for(i=0; i<actions.length; i++) {
				tmp = actions[i].split(/:/);
				tmp.length > 1 ? r.push({ type: tmp[0].trim(), event: tmp[1]}) : r.push({ type: 'click', event: tmp[0]});
			}
			return r;
		},
		handle = function(e, type) {
			var actions = [], i;
			if(e && e.target && e.target[ga] && e.target[ga](attr)) {
				actions = parse(e.target[ga](attr));
			} else if(r[ga](attr)) {
				actions = parse(r[ga](attr));
			}
			for(i=0; i<actions.length; i++) {
				if(actions[i].type === type && actions[i].event) {
					api.dispatch(actions[i].event, e);
				}
			}
		};
		api.root = r = d && d[qs] ? d[qs](s) : false;
		api.on = function(type, func) {
			if(typeof type === 'object') { listenersObjs.push(type); return api; }
			if(!listeners[type]) listeners[type] = [];
			listeners[type].push(func);
			return api;
		};
		api.off = function(type, func) {
			if(listeners[type]) {
				for(var i=0; i<listeners[type].length; i++) {
					if(listeners[type][i] === func) {
						listeners[type].splice(i, 1);
						return api;
					}
				}
			}
			return api;
		}
		api.dispatch = function(type, e) {
			var i;
			if(listeners[type]) {
				for(i=0; i<listeners[type].length; i++) {
					listeners[type][i](e);
				}
			}
			if(listenersObjs.length > 0) {
				for(i=0; i<listenersObjs.length; i++) {
					if(listenersObjs[i][type]) {
						listenersObjs[i][type](e);
					}
				}
			}
			return api;
		};
		if(r) {
			// adding listeners
			for(var type in events) {
				(function(t) {
					ael(r, t, function(e) {
						handle(e, t);
					});
				})(type);
			}
			return api;	
		} else {
			return false;
		}
	}
}));