(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        factory();
    }
}(this, function() {
	bubble = function(s) {
		var api = {}, r, i, nodes, events = {}, d = document, listeners = {},
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
			var actions = str.split(/, ?/g), tmp, r = [], i;
			for(i=0; i<actions.length; i++) {
				tmp = actions[i].split(/:/);
				r.push({ type: tmp[0].trim(), event: tmp[1] ? tmp[1] : false})
			}
			return r;
		},
		handle = function(e, type) {
			var actions, i;
			if(e && e.target && e.target[ga] && e.target[ga](attr)) {
				actions = parse(e.target[ga](attr));
				for(i=0; i<actions.length; i++) {
					if(actions[i].type === type && actions[i].event) {
						e.stopPropagation();
						api.dispatch(actions[i].event, e);
					}
				}
			}
		};
		api.root = r = d && d[qs] ? d[qs](s) : false;
		api.on = function(type, func) {
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
			if(listeners[type]) {
				for(var i=0; i<listeners[type].length; i++) {
					listeners[type][i](e);
				}
			}
			return api;
		};
		if(r) {
			api.nodes = nodes = r[qsa]('[' + attr + ']');
			for(i=0; i<nodes.length; i++) {
				var actions = parse(nodes[i][ga](attr));
				for(var j=0; j<actions.length; j++) {
					events[actions[j].type] = true;
				}
			}
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