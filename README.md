# add-to-calendar

Prototype of hub event add-to-calendar component

## NOTES:

OSX Calendar App and recent versions of outlook both support iCalendar. We can support this with a data uri. However, this is highly dependent on the user's configuration. In order for this to work seamlessly, the user must:
1. Have their browser configured to always open files of type .ics.
2. Have their calendar application set to open .ics files.

Google calendar is just a url.

Thus we can do all of this on the client side.

My testing indicates that timezones will just work. But if we run into problems, the iCalendar spec provides for more complex timezone specification.

### Google calendar

Wow there does not seem to be any official documentation. But I found [this](https://stackoverflow.com/questions/22757908/google-calendar-render-action-template-parameter-documentation).

### iCalendar

[iCalendar spec](https://icalendar.org/RFC-Specifications/iCalendar-RFC-5545/)
[iCalendar validator](https://icalendar.org/validator.html)

- [PRODID](https://icalendar.org/iCalendar-RFC-5545/3-7-3-product-identifier.html) is required a required element of the `VCALENDAR` object it is intended to uniquely identify the product that created the event. I recommend we use : `+//arcgis.com//NONSGML ArcGIS Hub//EN`
- [UID](https://icalendar.org/iCalendar-RFC-5545/3-8-4-7-unique-identifier.html) is intended to uniquely identify the event i _think_ we can use `pageId` for this.
- URL will be the url of the event page. in this demo we do not have that but we can get it in the hub apps
- [DTSTAMP](https://icalendar.org/iCalendar-RFC-5545/3-8-7-2-date-time-stamp.html) will be updated date
- GEO, LOCATION, CONFERENCE...
  - https://icalendar.org/iCalendar-RFC-5545/3-8-1-6-geographic-position.html


### Sample iCalendar files

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//Mac OS X 10.13.1//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
CREATED:20170911T151430Z
UID:ECEA9F1C-C79F-4BB0-9D77-327C15731826
DTEND;VALUE=DATE:20170208
TRANSP:TRANSPARENT
SUMMARY:Mike Juniper  BDay
DTSTART;VALUE=DATE:20170207
DTSTAMP:20170911T150531Z
ORGANIZER;CN="DC_Dev Calendar":mailto:DC_Dev@esri.com
END:VEVENT
END:VCALENDAR
```

[More](https://icalendar.org/iCalendar-RFC-5545/4-icalendar-object-examples.html)

## References

[Webcal](https://en.wikipedia.org/wiki/Webcal) (we will not use this now but possibly down the road)
