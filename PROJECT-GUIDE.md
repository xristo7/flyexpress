# Fly Express Passenger App — Demo Guide

## Architecture

This is a responsive, front-end-only single-page demonstration. `index.html` contains the semantic application shell, `styles.css` contains the responsive Fly Express design system, and `script.js` contains fictional data, rendering, in-memory state, navigation, validation and interactive demo states.

No backend, database, real authentication, payment gateway, mobile-money provider, SMS service or geolocation service is connected. OpenStreetMap tiles are requested for the visible trip preview; form data stays in the page and resets after refresh.

## Files

```text
fly-express-passenger-full-demo/
├── index.html
├── styles.css
├── script.js
├── leaflet.css
├── README.txt
├── PROJECT-GUIDE.md
└── assets/
    ├── fly-express-logo.jpg
    ├── fly-express-van.png
    ├── fly-express-14-seater.png
    └── fly-express-live-route.mp4
```

## Opening the demo

1. Serve this folder with any static web server.
2. Open the local URL in Chrome, Edge, Firefox or Safari.
3. Use OTP `123456`, or choose **Continue as Guest**.
4. Refresh to reset the demo.

## Core passenger booking

The main booking path is intentionally short. Search values—including route, date and passenger count—persist into the available departures and final booking. After choosing a departure, optional requirements are progressively disclosed in five compact accordions:

- Return trip
- Passengers
- Assistance and language
- Luggage
- Seat preference

The sticky booking CTA always shows the current fare. Its return toggle adds or removes discounted return travel in one click. On small screens, the OpenStreetMap route preview condenses into a compact sticky map after scrolling so the optional controls remain easy to reach.

When **Choose seats** is active, `assets/fly-express-14-seater.png` is the selector background. Fourteen transparent, accessible buttons align to passenger chairs. The top-right driver control is natively disabled and cannot be selected. Selected seats persist to checkout and the digital ticket.

## Complete simulated surfaces

- Splash, three-screen onboarding, sign-in, OTP and registration
- Home dashboard and searchable departures
- Progressive one-way and return booking
- Passenger details, assistance, language, luggage and 14-seat selector
- Wallet, MTN, Airtel, cash, corporate and voucher payment states
- Booking confirmation, QR ticket and ticket lifecycle previews
- Upcoming, completed and cancelled trips
- Animated live-trip tracking, crew and emergency context
- Wallet activity, deposits, transfers, PIN and filters
- Eight-step parcel flow with persistent sender, recipient, route and parcel data
- Parcel price options, separate parcel payment validation, receipt, barcode and tracking
- Offers, sponsored content, notifications and preferences
- Support, FAQs, lost property and request states
- Profile, saved passengers, pickup points, privacy, terms, About and accessibility controls

## Verification notes

- Core booking was exercised from guest entry through ticket generation.
- Return activation changes the one-passenger fare from UGX 5,000 to UGX 9,000.
- The supplied 14-seater exposes exactly 14 passenger controls; the driver is disabled.
- Parcel details and Priority UGX 10,000 pricing persist to receipt.
- OpenStreetMap, QR and barcode previews render, with readable fallbacks for QR/barcode library failure.
- Modal and bottom-sheet dialogs use accessible names, focus containment, background inerting and opener focus restoration.
- Browser console checks reported no JavaScript errors in the tested journeys.
