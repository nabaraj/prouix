(function (nmspjs, $) {

    nmspjs.getCookie =function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
     };
     nmspjs.Configs = (function () {
        function _config() {
            this.activeClass = 'fnlprjt-active',
            this.views = {
                'small'  : tabbrkpnt,
                'medium' : deskbrkpnt,
                'large'  : lgdskbrkpnt
            },
            this.debug = true,
            this.isMobile = {
                Android: (function() {
                    return navigator.userAgent.match(/Android/i);
                })(),
                BlackBerry: (function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                })(),
                iOS: (function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                })(),
                Opera: (function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                })(),
                Windows: (function() {
                    return navigator.userAgent.match(/IEMobile/i);
                })()
            },
            this.init = function () {
                return this;
            };
        }
        return new _config();
     }());
     nmspjs.Utils = (function () {
        function _utils() {
            this.getIEVersion = function(){
                var agent = navigator.userAgent;
                var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
                var matches = agent.match(reg);
                if (matches !== null) {
                    return { major: matches[1], minor: matches[2] };
                }
                return { major: '-1', minor: '-1' };
            }
            this.getViewport = function() {
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                var size;
                if( $('html').hasClass('lt-ie9') ) {
                    size = 'large';
                } else {
                    size = ( w <= nmspjs.Configs.views.xsmall )? 'xsmall' : size;
                    size = ( w >  nmspjs.Configs.views.xsmall && w <= nmspjs.Configs.views.small  )? 'small'  : size;
                    size = ( w >  nmspjs.Configs.views.small  )? 'medium' : size;
                    size = ( w >  nmspjs.Configs.views.medium )? 'large'  : size;
                    size = ( w >  nmspjs.Configs.views.large  )? 'xlarge' : size;
                }

                nmspjs.Configs.viewport = {
                    size: size,
                    width: w,
                    height: h
                };

                return nmspjs.Configs.viewport;
            },
            this.isMobileView = function() {
                return (this.getViewport().size == 'small' || this.getViewport().size == 'xsmall');
            },
            this.isTabletView = function() {
                return (this.getViewport().size == 'medium');
            };
			this.init = function () {
				var that = this; //to behave proxy
				this.getViewport();
				//--------------------------------------------------
				// Add IE10 Class
				//--------------------------------------------------
				if(this.getIEVersion().major === '10') {
					$('html').addClass('ie10');
				}
				//--------------------------------------------------
				//--------------------------------------------------
				// RESIZE EVENT
				// Fires "windowResize" on $(window)
                //Custom resize on particular breakpoints
				//--------------------------------------------------
                return this;
			};
		}
		return new _utils();
	 }());
}(window.nmspjs = ( typeof nmspjs !== 'undefined' && nmspjs instanceof Object ) ? nmspjs : {}, $nmspjs));

var logThis = function(throwLog){
    if(nmspjs.Configs.debug){
        for(var i = 0 ; i < arguments.length; i++){
            console.log(arguments[i])
        }
    }
}