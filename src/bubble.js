(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        factory();
    }
}(this, function() {
	bubble = function(s) {
		var api = {}, r, i, nodes, events = {}, d = document, listeners = {}, listenersObjs = [],
		qs = 'querySelector', qsa = 'querySelectorAll', attr = 'data-bubble-action', ga = 'getAttribute',
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
					e.stopPropagation();
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
			// collecting events' types
			api.nodes = nodes = r[qsa]('[' + attr + ']');
			var processNode = function(node) {
				var actions = parse(node[ga](attr));
				for(var j=0; j<actions.length; j++) {
					events[actions[j].type] = true;
				}
			}
			processNode(r);
			for(i=0; i<nodes.length; i++) processNode(nodes[i]);
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