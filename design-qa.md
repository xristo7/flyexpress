# Fly Express Full Demo — Design QA

## Scope and source truth

- Full source demo: `C:\Users\Administrator\Downloads\fly-express-passenger-mockup\fly-express-passenger-mockup`
- Review-screen references: the two user-supplied mobile screenshots in this task
- Seat-selector source: `C:\Users\Administrator\Downloads\14 seater.png` (941 × 1761)
- Implementation: this folder, served as a static single-page demo
- Primary QA viewport: 390 × 844 CSS pixels

## Visual comparisons

- `qa-review-comparison-final.png` places the supplied review reference and the implemented OpenStreetMap review together.
- `qa-seat-comparison-final.png` places the supplied 14-seater image and the implemented transparent seat-selector overlay together.
- `qa-review-mobile-final-v2.png` is the initial mobile review state.
- `qa-review-condensed-mobile-final.png` is the scrolled state with the map condensed to 164 px beneath the 66 px app header.
- `qa-seat-selector-mobile-final-v2.png` is the selected-seat state with 1A selected and the driver disabled.

## Visual findings and resolutions

| Priority | Finding | Resolution |
|---|---|---|
| P1 | The first Leaflet stylesheet reference did not apply locally, breaking tile positioning. | Added local `leaflet.css`; OpenStreetMap tiles, route line, markers and attribution now render correctly. |
| P1 | Seat hotspots initially used the wrong image ratio and drifted from chair centers. | Corrected the image ratio to 941 / 1761 and remapped all 14 passenger centers to the supplied asset. |
| P1 | Optional booking needs could lengthen the default journey. | Kept return, passengers, assistance/language, luggage and seats collapsed until requested; the default path remains one review plus checkout. |
| P1 | The return action was separated from the primary booking action. | Added the one-click return toggle directly to the sticky booking CTA with an immediate fare update. |
| P2 | The large map consumed space while reviewing optional choices. | Added a mobile scroll state that condenses the real map to a sticky 164 px preview. |
| P2 | Selection state was visual-only on several controls. | Added `aria-pressed`, group naming and a polite selected-seat status. |
| P2 | Dialogs and the More sheet did not contain keyboard focus. | Added accessible dialog naming, focus containment, background inerting, Escape close and opener-focus restoration. |

No unresolved P0, P1 or P2 issue remains in the requested booking, return-toggle, map or 14-seat selector journey.

## Interaction checks

- Guest entry → Kitooro → Clock Tower → 14-seat departure → progressive review: passed.
- Search route, date and passenger selections carry into results and downstream booking: passed.
- Return CTA changes one-passenger fare from UGX 5,000 to UGX 9,000 and restores keyboard focus to the same control: passed.
- Seat preference opens only on demand: passed.
- Seat 1A selection persists through checkout and the digital ticket: passed.
- Exactly 14 passenger-seat buttons are exposed: passed.
- Top-right driver button is natively disabled, unavailable to pointer and keyboard selection: passed.
- Checkout → confirmation → real QR ticket: passed.
- Parcel sender, recipient, route, Priority UGX 10,000 price and MTN demo payment persist to receipt: passed.
- More sheet opens as an accessible modal, focuses its close button, inerts the app and restores focus to More: passed.

## Technical checks

- Bundled Node JavaScript syntax check: passed.
- Local asset-reference check, including `leaflet.css` and `assets/fly-express-14-seater.png`: passed.
- Fresh browser console checks on passenger booking, ticket, parcel receipt and bottom sheet: zero JavaScript errors.
- OpenStreetMap attribution remains visible in full and condensed map states.

final result: passed
