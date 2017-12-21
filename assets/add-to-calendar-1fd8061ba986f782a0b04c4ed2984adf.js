"use strict"
define("add-to-calendar/app",["exports","add-to-calendar/resolver","ember-load-initializers","add-to-calendar/config/environment"],function(e,a,t,n){Object.defineProperty(e,"__esModule",{value:!0})
var i=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:a.default});(0,t.default)(i,n.default.modulePrefix),e.default=i}),define("add-to-calendar/components/add-to-calendar",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
e.default=Ember.Component.extend({init:function(){this._super.apply(this,arguments)
var e=this.get("model.attributes"),a=void 0!==e&&void 0!==e.startDate&&void 0!==e.endDate
Ember.assert("Invalid event",a)},classNames:["add-to-calendar"],formatTime:function(e){try{return new Date(e).toISOString().replace(/-|:|\.\d+/g,"")}catch(e){return""}},isUrl:function(e){return e.match(/(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/)},escape:function(e){return e.replace(/,/g,",")},fold:function(e){return e.split("").reduce(function(e,a){var t=e.pop()
return t.length+5<75?e.push(t+a):(e.push(t),e.push(a)),e},[""]).join("\r\n ")},makeLine:function(e){return this.fold(this.escape(e))},googleCalendarUrl:Ember.computed("model",function(){var e=this.get("model.attributes"),a=this.formatTime(e.startDate),t=this.formatTime(e.endDate),n=["https://www.google.com/calendar/render","?action=TEMPLATE","&text="+e.title,"&dates="+a,"/"+t,"&details="+e.description+"\r\n\r\n"+e.url,"&location="+e.location,"&trp=false","&sprop="+e.url,"&sprop=name:","&pli=1","&sf=true","&output=xml"]
return encodeURI(n.join(""))}),icsCalendarUrl:function(e){var a=this.get("model.attributes"),t=this.formatTime(a.startDate),n=this.formatTime(a.endDate),i=this.formatTime(a.EditDate),r=["BEGIN:VCALENDAR","PRODID:+//arcgis.com//NONSGML ArcGIS Hub//EN","VERSION:2.0","BEGIN:VEVENT","UID:"+a.pageId,this.makeLine("URL;VALUE=URI:"+a.url),"DTSTAMP:"+i,"DTSTART:"+t,"DTEND:"+n,this.makeLine("SUMMARY:"+a.title)],d=a.description
"outlook"===e&&(d+=" Event page: "+a.url),d=this.makeLine("DESCRIPTION:"+d),r.push(d),a.organizerName&&a.organizerEmail?r.push(this.makeLine("ORGANIZER;CN="+a.organizerName+":mailto:"+a.organizerEmail)):a.organizerEmail&&r.push(this.makeLine("ORGANIZER:mailto:event.organizerEmail")),this.isUrl(a.location)?(r.push(this.makeLine("LOCATION;VALUE=URI:"+a.location)),r.push(this.makeLine("CONFERENCE;VALUE=URI:"+a.location))):r.push(this.makeLine("LOCATION:"+a.location.replace(/,/g,"\\,")))
var l=this.get("model.geometry")
l&&r.push("GEO:"+l.y+";"+l.x),r=r.concat(["END:VEVENT","END:VCALENDAR"])
var o="data:text/calendar;charset=utf8,"+r.join("\r\n")
return encodeURI(o)},iCalendarUrl:Ember.computed("model",function(){return this.icsCalendarUrl("icalendar")}),outlookCalendarUrl:Ember.computed("model",function(){return this.icsCalendarUrl("outlook")}),actions:{downloadFile:function(e){window.open(e,"calendar","toolbar=yes,menubar=yes,location=yes,status=yes,scrollbars=yes,resizable=yes,width=800,height=600,left=0,top=0")}}})}),define("add-to-calendar/components/date-range",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({startDate:Ember.computed("model.attributes.startDate",function(){return new Date(this.get("model.attributes.startDate")).toISOString().replace(/T/," ").replace(/:00.000Z/,"")}),endDate:Ember.computed("model.attributes.endDate",function(){return new Date(this.get("model.attributes.endDate")).toISOString().replace(/T/," ").replace(/:00.000Z/,"")})})}),define("add-to-calendar/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({events:[{attributes:{OBJECTID:85,title:"Lonely Street of Dreams",location:"zoom.com",description:"Here I go again on my own. Going down the only road I've ever known. Like a drifter I was born to walk alone....",startDate:15131736e5,endDate:15131772e5,organizerId:null,organizerName:"Sam HunterTest",organizerEmail:null,url:"lonely",pageId:"a46c10e61eae44e48454baa4b5b2ae4c",capacity:null,attendance:null,status:"planned",isCancelled:null,groupId:"98bd6960de7f4a2ba2897ec880b833a6",siteId:"afaf47d6df7e43f69bdbd4e2c518e2f2",initiativeId:null,surveyId:null,CreationDate:1510926075559,Creator:"shunter1",EditDate:1512070705431,Editor:"shunter1"},geometry:{x:-77.03480024999999,y:38.916999}},{attributes:{OBJECTID:88,title:"Sign In Party!",location:"Redlands, California",description:"this is a party",startDate:15140916e5,endDate:15140952e5,organizerId:null,organizerName:"Nick",organizerEmail:"jollyold@northpole.com",url:"sign-in-party",pageId:"2763426a593840d99fdde2e425de3e67",capacity:null,attendance:null,status:"planned",isCancelled:null,groupId:"eface2d9412f4f388db36619bd52cde5",siteId:"ecb28d443f96431ea26d0a6c7519892b",initiativeId:null,surveyId:null,CreationDate:1511844330596,Creator:"dcadminqa",EditDate:1512070656219,Editor:"shunter1"},geometry:{x:-117.18258999999996,y:34.05538000000007}},{attributes:{OBJECTID:93,title:"Jupe Going Skiing",location:"http://www.eldora.com",description:"This is the description",startDate:15143904e5,endDate:15145848e5,organizerId:null,organizerName:"Jupe",organizerEmail:"jupe@esri.com",url:"jupe-going-skiing",pageId:"000cdc9a232a4b48a49519da3a08b1d4",capacity:null,attendance:null,status:"public",isCancelled:null,groupId:"c92bc8e4274d469f8ef0ca129d444e48",siteId:"ba0e1d9834e1406dbda1ec8281c98154",initiativeId:null,surveyId:null,CreationDate:1512667783939,Creator:"dcadminqa",EditDate:1512667789152,Editor:"dcadminqa"}},{attributes:{OBJECTID:90,title:"Test Event Site Only",location:"Arlington, Virginia",description:"This is a test event for a site with no initiative",startDate:15148368e5,endDate:15148404e5,organizerId:null,organizerName:"Marvin",organizerEmail:"marvin@test.com",url:"test-event-site-only",pageId:"28112ed3c40e47a2803707d12ce0ae26",capacity:null,attendance:null,status:"public",isCancelled:null,groupId:"b869fe447af8481ab75ab535662a7890",siteId:"f27be0355da849858da1c0a2d075d2b7",initiativeId:null,surveyId:null,CreationDate:1512070763604,Creator:"dcadminqa",EditDate:1512104962224,Editor:"dcadminqa"},geometry:{x:-77.08628999999996,y:38.89051000000006}},{attributes:{OBJECTID:91,title:"Test Event with Initiative/Site",location:"Arlington, Virginia",description:"This is an event attached to an initiative and a site",startDate:15148404e5,endDate:1514844e6,organizerId:null,organizerName:"Marvin",organizerEmail:"marvin@test.com",url:"test-event-with-initiativesite",pageId:"2ac5de0878584e4b8b0880635af2a1d4",capacity:null,attendance:null,status:"public",isCancelled:null,groupId:"86d018f43790456d9ee758a2c2f294cb",siteId:"f27be0355da849858da1c0a2d075d2b7",initiativeId:"01eb5321db584801afab32ee503642ae",surveyId:null,CreationDate:1512074642335,Creator:"dcadminqa",EditDate:1512078023028,Editor:"dcadminqa"},geometry:{x:-77.08628999999996,y:38.89051000000006}},{attributes:{OBJECTID:92,title:"Other Admin Event",location:"Rosslyn, Virginia",description:"this is my description",startDate:1517508e6,endDate:15175116e5,organizerId:null,organizerName:"",organizerEmail:"",url:"other-admin-event",pageId:"d880d385297c4658890c234c78b85876",capacity:null,attendance:null,status:"public",isCancelled:null,groupId:"21cddeb59d374fad84f3b6e10d947800",siteId:"f27be0355da849858da1c0a2d075d2b7",initiativeId:"01eb5321db584801afab32ee503642ae",surveyId:null,CreationDate:1512495274195,Creator:"mperry_dcqa",EditDate:1512495280518,Editor:"mperry_dcqa"},geometry:{x:-77.07265999999998,y:38.89664000000005}}]})}),define("add-to-calendar/helpers/app-version",["exports","add-to-calendar/config/environment","ember-cli-app-version/utils/regexp"],function(e,a,t){function n(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return a.hideSha?i.match(t.versionRegExp)[0]:a.hideVersion?i.match(t.shaRegExp)[0]:i}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n
var i=a.default.APP.version
e.default=Ember.Helper.helper(n)}),define("add-to-calendar/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=a.default}),define("add-to-calendar/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=a.default}),define("add-to-calendar/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","add-to-calendar/config/environment"],function(e,a,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=void 0,i=void 0
t.default.APP&&(n=t.default.APP.name,i=t.default.APP.version),e.default={name:"App Version",initialize:(0,a.default)(n,i)}}),define("add-to-calendar/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",a.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("add-to-calendar/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("add-to-calendar/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:a.default}}),define("add-to-calendar/initializers/export-application-global",["exports","add-to-calendar/config/environment"],function(e,a){function t(){var e=arguments[1]||arguments[0]
if(!1!==a.default.exportApplicationGlobal){var t
if("undefined"!=typeof window)t=window
else if("undefined"!=typeof global)t=global
else{if("undefined"==typeof self)return
t=self}var n,i=a.default.exportApplicationGlobal
n="string"==typeof i?i:Ember.String.classify(a.default.modulePrefix),t[n]||(t[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete t[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=t,e.default={name:"export-application-global",initialize:t}}),define("add-to-calendar/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("add-to-calendar/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("add-to-calendar/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("add-to-calendar/instance-initializers/ember-data",["exports","ember-data/instance-initializers/initialize-store-service"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:a.default}}),define("add-to-calendar/resolver",["exports","ember-resolver"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=a.default}),define("add-to-calendar/router",["exports","add-to-calendar/config/environment"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0})
var t=Ember.Router.extend({location:a.default.locationType,rootURL:a.default.rootURL})
t.map(function(){}),e.default=t}),define("add-to-calendar/services/ajax",["exports","ember-ajax/services/ajax"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return a.default}})}),define("add-to-calendar/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"xnifKhnR",block:'{"statements":[[0,"\\n"],[6,["each"],[[28,["events"]]],null,{"statements":[[0,"  "],[11,"h3",[]],[13],[1,[28,["event","attributes","title"]],false],[14],[0,"\\n  "],[1,[33,["date-range"],null,[["model"],[[28,["event"]]]]],false],[0,"\\n  "],[1,[33,["add-to-calendar"],null,[["model"],[[28,["event"]]]]],false],[0,"\\n  "],[11,"hr",[]],[13],[14],[0,"\\n"]],"locals":["event"]},null],[0,"\\n"],[1,[26,["outlet"]],false],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"add-to-calendar/templates/application.hbs"}})}),define("add-to-calendar/templates/components/add-to-calendar",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"eQs88ORX",block:'{"statements":[[11,"h5",[]],[13],[0,"Add to Calendar:"],[14],[0,"\\n"],[11,"div",[]],[15,"class","link-container"],[13],[0,"\\n  "],[11,"div",[]],[15,"class",""],[13],[0,"\\n    "],[11,"div",[]],[13],[0,"Google"],[14],[0,"\\n    "],[11,"a",[]],[15,"class","btn btn-default"],[15,"target","_blank"],[16,"href",[34,[[26,["googleCalendarUrl"]]]]],[13],[0,"\\n      "],[11,"span",[]],[15,"class","glyphicon glyphicon-calendar"],[15,"aria-hidden","true"],[13],[0,"google"],[14],[0,"\\n    "],[14],[0,"\\n  "],[14],[0,"\\n  "],[11,"div",[]],[15,"class",""],[13],[0,"\\n    "],[11,"div",[]],[13],[0,"iCal"],[14],[0,"\\n    "],[11,"a",[]],[15,"class","btn btn-default"],[15,"target","_blank"],[16,"href",[34,[[26,["iCalendarUrl"]]]]],[15,"download","calendar"],[13],[0,"\\n      "],[11,"span",[]],[15,"class","glyphicon glyphicon-calendar"],[15,"aria-hidden","true"],[13],[0,"ical"],[14],[0,"\\n    "],[14],[0,"\\n  "],[14],[0,"\\n  "],[11,"div",[]],[15,"class",""],[13],[0,"\\n    "],[11,"div",[]],[13],[0,"Outlook"],[14],[0,"\\n"],[0,"    "],[11,"a",[]],[15,"class","btn btn-default"],[15,"target","_blank"],[16,"href",[34,[[26,["outlookCalendarUrl"]]]]],[5,["action"],[[28,[null]],"downloadFile",[28,["outlookCalendarUrl"]]]],[13],[0,"\\n      "],[11,"span",[]],[15,"class","glyphicon glyphicon-calendar"],[15,"aria-hidden","true"],[13],[0,"outlook"],[14],[0,"\\n    "],[14],[0,"\\n  "],[14],[0,"\\n"],[14],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"add-to-calendar/templates/components/add-to-calendar.hbs"}})}),define("add-to-calendar/templates/components/date-range",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"kqudkmY/",block:'{"statements":[[1,[26,["startDate"]],false],[0," - "],[1,[26,["endDate"]],false],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"add-to-calendar/templates/components/date-range.hbs"}})}),define("add-to-calendar/config/environment",["ember"],function(e){try{var a="add-to-calendar/config/environment",t=document.querySelector('meta[name="'+a+'"]').getAttribute("content"),n=JSON.parse(unescape(t)),i={default:n}
return Object.defineProperty(i,"__esModule",{value:!0}),i}catch(e){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests||require("add-to-calendar/app").default.create({name:"add-to-calendar",version:"0.0.0+c1920a1d"})
