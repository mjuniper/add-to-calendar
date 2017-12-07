import Ember from 'ember';
// import md5 from 'md5';

// based on https://github.com/carlsednaoui/add-to-calendar-buttons

/*
  TODO:
    - iCalendar
      - GEO, CONFERENCE???
      - truncate lines at 75 chars???
      - DATE formats on the ics file???
      - validate ics files
    - google calendar
      - location...
      - make sure time zones work as expected
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

  isUrl(str) {
    return str.match(/(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/);
  },

  googleCalendarUrl: Ember.computed('model', function googleCalendarUrlCp () {
    const event = this.get('model.attributes');
    const startTime = this.formatTime(event.startDate);
    const endTime = this.formatTime(event.endDate);

    /*
    https://www.google.com/calendar/render
    ?action=TEMPLATE
    &text={{event.name}}
    &dates={{event.start}}/{{event.end}}
    &details={{event.description}}
    &location={{event.location}}
    &trp=false
    &sprop={{event.url}}
    &sprop=name:{{org.name}}
    &pli=1
    &sf=true
    &output=xml
    */
    const parts = [
      'https://www.google.com/calendar/render',
      '?action=TEMPLATE',
      `&text=${event.title}`,
      `&dates=${startTime}`,
      `/${endTime}`,
      `&details=${event.description}`,
      `&location=${event.location}`,
      '&trp=false',
      `&sprop=${event.url}`, // this will be the url of the event page in this demo we do not have that but we can get it in the hub apps
      '&sprop=name:', // this will be the organizer or the org name
      '&pli=1',
      '&sf=true',
      '&output=xml'
    ];

    return encodeURI(parts.join(''));
  }),

  icsCalendarUrl: Ember.computed('model', function icsCalendarUrlCp () {
    const event = this.get('model.attributes');
    const startTime = this.formatTime(event.startDate);
    const endTime = this.formatTime(event.endDate);
    const dtStamp = this.formatTime(event.EditDate);

    let parts = [
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
      `DESCRIPTION:${event.description}`
    ];

    if (event.organizerName && event.organizerEmail) {
      parts.push(`ORGANIZER;CN=${event.organizerName}:mailto:${event.organizerEmail}`);
    } else if (event.organizerEmail) {
      parts.push(`ORGANIZER:mailto:event.organizerEmail`);
    } else {
      // TODO: we'll use org name
    }

    if (this.isUrl(event.location)) {
      parts.push(`CONFERENCE:${event.location}`);
    } else {
      parts.push(`LOCATION:${event.location}`);
    }

    const geom = this.get('model.geometry');
    if (geom) {
      parts.push(`GEO:${geom.y},${geom.x}`);
    }

    parts = parts.concat([
      'END:VEVENT',
      'END:VCALENDAR'
    ]);

    const href = `data:text/calendar;charset=utf8,${parts.join('\n')}`;

    return encodeURI(href);
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

});
