import Ember from 'ember';

// based on https://github.com/carlsednaoui/add-to-calendar-buttons

const LINE_LENGTH = 75; // defined by the spec

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

  escape (str) {
    return str.replace(/,/g, '\,');
  },

  fold (str) {
    // https://icalendar.org/iCalendar-RFC-5545/3-1-content-lines.html
    const parts = str.split('');
    const lines = parts.reduce((acc, item) => {
      let lastItem = acc.pop();
      if (lastItem.length + 5 < LINE_LENGTH) {
        acc.push(lastItem + item);
      } else {
        acc.push(lastItem);
        acc.push(item);
      }
      return acc;
    }, ['']);

    return lines.join('\r\n ');
  },

  makeLine (str) {
    return this.fold(this.escape(str));
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
      `&details=${event.description}\r\n\r\n${event.url}`,
      `&location=${event.location}`,
      '&trp=false',
      `&sprop=${event.url}`, // TODO: this will be the url of the event page in this demo we do not have that but we can get it in the hub apps
      '&sprop=name:', // TODO: this will be the organizer or the org name
      '&pli=1',
      '&sf=true',
      '&output=xml'
    ];

    return encodeURI(parts.join(''));
  }),

  icsCalendarUrl (which) {
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
      this.makeLine(`URL;VALUE=URI:${event.url}`), // this will be the url of the event page in this demo we do not have that but we can get it in the hub apps
      `DTSTAMP:${dtStamp}`, // this should be the updated date i think
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      this.makeLine(`SUMMARY:${event.title}`)
    ];

    let description = event.description;
    if (which === 'outlook') {
      // outlook does not seem to handle the URL so we will put it in the description
      description += ` Event page: ${event.url}`;
    }
    description = this.makeLine(`DESCRIPTION:${description}`);
    parts.push(description);

    if (event.organizerName && event.organizerEmail) {
      parts.push(this.makeLine(`ORGANIZER;CN=${event.organizerName}:mailto:${event.organizerEmail}`));
    } else if (event.organizerEmail) {
      parts.push(this.makeLine(`ORGANIZER:mailto:event.organizerEmail`));
    } else {
      // TODO: we'll use org name
    }

    if (this.isUrl(event.location)) {
      // outlook (and sometimes iCalendar) does not seem to like CONFERENCE so we'll just use both
      parts.push(this.makeLine(`LOCATION;VALUE=URI:${event.location}`));
      parts.push(this.makeLine(`CONFERENCE;VALUE=URI:${event.location}`));
    } else {
      parts.push(this.makeLine(`LOCATION:${event.location.replace(/,/g, '\\,')}`));
    }

    const geom = this.get('model.geometry');
    if (geom) {
      parts.push(`GEO:${geom.y};${geom.x}`);
    }

    parts = parts.concat([
      'END:VEVENT',
      'END:VCALENDAR'
    ]);

    const href = `data:text/calendar;charset=utf8,${parts.join('\r\n')}`;

    return encodeURI(href);
  },

  iCalendarUrl: Ember.computed('model', function iCalendarUrlCp () {
    return this.icsCalendarUrl('icalendar');
  }),

  outlookCalendarUrl: Ember.computed('model', function outlookCalendarUrlCp () {
    return this.icsCalendarUrl('outlook');
  })

});
