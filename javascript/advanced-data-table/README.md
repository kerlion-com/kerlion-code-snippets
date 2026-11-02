
# KERLION Advanced Data Table

A responsive and reusable Arabic data table built with HTML, CSS, and vanilla JavaScript.

## Features

- Instant search across all data fields.
- Sort records by ID, name, email, role, and date.
- Filter records by role and status.
- Pagination with adjustable page size.
- Export all filtered records to CSV.
- Arabic RTL interface.
- Responsive layout for desktop and mobile.
- No external libraries or API required.

## Files

- `index.html` — Table interface and HTML structure.
- `styles.css` — Responsive styling and visual design.
- `table.js` — Search, sorting, filtering, pagination, and CSV export.

## Installation

1. Download all three files.
2. Keep the files together in the same folder.
3. Open `index.html` in a modern web browser.

No installation or build process is required.

## Customizing the Data

Open `table.js` and locate the `records` array.

Replace the sample records with your own data using this structure:

```javascript
{
    id: 1001,
    name: "Your Name",
    email: "user@example.com",
    role: "Developer",
    status: "active",
    date: "2026-01-12"
}
```

Supported status values:

- `active`
- `inactive`
- `pending`

You can add, remove, or modify records inside the array.

## CSV Export

The export button downloads all records matching the current search and filter settings, not just the currently visible page.

The exported file uses UTF-8 encoding for Arabic text compatibility.

## Important Notes

- This version uses sample data stored in the JavaScript file.
- It does not connect to a database or remote server.
- Data changes are not saved permanently.
- Do not use confidential or sensitive personal information in the public demo.

## License

This project is distributed under the MIT License included in this repository.

## Developed by KERLION

https://www.kerlionvip.com
