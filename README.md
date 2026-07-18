# Fly Express Passenger App

A mobile-first Fly Express booking prototype focused on getting the common trip request done quickly while keeping return trips, multiple travellers, language and assistance, luggage, seat choice, and payment options available on demand.

## Booking flow

- The trip review opens with a real OpenStreetMap route preview.
- Scrolling darkens and minimizes the map while the review sheet moves into focus.
- One traveller, one way, English, one personal item, and best-available seating are the defaults.
- A one-tap Return switch sits beside the booking CTA; detailed return modes remain in the expandable Return section.
- Less-common traveller, assistance, language, luggage, and seat controls stay collapsed until needed.
- Checkout starts with the wallet method and progressively reveals all other payment methods through **Change**.
- The demo includes validation, confirmation, QR ticket, sharing, and calendar export states.

## Run locally

Requirements: Node.js 22 and pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Create a production build with:

```bash
pnpm build
```

## Deployment

GitHub Pages serves the production build from the `gh-pages` branch. To publish an update, run `pnpm build`, commit the contents of `dist`, and push that build to `gh-pages`.

Map data and tiles are provided by [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). The app keeps attribution visible in both expanded and collapsed map states.
