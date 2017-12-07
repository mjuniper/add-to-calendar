import Ember from 'ember';
// import md5 from 'md5';

// based on https://github.com/carlsednaoui/add-to-calendar-buttons

/*
  TODO:
    - push upstream
    - deploy to mjuniper.github.io
    - refactor to make it more embery and es6y
    - GEO, LOCATION, CONFERENCE...
    - ORGANIZER;CN="DC_Dev Calendar":mailto:DC_Dev@esri.com
    - validate ics files
    - DATE formats on the ics file???
    - make sure we include all info with google calendar
*/

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    const event = this.get('model.attributes');
    // Make sure we have the necessary event data, such as start time and event duration
    const isValid = event !== undefined
      && event.startDate !== undefined
      && (event.endDate !== undefined);
    Ember.assert('Invalid event', isValid);
  },

  classNames: [ 'add-to-calendar' ],

  formatTime (timeStamp) {
    try {
      return new Date(timeStamp).toISOString().replace(/-|:|\.\d+/g, '');
    } catch (e) {
      return '';
    }
  },

  googleCalendarUrl: Ember.computed('model', function googleCalendarUrlCp () {
    const event = this.get('model.attributes');
    const startTime = this.formatTime(event.startDate);
    const endTime = this.formatTime(event.endDate);

    // https://www.google.com/calendar/render?action=TEMPLATE&text={{event.name}}&dates={{event.start}}/{{event.end}}&details={{event.description}}&location={{event.location}}&trp=false&sprop={{event.url}}&sprop=name:{{org.name}}&pli=1&sf=true&output=xml

    const parts = [
      'https://www.google.com/calendar/render',
      '?action=TEMPLATE',
      '&text=' + (event.title || ''),
      '&dates=' + (startTime || ''),
      '/' + (endTime || ''),
      '&details=' + (event.description || ''),
      '&location=' + (event.address || ''),
      '&sprop=&sprop=name:'
    ];

    return encodeURI(parts.join(''));
  }),

  // yahooCalendarUrl: Ember.computed('model', function () {
  //   const event = this.get('model');
  //   var eventDuration = event.end ?
  //     ((event.end.getTime() - event.start.getTime())/ MS_IN_MINUTES) :
  //     event.duration;
  //
  //   // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
  //   var yahooHourDuration = eventDuration < 600 ?
  //     '0' + Math.floor((eventDuration / 60)) :
  //     Math.floor((eventDuration / 60)) + '';
  //
  //   var yahooMinuteDuration = eventDuration % 60 < 10 ?
  //     '0' + eventDuration % 60 :
  //     eventDuration % 60 + '';
  //
  //   var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;
  //
  //   // Remove timezone from event time
  //   var st = this.formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
  //                                               MS_IN_MINUTES))) || '';
  //
  //   var href = encodeURI([
  //     'http://calendar.yahoo.com/?v=60&view=d&type=20',
  //     '&title=' + (event.title || ''),
  //     '&st=' + st,
  //     '&dur=' + (yahooEventDuration || ''),
  //     '&desc=' + (event.description || ''),
  //     '&in_loc=' + (event.address || '')
  //   ].join(''));
  //
  //   return href;
  // }),

  icsCalendarUrl: Ember.computed('model', function icsCalendarUrlCp () {
    const event = this.get('model.attributes');
    const startTime = this.formatTime(event.startDate);
    const endTime = this.formatTime(event.endDate);
    const dtStamp = this.formatTime(event.EditDate);

    const parts = [
      'BEGIN:VCALENDAR',
      'PRODID:+//arcgis.com//NONSGML ArcGIS Hub//EN',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `UID:${event.pageId}`, // we will use a hash of something unique and immutable I think pageId will work
      `URL:${event.url}`, // this will be the url of the event page in this demo we do not have that but we can get it in the hub apps
      `DTSTAMP:${dtStamp}`, // this should be the updated date i think
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      'LOCATION:' + (event.address || ''),
      'END:VEVENT',
      'END:VCALENDAR'];

    const href = `data:text/calendar;charset=utf8,${parts.join('\n')}`;

    return encodeURI(href);
  }),

});
