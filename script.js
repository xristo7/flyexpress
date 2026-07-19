/* =========================================================
   Fly Express Passenger App — Presentation Prototype
   All state is intentionally in-memory and resets on refresh.
   ========================================================= */

'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const appData = {
  passenger: {
    name: 'Sarah Nabirye',
    phone: '+256 772 345 678',
    email: 'sarah.nabirye@example.com',
    preferredRoute: 'Entebbe Main Stage → Kampala Main Stage'
  },
  routes: ['Entebbe Main Stage', 'Kitooro', 'Abayita Ababiri', 'Kajjansi', 'Clock Tower', 'Kampala Main Stage'],
  trips: [
    { id: 't1', depart: '8:30 AM', arrive: '9:35 AM', seats: 4, status: 'Available', vehicle: 'High-roof van', plate: 'UBM 245K', duration: '1 hr 05 min', fare: 5000, traffic: 'Moderate', boarding: 'Entebbe Main Stage', destination: 'Kampala Main Stage', currentStage: 'Entebbe Main Stage', comingFrom: 'Kampala Main Stage', headingTo: 'Kampala Main Stage', markerIndex: 0, vansAtStage: 5, vansApproaching: 1, driverName: 'Moses Mukasa', driverPhone: '+256 774 123 456', driverRating: '4.9', countdown: '5 mins until departure' },
    { id: 't2', depart: '9:00 AM', arrive: '10:00 AM', seats: 8, status: 'Available', vehicle: '18-seat van', plate: 'UBP 318F', duration: '1 hr', fare: 5000, traffic: 'Light', boarding: 'Entebbe Main Stage', destination: 'Kampala Main Stage', currentStage: 'Kitooro', comingFrom: 'Kampala Main Stage', headingTo: 'Entebbe Main Stage', markerIndex: 1, vansAtStage: 2, vansApproaching: 2, driverName: 'John Ssekabira', driverPhone: '+256 701 987 654', driverRating: '4.8', countdown: '12 mins until arrival' },
    { id: 't3', depart: '9:30 AM', arrive: '10:45 AM', seats: 2, status: 'Almost full', vehicle: '14-seat van', plate: 'UBN 742D', duration: '1 hr 15 min', fare: 5000, traffic: 'Heavy', boarding: 'Kitooro', destination: 'Clock Tower', currentStage: 'Abayita Ababiri', comingFrom: 'Entebbe Main Stage', headingTo: 'Kampala Main Stage', markerIndex: 2, vansAtStage: 1, vansApproaching: 3, driverName: 'David Okello', driverPhone: '+256 752 456 789', driverRating: '4.7', countdown: '28 mins until arrival' },
    { id: 't4', depart: '10:00 AM', arrive: '11:00 AM', seats: 11, status: 'Available', vehicle: 'High-roof van', plate: 'UBQ 915A', duration: '1 hr', fare: 5000, traffic: 'Moderate', boarding: 'Entebbe Main Stage', destination: 'Kampala Main Stage', currentStage: 'Kajjansi', comingFrom: 'Kampala Main Stage', headingTo: 'Entebbe Main Stage', markerIndex: 3, vansAtStage: 4, vansApproaching: 0, driverName: 'Peter Semwanga', driverPhone: '+256 781 333 444', driverRating: '4.9', countdown: '35 mins until arrival' },
    { id: 't5', depart: '10:30 AM', arrive: '11:35 AM', seats: 6, status: 'Available', vehicle: 'High-roof van', plate: 'UBR 104C', duration: '1 hr 05 min', fare: 5000, traffic: 'Light', boarding: 'Entebbe Main Stage', destination: 'Kampala Main Stage', currentStage: 'Clock Tower', comingFrom: 'Kampala Main Stage', headingTo: 'Entebbe Main Stage', markerIndex: 4, vansAtStage: 0, vansApproaching: 2, driverName: 'Arthur Ssewankambo', driverPhone: '+256 702 111 222', driverRating: '4.6', countdown: '45 mins until arrival' }
  ],
  luggage: [
    { id: 'personal', icon: 'briefcase-business', name: 'Small personal item', desc: 'Handbag or compact backpack', guide: 'Fits on your lap', price: 0 },
    { id: 'standard', icon: 'luggage', name: 'Standard bag', desc: 'Regular travel suitcase', guide: 'Up to 15 kg', price: 2000 },
    { id: 'large', icon: 'package-open', name: 'Large bag', desc: 'Large suitcase or sack', guide: 'Up to 25 kg', price: 4000 },
    { id: 'excess', icon: 'boxes', name: 'Excess luggage', desc: 'Additional bulky luggage', guide: 'Stage approval required', price: 6000 },
    { id: 'fragile', icon: 'glass-water', name: 'Fragile item', desc: 'Careful handling requested', guide: 'Must be securely packed', price: 7000 },
    { id: 'commercial', icon: 'store', name: 'Commercial luggage', desc: 'Business or resale goods', guide: 'Price assessed at stage', price: null }
  ],
  transactions: [
    { type: 'deposit', title: 'Wallet deposit', date: 'Today, 7:42 AM', amount: 20000, direction: 'in', icon: 'arrow-down-left' },
    { type: 'trip', title: 'Entebbe to Kampala ticket', date: 'Yesterday, 8:12 AM', amount: 5000, direction: 'out', icon: 'ticket' },
    { type: 'trip', title: 'Return-ticket package', date: '15 Jul, 6:40 PM', amount: 9000, direction: 'out', icon: 'refresh-cw' },
    { type: 'parcel', title: 'Parcel delivery', date: '14 Jul, 10:25 AM', amount: 7500, direction: 'out', icon: 'package' },
    { type: 'promotion', title: 'Promotional credit', date: '12 Jul, 9:00 AM', amount: 2000, direction: 'in', icon: 'gift' },
    { type: 'luggage', title: 'Luggage payment', date: '10 Jul, 2:15 PM', amount: 4000, direction: 'out', icon: 'luggage' },
    { type: 'refund', title: 'Pending trip refund', date: '8 Jul, 4:34 PM', amount: 5000, direction: 'in', icon: 'rotate-ccw' }
  ],
  notifications: [
    { id: 1, category: 'Trips', icon: 'bus-front', title: 'Your vehicle is ready for boarding.', body: 'UBM 245K is boarding at Entebbe Main Stage. Please arrive by 8:15 AM.', time: '2 min ago', unread: true },
    { id: 2, category: 'Trips', icon: 'calendar-clock', title: 'Your return ticket expires in three days.', body: 'Book your Kampala to Entebbe return before 21 July 2026.', time: '1 hr ago', unread: true },
    { id: 3, category: 'Parcels', icon: 'package-check', title: 'Your parcel has arrived in Kampala.', body: 'Parcel FXP-260718-0842 will soon be ready for collection.', time: '2 hrs ago', unread: true },
    { id: 4, category: 'Wallet', icon: 'wallet-cards', title: 'UGX 20,000 was added to your wallet.', body: 'Your demonstration wallet balance is now UGX 32,500.', time: 'Yesterday', unread: true },
    { id: 5, category: 'Service Notices', icon: 'triangle-alert', title: 'Traffic is heavier than usual.', body: 'Allow approximately 15 additional minutes on the Kampala route.', time: 'Yesterday', unread: true },
    { id: 6, category: 'Luggage', icon: 'luggage', title: 'Your luggage reference has been confirmed.', body: 'Luggage tag LUG-1842 is linked to ticket FET-884210.', time: '15 Jul', unread: false }
  ]
};

const state = {
  onboardingIndex: 0,
  authView: 'signin',
  screen: 'home',
  history: [],
  activeTrip: appData.trips[0],
  tripType: 'oneway',
  ticketType: 'oneway',
  returnMode: 'open',
  returnDate: '2026-07-21',
  bookingDate: '2026-07-18',
  searchFrom: 'Entebbe Main Stage',
  searchTo: 'Kampala Main Stage',
  searchPeriod: 'Morning',
  bookingOption: '',
  assistance: 'None required',
  passengerCount: 1,
  childCount: 0,
  passengerDetails: [{ name: 'Sarah Nabirye', phone: '+256 772 345 678', category: 'Adult passenger', assistance: 'None required', emergency: '+256 700 123 456' }],
  capacityMode: 'capacity',
  selectedSeats: [],
  luggageQuantities: { personal: 1, standard: 0, large: 0, excess: 0, fragile: 0, commercial: 0 },
  walletBalance: 32500,
  walletDepositAmount: 20000,
  paymentMethod: 'wallet',
  paymentDemoState: 'idle',
  voucherApplied: false,
  ticketStatus: 'active',
  tripTab: 'upcoming',
  walletFilter: 'all',
  notificationFilter: 'all',
  parcelStep: 1,
  parcelCategory: 'Small package',
  parcelDelivery: 'Standard Stage-to-Stage',
  parcelPaymentMethod: 'wallet',
  parcelPaymentDemoState: 'idle',
  parcel: {
    senderName: 'Sarah Nabirye',
    senderPhone: '+256 772 345 678',
    recipientName: 'David Ssemakula',
    recipientPhone: '+256 701 555 019',
    origin: 'Entebbe Main Stage',
    destination: 'Kampala Main Stage',
    description: 'Printed business documents in sealed envelope',
    weight: 'Under 1 kg',
    quantity: '1',
    declaredValue: 'UGX 50,000',
    fragile: 'No',
    instructions: 'Call recipient when the parcel reaches Kampala Main Stage.',
    dropoff: 'Today · 8:00–9:00 AM',
    departure: 'Next available vehicle'
  },
  parcelTrackingState: 'intransit',
  supportSubmitted: false,
  language: 'English',
  unreadNotifications: 5,
  routeProgress: 68,
  connected: true
};

const navItems = [
  ['home', 'Home', 'house'],
  ['book', 'Book a Trip', 'ticket-plus'],
  ['trips', 'My Trips', 'route'],
  ['returns', 'Return Tickets', 'refresh-cw'],
  ['wallet', 'Wallet', 'wallet-cards'],
  ['parcel', 'Send a Parcel', 'package-plus'],
  ['trackparcel', 'Track Parcel', 'scan-search'],
  ['luggage', 'Luggage', 'luggage'],
  ['live', 'Live Trip', 'navigation'],
  ['offers', 'Offers', 'badge-percent'],
  ['notifications', 'Notifications', 'bell'],
  ['support', 'Help and Support', 'life-buoy'],
  ['profile', 'Profile', 'user-round']
];

const screenTitles = {
  home: 'Home', book: 'Book a Trip', 'trip-details': 'Trip Details', passengers: 'Passengers & Capacity', returns: 'Return Tickets', luggage: 'Luggage', checkout: 'Checkout', success: 'Booking Confirmed', ticket: 'Digital Ticket', trips: 'My Trips', live: 'Live Trip', wallet: 'Fly Express Wallet', parcel: 'Send a Parcel', 'parcel-receipt': 'Parcel Receipt', trackparcel: 'Track Parcel', offers: 'Offers', notifications: 'Notifications', support: 'Help and Support', profile: 'Profile & Settings', about: 'About Fly Express'
};

const onboardingSlides = [
  { icon: 'ticket-check', title: 'Easy Passenger Booking', message: 'Find your route, reserve your seat, and receive a digital ticket.', chips: [['map-pinned', 'Choose route'], ['armchair', 'Reserve capacity'], ['qr-code', 'Digital ticket']] },
  { icon: 'wallet-cards', title: 'Wallet and Return Tickets', message: 'Deposit funds, pay faster, and save with discounted return travel.', chips: [['badge-percent', 'Save UGX 1,000'], ['refresh-cw', 'Open return'], ['shield-check', 'Secure preview']] },
  { icon: 'package-check', title: 'Parcels and Luggage', message: 'Send parcels, register luggage, and follow every stage of the journey.', chips: [['package-search', 'Track parcels'], ['luggage', 'Digital tags'], ['bell-ring', 'Status alerts']] }
];

function formatUGX(value) {
  if (value === null) return 'Assessed at stage';
  return `UGX ${Number(value).toLocaleString('en-US')}`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function optionMarkup(value, selectedValue, label = value) {
  return `<option value="${escapeHtml(value)}" ${value === selectedValue ? 'selected' : ''}>${escapeHtml(label)}</option>`;
}

function passengerMixLabel() {
  const adults = `${state.passengerCount} adult${state.passengerCount === 1 ? '' : 's'}`;
  const children = state.childCount ? `, ${state.childCount} child${state.childCount === 1 ? '' : 'ren'}` : '';
  return `${adults}${children}`;
}

function getSearchResults() {
  const enoughSeats = appData.trips.filter(trip => trip.seats >= passengerTotal());
  const exact = enoughSeats.filter(trip => trip.boarding === state.searchFrom && trip.destination === state.searchTo);
  if (exact.length) return exact;
  return enoughSeats.map(trip => ({ ...trip, boarding: state.searchFrom, destination: state.searchTo }));
}

function captureFocusDescriptor(root) {
  const active = document.activeElement;
  if (!active || !root?.contains(active)) return null;
  const keys = ['action', 'screen', 'value', 'seat', 'id', 'field'];
  const descriptor = {};
  keys.forEach(key => {
    if (active.dataset?.[key] !== undefined) descriptor[key] = active.dataset[key];
  });
  if (active.name) descriptor.controlName = active.name;
  if (active.value && (active.name || active.matches('input, select, textarea'))) descriptor.controlValue = active.value;
  if (active.dataset?.parcelField) descriptor.parcelField = active.dataset.parcelField;
  if (active.dataset?.passengerField) descriptor.passengerField = active.dataset.passengerField;
  if (active.dataset?.passengerIndex) descriptor.passengerIndex = active.dataset.passengerIndex;
  return Object.keys(descriptor).length ? descriptor : null;
}

function restoreDescribedFocus(root, descriptor) {
  if (!descriptor) return;
  const candidates = $$('button, input, select, textarea, [data-action], [data-screen], [data-field]', root);
  const match = candidates.find(element => Object.entries(descriptor).every(([key, value]) => {
    if (key === 'controlName') return element.name === value;
    if (key === 'controlValue') return element.value === value;
    return element.dataset?.[key] === value;
  }));
  match?.focus({ preventScroll: true });
}

function refreshIcons() {
  if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
}

function setTodayDefaults() {
  const today = new Date();
  const iso = today.toISOString().split('T')[0];
  document.documentElement.style.setProperty('--today', `'${iso}'`);
}

function init() {
  setTodayDefaults();
  renderOnboarding();
  renderNavigation();
  setTimeout(() => {
    const splash = $('#splash-screen');
    if (!splash.classList.contains('is-hidden')) showOnboarding();
  }, 2200);
  document.addEventListener('click', handleClick);
  document.addEventListener('change', handleChange);
  document.addEventListener('input', handleInput);
  document.addEventListener('submit', event => event.preventDefault());
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('scroll', handleTripReviewScroll, { passive: true });
  refreshIcons();
}

document.addEventListener('DOMContentLoaded', init);

function showOnboarding() {
  $('#splash-screen').classList.add('is-leaving');
  setTimeout(() => {
    $('#splash-screen').classList.add('is-hidden');
    $('#onboarding').classList.remove('is-hidden');
    renderOnboarding();
  }, 300);
}

function renderOnboarding() {
  const slide = onboardingSlides[state.onboardingIndex];
  const content = $('#onboarding-content');
  if (!content) return;
  content.innerHTML = `
    <article class="onboarding-slide">
      <div class="onboarding-visual" aria-hidden="true">
        <div class="onboarding-orbit">
          <div class="onboarding-vehicle-card onboarding-vehicle-card--icon">
            <div class="onboarding-icon-placeholder">
              <i data-lucide="${slide.icon}"></i>
            </div>
          </div>
          ${slide.chips.map((chip, index) => `<span class="orbit-chip orbit-chip--${['one','two','three'][index]}"><i data-lucide="${chip[0]}"></i>${chip[1]}</span>`).join('')}
        </div>
      </div>
      <p class="eyebrow">Welcome to Fly Express</p>
      <h2>${slide.title}</h2>
      <p>${slide.message}</p>
    </article>`;
  $('#onboarding-dots').innerHTML = onboardingSlides.map((_, index) => `<button class="progress-dot ${index === state.onboardingIndex ? 'is-active' : ''}" data-action="onboarding-go" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`).join('');
  const next = $('[data-action="onboarding-next"]');
  const back = $('[data-action="onboarding-back"]');
  if (next) next.textContent = state.onboardingIndex === onboardingSlides.length - 1 ? 'Get Started' : 'Next';
  if (back) back.disabled = state.onboardingIndex === 0;
  refreshIcons();
}

function showAuth(view = 'signin') {
  state.authView = view;
  $('#onboarding').classList.add('is-hidden');
  $('#splash-screen').classList.add('is-hidden');
  $('#auth-layer').classList.remove('is-hidden');
  renderAuth();
}

function renderAuth() {
  const root = $('#auth-content');
  const copy = `
    <div class="auth-copy">
      <p class="eyebrow">Travel Smart. Move Faster.</p>
      <h1>A more reliable way to travel between Entebbe and Kampala.</h1>
      <p>Preview passenger booking, digital tickets, wallet payments, return travel, luggage handling and same-corridor parcel delivery.</p>
      <div class="auth-trust">
        <div class="auth-trust-item"><span><i data-lucide="route"></i></span>Scheduled and stage-based travel</div>
        <div class="auth-trust-item"><span><i data-lucide="shield-check"></i></span>Clear booking and journey information</div>
        <div class="auth-trust-item"><span><i data-lucide="package-check"></i></span>Traceable parcels and luggage</div>
      </div>
    </div>`;

  let card = '';
  if (state.authView === 'signin') {
    card = `
      <div class="auth-card">
        <p class="eyebrow">Passenger access</p>
        <h2>Sign in to continue</h2>
        <p class="muted">Use your telephone number to preview the account journey.</p>
        <div class="field">
          <label for="signin-phone">Telephone number</label>
          <div class="input-group"><span class="input-prefix">+256</span><input id="signin-phone" inputmode="tel" value="772 345 678" aria-describedby="phone-help"></div>
          <small id="phone-help" class="field-help">Demo only. No SMS will be sent.</small>
        </div>
        <div class="button-row" style="margin-top:18px"><button class="button button--primary w-full" type="button" data-action="continue-signin">Continue</button></div>
        <button class="button button--ghost w-full" style="margin-top:10px" type="button" data-action="continue-guest"><i data-lucide="user-round"></i>Continue as Guest</button>
        <p class="center text-small" style="margin:16px 0 0">New passenger? <button class="text-button" type="button" data-action="show-registration">Create Account</button></p>
        <p class="privacy-note">By continuing, you acknowledge this is a front-end presentation prototype. It does not authenticate, store data, or contact a mobile network.</p>
      </div>`;
  } else if (state.authView === 'otp') {
    card = `
      <div class="auth-card">
        <button class="text-button" type="button" data-action="auth-back">← Back</button>
        <p class="eyebrow">Verification preview</p>
        <h2>Enter the six-digit code</h2>
        <p class="muted">A demonstration code was prepared for +256 772 345 678.</p>
        <div class="otp-grid" aria-label="One-time password">
          ${[1,2,3,4,5,6].map((n, i) => `<input class="otp-input" maxlength="1" inputmode="numeric" value="${i + 1}" aria-label="Digit ${n}">`).join('')}
        </div>
        <div class="demo-hint">Demo hint: use <strong>123456</strong>. No real code was sent.</div>
        <button class="button button--primary w-full" style="margin-top:18px" type="button" data-action="verify-otp">Verify and Continue</button>
        <div class="button-row" style="justify-content:space-between;margin-top:10px"><button class="text-button" type="button" data-action="change-number">Change number</button><button class="text-button" type="button" data-action="resend-otp">Resend in <span id="otp-countdown">30</span>s</button></div>
      </div>`;
  } else {
    card = `
      <div class="auth-card">
        <button class="text-button" type="button" data-action="auth-back">← Back</button>
        <p class="eyebrow">Passenger registration</p>
        <h2>Create account preview</h2>
        <div class="form-grid">
          <div class="field field--full"><label for="reg-name">Full name</label><input id="reg-name" value="Sarah Nabirye"></div>
          <div class="field field--full"><label for="reg-phone">Telephone number</label><input id="reg-phone" value="+256 772 345 678"></div>
          <div class="field field--full"><label for="reg-email">Email address <span class="muted">(optional)</span></label><input id="reg-email" type="email" value="sarah.nabirye@example.com"></div>
          <div class="field field--full"><label for="reg-route">Preferred route</label><select id="reg-route"><option>Entebbe to Kampala</option><option>Kampala to Entebbe</option></select></div>
          <div class="field field--full"><label for="reg-pin">Four-digit wallet PIN</label><input id="reg-pin" inputmode="numeric" maxlength="4" value="2580" type="password"></div>
        </div>
        <label class="checkbox-row" style="margin-top:14px"><input type="checkbox" checked><span>I accept the demonstration terms and conditions.</span></label>
        <button class="button button--primary w-full" style="margin-top:18px" type="button" data-action="create-account">Create Demo Account</button>
      </div>`;
  }
  root.innerHTML = `<div class="auth-grid">${copy}${card}</div>`;
  refreshIcons();
  if (state.authView === 'otp') startOtpCountdown();
}

let otpTimer;
function startOtpCountdown() {
  clearInterval(otpTimer);
  let remaining = 30;
  otpTimer = setInterval(() => {
    remaining -= 1;
    const el = $('#otp-countdown');
    if (el) el.textContent = remaining;
    if (remaining <= 0) clearInterval(otpTimer);
  }, 1000);
}

function enterApp(message = 'Welcome to the Fly Express passenger preview.') {
  clearInterval(otpTimer);
  $('#auth-layer').classList.add('is-hidden');
  $('#onboarding').classList.add('is-hidden');
  $('#app-shell').classList.remove('is-hidden');
  navigate('home', {}, false);
  toast(message, 'success');
}

function renderNavigation() {
  const desktop = $('#desktop-nav');
  const mobile = $('#mobile-nav');
  if (desktop) {
    desktop.innerHTML = navItems.map(([screen, label, icon]) => `
      <button class="nav-item ${state.screen === screen ? 'is-active' : ''}" type="button" data-screen="${screen}" ${state.screen === screen ? 'aria-current="page"' : ''}>
        <i data-lucide="${icon}"></i><span>${label}</span>${screen === 'notifications' ? `<span class="nav-count">${state.unreadNotifications}</span>` : ''}
      </button>`).join('');
  }
  if (mobile) {
    const isBookingFlow = ['trip-details', 'passengers', 'returns', 'luggage', 'checkout'].includes(state.screen);
    if (isBookingFlow) {
      mobile.classList.add('is-hidden');
    } else {
      mobile.classList.remove('is-hidden');
    }
    const items = [['home','Home','house'],['book','Book','ticket-plus'],['trips','Trips','route'],['wallet','Wallet','wallet-cards'],['more','More','menu']];
    mobile.innerHTML = items.map(([screen,label,icon]) => {
      const active = state.screen === screen || (screen === 'more' && !['home','book','trips','wallet'].includes(state.screen));
      return `
      <button class="mobile-nav-item ${active ? 'is-active' : ''}" type="button" ${screen === 'more' ? 'data-action="open-more"' : `data-screen="${screen}"`} ${active ? 'aria-current="page"' : ''}>
        <i data-lucide="${icon}"></i><span>${label}</span>${screen === 'more' && state.unreadNotifications ? `<span class="nav-count">${state.unreadNotifications}</span>` : ''}
      </button>`;
    }).join('');
  }
  refreshIcons();
}

function navigate(screen, payload = {}, pushHistory = true) {
  if (pushHistory && state.screen && state.screen !== screen) state.history.push(state.screen);
  state.screen = screen;
  Object.assign(state, payload);
  const title = screenTitles[screen] || 'Fly Express';
  $('#screen-title').textContent = title;
  $('#back-button').classList.toggle('is-hidden', ['home','book','trips','wallet','offers','notifications','support','profile'].includes(screen));
  renderNavigation();
  renderCurrentScreen(false);
  window.scrollTo({ top: 0, behavior: document.body.classList.contains('reduce-motion') ? 'auto' : 'smooth' });
  setTimeout(() => {
    const target = screen === 'success' ? $('#success-title') : $('#main-content h1') || $('#main-content');
    if (target && !target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target?.focus({ preventScroll: true });
  }, 20);
}

function goBack() {
  const previous = state.history.pop() || 'home';
  state.screen = previous;
  navigate(previous, {}, false);
}

function renderCurrentScreen(preserveFocus = true) {
  const root = $('#main-content');
  const focusDescriptor = preserveFocus ? captureFocusDescriptor(root) : null;
  destroyTripMap();
  const renderers = {
    home: renderHome, book: renderBook, 'trip-details': renderTripDetails, passengers: renderPassengers, returns: renderReturns,
    luggage: renderLuggage, checkout: renderCheckout, success: renderSuccess, ticket: renderTicket, trips: renderTrips,
    live: renderLiveTrip, wallet: renderWallet, parcel: renderParcelBooking, 'parcel-receipt': renderParcelReceipt,
    trackparcel: renderParcelTracking, offers: renderOffers, notifications: renderNotifications, support: renderSupport,
    profile: renderProfile, about: renderAbout
  };
  root.innerHTML = (renderers[state.screen] || renderHome)();
  refreshIcons();
  updateHeaderTheme();
  if (state.screen === 'trip-details') setTimeout(() => { if (state.screen === 'trip-details') initTripMap(); }, 240);
  if (state.screen === 'ticket') setTimeout(initTicketQr, 0);
  if (state.screen === 'parcel-receipt') setTimeout(initParcelBarcode, 0);
  if (focusDescriptor) setTimeout(() => restoreDescribedFocus(root, focusDescriptor), 20);
  if (state.screen === 'live') startLiveProgress(); else stopLiveProgress();
}

function screenHead(title, description, actions = '') {
  return `<header class="screen-head"><div><h1>${title}</h1><p>${description}</p></div>${actions ? `<div class="button-row">${actions}</div>` : ''}</header>`;
}

function renderHome() {
  const date = new Intl.DateTimeFormat('en-UG', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  return `
    <section class="welcome-panel">
      <div class="welcome-user"><div class="avatar" aria-hidden="true">SN</div><div><p class="eyebrow">${escapeHtml(date)}</p><h1>Good morning, Sarah</h1><p class="muted">Where are you travelling today?</p></div></div>
      <button class="wallet-shortcut" type="button" data-screen="wallet"><i data-lucide="wallet-cards"></i><div><small>Wallet balance</small><strong>${formatUGX(state.walletBalance)}</strong></div><i data-lucide="chevron-right"></i></button>
    </section>

    <section class="card card--blue booking-card" aria-labelledby="quick-book-heading">
      <div class="trip-kind"><button class="segment-button ${state.tripType === 'oneway' ? 'is-active' : ''}" type="button" data-action="trip-kind" data-value="oneway" aria-pressed="${state.tripType === 'oneway'}">One way</button><button class="segment-button ${state.tripType === 'return' ? 'is-active' : ''}" type="button" data-action="trip-kind" data-value="return" aria-pressed="${state.tripType === 'return'}">Return</button></div>
      <div class="card-head"><div><p class="section-kicker">Quick booking</p><h2 id="quick-book-heading">Find your next departure</h2></div><span class="status-chip" style="background:rgba(255,255,255,.12);color:white">Demo availability</span></div>
      <div class="booking-form-grid">
        <div class="field"><label for="home-from">From</label><select id="home-from" data-field="search-from">${appData.routes.map(route => optionMarkup(route, state.searchFrom)).join('')}</select></div>
        <button class="swap-button" type="button" data-action="swap-route" aria-label="Swap locations"><i data-lucide="arrow-left-right"></i></button>
        <div class="field"><label for="home-to">To</label><select id="home-to" data-field="search-to">${appData.routes.map(route => optionMarkup(route, state.searchTo)).join('')}</select></div>
        <div class="field"><label for="home-date">Travel date</label><input id="home-date" type="date" value="${state.bookingDate}" data-field="booking-date"></div>
        <div class="field"><label for="home-passengers">Passengers</label><select id="home-passengers" data-field="search-adults">${[1,2,3,4].map(count => optionMarkup(String(count), String(state.passengerCount), `${count} passenger${count === 1 ? '' : 's'}`)).join('')}</select></div>
        <button class="button button--gold" type="button" data-action="search-trips"><i data-lucide="search"></i>Search Trips</button>
      </div>
    </section>

    <div class="section-title"><h2>Quick actions</h2><button class="text-button" type="button" data-action="open-more">View all</button></div>
    <section class="quick-actions" aria-label="Quick actions">
      ${quickAction('Book a Seat','ticket-plus','book')}
      ${quickAction('Buy Return Ticket','refresh-cw','returns')}
      ${quickAction('Send Parcel','package-plus','parcel')}
      ${quickAction('Add Wallet Funds','circle-plus','wallet','open-add-funds')}
      ${quickAction('Track a Trip','navigation','live')}
      ${quickAction('Register Luggage','luggage','luggage')}
    </section>

    <section class="grid grid--sidebar" style="margin-top:22px">
      <div class="grid">
        <article class="card card--hover upcoming-trip">
          <div>
            <div class="card-head"><div><p class="section-kicker">Upcoming trip</p><h2>Entebbe to Kampala</h2></div><span class="status-chip status-chip--success">Confirmed</span></div>
            <div class="route-label"><div class="route-points"><span></span><i></i><span></span></div><div><strong>Entebbe Main Stage</strong><p class="muted text-small">Today · Departure 8:30 AM · Boarding 8:15 AM</p><strong>Kampala Main Stage</strong></div></div>
            <div class="trip-meta"><span><i data-lucide="bus-front"></i>UBM 245K</span><span><i data-lucide="armchair"></i>Capacity position 04</span><span><i data-lucide="ticket-check"></i>Open return included</span></div>
          </div>
          <div class="button-row"><button class="button button--primary" type="button" data-screen="ticket">View Ticket</button><button class="button button--ghost" type="button" data-screen="live">Track</button></div>
        </article>

        <article class="card card--gold">
          <div class="card-head"><div><p class="section-kicker">Return ticket offer</p><h2>Travel to Kampala and secure your return for less.</h2></div><span class="status-chip status-chip--success">Save UGX 1,000</span></div>
          <div class="promo-price"><div class="price-cell"><small>Outbound</small><strong>UGX 5,000</strong></div><div class="price-cell"><small>Return</small><strong>UGX 4,000</strong></div><div class="price-cell"><small>Package total</small><strong>UGX 9,000</strong></div><div class="price-cell"><small>Separate total</small><strong>UGX 10,000</strong></div></div>
          <button class="button button--primary" type="button" data-screen="returns">Get Return Ticket</button>
        </article>
      </div>

      <div class="grid">
        <article class="card">
          <div class="card-head"><div><p class="section-kicker">Next departures</p><h3>Entebbe Main Stage</h3></div><button class="text-button" type="button" data-screen="book">See all</button></div>
          <div class="departure-list">
            ${departureRow('8:30 AM',4,35,'4 seats available')}
            ${departureRow('9:00 AM',8,60,'8 seats available')}
            ${departureRow('9:30 AM',2,88,'Almost full')}
            ${departureRow('10:00 AM',11,45,'11 seats available')}
          </div>
        </article>
        <article class="card card--blue">
          <p class="section-kicker">Fly Express Wallet</p><div class="wallet-balance">${formatUGX(state.walletBalance)}</div><p class="muted">Plus UGX 2,000 promotional credit</p><div class="button-row"><button class="button button--gold button--small" type="button" data-action="open-add-funds">Add Funds</button><button class="button button--ghost button--small" type="button" data-screen="wallet">Transactions</button></div>
        </article>
      </div>
    </section>

    <section class="grid grid--2" style="margin-top:18px">
      <article class="card card--hover" data-screen="trackparcel" role="button" tabindex="0">
        <div class="card-head"><div><p class="section-kicker">Active parcel</p><h3>FXP-260718-0842</h3></div><span class="status-chip status-chip--info">In Transit</span></div>
        <div class="route-label"><div class="route-points"><span></span><i></i><span></span></div><div><strong>Entebbe</strong><p class="muted text-small">Estimated arrival 10:45 AM</p><strong>Kampala</strong></div></div>
      </article>
      <article class="card sponsored-card"><div><span class="sponsored-label">Sponsored</span><p class="section-kicker" style="margin-top:18px;color:var(--brand-gold)">Lakeview Business Centre</p><h3>Print, package and send business documents near Kitooro.</h3><p style="color:rgba(255,255,255,.72)">10% off document packaging for Fly Express passengers.</p></div><button class="button button--gold button--small" type="button" data-action="sponsored-details">View Offer</button></article>
    </section>

    <div class="notice" style="margin-top:18px"><i data-lucide="triangle-alert"></i><div><strong>Service notice</strong><div>Morning traffic is heavier than usual. Estimated journey times may increase by 15 minutes.</div></div></div>`;
}

function quickAction(label, icon, screen, action = '') {
  return `<button class="quick-action" type="button" ${action ? `data-action="${action}"` : `data-screen="${screen}"`}><span class="quick-action__icon"><i data-lucide="${icon}"></i></span><span>${label}</span></button>`;
}

function departureRow(time, seats, width, label) {
  return `<div class="departure-row"><span class="departure-time">${time}</span><div><div class="availability-bar"><span style="width:${width}%"></span></div><small class="muted">${label}</small></div><button class="button button--ghost button--tiny" type="button" data-action="select-departure" data-trip="${time}">Select</button></div>`;
}

function renderBook() {
  const results = getSearchResults();
  return `
    ${screenHead('Find a departure', 'Choose your stage, destination, date, passenger mix and preferred departure period.', '<button class="button button--ghost" type="button" data-action="show-search-filters"><i data-lucide="sliders-horizontal"></i>Filters</button>')}
    <section class="card">
      <div class="form-grid form-grid--3">
        <div class="field"><label for="book-from">Departure stage</label><select id="book-from" data-field="search-from">${appData.routes.map(route => optionMarkup(route, state.searchFrom)).join('')}</select></div>
        <div class="field"><label for="book-to">Destination</label><select id="book-to" data-field="search-to">${appData.routes.slice().reverse().map(route => optionMarkup(route, state.searchTo)).join('')}</select></div>
        <div class="field"><label for="book-date">Travel date</label><input id="book-date" type="date" value="${state.bookingDate}" data-field="booking-date"></div>
        <div class="field"><label for="book-period">Preferred period</label><select id="book-period" data-field="search-period">${['Morning','Afternoon','Evening'].map(period => optionMarkup(period, state.searchPeriod, `${period} · ${period === 'Morning' ? '5:00–11:59' : period === 'Afternoon' ? '12:00–4:59' : '5:00–10:00'}`)).join('')}</select></div>
        <div class="field"><label for="book-adults">Adults</label><select id="book-adults" data-field="search-adults">${[1,2,3,4].map(count => optionMarkup(String(count), String(state.passengerCount), `${count} adult${count === 1 ? '' : 's'}`)).join('')}</select></div>
        <div class="field"><label for="book-children">Children</label><select id="book-children" data-field="search-children">${[0,1,2].map(count => optionMarkup(String(count), String(state.childCount), `${count} ${count === 1 ? 'child' : 'children'}`)).join('')}</select></div>
      </div>
      <div class="choice-pills" style="margin-top:15px"><button class="choice-pill ${state.tripType === 'oneway' ? 'is-selected' : ''}" type="button" data-action="trip-kind" data-value="oneway" aria-pressed="${state.tripType === 'oneway'}">One way</button><button class="choice-pill ${state.tripType === 'return' ? 'is-selected' : ''}" type="button" data-action="trip-kind" data-value="return" aria-pressed="${state.tripType === 'return'}">Return trip</button><button class="choice-pill" type="button" data-action="search-anytime">Any departure time</button></div>
      <div class="button-row button-row--end" style="margin-top:18px"><button class="button button--primary" type="button" data-action="search-trips"><i data-lucide="search"></i>Search Available Trips</button></div>
    </section>

    <div class="search-summary" style="margin-top:18px"><span><i data-lucide="map-pin"></i>${escapeHtml(state.searchFrom)}</span><span><i data-lucide="arrow-right"></i>${escapeHtml(state.searchTo)}</span><span><i data-lucide="calendar-days"></i>${formatDemoDate(state.bookingDate)}</span><span><i data-lucide="users"></i>${passengerMixLabel()}</span></div>
    <div class="section-title"><h2>${results.length} departure${results.length === 1 ? '' : 's'} found</h2><span class="muted text-small">Fares are demonstration values</span></div>
    <section class="grid">
      ${results.length ? results.map(renderTripResult).join('') : emptyState('calendar-x-2','No departures have enough space','Try a smaller passenger group or another route.')}
    </section>`;
}

function renderTripResult(trip) {
  return `<article class="card card--hover result-card taxi-result-card">
    <div class="taxi-result-body">
      <div class="taxi-van-visual">
        <img src="assets/fly-express-van.png" alt="Fly Express Van" class="taxi-van-img">
        <span class="van-plate-tag">${trip.plate}</span>
      </div>
      <div class="taxi-details">
        <div class="taxi-driver-info">
          <strong>${trip.driverName}</strong>
          <span class="driver-rating-tag">${trip.driverRating} ★</span>
          <span class="driver-phone-small">${trip.driverPhone}</span>
        </div>
        <div class="taxi-proximity-info">
          <span class="proximity-countdown"><i data-lucide="clock"></i> ${trip.countdown}</span>
          <span class="proximity-status">${trip.currentStage} · ${trip.vansAtStage} vans at stage</span>
        </div>
      </div>
    </div>
    <div class="taxi-result-route-preview">
      <strong>${trip.depart}</strong>
      <span>${trip.duration} · ${trip.traffic} traffic</span>
      <div style="margin-top:4px"><span class="status-chip ${trip.seats <= 2 ? 'status-chip--warning' : 'status-chip--success'}">${trip.seats} seats left</span></div>
    </div>
    <div class="taxi-result-actions">
      <div class="taxi-price-tag">
        <span class="muted text-small">${state.ticketType === 'return' ? 'Return package' : 'One way'}</span>
        <strong>${formatUGX((state.ticketType === 'return' ? 9000 : trip.fare) * passengerTotal())}</strong>
      </div>
      <button class="button button--primary button--small" type="button" data-action="choose-trip" data-trip-id="${trip.id}">View & Book</button>
    </div>
  </article>`;
}

function renderTripDetails() {
  const trip = state.activeTrip;
  const bookingDate = new Date(`${state.bookingDate}T12:00:00`);
  const reviewDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(bookingDate);
  const returnSummary = state.ticketType === 'return' ? `${state.returnMode === 'date-specific' ? 'Date-specific' : state.returnMode.replace('-', ' ')} · Added` : 'Not added';
  const seatSummary = state.capacityMode === 'seats' ? (state.selectedSeats.join(', ') || 'Choose seats') : 'Best available';

  return `<section class="smart-review" aria-labelledby="review-title">
    <div class="smart-review__map-card">
      <div class="smart-review__map-copy"><p class="eyebrow">${reviewDate}</p><h1 id="review-title">Review your trip</h1><p>You’re almost ready to travel.</p></div>
      <div id="trip-review-map" class="trip-review-map" aria-label="OpenStreetMap preview from ${trip.boarding} to ${trip.destination}"></div>
      <div id="trip-map-fallback" class="trip-map-fallback" hidden><img src="assets/fly-express-van.png" alt=""><strong>Map preview unavailable</strong><span>Your selected route is still ready.</span></div>
    </div>
    <div class="smart-review__sheet">
      <div class="sheet-handle" aria-hidden="true"></div>
      
      <!-- Driver Profile Card -->
      <article class="card driver-profile-card">
        <div class="driver-profile-header">
          <div class="driver-avatar">${trip.driverName.split(' ').map(n=>n[0]).join('')}</div>
          <div class="driver-meta">
            <span class="eyebrow">Your Driver</span>
            <h2>${trip.driverName}</h2>
            <div class="driver-rating"><i data-lucide="star" class="star-icon" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> <strong>${trip.driverRating} Rating</strong></div>
          </div>
          <a class="driver-phone-btn button button--primary button--small" href="tel:${trip.driverPhone}" aria-label="Call Driver"><i data-lucide="phone"></i>Call</a>
        </div>
      </article>

      <!-- Vehicle and Transit Details Card -->
      <article class="card transit-status-card">
        <div class="transit-info-grid">
          <div class="transit-van-visual">
            <img src="assets/fly-express-van.png" alt="Fly Express Van" class="transit-van-img">
            <span class="van-plate-tag">${trip.plate}</span>
          </div>
          <div class="transit-details">
            <p class="section-kicker">${trip.vehicle}</p>
            <h3>Transit & Proximity Status</h3>
            <div class="transit-locations">
              <div class="transit-stage">
                <span class="stage-label">From:</span> <strong>${trip.comingFrom}</strong>
              </div>
              <div class="transit-stage">
                <span class="stage-label">Current:</span> <strong class="text-success">${trip.currentStage}</strong>
              </div>
              <div class="transit-stage">
                <span class="stage-label">Heading to:</span> <strong>${trip.headingTo}</strong>
              </div>
            </div>
            <div class="transit-countdown-banner">
              <i data-lucide="clock"></i> <strong>${trip.countdown}</strong>
            </div>
            <p class="proximity-summary">
              Proximity: ${trip.vansAtStage} vans currently waiting at stage, ${trip.vansApproaching} on the road approaching.
            </p>
          </div>
        </div>
      </article>

      <div class="review-route-row"><div><span class="review-route-icon review-route-icon--from"><i data-lucide="map-pin"></i></span><span><small>From</small><strong>${trip.boarding}</strong></span></div><span class="review-swap"><i data-lucide="arrow-left-right"></i></span><div><span><small>To</small><strong>${trip.destination}</strong></span><span class="review-route-icon review-route-icon--to"><i data-lucide="map-pin"></i></span></div></div>
      <div class="review-date-row"><span class="review-date-icon"><i data-lucide="calendar-days"></i></span><span><small>Date</small><strong>${reviewDate}</strong></span><button class="text-button" type="button" data-screen="book">Change</button></div>
      <div class="review-section-label">Selected departure</div>
      <article class="review-departure"><div class="review-departure__time"><strong>${trip.depart.replace(' AM','').replace(' PM','')}</strong><span>${trip.depart.includes('AM') ? 'AM' : 'PM'}</span></div><div class="review-departure__service"><span class="review-vehicle-icon"><i data-lucide="bus-front"></i></span><span><strong>${trip.vehicle}</strong><small>${trip.duration} · ${trip.traffic} traffic · ${trip.plate}</small></span></div><div class="review-departure__price"><span>${trip.seats} seats left</span><strong>${formatUGX(trip.fare)}</strong></div><span class="review-check"><i data-lucide="check"></i></span></article>
      
      <div class="review-section-label review-section-label--options">Make it yours <span>Only open what you need</span></div>
      <div class="booking-accordions">
        ${bookingAccordion('return','refresh-cw','Return trip',returnSummary,reviewReturnOptions())}
        ${bookingAccordion('passengers','users-round','Passengers',`${state.passengerCount} adult${state.passengerCount === 1 ? '' : 's'}${state.childCount ? `, ${state.childCount} child${state.childCount === 1 ? '' : 'ren'}` : ''}`,reviewPassengerOptions())}
        ${bookingAccordion('assistance','headphones','Assistance & language',`${state.assistance} · ${state.language}`,reviewAssistanceOptions())}
        ${bookingAccordion('luggage','luggage','Luggage',luggageSummary(),reviewLuggageOptions())}
        ${bookingAccordion('seats','armchair','Seat preference',seatSummary,reviewSeatOptions())}
      </div>
      <div class="review-reassurance"><i data-lucide="shield-check"></i><span>Personal item included</span><span>•</span><span>Change anything before payment.</span></div>
    </div>
  </section>
  <div class="review-sticky-cta">
    <button class="return-quick-toggle ${state.ticketType === 'return' ? 'is-on' : ''}" type="button" data-action="quick-return-toggle" aria-pressed="${state.ticketType === 'return'}"><span class="return-quick-toggle__icon"><i data-lucide="refresh-cw"></i></span><span><small>Return</small><strong>${state.ticketType === 'return' ? 'Added' : 'Add'}</strong></span><span class="switch ${state.ticketType === 'return' ? 'is-on' : ''}" aria-hidden="true"><span></span></span></button>
    <button class="button button--primary review-pay-button" type="button" data-action="continue-to-checkout"><span>Continue</span><strong>${formatUGX(tripReviewFare())}</strong><i data-lucide="arrow-right"></i></button>
  </div>`;
}

function renderPassengers() {
  const passengerCards = Array.from({ length: state.passengerCount + state.childCount }, (_, index) => {
    const isChild = index >= state.passengerCount;
    if (!state.passengerDetails[index]) {
      state.passengerDetails[index] = { name: isChild ? 'Amina Nabirye' : '', phone: '', category: isChild ? 'Child passenger' : 'Adult passenger', assistance: 'None required', emergency: '+256 700 123 456' };
    }
    const passenger = state.passengerDetails[index];
    return `<article class="card passenger-card">
      <div class="card-head"><div style="display:flex;align-items:center;gap:10px"><span class="passenger-card__number">${index + 1}</span><div><h3>${isChild ? 'Child passenger' : `Passenger ${index + 1}`}</h3><span class="muted text-small">${isChild ? 'Child category' : index === 0 ? 'Primary passenger' : 'Adult passenger'}</span></div></div><span class="status-chip status-chip--info">${isChild ? 'Child' : 'Adult'}</span></div>
      <div class="form-grid">
        <div class="field"><label for="passenger-name-${index}">Full name</label><input id="passenger-name-${index}" data-passenger-index="${index}" data-passenger-field="name" value="${escapeHtml(passenger.name)}" placeholder="Passenger name"></div>
        <div class="field"><label for="passenger-phone-${index}">Telephone number</label><input id="passenger-phone-${index}" data-passenger-index="${index}" data-passenger-field="phone" value="${escapeHtml(passenger.phone)}" placeholder="+256 ..."></div>
        <div class="field"><label for="passenger-category-${index}">Passenger category</label><select id="passenger-category-${index}" data-passenger-index="${index}" data-passenger-field="category">${[isChild ? 'Child passenger' : 'Adult passenger','Senior passenger','Passenger with disability'].map(value => optionMarkup(value, passenger.category)).join('')}</select></div>
        <div class="field"><label for="passenger-assistance-${index}">Special assistance</label><select id="passenger-assistance-${index}" data-passenger-index="${index}" data-passenger-field="assistance">${['None required','Boarding assistance','Priority seating','Mobility support'].map(value => optionMarkup(value, passenger.assistance)).join('')}</select></div>
        <div class="field field--full"><label for="passenger-emergency-${index}">Emergency contact</label><input id="passenger-emergency-${index}" data-passenger-index="${index}" data-passenger-field="emergency" value="${escapeHtml(passenger.emergency)}"></div>
      </div>
    </article>`;
  }).join('');

  return `
    ${screenHead('Passengers and capacity', 'Choose Fly Express capacity reservation or preview an individually numbered seating layout.')}
    <section class="grid grid--sidebar">
      <div class="grid">
        <article class="card">
          <div class="card-head"><div><p class="section-kicker">Reservation mode</p><h2>How should capacity be demonstrated?</h2></div><span class="status-chip status-chip--info">Prototype choice</span></div>
          <div class="mode-switch"><button class="${state.capacityMode === 'capacity' ? 'is-active' : ''}" type="button" data-action="capacity-mode" data-value="capacity" aria-pressed="${state.capacityMode === 'capacity'}">Reserved Capacity</button><button class="${state.capacityMode === 'seats' ? 'is-active' : ''}" type="button" data-action="capacity-mode" data-value="seats" aria-pressed="${state.capacityMode === 'seats'}">Seat Selection</button></div>
          ${state.capacityMode === 'capacity' ? renderCapacityMode() : renderSeatMode()}
        </article>
        <div class="section-title"><h2>Passenger details</h2><div class="button-row"><button class="button button--ghost button--small" type="button" data-action="add-adult"><i data-lucide="user-plus"></i>Add Adult</button><button class="button button--ghost button--small" type="button" data-action="add-child"><i data-lucide="baby"></i>Add Child</button></div></div>
        ${passengerCards}
      </div>
      <aside class="grid">
        <article class="card"><p class="section-kicker">Booking summary</p><div class="detail-list"><div class="detail-row"><span>Adults</span><strong>${state.passengerCount}</strong></div><div class="detail-row"><span>Children</span><strong>${state.childCount}</strong></div><div class="detail-row"><span>Reserved capacity</span><strong>${state.passengerCount + state.childCount}</strong></div><div class="detail-row"><span>Reference</span><strong>${state.capacityMode === 'seats' ? state.selectedSeats.join(', ') || 'Not selected' : 'Position 04'}</strong></div></div></article>
        <article class="card card--soft"><h3>Passenger privacy</h3><p class="muted text-small">These details remain only in browser memory for this session and reset when the page refreshes.</p></article>
        <div class="floating-cta-container">
          <button class="button button--primary w-full" type="button" data-screen="returns">Continue to Ticket Type</button>
        </div>
      </aside>
    </section>`;
}

function renderCapacityMode() {
  return `<div class="grid grid--2">
    <div><div class="capacity-number"><strong>${state.passengerCount + state.childCount}</strong><span class="muted">passenger${state.passengerCount + state.childCount === 1 ? '' : 's'} reserved</span></div><p class="muted">Guaranteed boarding capacity without an individually assigned seat number.</p><div class="choice-pills"><button class="choice-pill" type="button" data-action="decrease-passengers">− Passenger</button><button class="choice-pill is-selected" type="button">Position 04</button><button class="choice-pill" type="button" data-action="add-adult">+ Passenger</button></div></div>
    <div class="occupancy"><div class="card-head"><strong>Vehicle occupancy</strong><span>12 of 18 reserved</span></div><div class="occupancy-bar"><span></span></div><div class="detail-row"><span>Remaining capacity</span><strong>6 passengers</strong></div><div class="detail-row"><span>Boarding guarantee</span><strong class="text-success">Confirmed</strong></div></div>
  </div>`;
}

function renderSeatMode() {
  const occupied = ['1A','1B','2A','2D','3B','4A'];
  const priority = ['1C','1D'];
  const seats = ['1A','1B','1C','1D','2A','2B','2C','2D','3A','3B','3C','3D','4A','4B','4C','4D'];
  return `<div class="vehicle-layout"><div class="vehicle-front"><div class="driver-seat"><i data-lucide="gauge"></i>Driver</div><div class="entrance"><i data-lucide="door-open"></i>Entrance</div></div><div class="seat-grid">${seats.map(seat => `<button class="seat ${occupied.includes(seat) ? 'is-occupied' : ''} ${priority.includes(seat) ? 'is-priority' : ''} ${state.selectedSeats.includes(seat) ? 'is-selected' : ''}" type="button" data-action="toggle-seat" data-seat="${seat}" ${occupied.includes(seat) ? 'disabled aria-label="Occupied seat '+seat+'"' : `aria-label="Select seat ${seat}"`}>${seat}</button>`).join('')}</div><div class="seat-legend"><span><i class="legend-box"></i>Available</span><span><i class="legend-box legend-box--selected"></i>Selected</span><span><i class="legend-box legend-box--occupied"></i>Occupied</span><span><i class="legend-box legend-box--priority"></i>Priority</span></div></div>`;
}

function renderReturns() {
  const expiry = '21 July 2026, 10:00 PM';
  return `
    ${screenHead('Choose your ticket type', 'Compare a standard one-way booking with Fly Express discounted return travel.')}
    <section class="grid grid--2">
      <article class="card card--hover ticket-option ${state.ticketType === 'oneway' ? 'is-selected' : ''}" data-action="select-ticket-type" data-value="oneway" role="button" tabindex="0">
        <span class="ticket-option__badge status-chip status-chip--info">Simple trip</span><p class="section-kicker">One-way ticket</p><h2>Entebbe to Kampala</h2><div class="ticket-option__price">UGX 5,000</div><p class="muted">Valid for the selected departure only.</p><ul><li>Selected departure: 8:30 AM</li><li>Digital ticket and booking reference</li><li>Optional paid luggage registration</li></ul><button class="button button--ghost" type="button" data-action="select-ticket-type" data-value="oneway">Choose One Way</button>
      </article>
      <article class="card card--hover ticket-option ${state.ticketType === 'return' ? 'is-selected' : ''}" data-action="select-ticket-type" data-value="return" role="button" tabindex="0">
        <span class="ticket-option__badge status-chip status-chip--success">Best value</span><p class="section-kicker">Discounted return ticket</p><h2>Entebbe ⇄ Kampala</h2><div class="ticket-option__price">UGX 9,000</div><div class="savings-banner"><i data-lucide="badge-percent"></i>Passenger saves UGX 1,000</div><ul><li>Outbound value: UGX 5,000</li><li>Return journey value: UGX 4,000</li><li>Return reminder before expiry</li></ul><button class="button button--primary" type="button" data-action="select-ticket-type" data-value="return">Choose Return Package</button>
      </article>
    </section>

    <section class="card" style="margin-top:18px">
      <div class="card-head"><div><p class="section-kicker">Return flexibility</p><h2>Select how the return should work</h2></div><span class="status-chip status-chip--warning">Demo conditions</span></div>
      <div class="grid grid--4">
        ${returnOption('same-day','Same-day return','Return on an eligible departure today.','calendar-check')}
        ${returnOption('date-specific','Date-specific','Reserve a return date now.','calendar-days')}
        ${returnOption('open','Open return','Choose an eligible departure later.','calendar-range')}
        ${returnOption('promotional','Promotional return','Limited campaign validity applies.','sparkles')}
      </div>
      <div class="notice" style="margin-top:16px"><i data-lucide="clock-3"></i><div><strong>${state.returnMode === 'open' ? 'Use your return ticket on an eligible departure before the expiry date.' : 'Your selected return conditions will appear on the ticket.'}</strong><div>Simulated expiry: ${expiry}. A reminder will appear three days before expiry.</div></div></div>
      <div class="floating-cta-container">
        <button class="button button--primary w-full" type="button" data-screen="luggage">Continue to Luggage</button>
      </div>
    </section>`;
}

function returnOption(value, title, copy, icon) {
  return `<button class="card card--compact card--hover ${state.returnMode === value ? 'ticket-option is-selected' : ''}" style="text-align:left;cursor:pointer" type="button" data-action="return-mode" data-value="${value}" aria-pressed="${state.returnMode === value}"><span class="quick-action__icon"><i data-lucide="${icon}"></i></span><h3 style="margin:10px 0 5px">${title}</h3><span class="muted text-small">${copy}</span></button>`;
}

function luggageTotal() {
  return appData.luggage.reduce((sum, item) => sum + (item.price || 0) * (state.luggageQuantities[item.id] || 0), 0);
}

function renderLuggage() {
  const total = luggageTotal();
  return `
    ${screenHead('Register luggage', 'Declare luggage before checkout to receive a clear charge and a digital luggage reference.', '<button class="button button--ghost" type="button" data-action="no-luggage">No Additional Luggage</button>')}
    <section class="grid grid--sidebar">
      <div class="card">
        <div class="card-head"><div><p class="section-kicker">Luggage categories</p><h2>What are you bringing?</h2></div><span class="status-chip status-chip--info">Small item free</span></div>
        <div class="luggage-list">
          ${appData.luggage.map(item => `<div class="luggage-item"><div class="luggage-icon"><i data-lucide="${item.icon}"></i></div><div class="luggage-item__copy"><strong>${item.name}</strong><span>${item.desc} · ${item.guide}</span></div><div class="luggage-price">${formatUGX(item.price)}</div><div class="stepper"><button type="button" data-action="luggage-minus" data-id="${item.id}" aria-label="Remove ${item.name}">−</button><span>${state.luggageQuantities[item.id] || 0}</span><button type="button" data-action="luggage-plus" data-id="${item.id}" aria-label="Add ${item.name}">+</button></div></div>`).join('')}
        </div>
      </div>
      <aside class="grid">
        <article class="luggage-tag"><p class="section-kicker" style="color:var(--brand-gold)">Digital luggage tag preview</p><h2>LUG-1842</h2><div class="detail-list"><div class="detail-row"><span>Passenger</span><strong>${escapeHtml(state.passengerDetails[0]?.name || appData.passenger.name)}</strong></div><div class="detail-row"><span>Ticket</span><strong>FET-884210</strong></div><div class="detail-row"><span>Vehicle</span><strong>${state.activeTrip.plate}</strong></div><div class="detail-row"><span>Items</span><strong>${Object.values(state.luggageQuantities).reduce((a,b) => a+b,0)}</strong></div></div></article>
        <article class="card"><p class="section-kicker">Luggage total</p><div class="wallet-balance">${formatUGX(total)}</div><p class="muted">Commercial luggage is assessed by an authorized stage agent.</p><div class="notice"><i data-lucide="shield-alert"></i><div>Label fragile items clearly and keep valuables with you.</div></div></article>
        <div class="floating-cta-container">
          <button class="button button--primary w-full" type="button" data-screen="checkout">Continue to Checkout</button>
        </div>
      </aside>
    </section>`;
}

function checkoutBaseFare() {
  return (state.ticketType === 'return' ? 9000 : 5000) * passengerTotal();
}

function checkoutTotal() {
  return Math.max(0, checkoutBaseFare() + luggageTotal() - (state.voucherApplied ? 2000 : 0));
}

function renderCheckout() {
  const total = checkoutTotal();
  const walletRemaining = state.walletBalance - total;
  return `
    ${screenHead('Checkout and payment preview', 'Review the service total and choose a simulated payment method. No money will be processed.')}
    <section class="grid grid--sidebar">
      <div class="grid">
        <article class="card">
          <div class="card-head"><div><p class="section-kicker">Payment method</p><h2>How would you like to pay?</h2></div><span class="status-chip status-chip--warning">Demo only</span></div>
          <div class="radio-cards">
            ${paymentChoice('wallet','Fly Express Wallet',`Available balance: ${formatUGX(state.walletBalance)}`,'wallet-cards')}
            ${paymentChoice('mtn','MTN Mobile Money','Simulated mobile-money authorization','smartphone')}
            ${paymentChoice('airtel','Airtel Money','Simulated mobile-money authorization','smartphone')}
            ${paymentChoice('cash','Cash at Stage','Pay the dispatcher before boarding','banknote')}
            ${paymentChoice('corporate','Corporate Travel Account','For approved business travellers','building-2')}
            ${paymentChoice('voucher','Promotional Voucher','Apply an eligible campaign code','ticket-percent')}
          </div>
          ${renderPaymentPanel(total, walletRemaining)}
        </article>
        <article class="card card--soft"><label class="checkbox-row"><input id="booking-conditions" type="checkbox" checked><span><strong>I accept the booking conditions.</strong><br><span class="muted text-small">This confirms only a presentation-state booking and does not create a real reservation.</span></span></label></article>
      </div>
      <aside class="card checkout-summary">
        <p class="section-kicker">Order summary</p><h2>${state.activeTrip.boarding} to ${state.activeTrip.destination}</h2>
        <div class="detail-list"><div class="detail-row"><span>Travel date</span><strong>${formatDemoDate(state.bookingDate)} · ${state.activeTrip.depart}</strong></div><div class="detail-row"><span>Ticket type</span><strong>${state.ticketType === 'return' ? `${state.returnMode.replace('-', ' ')} return` : 'One way'}</strong></div><div class="detail-row"><span>Passenger count</span><strong>${passengerTotal()}</strong></div><div class="detail-row"><span>Seat preference</span><strong>${state.capacityMode === 'seats' ? (state.selectedSeats.join(', ') || 'Choose seats') : 'Best available'} <button class="text-button" type="button" data-action="change-seats-checkout">Change</button></strong></div><div class="detail-row"><span>Ticket fare</span><strong>${formatUGX(checkoutBaseFare())}</strong></div><div class="detail-row"><span>Return saving</span><strong class="text-success">${state.ticketType === 'return' ? `− ${formatUGX(1000 * passengerTotal())}` : 'Not applied'}</strong></div><div class="detail-row"><span>Luggage charges</span><strong>${formatUGX(luggageTotal())}${state.luggageQuantities.commercial ? ' + stage assessment' : ''}</strong></div><div class="detail-row"><span>Voucher discount</span><strong class="text-success">${state.voucherApplied ? '− UGX 2,000' : 'Not applied'}</strong></div><div class="detail-row"><span>Service fee</span><strong>Included</strong></div></div>
        <div class="total-row"><strong>Final total</strong><strong>${formatUGX(total)}</strong></div>
        <div class="floating-cta-container">
          <button class="button button--red w-full" type="button" data-action="confirm-booking"><i data-lucide="shield-check"></i>Confirm Demo Booking</button>
        </div>
        <p class="privacy-note center">No backend, gateway, mobile-money service or database will be contacted.</p>
      </aside>
    </section>`;
}

function paymentChoice(value, title, copy, icon) {
  return `<label class="radio-card ${state.paymentMethod === value ? 'is-selected' : ''}"><input type="radio" name="payment-method" value="${value}" ${state.paymentMethod === value ? 'checked' : ''}><span class="radio-card__icon"><i data-lucide="${icon}"></i></span><span class="radio-card__body"><strong>${title}</strong><span>${copy}</span></span></label>`;
}

function renderPaymentPanel(total, walletRemaining) {
  if (state.paymentMethod === 'wallet') {
    return `<div class="payment-panel"><div class="grid grid--3"><div><span class="muted text-small">Current balance</span><strong>${formatUGX(state.walletBalance)}</strong></div><div><span class="muted text-small">Amount due</span><strong>${formatUGX(total)}</strong></div><div><span class="muted text-small">Remaining balance</span><strong class="${walletRemaining < 0 ? 'text-danger' : 'text-success'}">${formatUGX(walletRemaining)}</strong></div></div><div class="field" style="margin-top:13px"><label for="wallet-pin">Wallet PIN</label><input id="wallet-pin" type="password" inputmode="numeric" maxlength="4" value="2580"><span class="field-help">Any four digits are accepted in this preview.</span></div></div>`;
  }
  if (state.paymentMethod === 'mtn' || state.paymentMethod === 'airtel') {
    const network = state.paymentMethod === 'mtn' ? 'MTN Mobile Money' : 'Airtel Money';
    if (state.paymentDemoState === 'pending') return paymentState('pending','Authorization pending',`A simulated ${network} prompt is awaiting approval.`);
    if (state.paymentDemoState === 'success') return paymentState('success','Authorization successful','The mockup payment state has been approved.');
    if (state.paymentDemoState === 'failed') return paymentState('failed','Authorization failed','The demonstration request was declined. Try another state.');
    return `<div class="payment-panel"><div class="form-grid"><div class="field"><label>Network</label><input value="${network}" disabled></div><div class="field"><label>Telephone number</label><input value="+256 772 345 678"></div></div><div class="button-row" style="margin-top:13px"><button class="button button--secondary button--small" type="button" data-action="payment-state" data-value="pending">Simulate Pending</button><button class="button button--success button--small" type="button" data-action="payment-state" data-value="success">Simulate Success</button><button class="button button--soft-red button--small" type="button" data-action="payment-state" data-value="failed">Simulate Failure</button></div></div>`;
  }
  if (state.paymentMethod === 'cash') return `<div class="payment-panel"><div class="notice"><i data-lucide="clock-3"></i><div><strong>Reservation held for 15 demonstration minutes.</strong><div>Pay the dispatcher before boarding. Booking reference FX-260718-1842 will show Payment Pending until confirmed.</div></div></div></div>`;
  if (state.paymentMethod === 'corporate') return `<div class="payment-panel"><div class="field"><label for="corporate-reference">Corporate account reference</label><input id="corporate-reference" value="FETA-CORP-DEMO-24"></div><p class="muted text-small">The account will be shown as awaiting corporate approval.</p></div>`;
  return `<div class="payment-panel"><div class="field"><label for="voucher-code">Promotional voucher</label><input id="voucher-code" value="${state.voucherApplied ? 'FLY2000' : ''}" placeholder="Enter FLY2000"></div><button class="button button--secondary button--small" style="margin-top:10px" type="button" data-action="apply-voucher">Apply Demo Voucher</button><p class="muted text-small" style="margin-top:10px">A voucher reduces the total; choose another method to pay the balance.</p></div>`;
}

function paymentState(type, title, copy) {
  const icon = type === 'pending' ? 'loader-circle' : type === 'success' ? 'circle-check-big' : 'circle-x';
  return `<div class="payment-panel payment-state"><div class="payment-state__icon payment-state__icon--${type}"><i data-lucide="${icon}"></i></div><h3>${title}</h3><p class="muted">${copy}</p><button class="button button--ghost button--small" type="button" data-action="payment-reset">Reset State</button></div>`;
}

function renderSuccess() {
  const paid = state.paymentMethod === 'cash' ? 'Payment Pending' : 'Paid';
  return `<section class="success-screen">
    <div class="success-check"><i data-lucide="check"></i></div>
    <p class="eyebrow">Booking successful</p><h1>Your trip is reserved</h1><p class="muted">A presentation booking has been created in browser memory only.</p>
    <div class="booking-reference"><i data-lucide="copy"></i>FX-260718-1842</div>
    <article class="card" style="text-align:left"><div class="detail-list"><div class="detail-row"><span>Route</span><strong>Entebbe Main Stage → Kampala Main Stage</strong></div><div class="detail-row"><span>Departure</span><strong>18 Jul 2026 · 8:30 AM</strong></div><div class="detail-row"><span>Boarding stage</span><strong>Entebbe Main Stage</strong></div><div class="detail-row"><span>Passengers</span><strong>${state.passengerCount + state.childCount}</strong></div><div class="detail-row"><span>Amount</span><strong>${formatUGX(checkoutTotal())}</strong></div><div class="detail-row"><span>Payment method</span><strong>${paymentLabel()}</strong></div><div class="detail-row"><span>Payment status</span><strong class="${paid === 'Paid' ? 'text-success' : ''}">${paid}</strong></div></div></article>
    <div class="button-row" style="justify-content:center;margin-top:18px"><button class="button button--primary" type="button" data-screen="ticket"><i data-lucide="ticket-check"></i>View Ticket</button><button class="button button--ghost" type="button" data-action="calendar-demo"><i data-lucide="calendar-plus"></i>Add to Calendar</button><button class="button button--ghost" type="button" data-action="share-demo"><i data-lucide="share-2"></i>Share Ticket</button><button class="button button--ghost" type="button" data-screen="home">Return Home</button></div>
  </section>`;
}

function paymentLabel(method = state.paymentMethod) {
  return ({ wallet: 'Fly Express Wallet', mtn: 'MTN Mobile Money', airtel: 'Airtel Money', cash: 'Cash at Stage', corporate: 'Corporate Travel Account', voucher: 'Promotional Voucher' })[method] || 'Demo Payment';
}

function renderTicket() {
  const status = state.paymentMethod === 'cash' ? 'Payment Pending' : 'Active';
  return `
    ${screenHead('Digital passenger ticket', 'Present the QR-style visual or six-digit verification code when boarding.', '<button class="button button--ghost" type="button" data-action="ticket-states"><i data-lucide="layers-3"></i>Preview States</button>')}
    <article class="digital-ticket">
      <header class="ticket-header"><div class="ticket-brand"><div class="logo-frame logo-frame--ticket"><img src="assets/fly-express-logo.jpg" alt="Fly Express logo"></div><div><h2>Fly Express</h2><p>Passenger Digital Ticket</p></div></div><span class="status-chip ${status === 'Active' ? 'status-chip--success' : 'status-chip--warning'}">${status}</span></header>
      <div class="ticket-body">
        <div class="ticket-route"><div class="ticket-route__place"><span>FROM</span><strong>Entebbe</strong><span>Main Stage</span></div><div class="ticket-route__arrow"><i data-lucide="arrow-right"></i></div><div class="ticket-route__place"><span>TO</span><strong>Kampala</strong><span>Main Stage</span></div></div>
        <div class="ticket-grid">
          ${ticketField('Passenger','Sarah Nabirye')}${ticketField('Booking reference','FX-260718-1842')}${ticketField('Ticket number','FET-884210')}${ticketField('Travel date','18 July 2026')}${ticketField('Departure','8:30 AM')}${ticketField('Boarding time','8:15 AM')}${ticketField('Vehicle','UBM 245K')}${ticketField('Ticket type',state.ticketType === 'return' ? 'Open Return' : 'One Way')}${ticketField('Passengers',String(state.passengerCount + state.childCount))}${ticketField('Capacity reference',state.capacityMode === 'seats' ? state.selectedSeats.join(', ') : 'Position 04')}${ticketField('Payment status',state.paymentMethod === 'cash' ? 'Pending' : 'Paid')}${ticketField('Fare paid',formatUGX(checkoutTotal()))}${ticketField('Luggage',luggageTotal() ? `LUG-1842 · ${formatUGX(luggageTotal())}` : 'Small item only')}${ticketField('Validity','Until boarding / return expiry')}${ticketField('Return expiry',state.ticketType === 'return' ? '21 Jul 2026 · 10 PM' : 'Not applicable')}
        </div>
        <div class="ticket-code-area"><div class="qr-code" aria-label="Decorative QR-style ticket code">${generateQr()}</div><div><p class="section-kicker">Verification code</p><div class="verification-code">482 915</div><p class="muted text-small">This code and QR visual are non-scannable demonstration elements.</p></div></div>
      </div>
      <div class="ticket-perforation"></div>
      <footer class="ticket-actions"><button class="button button--primary button--small" type="button" data-action="download-demo"><i data-lucide="download"></i>Download Ticket</button><button class="button button--ghost button--small" type="button" data-action="share-demo"><i data-lucide="share-2"></i>Share</button><button class="button button--ghost button--small" type="button" data-screen="live"><i data-lucide="route"></i>View Route</button><button class="button button--ghost button--small" type="button" data-screen="support"><i data-lucide="headphones"></i>Support</button><button class="button button--soft-red button--small" type="button" data-action="cancel-booking"><i data-lucide="x"></i>Cancel Booking</button></footer>
    </article>`;
}

function ticketField(label, value) { return `<div class="ticket-field"><span>${label}</span><strong>${value}</strong></div>`; }
function generateQr() {
  const filled = new Set([0,1,2,3,4,5,6,7,8,9,13,17,18,20,22,24,26,27,28,29,30,31,32,33,34,36,38,40,42,44,46,48,50,52,54,55,57,58,59,60,62,64,66,68,70,72,73,74,75,76,77,78,79,80]);
  return Array.from({length:81}, (_, i) => `<span style="opacity:${filled.has(i) ? 1 : 0}"></span>`).join('');
}

function renderTrips() {
  return `
    ${screenHead('My Trips', 'View upcoming, completed and cancelled passenger journeys.', '<button class="button button--primary" type="button" data-screen="book"><i data-lucide="plus"></i>Book a Trip</button>')}
    <div class="tabs" role="tablist"><button class="tab ${state.tripTab === 'upcoming' ? 'is-active' : ''}" type="button" data-action="trip-tab" data-value="upcoming">Upcoming</button><button class="tab ${state.tripTab === 'completed' ? 'is-active' : ''}" type="button" data-action="trip-tab" data-value="completed">Completed</button><button class="tab ${state.tripTab === 'cancelled' ? 'is-active' : ''}" type="button" data-action="trip-tab" data-value="cancelled">Cancelled</button></div>
    <section class="trip-list" style="margin-top:16px">${renderTripTabContent()}</section>`;
}

function renderTripTabContent() {
  if (state.tripTab === 'upcoming') {
    const date = new Date(`${state.bookingDate}T12:00:00`);
    const day = String(date.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date).toUpperCase();
    const trip = state.activeTrip;
    return `
      ${tripCard(day,month,`${trip.boarding} → ${trip.destination}`,`${formatDemoDate(state.bookingDate)} · ${trip.depart}`,trip.plate,state.ticketStatus === 'cancelled' ? 'Cancelled' : 'Confirmed',displayReturnType(),bookingPaymentStatus(),'upcoming')}
      ${state.ticketType === 'return' ? tripCard('21','JUL',`${trip.destination} → ${trip.boarding}`,state.returnMode === 'date-specific' ? `${formatDemoDate(state.returnDate)} · departure to be chosen` : 'Open departure', 'Vehicle assigned at booking','Return Available',displayReturnType(),bookingPaymentStatus(),'upcoming') : ''}`;
  }
  if (state.tripTab === 'completed') {
    return `
      ${tripCard('16','JUL','Kampala → Entebbe','16 July 2026 · 6:30 PM','UBP 318F','Completed','One Way','UGX 5,000','completed')}
      ${tripCard('12','JUL','Entebbe → Kampala','12 July 2026 · 7:00 AM','UBN 742D','Completed','Return Package','UGX 9,000','completed')}`;
  }
  return `${tripCard('08','JUL','Entebbe → Kampala','Cancelled 8 July 2026','UBM 245K','Cancelled','One Way','Refund pending','cancelled')}<article class="card empty-state"><div><div class="empty-state__icon"><i data-lucide="calendar-x"></i></div><h3>No other cancelled trips</h3><p class="muted">Cancelled bookings and refund progress appear here.</p></div></article>`;
}

function tripCard(day, month, route, date, vehicle, status, type, payment, mode) {
  const statusClass = mode === 'completed' ? 'status-chip--success' : mode === 'cancelled' ? 'status-chip--danger' : 'status-chip--info';
  const actions = mode === 'upcoming'
    ? `<button class="button button--primary button--small" type="button" data-screen="ticket">View Ticket</button><button class="button button--ghost button--small" type="button" data-screen="live">Track Vehicle</button><button class="button button--ghost button--small" type="button" data-action="change-return">Change Return Date</button><button class="button button--ghost button--small" type="button" data-screen="support">Contact Support</button>`
    : mode === 'completed'
      ? `<button class="button button--primary button--small" type="button" data-action="rate-trip">Rate Trip</button><button class="button button--ghost button--small" type="button" data-screen="book">Book Again</button><button class="button button--ghost button--small" type="button" data-action="lost-item">Report Lost Item</button>`
      : `<button class="button button--ghost button--small" type="button" data-screen="support">View Support Reference</button><button class="button button--primary button--small" type="button" data-screen="book">Book Again</button>`;
  return `<article class="card trip-card"><div class="trip-date-block"><strong>${day}</strong><span>${month}</span></div><div><div class="card-head"><div><h3>${route}</h3><span class="muted text-small">${date}</span></div><span class="status-chip ${statusClass}">${status}</span></div><div class="trip-meta"><span><i data-lucide="bus-front"></i>${vehicle}</span><span><i data-lucide="ticket"></i>${type}</span><span><i data-lucide="credit-card"></i>${payment}</span></div>${mode === 'upcoming' ? '<div class="countdown" style="margin-top:10px"><i data-lucide="clock-3"></i>Boarding begins in 42 minutes</div>' : mode === 'cancelled' ? '<p class="muted text-small" style="margin:10px 0 0">Reason: Passenger cancelled · Support reference SUP-44720</p>' : ''}</div><div class="trip-card__actions">${actions}</div></article>`;
}

let liveTimer;
function startLiveProgress() {
  stopLiveProgress();
  liveTimer = setInterval(() => {
    state.routeProgress = state.routeProgress >= 84 ? 68 : state.routeProgress + 1;
    $$('.live-progress-bar span, .live-road__progress').forEach(el => el.style.width = `${state.routeProgress}%`);
    const label = $('#live-progress-value'); if (label) label.textContent = `${state.routeProgress}%`;
    const marker = $('.vehicle-marker'); if (marker) marker.style.left = `${Math.min(78, state.routeProgress - 8)}%`;
  }, 1400);
}
function stopLiveProgress() { clearInterval(liveTimer); }

function renderLiveTrip() {
  const trip = state.activeTrip;
  return `
    ${screenHead('Live trip tracking', `Follow ${trip.plate} along the demonstration ${trip.boarding}–${trip.destination} corridor.`, '<button class="button button--ghost" type="button" data-action="share-trip"><i data-lucide="share-2"></i>Share Trip</button>')}
    <section class="live-layout live-layout--media">
      <div class="live-map live-map--media" aria-label="Animated Fly Express route preview from Entebbe toward Kampala">
        <video class="live-map__media" autoplay muted loop playsinline aria-label="Animated map preview showing a vehicle travelling from Entebbe toward Kampala"><source src="assets/fly-express-live-route.mp4" type="video/mp4"></video>
        <div class="map-media-topbar">
          <span class="map-live-pill"><span></span>Live preview</span>
          <span class="map-vehicle-pill"><i data-lucide="bus-front"></i>${trip.plate}</span>
        </div>
        <div class="live-progress-card live-progress-card--media">
          <div class="live-progress-row"><strong>${trip.boarding} → ${trip.destination}</strong><strong id="live-progress-value">${state.routeProgress}%</strong></div>
          <div class="live-progress-bar"><span style="width:${state.routeProgress}%"></span></div>
          <div class="trip-meta"><span><i data-lucide="map-pin"></i>Current: Kajjansi</span><span><i data-lucide="flag"></i>Next: Clock Tower</span></div>
        </div>
      </div>
      <aside class="grid">
        <article class="card card--blue"><p class="section-kicker">Estimated arrival</p><div class="wallet-balance">${trip.arrive}</div><p class="muted">${trip.traffic} traffic · ${trip.duration} scheduled journey</p><span class="status-chip" style="background:rgba(255,255,255,.13);color:white">Vehicle moving</span></article>
        <article class="card"><div class="card-head"><h3>Trip and crew</h3><span class="status-chip status-chip--success">Verified</span></div><div class="vehicle-identity-media"><img src="assets/fly-express-van.png" alt="Fly Express passenger van"><div><strong>${trip.vehicle}</strong><span>Fly Express passenger vehicle</span></div></div><div class="people-row"><span class="person-icon"><i data-lucide="contact-round"></i></span><div><strong>Daniel</strong><div class="muted text-small">Driver · Verified for ${trip.plate}</div></div></div><div class="people-row"><span class="person-icon"><i data-lucide="user-round-check"></i></span><div><strong>Moses</strong><div class="muted text-small">Conductor · ${passengerTotal()} booked passenger${passengerTotal() === 1 ? '' : 's'}</div></div></div><div class="detail-row"><span>Vehicle registration</span><strong>${trip.plate}</strong></div><div class="detail-row"><span>Boarding stage</span><strong>${trip.boarding}</strong></div><div class="detail-row"><span>Destination</span><strong>${trip.destination}</strong></div></article>
        <div class="button-row"><button class="button button--soft-red" type="button" data-action="emergency"><i data-lucide="siren"></i>Emergency Contact</button><button class="button button--ghost" type="button" data-action="share-trip"><i data-lucide="share-2"></i>Share Trip</button></div>
        <div class="notice"><i data-lucide="shield-check"></i><div><strong>Passenger safety</strong><div>Do not share the verification code publicly. Contact support for route concerns.</div></div></div>
      </aside>
    </section>`;
}

function renderWallet() {
  const filters = [['all','All'],['deposit','Deposits'],['trip','Trip Payments'],['parcel','Parcel Payments'],['luggage','Luggage Payments'],['refund','Refunds'],['promotion','Promotions']];
  const transactions = appData.transactions.filter(tx => state.walletFilter === 'all' || tx.type === state.walletFilter);
  return `
    ${screenHead('Fly Express Wallet', 'Use demonstration funds for trips, parcels and luggage. This preview does not hold or process real money.', '<button class="button button--primary" type="button" data-action="open-add-funds"><i data-lucide="circle-plus"></i>Add Funds</button>')}
    <section class="wallet-hero card">
      <div class="card-head"><div><p class="section-kicker" style="color:rgba(255,255,255,.65)">Available balance</p><div class="wallet-balance" data-balance>${formatUGX(state.walletBalance)}</div><div class="wallet-account">Wallet 256 •••• 5678</div></div><i data-lucide="wallet-cards" style="width:38px;height:38px"></i></div>
      <div class="balance-grid"><div class="balance-cell"><small>Promotional balance</small><strong>UGX 2,000</strong></div><div class="balance-cell"><small>Pending refunds</small><strong>UGX 5,000</strong></div><div class="balance-cell"><small>Auto-Pay</small><strong>Off</strong></div></div>
      <div class="wallet-actions"><button class="wallet-action" type="button" data-action="open-add-funds"><i data-lucide="plus"></i><span>Add Funds</span></button><button class="wallet-action" type="button" data-action="send-passenger"><i data-lucide="send"></i><span>Send to Passenger</span></button><button class="wallet-action" type="button" data-screen="book"><i data-lucide="ticket"></i><span>Pay for Trip</span></button><button class="wallet-action" type="button" data-screen="parcel"><i data-lucide="package"></i><span>Pay for Parcel</span></button></div>
    </section>

    <section class="grid grid--sidebar" style="margin-top:18px">
      <div class="card"><div class="card-head"><div><p class="section-kicker">Transaction history</p><h2>Recent activity</h2></div><button class="button button--ghost button--small" type="button" data-action="download-demo"><i data-lucide="download"></i>Statement</button></div><div class="tabs">${filters.map(([value,label]) => `<button class="tab ${state.walletFilter === value ? 'is-active' : ''}" type="button" data-action="wallet-filter" data-value="${value}">${label}</button>`).join('')}</div><div class="transaction-list" style="margin-top:10px">${transactions.length ? transactions.map(renderTransaction).join('') : emptyState('receipt-text','No transactions in this filter','Try another wallet category.')}</div></div>
      <aside class="grid"><article class="card"><div class="card-head"><h3>Wallet preferences</h3><i data-lucide="settings-2"></i></div><div class="settings-list"><div class="settings-row"><span class="settings-row__icon"><i data-lucide="zap"></i></span><span class="settings-row__copy"><strong>Auto-Pay</strong><span>Automatically pay eligible trips</span></span><button class="switch" type="button" data-action="toggle-switch"><span></span></button></div><button class="settings-row" type="button" data-action="wallet-pin"><span class="settings-row__icon"><i data-lucide="key-round"></i></span><span class="settings-row__copy"><strong>Wallet PIN</strong><span>Change demonstration PIN</span></span><i data-lucide="chevron-right"></i></button><button class="settings-row" type="button" data-screen="luggage"><span class="settings-row__icon"><i data-lucide="luggage"></i></span><span class="settings-row__copy"><strong>Pay for luggage</strong><span>Register and pay for a luggage tag</span></span><i data-lucide="chevron-right"></i></button></div></article><div class="notice"><i data-lucide="info"></i><div><strong>Preview wallet</strong><div>Balances, deposits and transfers are visual demonstrations only and reset on refresh.</div></div></div></aside>
    </section>`;
}

function renderTransaction(tx) {
  return `<div class="transaction"><span class="transaction__icon"><i data-lucide="${tx.icon}"></i></span><span class="transaction__copy"><strong>${tx.title}</strong><span>${tx.date}</span></span><span class="transaction__amount ${tx.direction === 'in' ? 'text-success' : ''}">${tx.direction === 'in' ? '+' : '−'} ${formatUGX(tx.amount)}<small>${tx.direction === 'in' ? 'Credit' : 'Paid'}</small></span></div>`;
}

function renderParcelBooking() {
  const steps = ['Sender','Recipient','Parcel','Route','Delivery','Summary','Payment','Confirmed'];
  return `
    ${screenHead('Send a parcel', 'Book a traceable stage-to-stage parcel delivery using demonstration data.')}
    <div class="flow-progress" aria-label="Parcel booking progress">${steps.map((label,index) => `<div class="flow-step ${state.parcelStep === index + 1 ? 'is-active' : state.parcelStep > index + 1 ? 'is-complete' : ''}"><span class="flow-step__number">${state.parcelStep > index + 1 ? '<i data-lucide="check"></i>' : index + 1}</span><span>${label}</span></div>`).join('')}</div>
    <section class="grid grid--sidebar">
      <div class="card">${renderParcelStep()}</div>
      <aside class="grid"><article class="card"><p class="section-kicker">Live estimate</p><h2>${state.parcelDelivery}</h2><div class="detail-list"><div class="detail-row"><span>Origin</span><strong>${escapeHtml(state.parcel.origin)}</strong></div><div class="detail-row"><span>Destination</span><strong>${escapeHtml(state.parcel.destination)}</strong></div><div class="detail-row"><span>Category</span><strong>${state.parcelCategory}</strong></div><div class="detail-row"><span>Delivery time</span><strong>${state.parcelDelivery === 'Priority Stage-to-Stage' ? 'Next eligible departure' : state.parcelDelivery === 'Hold for Collection' ? '1–2 hours, then held' : state.parcelDelivery === 'Future Last-Mile Delivery' ? 'Same-day concept preview' : '1–2 hours'}</strong></div><div class="detail-row"><span>Estimated price</span><strong>${formatUGX(parcelPrice())}</strong></div></div></article><div class="notice"><i data-lucide="package-check"></i><div><strong>Parcel safety</strong><div>Do not send prohibited, hazardous, unlawful or inadequately packaged items.</div></div></div></aside>
    </section>`;
}

function renderParcelStep() {
  const step = state.parcelStep;
  let body = '';
  if (step === 1) body = `<div class="card-head"><div><p class="section-kicker">Step 1 of 8</p><h2>Sender details</h2></div></div><div class="form-grid"><div class="field"><label for="parcel-sender-name">Full name</label><input id="parcel-sender-name" data-parcel-field="senderName" value="${escapeHtml(state.parcel.senderName)}"></div><div class="field"><label for="parcel-sender-phone">Telephone number</label><input id="parcel-sender-phone" data-parcel-field="senderPhone" value="${escapeHtml(state.parcel.senderPhone)}"></div><div class="field field--full"><label for="parcel-pickup">Pickup stage</label><select id="parcel-pickup" data-parcel-field="origin">${appData.routes.map(route => optionMarkup(route, state.parcel.origin)).join('')}</select></div></div>`;
  if (step === 2) body = `<div class="card-head"><div><p class="section-kicker">Step 2 of 8</p><h2>Recipient details</h2></div></div><div class="form-grid"><div class="field"><label for="parcel-recipient-name">Full name</label><input id="parcel-recipient-name" data-parcel-field="recipientName" value="${escapeHtml(state.parcel.recipientName)}"></div><div class="field"><label for="parcel-recipient-phone">Telephone number</label><input id="parcel-recipient-phone" data-parcel-field="recipientPhone" value="${escapeHtml(state.parcel.recipientPhone)}"></div><div class="field field--full"><label for="parcel-destination">Destination stage</label><select id="parcel-destination" data-parcel-field="destination">${appData.routes.slice().reverse().map(route => optionMarkup(route, state.parcel.destination)).join('')}</select></div></div>`;
  if (step === 3) body = `<div class="card-head"><div><p class="section-kicker">Step 3 of 8</p><h2>Parcel information</h2></div></div><div class="parcel-category-grid">${['Documents','Small package','Medium package','Large package','Fragile item','Business parcel'].map((category,index) => `<button class="parcel-category ${state.parcelCategory === category ? 'is-selected' : ''}" type="button" data-action="parcel-category" data-value="${category}" aria-pressed="${state.parcelCategory === category}"><i data-lucide="${['file-text','package','package-open','boxes','glass-water','briefcase-business'][index]}"></i><span>${category}</span></button>`).join('')}</div><div class="form-grid" style="margin-top:16px"><div class="field field--full"><label for="parcel-description">Description</label><input id="parcel-description" data-parcel-field="description" value="${escapeHtml(state.parcel.description)}"></div><div class="field"><label for="parcel-weight">Approximate weight</label><select id="parcel-weight" data-parcel-field="weight">${['Under 1 kg','1–5 kg','5–10 kg'].map(value => optionMarkup(value, state.parcel.weight)).join('')}</select></div><div class="field"><label for="parcel-quantity">Quantity</label><input id="parcel-quantity" data-parcel-field="quantity" type="number" value="${escapeHtml(state.parcel.quantity)}" min="1"></div><div class="field"><label for="parcel-value">Declared value</label><input id="parcel-value" data-parcel-field="declaredValue" value="${escapeHtml(state.parcel.declaredValue)}"></div><div class="field"><label for="parcel-fragile">Fragile handling</label><select id="parcel-fragile" data-parcel-field="fragile">${['No','Yes'].map(value => optionMarkup(value, state.parcel.fragile)).join('')}</select></div><div class="field field--full"><label for="parcel-instructions">Special instructions</label><textarea id="parcel-instructions" data-parcel-field="instructions">${escapeHtml(state.parcel.instructions)}</textarea></div><div class="field field--full"><label>Photograph</label><div class="upload-box" data-action="upload-demo" role="button" tabindex="0"><div><i data-lucide="image-plus"></i><strong style="display:block">Add parcel photograph</strong><span>Visual placeholder only</span></div></div></div></div>`;
  if (step === 4) body = `<div class="card-head"><div><p class="section-kicker">Step 4 of 8</p><h2>Route and collection point</h2></div></div><div class="form-grid"><div class="field"><label for="parcel-origin">Origin stage</label><select id="parcel-origin" data-parcel-field="origin">${appData.routes.map(route => optionMarkup(route, state.parcel.origin)).join('')}</select></div><div class="field"><label for="parcel-route-destination">Destination stage</label><select id="parcel-route-destination" data-parcel-field="destination">${appData.routes.slice().reverse().map(route => optionMarkup(route, state.parcel.destination)).join('')}</select></div><div class="field"><label for="parcel-dropoff">Drop-off time</label><select id="parcel-dropoff" data-parcel-field="dropoff">${['Today · 8:00–9:00 AM','Today · 9:00–10:00 AM'].map(value => optionMarkup(value, state.parcel.dropoff)).join('')}</select></div><div class="field"><label for="parcel-departure">Preferred vehicle departure</label><select id="parcel-departure" data-parcel-field="departure">${['Next available vehicle','9:00 AM departure'].map(value => optionMarkup(value, state.parcel.departure)).join('')}</select></div></div><div class="route-map" style="margin-top:16px;min-height:200px"><div class="route-track">${['Entebbe','Kitooro','Abayita','Kajjansi','Kampala'].map(place => `<div class="route-stop"><span class="route-stop__dot"></span><span>${place}</span></div>`).join('')}</div></div>`;
  if (step === 5) body = `<div class="card-head"><div><p class="section-kicker">Step 5 of 8</p><h2>Delivery option</h2></div></div><div class="radio-cards">${[['Standard Stage-to-Stage','Delivery on the next suitable vehicle · UGX 7,500','truck'],['Priority Stage-to-Stage','Priority handling and earliest departure · UGX 10,000','badge-alert'],['Hold for Collection','Hold securely at destination stage · UGX 8,000','package-check'],['Future Last-Mile Delivery','Concept preview for future address delivery','map-pin-plus']].map(item => `<label class="radio-card ${state.parcelDelivery === item[0] ? 'is-selected' : ''}"><input type="radio" name="parcel-delivery" value="${item[0]}" ${state.parcelDelivery === item[0] ? 'checked' : ''}><span class="radio-card__icon"><i data-lucide="${item[2]}"></i></span><span class="radio-card__body"><strong>${item[0]}</strong><span>${item[1]}</span></span></label>`).join('')}</div>`;
  if (step === 6) body = `<div class="card-head"><div><p class="section-kicker">Step 6 of 8</p><h2>Price summary</h2></div></div><div class="detail-list"><div class="detail-row"><span>Parcel category</span><strong>${state.parcelCategory}</strong></div><div class="detail-row"><span>Delivery option</span><strong>${state.parcelDelivery}</strong></div><div class="detail-row"><span>Route charge</span><strong>${formatUGX(parcelPrice() - 1500)}</strong></div><div class="detail-row"><span>Handling charge</span><strong>UGX 1,500</strong></div><div class="detail-row"><span>Promotional discount</span><strong class="text-success">UGX 0</strong></div></div><div class="total-row"><strong>Total</strong><strong>${formatUGX(parcelPrice())}</strong></div>`;
  if (step === 7) body = `<div class="card-head"><div><p class="section-kicker">Step 7 of 8</p><h2>Parcel payment</h2></div></div><div class="radio-cards">${parcelPaymentChoice('wallet','Fly Express Wallet',`Available balance: ${formatUGX(state.walletBalance)}`,'wallet-cards')}${parcelPaymentChoice('mtn','MTN Mobile Money','Simulated authorization only','smartphone')}${parcelPaymentChoice('cash','Cash at Stage','Pay the parcel desk before dispatch','banknote')}</div>${renderParcelPaymentPanel()}<div class="notice" style="margin-top:16px"><i data-lucide="info"></i><div>No real payment is processed. Confirming moves directly to the receipt preview.</div></div>`;
  if (step === 8) body = `<div class="payment-state"><div class="success-check"><i data-lucide="check"></i></div><p class="eyebrow">Parcel registered</p><h2>Your parcel is ready for handover</h2><p class="muted">Tracking number FXP-260718-0842 has been created for the demonstration.</p><button class="button button--primary" type="button" data-screen="parcel-receipt">View Parcel Receipt</button></div>`;

  const buttons = step < 8 ? `<div class="button-row button-row--end" style="margin-top:20px"><button class="button button--ghost" type="button" data-action="parcel-back" ${step === 1 ? 'disabled' : ''}>Back</button><button class="button button--primary" type="button" data-action="parcel-next">${step === 7 ? 'Confirm Demo Parcel' : 'Continue'}</button></div>` : '';
  return `${body}${buttons}`;
}

function parcelPrice() {
  return ({ 'Standard Stage-to-Stage': 7500, 'Priority Stage-to-Stage': 10000, 'Hold for Collection': 8000, 'Future Last-Mile Delivery': 12000 })[state.parcelDelivery] || 7500;
}

function parcelPaymentChoice(value, title, copy, icon) {
  const selected = state.parcelPaymentMethod === value;
  return `<label class="radio-card ${selected ? 'is-selected' : ''}"><input type="radio" name="parcel-payment-method" value="${value}" ${selected ? 'checked' : ''}><span class="radio-card__icon"><i data-lucide="${icon}"></i></span><span class="radio-card__body"><strong>${title}</strong><span>${copy}</span></span></label>`;
}

function renderParcelPaymentPanel() {
  if (state.parcelPaymentMethod === 'wallet') {
    return `<div class="payment-panel"><div class="detail-row"><span>Parcel total</span><strong>${formatUGX(parcelPrice())}</strong></div><div class="detail-row"><span>Balance after payment</span><strong class="${state.walletBalance >= parcelPrice() ? 'text-success' : 'text-danger'}">${formatUGX(state.walletBalance - parcelPrice())}</strong></div><div class="field" style="margin-top:13px"><label for="parcel-wallet-pin">Wallet PIN</label><input id="parcel-wallet-pin" type="password" inputmode="numeric" maxlength="4" value="2580"><span class="field-help">Any four digits are accepted in this preview.</span></div></div>`;
  }
  if (state.parcelPaymentMethod === 'mtn') {
    if (state.parcelPaymentDemoState === 'success') return `<div class="payment-panel payment-state"><div class="payment-state__icon payment-state__icon--success"><i data-lucide="circle-check-big"></i></div><h3>Authorization successful</h3><p class="muted">The simulated MTN Mobile Money request was approved.</p><button class="button button--ghost button--small" type="button" data-action="parcel-payment-reset">Reset State</button></div>`;
    if (state.parcelPaymentDemoState === 'failed') return `<div class="payment-panel payment-state"><div class="payment-state__icon payment-state__icon--failed"><i data-lucide="circle-x"></i></div><h3>Authorization failed</h3><p class="muted">The simulated request was declined.</p><button class="button button--ghost button--small" type="button" data-action="parcel-payment-reset">Try Again</button></div>`;
    return `<div class="payment-panel"><div class="field"><label for="parcel-mobile-number">MTN Mobile Money number</label><input id="parcel-mobile-number" value="${escapeHtml(state.parcel.senderPhone)}"></div><div class="button-row" style="margin-top:13px"><button class="button button--success button--small" type="button" data-action="parcel-payment-state" data-value="success">Simulate Success</button><button class="button button--soft-red button--small" type="button" data-action="parcel-payment-state" data-value="failed">Simulate Failure</button></div></div>`;
  }
  return `<div class="payment-panel"><div class="notice"><i data-lucide="clock-3"></i><div><strong>Payment due at the parcel desk.</strong><div>The parcel remains registered but will not dispatch until the simulated cash payment is confirmed.</div></div></div></div>`;
}

function advanceParcel() {
  if (state.parcelStep === 1 && (!state.parcel.senderName.trim() || !state.parcel.senderPhone.trim())) return toast('Enter the sender name and telephone number.', 'danger');
  if (state.parcelStep === 2 && (!state.parcel.recipientName.trim() || !state.parcel.recipientPhone.trim())) return toast('Enter the recipient name and telephone number.', 'danger');
  if (state.parcelStep === 3 && (!state.parcel.description.trim() || Number(state.parcel.quantity) < 1)) return toast('Describe the parcel and enter a valid quantity.', 'danger');
  if (state.parcelStep === 4 && state.parcel.origin === state.parcel.destination) return toast('Choose different origin and destination stages.', 'danger');
  if (state.parcelStep === 7) {
    if (state.parcelPaymentMethod === 'wallet' && !/^\d{4}$/.test($('#parcel-wallet-pin')?.value.trim() || '')) return toast('Enter any four digits for the demonstration wallet PIN.', 'danger');
    if (state.parcelPaymentMethod === 'wallet' && parcelPrice() > state.walletBalance) return toast('The demonstration wallet balance is insufficient. Choose another payment method.', 'danger');
    if (state.parcelPaymentMethod === 'mtn' && state.parcelPaymentDemoState !== 'success') return toast('Simulate a successful mobile-money response before confirming.', 'danger');
  }
  state.parcelStep = Math.min(8, state.parcelStep + 1);
  renderCurrentScreen(false);
  const heading = $('#main-content h2');
  if (heading) { heading.setAttribute('tabindex', '-1'); setTimeout(() => heading.focus({ preventScroll: true }), 20); }
  if (state.parcelStep === 8) toast('Parcel registered in demonstration mode.', 'success');
}

function renderParcelReceipt() {
  return `
    ${screenHead('Parcel receipt', 'Use this receipt to demonstrate parcel custody, tracking and collection verification.')}
    <article class="receipt"><header class="receipt__head"><div class="ticket-brand"><div class="logo-frame"><img src="assets/fly-express-logo.jpg" alt="Fly Express logo"></div><div><h2 style="margin:0">Fly Express Parcel</h2><p class="muted" style="margin:0">Stage-to-Stage Receipt</p></div></div><span class="status-chip status-chip--warning">Registered</span></header><div class="receipt__body"><div class="grid grid--2"><div class="detail-list"><div class="detail-row"><span>Tracking number</span><strong>FXP-260718-0842</strong></div><div class="detail-row"><span>Sender</span><strong>${escapeHtml(state.parcel.senderName)}</strong></div><div class="detail-row"><span>Sender telephone</span><strong>${escapeHtml(state.parcel.senderPhone)}</strong></div><div class="detail-row"><span>Origin</span><strong>${escapeHtml(state.parcel.origin)}</strong></div><div class="detail-row"><span>Parcel category</span><strong>${state.parcelCategory}</strong></div><div class="detail-row"><span>Delivery</span><strong>${state.parcelDelivery}</strong></div></div><div class="detail-list"><div class="detail-row"><span>Recipient</span><strong>${escapeHtml(state.parcel.recipientName)}</strong></div><div class="detail-row"><span>Recipient telephone</span><strong>${escapeHtml(state.parcel.recipientPhone)}</strong></div><div class="detail-row"><span>Destination</span><strong>${escapeHtml(state.parcel.destination)}</strong></div><div class="detail-row"><span>Amount ${state.parcelPaymentMethod === 'cash' ? 'due' : 'paid'}</span><strong>${formatUGX(parcelPrice())}</strong></div><div class="detail-row"><span>Payment</span><strong>${paymentLabel(state.parcelPaymentMethod)}</strong></div></div></div><hr><div class="grid grid--2"><div><p class="section-kicker">Collection PIN</p><div class="verification-code">742 915</div><p class="muted text-small">Recipient should present this PIN with identification.</p></div><div><p class="section-kicker">Receipt barcode</p><svg id="parcel-barcode" class="parcel-barcode" role="img" aria-label="Barcode for parcel FXP-260718-0842"></svg></div></div><div class="notice" style="margin-top:18px"><i data-lucide="shield-check"></i><div><strong>Collection safety</strong><div>Do not share the collection PIN publicly. Inspect the parcel before leaving the collection desk.</div></div></div></div><footer class="ticket-actions"><button class="button button--primary" type="button" data-screen="trackparcel">Track Parcel</button><button class="button button--ghost" type="button" data-action="share-demo">Share Tracking</button><button class="button button--ghost" type="button" data-screen="support">Contact Parcel Desk</button><button class="button button--ghost" type="button" data-screen="home">Return Home</button></footer></article>`;
}

function generateBarcode() {
  return [3,1,5,2,1,4,2,6,1,3,5,1,2,4,1,6,2,3,1,5,2,4,1,3,6,1,2,5,3,1,4,2].map(width => `<i style="width:${width}px"></i>`).join('');
}

function renderParcelTracking() {
  const states = {
    intransit: { chip: 'In Transit', cls: 'status-chip--info', current: 5, notice: 'Parcel is travelling toward Kampala. Expected arrival: 10:45 AM.' },
    delayed: { chip: 'Delayed', cls: 'status-chip--warning', current: 5, notice: 'Traffic has delayed the parcel by approximately 25 minutes.' },
    ready: { chip: 'Ready for Collection', cls: 'status-chip--success', current: 7, notice: 'The recipient may collect the parcel using PIN 742915.' },
    collected: { chip: 'Collected', cls: 'status-chip--success', current: 8, notice: 'Parcel was collected at Kampala Main Stage at 11:06 AM.' }
  };
  const current = states[state.parcelTrackingState];
  const statuses = ['Parcel Registered','Payment Confirmed','Assigned to Vehicle','Departed Entebbe','In Transit','Arrived in Kampala','Ready for Collection','Collected'];
  return `
    ${screenHead('Track a parcel', 'Enter a demonstration tracking number or switch between parcel status scenarios.')}
    <section class="card"><div class="tracking-search"><div class="field"><label for="tracking-number">Tracking number</label><input id="tracking-number" value="FXP-260718-0842" placeholder="Enter FXP tracking number"></div><button class="button button--primary" type="button" data-action="track-parcel"><i data-lucide="search"></i>Load Tracking</button></div><div class="choice-pills" style="margin-top:13px"><button class="choice-pill ${state.parcelTrackingState === 'intransit' ? 'is-selected' : ''}" type="button" data-action="tracking-state" data-value="intransit">In Transit</button><button class="choice-pill ${state.parcelTrackingState === 'delayed' ? 'is-selected' : ''}" type="button" data-action="tracking-state" data-value="delayed">Delayed</button><button class="choice-pill ${state.parcelTrackingState === 'ready' ? 'is-selected' : ''}" type="button" data-action="tracking-state" data-value="ready">Ready</button><button class="choice-pill ${state.parcelTrackingState === 'collected' ? 'is-selected' : ''}" type="button" data-action="tracking-state" data-value="collected">Collected</button><button class="choice-pill" type="button" data-action="invalid-tracking">Invalid Number</button></div></section>
    <section class="grid grid--sidebar" style="margin-top:18px"><div class="card"><div class="card-head"><div><p class="section-kicker">FXP-260718-0842</p><h2>${escapeHtml(state.parcel.origin)} → ${escapeHtml(state.parcel.destination)}</h2></div><span class="status-chip ${current.cls}">${current.chip}</span></div><div class="notice" style="margin-bottom:18px"><i data-lucide="${state.parcelTrackingState === 'delayed' ? 'triangle-alert' : 'package-check'}"></i><div>${current.notice}</div></div><div class="tracking-map-preview"><video autoplay muted loop playsinline aria-label="Animated route preview for the parcel vehicle"><source src="assets/fly-express-live-route.mp4" type="video/mp4"></video><div class="tracking-map-preview__label"><span><i data-lucide="package-check"></i>Parcel vehicle</span><strong>UBP 318F · ${escapeHtml(state.parcel.origin)} to ${escapeHtml(state.parcel.destination)}</strong></div></div><div class="timeline">${statuses.map((status,index) => `<div class="timeline-item ${index + 1 < current.current ? 'is-complete' : index + 1 === current.current ? 'is-current' : ''}"><span class="timeline-dot"><i data-lucide="${index + 1 < current.current ? 'check' : index + 1 === current.current ? 'navigation' : 'circle'}"></i></span><span class="timeline-copy"><strong>${status}</strong><span>${index + 1 <= current.current ? trackingTime(index) : 'Pending next update'}</span></span></div>`).join('')}</div></div><aside class="grid"><article class="card"><h3>Parcel details</h3><div class="detail-list"><div class="detail-row"><span>Sender</span><strong>${escapeHtml(state.parcel.senderName)}</strong></div><div class="detail-row"><span>Recipient</span><strong>${escapeHtml(state.parcel.recipientName)}</strong></div><div class="detail-row"><span>Vehicle</span><strong>UBP 318F</strong></div><div class="detail-row"><span>Expected arrival</span><strong>${state.parcelTrackingState === 'delayed' ? '11:10 AM' : '10:45 AM'}</strong></div><div class="detail-row"><span>Collection stage</span><strong>${escapeHtml(state.parcel.destination)}</strong></div><div class="detail-row"><span>Collection PIN</span><strong>742915</strong></div></div></article><button class="button button--ghost" type="button" data-action="share-demo"><i data-lucide="share-2"></i>Share Tracking</button><button class="button button--primary" type="button" data-screen="support"><i data-lucide="headphones"></i>Contact Parcel Support</button></aside></section>`;
}

function trackingTime(index) { return ['8:02 AM','8:04 AM','8:17 AM','8:31 AM','9:36 AM','10:41 AM','10:49 AM','11:06 AM'][index]; }

function renderOffers() {
  const offers = [
    ['Return for UGX 4,000','Secure a subsidized return when booking your outbound trip.','refresh-cw','Fly Express Offer'],
    ['Wallet deposit bonus','Receive UGX 2,000 promotional credit after an eligible deposit.','wallet-cards','Fly Express Offer'],
    ['Frequent traveller rewards','Complete five trips and unlock a priority-booking reward preview.','award','Fly Express Offer'],
    ['Parcel business bundle','Send four qualifying business parcels and receive discounted handling.','package-check','Fly Express Offer'],
    ['Refer a passenger','Share Fly Express and preview a reward after their first journey.','users-round','Fly Express Offer'],
    ['Corporate commuter plan','Centralized travel for teams with monthly account reporting.','building-2','Fly Express Offer']
  ];
  return `
    ${screenHead('Offers and promotions', 'Browse Fly Express campaigns and clearly labelled third-party advertisements.')}
    <section class="grid grid--3">${offers.map(item => `<article class="card card--hover offer-card"><div><span class="status-chip status-chip--info">${item[3]}</span><div class="offer-card__icon" style="margin-top:18px"><i data-lucide="${item[2]}"></i></div><h2 style="margin:15px 0 8px">${item[0]}</h2><p class="muted">${item[1]}</p></div><button class="button button--ghost button--small" type="button" data-action="offer-details">View Conditions</button></article>`).join('')}</section>
    <div class="section-title"><h2>Sponsored partners</h2><span class="muted text-small">Paid placements are clearly identified</span></div>
    <section class="grid grid--2"><article class="card sponsored-card"><div><span class="sponsored-label">Sponsored</span><p class="section-kicker" style="margin-top:18px;color:var(--brand-gold)">Lakeview Business Centre</p><h2>Business printing and parcel-ready packaging.</h2><p style="color:rgba(255,255,255,.72)">Available near Kitooro. Demonstration advertiser content.</p></div><button class="button button--gold button--small" type="button" data-action="sponsored-details">Advertiser Details</button></article><article class="card sponsored-card" style="background:linear-gradient(135deg,#3a1d0b,#754018)"><div><span class="sponsored-label">Sponsored</span><p class="section-kicker" style="margin-top:18px;color:var(--brand-gold)">Kampala Coffee House</p><h2>Show your Fly Express ticket for a breakfast offer.</h2><p style="color:rgba(255,255,255,.72)">Fictional promotion for stakeholder demonstration.</p></div><button class="button button--gold button--small" type="button" data-action="sponsored-details">Advertiser Details</button></article></section>`;
}

function renderNotifications() {
  const categories = ['all','Trips','Payments','Wallet','Parcels','Luggage','Promotions','Service Notices','Support'];
  const items = appData.notifications.filter(item => state.notificationFilter === 'all' || item.category === state.notificationFilter);
  return `
    ${screenHead('Notifications', 'Trip, wallet, parcel, luggage, promotion and service updates appear in one place.', '<button class="button button--ghost" type="button" data-action="mark-all-read"><i data-lucide="check-check"></i>Mark all as read</button><button class="button button--primary" type="button" data-action="notification-preferences"><i data-lucide="settings-2"></i>Preferences</button>')}
    <div class="tabs">${categories.map(category => `<button class="tab ${state.notificationFilter === category ? 'is-active' : ''}" type="button" data-action="notification-filter" data-value="${category}">${category === 'all' ? 'All' : category}</button>`).join('')}</div>
    <section class="card" style="margin-top:16px;padding:8px 12px"><div class="notification-list">${items.length ? items.map(renderNotification).join('') : emptyState('bell-off','No notifications here','New updates will appear in this category.')}</div></section>`;
}

function renderNotification(item) {
  return `<button class="notification-item ${item.unread ? 'is-unread' : ''}" type="button" data-action="notification-detail" data-id="${item.id}"><span class="notification-item__icon"><i data-lucide="${item.icon}"></i></span><span class="notification-item__copy"><strong>${item.title}</strong><span>${item.body}</span><span style="margin-top:4px">${item.category} · ${item.time}</span></span>${item.unread ? '<span class="unread-dot" aria-label="Unread"></span>' : '<i data-lucide="chevron-right"></i>'}</button>`;
}

function renderSupport() {
  return `
    ${screenHead('Help and customer support', 'Find answers, report an issue, preview chat support or submit a demonstration support request.')}
    <section class="grid grid--4">
      ${supportAction('Call Fly Express','phone-call','call-support')}${supportAction('Chat Support','messages-square','chat-support')}${supportAction('Lost Property','search','lost-item')}${supportAction('Safety Concern','shield-alert','emergency')}
    </section>
    <section class="grid grid--sidebar" style="margin-top:18px"><div class="grid"><article class="card"><div class="card-head"><div><p class="section-kicker">Support ticket</p><h2>Report a problem</h2></div><span class="status-chip status-chip--info">Demo submission</span></div>${state.supportSubmitted ? supportSuccess() : supportForm()}</article><article class="card"><div class="card-head"><div><p class="section-kicker">Frequently asked questions</p><h2>Passenger guidance</h2></div></div><div class="faq-list">${faq('How early should I arrive?','Please arrive at least 15 minutes before departure so the crew can verify your booking and luggage.')}${faq('How does an open return work?','Book an eligible Kampala-to-Entebbe departure before the return ticket expiry date.')}${faq('What happens if my vehicle changes?','Your booking reference remains valid and the app preview displays the replacement registration.')}${faq('How does parcel collection work?','The recipient presents the collection PIN and identification at the destination parcel desk.')}${faq('Can I pay cash?','The cash-at-stage option places the booking in Payment Pending status until a dispatcher confirms payment.')}</div></article></div><aside class="grid"><article class="card"><h3>Support categories</h3><div class="settings-list">${['Payment Dispute','Parcel Complaint','Luggage Complaint','Trip Complaint','Safety Concern','Suggestion'].map((label,index) => `<button class="settings-row" type="button" data-action="support-category" data-value="${label}"><span class="settings-row__icon"><i data-lucide="${['credit-card','package-x','luggage','bus-front','shield-alert','message-circle-more'][index]}"></i></span><span class="settings-row__copy"><strong>${label}</strong><span>Open the relevant request form</span></span><i data-lucide="chevron-right"></i></button>`).join('')}</div></article><article class="card card--soft"><p class="section-kicker">Demonstration contacts</p><h3>Fly Express Support Desk</h3><p class="muted">+256 700 000 000<br>support@example.flyexpress.demo</p><p class="privacy-note">Placeholder contact information for presentation only.</p></article></aside></section>`;
}

function supportAction(label, icon, action) { return `<button class="card card--hover" style="text-align:left;cursor:pointer" type="button" data-action="${action}"><span class="quick-action__icon"><i data-lucide="${icon}"></i></span><strong style="display:block;margin-top:10px">${label}</strong><span class="muted text-small">Open preview</span></button>`; }
function faq(question, answer) { return `<div class="faq-item"><button class="faq-question" type="button" data-action="faq-toggle"><span>${question}</span><i data-lucide="chevron-down"></i></button><div class="faq-answer">${answer}</div></div>`; }
function supportForm() {
  return `<div class="form-grid"><div class="field"><label>Category</label><select id="support-category"><option>Trip Complaint</option><option>Payment Dispute</option><option>Lost Property</option><option>Parcel Complaint</option><option>Luggage Complaint</option><option>Safety Concern</option><option>Suggestion</option></select></div><div class="field"><label>Priority</label><select><option>Normal</option><option>Urgent</option><option>Safety critical</option></select></div><div class="field"><label>Related booking</label><select><option>FX-260718-1842</option><option>None</option></select></div><div class="field"><label>Related parcel</label><select><option>None</option><option>FXP-260718-0842</option></select></div><div class="field field--full"><label>Subject</label><input value="Question about my boarding time"></div><div class="field field--full"><label>Description</label><textarea>Please confirm whether I should arrive 15 minutes before the departure time.</textarea></div><div class="field field--full"><label>Attachment</label><div class="upload-box" data-action="upload-demo"><div><i data-lucide="paperclip"></i><strong style="display:block">Attach image or document</strong><span>Visual placeholder only</span></div></div></div></div><div class="button-row button-row--end" style="margin-top:16px"><button class="button button--primary" type="button" data-action="submit-support">Submit Support Request</button></div>`;
}
function supportSuccess() {
  return `<div class="payment-state"><div class="payment-state__icon payment-state__icon--success"><i data-lucide="circle-check-big"></i></div><h2>Support request submitted</h2><p class="muted">Your demonstration request has been assigned reference SUP-44720.</p><div class="detail-list" style="text-align:left"><div class="detail-row"><span>Status</span><strong>Submitted</strong></div><div class="detail-row"><span>Assigned status</span><strong>Under Review</strong></div><div class="detail-row"><span>Expected response</span><strong>Within 2 hours</strong></div></div><div class="button-row" style="justify-content:center;margin-top:16px"><button class="button button--primary" type="button" data-action="support-statuses">View Support Request</button><button class="button button--ghost" type="button" data-action="new-support">New Request</button></div></div>`;
}

function renderProfile() {
  return `
    ${screenHead('Profile and settings', 'Manage passenger details, language, accessibility, privacy and demonstration preferences.')}
    <section class="grid grid--sidebar"><div class="grid"><article class="card"><div class="profile-hero"><div class="profile-avatar">SN</div><div><p class="eyebrow">Fly Express passenger</p><h2 style="margin-bottom:5px">Sarah Nabirye</h2><p class="muted">+256 772 345 678 · sarah.nabirye@example.com</p><button class="button button--ghost button--small" type="button" data-action="edit-profile"><i data-lucide="pencil"></i>Edit Profile</button></div></div></article><article class="card"><div class="card-head"><h2>Passenger information</h2></div><div class="detail-list"><div class="detail-row"><span>Preferred route</span><strong>Entebbe → Kampala</strong></div><div class="detail-row"><span>Emergency contact</span><strong>+256 700 123 456</strong></div><div class="detail-row"><span>Saved passengers</span><strong>2 passengers</strong></div><div class="detail-row"><span>Saved pickup points</span><strong>Entebbe Main Stage, Kitooro</strong></div></div></article><article class="card"><div class="card-head"><div><p class="section-kicker">Accessibility</p><h2>Display and interaction</h2></div></div><div class="settings-list"><div class="settings-row"><span class="settings-row__icon"><i data-lucide="case-upper"></i></span><span class="settings-row__copy"><strong>Larger text</strong><span>Increase the interface type scale</span></span><button class="switch ${document.body.classList.contains('large-text') ? 'is-on' : ''}" type="button" data-action="accessibility" data-value="large-text"><span></span></button></div><div class="settings-row"><span class="settings-row__icon"><i data-lucide="contrast"></i></span><span class="settings-row__copy"><strong>High contrast</strong><span>Increase borders and text contrast</span></span><button class="switch ${document.body.classList.contains('high-contrast') ? 'is-on' : ''}" type="button" data-action="accessibility" data-value="high-contrast"><span></span></button></div><div class="settings-row"><span class="settings-row__icon"><i data-lucide="pause"></i></span><span class="settings-row__copy"><strong>Reduce motion</strong><span>Limit transitions and animations</span></span><button class="switch ${document.body.classList.contains('reduce-motion') ? 'is-on' : ''}" type="button" data-action="accessibility" data-value="reduce-motion"><span></span></button></div><div class="settings-row"><span class="settings-row__icon"><i data-lucide="audio-lines"></i></span><span class="settings-row__copy"><strong>Screen-reader labels</strong><span>Accessible labels are included throughout</span></span><span class="status-chip status-chip--success">On</span></div></div></article></div><aside class="grid"><article class="card"><h3>Account and preferences</h3><div class="settings-list">${profileRow('Saved passengers','users','Manage frequent travellers','saved-passengers')}${profileRow('Saved pickup points','map-pinned','Manage common boarding points','saved-pickups')}${profileRow('Wallet security','shield-check','PIN and Auto-Pay settings','wallet-pin')}${profileRow('Notification preferences','bell-ring','Choose alert categories','notification-preferences')}${profileRow('Language','languages',state.language,'language')}${profileRow('Privacy','lock-keyhole','Review privacy preview','privacy')}${profileRow('Terms and Conditions','file-check-2','Demonstration terms','terms')}${profileRow('About Fly Express','info','Organization and app details','about')}</div></article><article class="card"><p class="section-kicker">Reviewer tools</p><button class="button button--ghost w-full" type="button" data-action="open-demo-panel"><i data-lucide="flask-conical"></i>Prototype Demo States</button><button class="button button--soft-red w-full" style="margin-top:10px" type="button" data-action="sign-out"><i data-lucide="log-out"></i>Sign Out</button></article></aside></section>`;
}
function profileRow(title, icon, copy, action) { return `<button class="settings-row" type="button" ${action === 'about' ? 'data-screen="about"' : `data-action="${action}"`}><span class="settings-row__icon"><i data-lucide="${icon}"></i></span><span class="settings-row__copy"><strong>${title}</strong><span>${copy}</span></span><i data-lucide="chevron-right"></i></button>`; }

function renderAbout() {
  return `
    <section class="about-hero"><div class="logo-frame logo-frame--large"><img src="assets/fly-express-logo.jpg" alt="Fly Express Travellers Association logo"></div><p class="eyebrow">About the organization</p><h1>Fly Express Travellers Association</h1><p class="muted">A demonstration passenger experience for reliable travel, parcel delivery, luggage handling and digital ticketing between Entebbe and Kampala.</p></section>
    <section class="service-list">${aboutService('Passenger transport','bus-front','Scheduled, stage-based travel with clear departure and boarding information.')}${aboutService('Parcel delivery','package-check','Traceable same-corridor parcels with collection verification.')}${aboutService('Luggage handling','luggage','Published categories, digital tags and formal handling notices.')}${aboutService('Digital ticketing','qr-code','Booking references, verification codes and branded digital tickets.')}${aboutService('Customer wallet','wallet-cards','Prepaid demonstration funds, promotions and refund states.')}${aboutService('Customer support','headphones','Trip, parcel, luggage, payment and lost-property requests.')}</section>
    <section class="grid grid--2" style="margin-top:18px"><article class="card"><h2>Demonstration contacts</h2><div class="detail-list"><div class="detail-row"><span>Passenger support</span><strong>+256 700 000 000</strong></div><div class="detail-row"><span>Parcel desk</span><strong>+256 700 000 001</strong></div><div class="detail-row"><span>Email</span><strong>hello@example.flyexpress.demo</strong></div><div class="detail-row"><span>Office hours</span><strong>5:00 AM – 10:00 PM</strong></div></div><p class="privacy-note">All contact information above is placeholder demonstration content.</p></article><article class="card"><h2>Application information</h2><div class="detail-list"><div class="detail-row"><span>Application</span><strong>Fly Express Passenger App</strong></div><div class="detail-row"><span>Version</span><strong>1.2.0 Prototype</strong></div><div class="detail-row"><span>Data storage</span><strong>Browser memory only</strong></div><div class="detail-row"><span>Operational services</span><strong>None connected</strong></div></div><div class="button-row" style="margin-top:14px"><button class="button button--ghost button--small" type="button" data-action="terms">Terms</button><button class="button button--ghost button--small" type="button" data-action="privacy">Privacy</button></div></article></section>`;
}
function aboutService(title, icon, copy) { return `<article class="service-item"><i data-lucide="${icon}"></i><h3 style="margin:10px 0 7px">${title}</h3><p class="muted text-small" style="margin:0">${copy}</p></article>`; }
function emptyState(icon, title, copy) { return `<div class="empty-state"><div><div class="empty-state__icon"><i data-lucide="${icon}"></i></div><h3>${title}</h3><p class="muted">${copy}</p></div></div>`; }

/* =========================================================
   Streamlined booking review
   Optional choices stay collapsed until a passenger needs them.
   ========================================================= */

let tripReviewMap = null;
let tripReviewScrollFrame = null;

function updateHeaderTheme() {
  const topbar = $('.topbar');
  if (!topbar) return;
  const isScrolled = window.scrollY > 50;
  const darkHeroScreens = ['trip-details', 'live'];
  if (darkHeroScreens.includes(state.screen) && !isScrolled) {
    topbar.classList.add('topbar--dark-bg');
    topbar.classList.remove('topbar--light-bg');
  } else {
    topbar.classList.add('topbar--light-bg');
    topbar.classList.remove('topbar--dark-bg');
  }
}

function handleTripReviewScroll() {
  updateHeaderTheme();
  if (tripReviewScrollFrame) return;
  tripReviewScrollFrame = requestAnimationFrame(() => {
    tripReviewScrollFrame = null;
    const review = $('.smart-review');
    if (!review) return;
    const condensed = window.scrollY > 170;
    if (review.classList.contains('is-condensed') === condensed) return;
    review.classList.toggle('is-condensed', condensed);
    setTimeout(() => tripReviewMap?.invalidateSize({ animate: false }), 180);
  });
}

function passengerTotal() {
  return state.passengerCount + state.childCount;
}

function tripReviewFare() {
  return (state.ticketType === 'return' ? 9000 : 5000) * passengerTotal() + luggageTotal();
}

function luggageSummary() {
  const paidItems = appData.luggage.reduce((sum, item) => sum + (item.id === 'personal' ? 0 : state.luggageQuantities[item.id] || 0), 0);
  if (!paidItems) return 'Personal item included';
  return `${paidItems} additional item${paidItems === 1 ? '' : 's'} · ${formatUGX(luggageTotal())}`;
}

function bookingAccordion(key, icon, title, summary, body) {
  const open = state.bookingOption === key;
  return `<section class="booking-accordion ${open ? 'is-open' : ''}">
    <button class="booking-accordion__trigger" type="button" data-action="booking-option" data-value="${key}" aria-expanded="${open}" aria-controls="booking-option-${key}">
      <span class="booking-accordion__icon"><i data-lucide="${icon}"></i></span>
      <span class="booking-accordion__copy"><strong>${title}</strong><span>${summary}</span></span>
      <i class="booking-accordion__chevron" data-lucide="chevron-down"></i>
    </button>
    <div id="booking-option-${key}" class="booking-accordion__panel" ${open ? '' : 'hidden'}>${body}</div>
  </section>`;
}

function reviewReturnOptions() {
  if (state.ticketType !== 'return') {
    return `<div class="compact-option-intro"><div><strong>Add a discounted return</strong><p>Secure the outbound and return together for ${formatUGX(9000 * passengerTotal())}.</p></div><button class="button button--primary button--small" type="button" data-action="quick-return-toggle">Add Return</button></div>`;
  }
  const options = [
    ['same-day','calendar-check','Same-day','Return on an eligible departure today'],
    ['date-specific','calendar-days','Choose date','Reserve the return date now'],
    ['open','calendar-range','Open return','Choose an eligible departure later'],
    ['promotional','sparkles','Promotional','Campaign validity applies']
  ];
  return `<div class="compact-choice-grid">${options.map(([value, icon, title, copy]) => `<button class="compact-choice ${state.returnMode === value ? 'is-selected' : ''}" type="button" data-action="return-mode" data-value="${value}" aria-pressed="${state.returnMode === value}"><i data-lucide="${icon}"></i><span><strong>${title}</strong><small>${copy}</small></span></button>`).join('')}</div>
    ${state.returnMode === 'date-specific' ? `<div class="field compact-field"><label for="review-return-date">Return date</label><input id="review-return-date" type="date" value="${state.returnDate}" data-field="return-date"></div>` : ''}
    <div class="compact-note"><i data-lucide="clock-3"></i><span>${state.returnMode === 'open' ? 'Use this return before 21 July 2026 at 10:00 PM.' : state.returnMode === 'same-day' ? 'Eligible on same-day departures with available capacity.' : state.returnMode === 'promotional' ? 'Promotional conditions and expiry will appear on your ticket.' : 'Your chosen return date will be printed on the ticket.'}</span></div>`;
}

function reviewPassengerOptions() {
  return `<div class="compact-steppers">
      <div><span><strong>Adults</strong><small>Age 13 and above</small></span><div class="stepper"><button type="button" data-action="decrease-passengers" aria-label="Remove adult">−</button><span>${state.passengerCount}</span><button type="button" data-action="add-adult" aria-label="Add adult">+</button></div></div>
      <div><span><strong>Children</strong><small>Age 12 and below</small></span><div class="stepper"><button type="button" data-action="decrease-child" aria-label="Remove child">−</button><span>${state.childCount}</span><button type="button" data-action="add-child" aria-label="Add child">+</button></div></div>
    </div>
    <div class="compact-note"><i data-lucide="users-round"></i><span>Passenger names and emergency details are prefilled for this demo. <button class="text-button" type="button" data-screen="passengers">Review full passenger details</button></span></div>`;
}

function reviewAssistanceOptions() {
  const assistance = ['None required','Boarding assistance','Priority seating','Mobility support'];
  const languages = ['English','Luganda','Swahili'];
  return `<p class="field-label">Assistance</p><div class="choice-pills">${assistance.map(value => `<button class="choice-pill ${state.assistance === value ? 'is-selected' : ''}" type="button" data-action="set-assistance" data-value="${value}" aria-pressed="${state.assistance === value}">${value}</button>`).join('')}</div>
    <p class="field-label compact-label">Preferred language</p><div class="choice-pills">${languages.map(value => `<button class="choice-pill ${state.language === value ? 'is-selected' : ''}" type="button" data-action="set-language-inline" data-value="${value}" aria-pressed="${state.language === value}">${value}</button>`).join('')}</div>
    <div class="language-preview">${state.language === 'Luganda' ? 'Oli mwetegefu okutambula?' : state.language === 'Swahili' ? 'Uko tayari kusafiri?' : 'Are you ready to travel?'}</div>`;
}

function reviewLuggageOptions() {
  return `<div class="compact-luggage-list">${appData.luggage.map(item => `<div class="compact-luggage-row"><span class="luggage-icon"><i data-lucide="${item.icon}"></i></span><span><strong>${item.name}</strong><small>${item.guide} · ${formatUGX(item.price)}</small></span><div class="stepper"><button type="button" data-action="luggage-minus" data-id="${item.id}" aria-label="Remove ${item.name}" ${item.id === 'personal' && state.luggageQuantities.personal <= 1 ? 'disabled' : ''}>−</button><span>${state.luggageQuantities[item.id] || 0}</span><button type="button" data-action="luggage-plus" data-id="${item.id}" aria-label="Add ${item.name}">+</button></div></div>`).join('')}</div>
    <div class="compact-note"><i data-lucide="shield-check"></i><span>Fragile and commercial items are reviewed at the stage. A digital luggage tag is issued with your ticket.</span></div>`;
}

function reviewSeatOptions() {
  return `<div class="mode-switch compact-mode-switch"><button class="${state.capacityMode === 'capacity' ? 'is-active' : ''}" type="button" data-action="capacity-mode" data-value="capacity" aria-pressed="${state.capacityMode === 'capacity'}">Best available</button><button class="${state.capacityMode === 'seats' ? 'is-active' : ''}" type="button" data-action="capacity-mode" data-value="seats" aria-pressed="${state.capacityMode === 'seats'}">Choose seats</button></div>
    ${state.capacityMode === 'capacity' ? `<div class="compact-note"><i data-lucide="badge-check"></i><span>${passengerTotal()} place${passengerTotal() === 1 ? '' : 's'} reserved. The crew assigns the best available position at boarding.</span></div>` : renderSeatMode()}`;
}

function renderSeatMode() {
  const seats = [
    ['1A',29.2,29.3], ['1B',45.5,29.3],
    ['2A',28.7,43.3], ['2B',53.2,43.3], ['2C',69.6,43.3],
    ['3A',28.7,57.0], ['3B',53.2,57.0], ['3C',69.6,57.0],
    ['4A',28.7,70.7], ['4B',53.2,70.7], ['4C',69.6,70.7],
    ['5A',31.3,84.1], ['5B',49.8,84.1], ['5C',68.1,84.1]
  ];
  return `<div class="photo-seat-selector" role="group" aria-labelledby="photo-seat-title">
    <span id="photo-seat-title" class="sr-only">Choose passenger seats in the 14-seater vehicle</span>
    <img src="assets/fly-express-14-seater.png" alt="Top view of the Fly Express 14-seater vehicle interior">
    ${seats.map(([seat,left,top]) => `<button class="photo-seat ${state.selectedSeats.includes(seat) ? 'is-selected' : ''}" style="--seat-left:${left}%;--seat-top:${top}%" type="button" data-action="toggle-seat" data-seat="${seat}" aria-pressed="${state.selectedSeats.includes(seat)}" aria-label="${state.selectedSeats.includes(seat) ? 'Deselect' : 'Select'} passenger seat ${seat}"><span>${seat}</span><i data-lucide="check"></i></button>`).join('')}
    <button class="photo-seat photo-seat--driver" style="--seat-left:67.9%;--seat-top:29.4%" type="button" disabled aria-label="Driver seat, not selectable"><span>Driver</span><i data-lucide="gauge"></i></button>
  </div>
  <div class="photo-seat-legend"><span><i class="photo-seat-key"></i>Available</span><span><i class="photo-seat-key photo-seat-key--selected"></i>Selected</span><span><i class="photo-seat-key photo-seat-key--driver"></i>Driver · unavailable</span></div>
  <p class="seat-selection-count" role="status" aria-live="polite"><strong>${state.selectedSeats.length} of ${passengerTotal()}</strong> passenger seat${passengerTotal() === 1 ? '' : 's'} selected</p>`;
}

function renderTripDetails() {
  const trip = state.activeTrip;
  const bookingDate = new Date(`${state.bookingDate}T12:00:00`);
  const reviewDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(bookingDate);
  const returnSummary = state.ticketType === 'return' ? `${state.returnMode === 'date-specific' ? 'Date-specific' : state.returnMode.replace('-', ' ')} · Added` : 'Not added';
  const seatSummary = state.capacityMode === 'seats' ? (state.selectedSeats.join(', ') || 'Choose seats') : 'Best available';
  return `<section class="smart-review" aria-labelledby="review-title">
    <div class="smart-review__map-card">
      <div class="smart-review__map-copy"><p class="eyebrow">${reviewDate}</p><h1 id="review-title">Review your trip</h1><p>You’re almost ready to travel.</p></div>
      <div id="trip-review-map" class="trip-review-map" aria-label="OpenStreetMap preview from ${trip.boarding} to ${trip.destination}"></div>
      <div id="trip-map-fallback" class="trip-map-fallback" hidden><img src="assets/fly-express-van.png" alt=""><strong>Map preview unavailable</strong><span>Your selected route is still ready.</span></div>
    </div>
    <div class="smart-review__sheet">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="review-route-row"><div><span class="review-route-icon review-route-icon--from"><i data-lucide="map-pin"></i></span><span><small>From</small><strong>${trip.boarding}</strong></span></div><span class="review-swap"><i data-lucide="arrow-left-right"></i></span><div><span><small>To</small><strong>${trip.destination}</strong></span><span class="review-route-icon review-route-icon--to"><i data-lucide="map-pin"></i></span></div></div>
      <div class="review-date-row"><span class="review-date-icon"><i data-lucide="calendar-days"></i></span><span><small>Date</small><strong>${reviewDate}</strong></span><button class="text-button" type="button" data-screen="book">Change</button></div>
      <div class="review-section-label">Selected departure</div>
      <article class="review-departure"><div class="review-departure__time"><strong>${trip.depart.replace(' AM','').replace(' PM','')}</strong><span>${trip.depart.includes('AM') ? 'AM' : 'PM'}</span></div><div class="review-departure__service"><span class="review-vehicle-icon"><i data-lucide="bus-front"></i></span><span><strong>${trip.vehicle}</strong><small>${trip.duration} · ${trip.traffic} traffic · ${trip.plate}</small></span></div><div class="review-departure__price"><span>${trip.seats} seats left</span><strong>${formatUGX(trip.fare)}</strong></div><span class="review-check"><i data-lucide="check"></i></span></article>
      <div class="review-section-label review-section-label--options">Make it yours <span>Only open what you need</span></div>
      <div class="booking-accordions">
        ${bookingAccordion('return','refresh-cw','Return trip',returnSummary,reviewReturnOptions())}
        ${bookingAccordion('passengers','users-round','Passengers',`${state.passengerCount} adult${state.passengerCount === 1 ? '' : 's'}${state.childCount ? `, ${state.childCount} child${state.childCount === 1 ? '' : 'ren'}` : ''}`,reviewPassengerOptions())}
        ${bookingAccordion('assistance','headphones','Assistance & language',`${state.assistance} · ${state.language}`,reviewAssistanceOptions())}
        ${bookingAccordion('luggage','luggage','Luggage',luggageSummary(),reviewLuggageOptions())}
        ${bookingAccordion('seats','armchair','Seat preference',seatSummary,reviewSeatOptions())}
      </div>
      <div class="review-reassurance"><i data-lucide="shield-check"></i><span>Personal item included</span><span>•</span><span>Change anything before payment.</span></div>
    </div>
  </section>
  <div class="review-sticky-cta">
    <button class="return-quick-toggle ${state.ticketType === 'return' ? 'is-on' : ''}" type="button" data-action="quick-return-toggle" aria-pressed="${state.ticketType === 'return'}"><span class="return-quick-toggle__icon"><i data-lucide="refresh-cw"></i></span><span><small>Return</small><strong>${state.ticketType === 'return' ? 'Added' : 'Add'}</strong></span><span class="switch ${state.ticketType === 'return' ? 'is-on' : ''}" aria-hidden="true"><span></span></span></button>
    <button class="button button--primary review-pay-button" type="button" data-action="continue-to-checkout"><span>Continue</span><strong>${formatUGX(tripReviewFare())}</strong><i data-lucide="arrow-right"></i></button>
  </div>`;
}

function destroyTripMap() {
  if (tripReviewMap) {
    tripReviewMap.remove();
    tripReviewMap = null;
  }
}

function initTripMap() {
  const target = $('#trip-review-map');
  const fallback = $('#trip-map-fallback');
  if (!target) return;
  if (!window.L) {
    if (fallback) fallback.hidden = false;
    return;
  }
  const outbound = [[0.0606,32.4435],[0.0954,32.4777],[0.1533,32.5234],[0.2219,32.5565],[0.3476,32.5825]];
  const reverse = state.activeTrip.boarding.toLowerCase().includes('kampala');
  const points = reverse ? outbound.slice().reverse() : outbound;
  tripReviewMap = L.map(target, { attributionControl: true, boxZoom: false, doubleClickZoom: false, dragging: false, keyboard: false, scrollWheelZoom: false, touchZoom: false, zoomControl: false });
  let tileErrors = 0;
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, crossOrigin: true, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
  tiles.on('tileload', () => { if (fallback) fallback.hidden = true; });
  tiles.on('tileerror', () => { tileErrors += 1; if (tileErrors > 2 && fallback) fallback.hidden = false; });
  tiles.addTo(tripReviewMap);
  L.polyline(points, { color: '#081b33', opacity: .55, weight: 8 }).addTo(tripReviewMap);
  L.polyline(points, { color: '#1677ff', dashArray: '8 9', lineCap: 'round', opacity: 1, weight: 4 }).addTo(tripReviewMap);
  L.circleMarker(points[0], { color: '#fff', fillColor: '#1677ff', fillOpacity: 1, radius: 9, weight: 4 }).bindTooltip(state.activeTrip.boarding, { permanent: true, direction: 'bottom', offset: [0, 14], className: 'trip-map-label' }).addTo(tripReviewMap);
  L.circleMarker(points[points.length - 1], { color: '#fff', fillColor: '#e51e2a', fillOpacity: 1, radius: 9, weight: 4 }).bindTooltip(state.activeTrip.destination, { permanent: true, direction: 'bottom', offset: [0, 14], className: 'trip-map-label' }).addTo(tripReviewMap);
  
  // Live transit van position marker
  const vehiclePoint = points[state.activeTrip.markerIndex !== undefined ? state.activeTrip.markerIndex : 0];
  L.circleMarker(vehiclePoint, { color: '#fff', fillColor: '#f2a104', fillOpacity: 1, radius: 10, weight: 4 }).bindTooltip(`Live: ${state.activeTrip.plate} (${state.activeTrip.countdown})`, { permanent: true, direction: 'top', offset: [0, -14], className: 'trip-map-vehicle-label' }).addTo(tripReviewMap);
  
  const bounds = L.latLngBounds(points);
  const fitMap = () => {
    if (!tripReviewMap || !target.isConnected) return;
    tripReviewMap.invalidateSize({ animate: false, pan: false });
    tripReviewMap.fitBounds(bounds, { animate: false, paddingTopLeft: [40, 86], paddingBottomRight: [40, 72] });
  };
  fitMap();
  requestAnimationFrame(() => requestAnimationFrame(fitMap));
  setTimeout(fitMap, 320);
}

function bookingPaymentStatus() {
  if (state.luggageQuantities.commercial) return 'Luggage Fee Pending';
  if (state.paymentMethod === 'cash') return 'Payment Pending';
  if ((state.paymentMethod === 'mtn' || state.paymentMethod === 'airtel') && state.paymentDemoState === 'pending') return 'Payment Pending';
  if (state.paymentMethod === 'corporate') return 'Awaiting Approval';
  return 'Paid';
}

function displayReturnType() {
  if (state.ticketType !== 'return') return 'One Way';
  const labels = { 'same-day': 'Same-day Return', 'date-specific': 'Date-specific Return', open: 'Open Return', promotional: 'Promotional Return' };
  return labels[state.returnMode] || 'Return Ticket';
}

function formatDemoDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function renderSuccess() {
  const paymentStatus = bookingPaymentStatus();
  const trip = state.activeTrip;
  return `<section class="success-screen" aria-labelledby="success-title">
    <div class="success-check"><i data-lucide="check"></i></div>
    <p class="eyebrow">Booking successful</p><h1 id="success-title" tabindex="-1">Your trip is reserved</h1><p class="muted">This complete booking is simulated in browser memory and resets on refresh.</p>
    <div class="booking-reference"><i data-lucide="copy"></i>FX-260718-1842</div>
    <article class="card" style="text-align:left"><div class="detail-list"><div class="detail-row"><span>Route</span><strong>${trip.boarding} → ${trip.destination}</strong></div><div class="detail-row"><span>Departure</span><strong>${formatDemoDate(state.bookingDate)} · ${trip.depart}</strong></div><div class="detail-row"><span>Vehicle</span><strong>${trip.plate}</strong></div><div class="detail-row"><span>Passengers</span><strong>${passengerTotal()}</strong></div><div class="detail-row"><span>Ticket</span><strong>${displayReturnType()}</strong></div>${state.ticketType === 'return' && state.returnMode === 'date-specific' ? `<div class="detail-row"><span>Return date</span><strong>${formatDemoDate(state.returnDate)}</strong></div>` : ''}<div class="detail-row"><span>Amount</span><strong>${formatUGX(checkoutTotal())}${state.luggageQuantities.commercial ? ' + stage assessment' : ''}</strong></div><div class="detail-row"><span>Payment method</span><strong>${paymentLabel()}</strong></div><div class="detail-row"><span>Payment status</span><strong class="${paymentStatus === 'Paid' ? 'text-success' : ''}">${paymentStatus}</strong></div></div></article>
    <div class="button-row" style="justify-content:center;margin-top:18px"><button class="button button--primary" type="button" data-screen="ticket"><i data-lucide="ticket-check"></i>View Ticket</button><button class="button button--ghost" type="button" data-action="calendar-demo"><i data-lucide="calendar-plus"></i>Add to Calendar</button><button class="button button--ghost" type="button" data-action="share-demo"><i data-lucide="share-2"></i>Share Ticket</button><button class="button button--ghost" type="button" data-screen="home">Return Home</button></div>
  </section>`;
}

function ticketLifecycle() {
  const paymentStatus = bookingPaymentStatus();
  if (state.ticketStatus !== 'active') return state.ticketStatus;
  return paymentStatus === 'Paid' ? 'active' : 'payment-pending';
}

function renderTicket() {
  const trip = state.activeTrip;
  const lifecycle = ticketLifecycle();
  const statusLabels = { active: 'Active', used: 'Used', expired: 'Expired', cancelled: 'Cancelled', 'payment-pending': 'Payment Pending' };
  const statusIcons = { active: 'circle-check-big', used: 'ticket-check', expired: 'timer-off', cancelled: 'ticket-x', 'payment-pending': 'clock-3' };
  const statusClass = lifecycle === 'active' ? 'status-chip--success' : lifecycle === 'cancelled' || lifecycle === 'expired' ? 'status-chip--danger' : 'status-chip--warning';
  const statusCopy = lifecycle === 'active' ? 'Ready for boarding' : lifecycle === 'used' ? 'Already verified for travel' : lifecycle === 'expired' ? 'Outside its validity window' : lifecycle === 'cancelled' ? 'Booking cancelled · refund pending' : 'Complete payment at the stage or await approval';
  const luggageItems = appData.luggage.filter(item => (state.luggageQuantities[item.id] || 0) > 0).map(item => `${state.luggageQuantities[item.id]} × ${item.name}`).join(', ');
  return `${screenHead('Digital passenger ticket', 'Present this QR code or the six-digit verification code when boarding.', '<button class="button button--ghost" type="button" data-action="ticket-states"><i data-lucide="layers-3"></i>Preview States</button>')}
    <article class="digital-ticket">
      <header class="ticket-header"><div class="ticket-brand"><div class="logo-frame logo-frame--ticket"><img src="assets/fly-express-logo.jpg" alt="Fly Express logo"></div><div><h2>Fly Express</h2><p>Passenger Digital Ticket</p></div></div><span class="status-chip ${statusClass}">${statusLabels[lifecycle]}</span></header>
      <div class="ticket-status-banner ticket-status-banner--${lifecycle}"><i data-lucide="${statusIcons[lifecycle]}"></i><span><strong>${statusLabels[lifecycle]}</strong><small>${statusCopy}</small></span></div>
      <div class="ticket-body">
        <div class="ticket-route"><div class="ticket-route__place"><span>FROM</span><strong>${trip.boarding.replace(' Main Stage','')}</strong><span>${trip.boarding.includes('Main Stage') ? 'Main Stage' : 'Pickup stage'}</span></div><div class="ticket-route__arrow"><i data-lucide="arrow-right"></i></div><div class="ticket-route__place"><span>TO</span><strong>${trip.destination.replace(' Main Stage','')}</strong><span>${trip.destination.includes('Main Stage') ? 'Main Stage' : 'Drop-off stage'}</span></div></div>
        <div class="ticket-grid">
          ${ticketField('Passenger',escapeHtml(state.passengerDetails[0]?.name || appData.passenger.name))}${ticketField('Booking reference','FX-260718-1842')}${ticketField('Ticket number','FET-884210')}${ticketField('Travel date',formatDemoDate(state.bookingDate))}${ticketField('Departure',trip.depart)}${ticketField('Boarding time','15 minutes before departure')}${ticketField('Vehicle',trip.plate)}${ticketField('Ticket type',displayReturnType())}${ticketField('Passengers',String(passengerTotal()))}${ticketField('Capacity reference',state.capacityMode === 'seats' ? state.selectedSeats.join(', ') : 'Best available · Position 04')}${ticketField('Payment status',bookingPaymentStatus())}${ticketField('Fare paid',`${formatUGX(checkoutTotal())}${state.luggageQuantities.commercial ? ' + stage assessment' : ''}`)}${ticketField('Luggage',luggageItems || '1 × Small personal item')}${ticketField('Assistance',state.assistance)}${ticketField('Language',state.language)}${ticketField('Return validity',state.ticketType === 'return' ? (state.returnMode === 'date-specific' ? formatDemoDate(state.returnDate) : 'Until 21 Jul 2026 · 10 PM') : 'Not applicable')}
        </div>
        <div class="ticket-code-area"><div id="ticket-qr" class="ticket-qr-real" aria-label="Scannable demonstration QR code"></div><div><p class="section-kicker">Verification code</p><div class="verification-code">482 915</div><p class="muted text-small">The code verifies this simulated ticket only.</p></div></div>
      </div>
      <div class="ticket-perforation"></div>
      <footer class="ticket-actions">${lifecycle === 'payment-pending' ? `<button class="button button--primary button--small" type="button" data-action="change-seats-unpaid"><i data-lucide="armchair"></i>Change Seats</button>` : ''}<button class="button button--primary button--small" type="button" data-action="download-demo"><i data-lucide="download"></i>Download Ticket</button><button class="button button--ghost button--small" type="button" data-action="share-demo"><i data-lucide="share-2"></i>Share</button><button class="button button--ghost button--small" type="button" data-screen="live"><i data-lucide="route"></i>View Route</button><button class="button button--ghost button--small" type="button" data-screen="support"><i data-lucide="headphones"></i>Support</button><button class="button button--soft-red button--small" type="button" data-action="cancel-booking"><i data-lucide="x"></i>Cancel Booking</button></footer>
    </article>`;
}

function initTicketQr() {
  const target = $('#ticket-qr');
  if (!target) return;
  target.innerHTML = '';
  if (!window.QRCode) {
    target.innerHTML = '<div class="ticket-code-fallback"><strong>482 915</strong><span>QR preview unavailable</span></div>';
    return;
  }
  new QRCode(target, { text: `FLYEXPRESS|FX-260718-1842|FET-884210|${state.activeTrip.plate}|482915`, width: 164, height: 164, colorDark: '#081b33', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
}

function initParcelBarcode() {
  const target = $('#parcel-barcode');
  if (!target) return;
  if (!window.JsBarcode) {
    target.setAttribute('viewBox', '0 0 360 92');
    target.innerHTML = '<text x="180" y="52" text-anchor="middle" font-size="18" font-family="sans-serif" fill="#081b33">FXP-260718-0842</text>';
    return;
  }
  JsBarcode(target, 'FXP-260718-0842', { format: 'CODE128', width: 2, height: 72, displayValue: true, fontSize: 15, lineColor: '#081b33', margin: 8 });
}

/* =========================================================
   Interaction handling
   ========================================================= */

function handleClick(event) {
  const screenTrigger = event.target.closest('[data-screen]');
  if (screenTrigger) {
    const screen = screenTrigger.dataset.screen;
    if (screen === 'about') navigate('about'); else navigate(screen);
    closeModal(); closeSheet(); closeSideDrawer();
    return;
  }

  const actionTrigger = event.target.closest('[data-action]');
  if (!actionTrigger) return;
  if ((actionTrigger.classList.contains('modal-backdrop') || actionTrigger.classList.contains('sheet-backdrop') || actionTrigger.classList.contains('side-drawer__backdrop')) && event.target !== actionTrigger) return;
  const action = actionTrigger.dataset.action;
  const value = actionTrigger.dataset.value;

  const actions = {
    'toggle-side-drawer': openSideDrawer,
    'close-drawer': closeSideDrawer,
    'skip-intro': () => showAuth('signin'),
    'skip-onboarding': () => showAuth('signin'),
    'onboarding-next': () => {
      if (state.onboardingIndex < onboardingSlides.length - 1) { state.onboardingIndex += 1; renderOnboarding(); }
      else showAuth('signin');
    },
    'onboarding-back': () => { state.onboardingIndex = Math.max(0, state.onboardingIndex - 1); renderOnboarding(); },
    'onboarding-go': () => { state.onboardingIndex = Number(actionTrigger.dataset.index); renderOnboarding(); },
    'continue-signin': () => { state.authView = 'otp'; renderAuth(); },
    'continue-guest': () => enterApp('Guest preview opened. No account was created.'),
    'show-registration': () => { state.authView = 'register'; renderAuth(); },
    'auth-back': () => { state.authView = 'signin'; renderAuth(); },
    'change-number': () => { state.authView = 'signin'; renderAuth(); },
    'resend-otp': () => { startOtpCountdown(); toast('A new demonstration code is ready: 123456.', 'success'); },
    'verify-otp': () => verifyOtp(),
    'create-account': () => { showLoading('Creating demonstration profile…', () => enterApp('Demo account created for Sarah Nabirye.')); },
    'go-back': goBack,
    'open-more': openMoreSheet,
    'toggle-connection': toggleConnection,
    'trip-kind': () => { state.tripType = value; state.ticketType = value === 'return' ? 'return' : 'oneway'; renderCurrentScreen(); },
    'swap-route': swapRoute,
    'search-trips': () => simulateNavigation('Searching demonstration departures…', 'book'),
    'select-departure': () => { const trip = appData.trips.find(t => t.depart === actionTrigger.dataset.trip) || appData.trips[0]; state.activeTrip = trip; navigate('trip-details'); },
    'choose-trip': () => { state.activeTrip = getSearchResults().find(t => t.id === actionTrigger.dataset.tripId) || getSearchResults()[0] || appData.trips[0]; navigate('trip-details'); },
    'show-search-filters': showSearchFilters,
    'apply-filters': () => { closeModal(); toast('Demonstration filters applied.', 'success'); },
    'search-anytime': () => toast('All departure periods are now included.', 'success'),
    'booking-option': () => { state.bookingOption = state.bookingOption === value ? '' : value; renderCurrentScreen(); },
    'quick-return-toggle': () => { state.ticketType = state.ticketType === 'return' ? 'oneway' : 'return'; state.tripType = state.ticketType === 'return' ? 'return' : 'oneway'; if (state.ticketType === 'return') state.returnMode = state.returnMode || 'open'; renderCurrentScreen(); toast(state.ticketType === 'return' ? 'Return trip added.' : 'Return trip removed.', 'success'); },
    'continue-to-checkout': () => navigate('checkout'),
    'change-seats-checkout': () => { state.bookingOption = 'seats'; navigate('trip-details'); },
    'change-seats-unpaid': () => { state.bookingOption = 'seats'; navigate('trip-details'); },
    'set-assistance': () => { state.assistance = value; renderCurrentScreen(); },
    'set-language-inline': () => { state.language = value; renderCurrentScreen(); },
    'capacity-mode': () => { state.capacityMode = value; renderCurrentScreen(); },
    'toggle-seat': () => toggleSeat(actionTrigger.dataset.seat),
    'add-adult': () => { state.passengerCount = Math.min(4, state.passengerCount + 1); renderCurrentScreen(); },
    'add-child': () => { state.childCount = Math.min(2, state.childCount + 1); renderCurrentScreen(); },
    'decrease-passengers': () => { state.passengerCount = Math.max(1, state.passengerCount - 1); renderCurrentScreen(); },
    'decrease-child': () => { state.childCount = Math.max(0, state.childCount - 1); renderCurrentScreen(); },
    'select-ticket-type': () => { state.ticketType = value; state.tripType = value === 'return' ? 'return' : 'oneway'; renderCurrentScreen(); toast(value === 'return' ? 'Discounted return package selected.' : 'One-way ticket selected.', 'success'); },
    'return-mode': () => { state.returnMode = value; state.ticketType = 'return'; state.tripType = 'return'; renderCurrentScreen(); },
    'luggage-plus': () => updateLuggage(actionTrigger.dataset.id, 1),
    'luggage-minus': () => updateLuggage(actionTrigger.dataset.id, -1),
    'no-luggage': noAdditionalLuggage,
    'payment-state': () => { state.paymentDemoState = value; renderCurrentScreen(); },
    'payment-reset': () => { state.paymentDemoState = 'idle'; renderCurrentScreen(); },
    'apply-voucher': applyVoucher,
    'confirm-booking': confirmBooking,
    'calendar-demo': () => toast('Calendar preview prepared. No calendar was changed.', 'success'),
    'share-demo': () => showShareModal(),
    'download-demo': () => toast('A download would be generated in the production application.', 'success'),
    'ticket-states': showTicketStates,
    'cancel-booking': showCancelBooking,
    'trip-tab': () => { state.tripTab = value; renderCurrentScreen(); },
    'change-return': showReturnDateModal,
    'rate-trip': showRatingModal,
    'lost-item': () => openLostPropertyModal(),
    'share-trip': () => showShareModal('Share live trip'),
    'emergency': showEmergencyModal,
    'open-add-funds': openAddFunds,
    'wallet-filter': () => { state.walletFilter = value; renderCurrentScreen(); },
    'send-passenger': showSendPassenger,
    'toggle-switch': () => { actionTrigger.classList.toggle('is-on'); toast(`Setting ${actionTrigger.classList.contains('is-on') ? 'enabled' : 'disabled'} for this session.`, 'success'); },
    'wallet-pin': showWalletPin,
    'parcel-category': () => { state.parcelCategory = value; renderCurrentScreen(); },
    'parcel-back': () => { state.parcelStep = Math.max(1, state.parcelStep - 1); renderCurrentScreen(); },
    'parcel-next': advanceParcel,
    'parcel-payment-state': () => { state.parcelPaymentDemoState = value; renderCurrentScreen(); },
    'parcel-payment-reset': () => { state.parcelPaymentDemoState = 'idle'; renderCurrentScreen(); },
    'upload-demo': () => toast('Attachment placeholder selected. No file was uploaded.', 'success'),
    'track-parcel': loadTracking,
    'tracking-state': () => { state.parcelTrackingState = value; renderCurrentScreen(); },
    'invalid-tracking': showInvalidTracking,
    'offer-details': showOfferDetails,
    'sponsored-details': showSponsoredDetails,
    'mark-all-read': markAllRead,
    'notification-filter': () => { state.notificationFilter = value; renderCurrentScreen(); },
    'notification-detail': () => showNotificationDetail(Number(actionTrigger.dataset.id)),
    'notification-preferences': showNotificationPreferences,
    'faq-toggle': () => actionTrigger.closest('.faq-item')?.classList.toggle('is-open'),
    'call-support': () => showCallSupport(),
    'chat-support': () => showChatSupport(),
    'support-category': () => selectSupportCategory(value),
    'submit-support': () => { state.supportSubmitted = true; renderCurrentScreen(); toast('Support request SUP-44720 submitted.', 'success'); },
    'new-support': () => { state.supportSubmitted = false; renderCurrentScreen(); },
    'support-statuses': showSupportStatuses,
    'edit-profile': showEditProfile,
    'saved-passengers': showSavedPassengers,
    'saved-pickups': showSavedPickups,
    'language': showLanguageModal,
    'privacy': showPrivacy,
    'terms': showTerms,
    'accessibility': () => toggleAccessibility(value),
    'open-demo-panel': openDemoPanel,
    'sign-out': signOut,
    'close-modal': closeModal,
    'close-sheet': closeSheet,
    'demo-state': () => triggerDemoState(value),
    'amount-preset': () => selectAmountPreset(actionTrigger),
    'deposit-state': () => showDepositState(value),
    'save-profile': () => { closeModal(); toast('Profile changes saved for this browser session.', 'success'); },
    'save-language': () => saveLanguage(),
    'save-preferences': () => { closeModal(); toast('Notification preferences updated for this session.', 'success'); },
    'send-wallet-demo': () => { closeModal(); toast('Demo transfer prepared. No funds were moved.', 'success'); },
    'set-wallet-pin': () => { closeModal(); toast('Wallet PIN updated for this session.', 'success'); },
    'confirm-cancel': () => { closeModal(); state.ticketStatus = 'cancelled'; state.tripTab = 'cancelled'; navigate('trips'); toast('Booking moved to the Cancelled preview state.', 'warning'); },
    'save-return-date': () => saveReturnDate(),
    'submit-rating': () => { closeModal(); toast('Thank you. Your demonstration rating was recorded.', 'success'); },
    'submit-lost-item': () => { closeModal(); toast('Lost-property report LP-1842 submitted.', 'success'); },
    'copy-code': () => toast('Verification code copied in the mockup.', 'success')
  };

  if (actions[action]) actions[action]();
}

function handleChange(event) {
  const target = event.target;
  const bookingFields = {
    'search-from': value => { state.searchFrom = value; },
    'search-to': value => { state.searchTo = value; },
    'booking-date': value => { state.bookingDate = value; },
    'search-period': value => { state.searchPeriod = value; },
    'search-adults': value => { state.passengerCount = Number(value) || 1; },
    'search-children': value => { state.childCount = Number(value) || 0; }
  };
  bookingFields[target.dataset.field]?.(target.value);
  if (target.dataset.field === 'return-date') {
    state.returnDate = target.value;
  }
  if (target.name === 'payment-method') {
    state.paymentMethod = target.value;
    state.paymentDemoState = 'idle';
    renderCurrentScreen();
  }
  if (target.name === 'parcel-delivery') {
    state.parcelDelivery = target.value;
    renderCurrentScreen();
  }
  if (target.name === 'parcel-payment-method') {
    state.parcelPaymentMethod = target.value;
    state.parcelPaymentDemoState = 'idle';
    renderCurrentScreen();
  }
  if (target.dataset.parcelField) state.parcel[target.dataset.parcelField] = target.value;
  if (target.dataset.passengerField) {
    const index = Number(target.dataset.passengerIndex);
    if (state.passengerDetails[index]) state.passengerDetails[index][target.dataset.passengerField] = target.value;
    if (index === 0 && target.dataset.passengerField === 'assistance') state.assistance = target.value;
  }
}

function handleInput(event) {
  const target = event.target;
  if (target.dataset.parcelField) state.parcel[target.dataset.parcelField] = target.value;
  if (target.dataset.passengerField) {
    const index = Number(target.dataset.passengerIndex);
    if (state.passengerDetails[index]) state.passengerDetails[index][target.dataset.passengerField] = target.value;
  }
  if (target.classList.contains('otp-input') && target.value.length === 1) {
    const fields = $$('.otp-input');
    const index = fields.indexOf(target);
    if (index < fields.length - 1) fields[index + 1].focus();
  }
}

function handleKeydown(event) {
  const activeDialog = $('#modal-root [role="dialog"]') || $('#sheet-root [role="dialog"]');
  if (event.key === 'Tab' && activeDialog) {
    const focusable = $$('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])', activeDialog).filter(element => !element.hidden);
    if (!focusable.length) { event.preventDefault(); activeDialog.focus(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !activeDialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (event.key === 'Escape') {
    if ($('#modal-root [role="dialog"]')) closeModal();
    else if ($('#sheet-root [role="dialog"]')) closeSheet();
  }
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[role="button"][data-screen], [role="button"][data-action]')) {
    event.preventDefault(); event.target.click();
  }
}

function verifyOtp() {
  const code = $$('.otp-input').map(input => input.value).join('');
  if (code === '123456') showLoading('Verifying demonstration code…', () => enterApp('Sign-in preview verified successfully.'));
  else toast('Use the demonstration code 123456.', 'danger');
}

function swapRoute() {
  const from = $('#home-from') || $('#book-from'); const to = $('#home-to') || $('#book-to');
  if (from && to) {
    const fromValue = from.value; const toValue = to.value;
    state.searchFrom = toValue;
    state.searchTo = fromValue;
    from.value = toValue;
    to.value = fromValue;
    toast('Route direction swapped.', 'success');
  }
}

function saveReturnDate() {
  const value = $('#return-date-modal')?.value;
  if (!value || value < state.bookingDate) {
    toast('Choose a return date on or after the outbound trip.', 'danger');
    return;
  }
  state.returnDate = value;
  state.ticketType = 'return';
  state.tripType = 'return';
  state.returnMode = 'date-specific';
  closeModal();
  renderCurrentScreen(false);
  toast(`Return date updated to ${formatDemoDate(value)}.`, 'success');
}

function toggleSeat(seat) {
  if (!seat) return;
  if (state.selectedSeats.includes(seat)) state.selectedSeats = state.selectedSeats.filter(value => value !== seat);
  else if (state.selectedSeats.length < state.passengerCount + state.childCount) state.selectedSeats.push(seat);
  else toast('The selected seat count already matches the passenger count.', 'warning');
  renderCurrentScreen();
}

function updateLuggage(id, delta) {
  state.luggageQuantities[id] = Math.max(0, Math.min(5, (state.luggageQuantities[id] || 0) + delta));
  renderCurrentScreen();
}

function noAdditionalLuggage() {
  Object.keys(state.luggageQuantities).forEach(key => state.luggageQuantities[key] = 0);
  state.luggageQuantities.personal = 1;
  renderCurrentScreen();
  toast('Only the free personal item remains selected.', 'success');
}

function applyVoucher() {
  const code = $('#voucher-code')?.value.trim().toUpperCase();
  if (code !== 'FLY2000') {
    toast('Use the demonstration voucher FLY2000.', 'danger');
    return;
  }
  state.voucherApplied = true;
  state.paymentMethod = 'wallet';
  state.paymentDemoState = 'idle';
  renderCurrentScreen();
  toast('UGX 2,000 voucher applied. Choose how to pay the balance.', 'success');
}

function confirmBooking() {
  const accepted = $('#booking-conditions')?.checked;
  if (!accepted) { toast('Accept the booking conditions to continue.', 'danger'); return; }
  if (passengerTotal() > state.activeTrip.seats) { toast(`Only ${state.activeTrip.seats} passenger spaces remain on this departure. Choose another trip or reduce the group.`, 'danger'); return; }
  if (state.ticketType === 'return' && state.returnMode === 'date-specific' && state.returnDate < state.bookingDate) { toast('Choose a return date on or after the outbound trip.', 'danger'); return; }
  if (state.capacityMode === 'seats' && state.selectedSeats.length !== passengerTotal()) { toast(`Choose ${passengerTotal()} seat${passengerTotal() === 1 ? '' : 's'}, or use best available.`, 'danger'); return; }
  if (state.paymentMethod === 'wallet') {
    const pin = $('#wallet-pin')?.value.trim() || '';
    if (!/^\d{4}$/.test(pin)) { toast('Enter any four digits for the demonstration wallet PIN.', 'danger'); return; }
    if (checkoutTotal() > state.walletBalance) { toast('The demonstration wallet balance is insufficient. Choose another payment method.', 'danger'); return; }
  }
  if (state.paymentMethod === 'mtn' || state.paymentMethod === 'airtel') {
    if (state.paymentDemoState === 'idle') { toast('Simulate a mobile-money response before confirming.', 'danger'); return; }
    if (state.paymentDemoState === 'failed') { toast('The simulated authorization failed. Reset it or choose another payment method.', 'danger'); return; }
  }
  if (state.paymentMethod === 'corporate' && ($('#corporate-reference')?.value.trim().length || 0) < 4) { toast('Enter a valid corporate account reference.', 'danger'); return; }
  if (state.paymentMethod === 'voucher') { toast('Apply the voucher, then choose how to pay the remaining balance.', 'danger'); return; }
  state.ticketStatus = 'active';
  showLoading('Creating demonstration booking…', () => { navigate('success'); toast('Your trip is reserved in the prototype.', 'success'); });
}

function loadTracking() {
  const value = $('#tracking-number')?.value.trim();
  if (!value || value.toUpperCase() !== 'FXP-260718-0842') showInvalidTracking();
  else { showLoading('Loading parcel history…', () => { state.parcelTrackingState = 'intransit'; renderCurrentScreen(); toast('Parcel tracking loaded.', 'success'); }); }
}

function markAllRead() {
  appData.notifications.forEach(item => item.unread = false);
  state.unreadNotifications = 0;
  renderNavigation(); renderCurrentScreen();
  $('#notification-badge').textContent = '0';
  $('#notification-badge').classList.add('is-hidden');
  toast('All notifications marked as read.', 'success');
}

function selectSupportCategory(category) {
  const select = $('#support-category');
  if (select) select.value = category;
  toast(`${category} selected. Complete the support form.`, 'success');
  window.scrollTo({ top: 250, behavior: 'smooth' });
}

function toggleAccessibility(className) {
  document.body.classList.toggle(className);
  renderCurrentScreen();
  toast(`${className.replace('-', ' ')} ${document.body.classList.contains(className) ? 'enabled' : 'disabled'}.`, 'success');
}

function toggleConnection() {
  state.connected = !state.connected;
  document.body.classList.toggle('offline', !state.connected);
  $$('.connection-label').forEach(el => el.textContent = state.connected ? 'Online' : 'Offline');
  toast(state.connected ? 'Connection restored — demonstration state.' : 'No internet — demonstration state.', state.connected ? 'success' : 'warning');
}

function simulateNavigation(message, screen) {
  showLoading(message, () => navigate(screen));
}

function showLoading(message, callback, duration = 750) {
  $('#loading-message').textContent = message;
  $('#loading-overlay').classList.remove('is-hidden');
  refreshIcons();
  setTimeout(() => {
    $('#loading-overlay').classList.add('is-hidden');
    if (callback) callback();
  }, duration);
}

function toast(message, type = 'default') {
  const region = $('#toast-region');
  const icon = type === 'success' ? 'circle-check' : type === 'danger' ? 'circle-x' : type === 'warning' ? 'triangle-alert' : 'info';
  const element = document.createElement('div');
  element.className = `toast toast--${type}`;
  element.innerHTML = `<i data-lucide="${icon}"></i><span>${escapeHtml(message)}</span>`;
  region.appendChild(element);
  refreshIcons();
  setTimeout(() => element.remove(), 3600);
}

/* =========================================================
   Modals and bottom sheets
   ========================================================= */

let modalOpener = null;
let sheetOpener = null;

function updateBackgroundInert() {
  const active = Boolean($('#modal-root [role="dialog"]') || $('#sheet-root [role="dialog"]'));
  const shell = $('#app-shell');
  if (shell) {
    if (active) shell.setAttribute('inert', '');
    else shell.removeAttribute('inert');
  }
}

function openModal(title, body, footer = '', wide = false) {
  if (!$('#modal-root [role="dialog"]')) modalOpener = document.activeElement;
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal ${wide ? 'modal--wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal__head"><div><p class="eyebrow">Fly Express Prototype</p><h2 id="modal-title">${title}</h2></div><button class="icon-button icon-button--plain" type="button" data-action="close-modal" aria-label="Close dialog"><i data-lucide="x"></i></button></header><div>${body}</div>${footer ? `<footer class="modal__foot">${footer}</footer>` : ''}</section></div>`;
  updateBackgroundInert();
  refreshIcons();
  setTimeout(() => $('.modal button, .modal input, .modal select')?.focus(), 20);
}

function closeModal() {
  const hadModal = Boolean($('#modal-root [role="dialog"]'));
  $('#modal-root').innerHTML = '';
  updateBackgroundInert();
  if (hadModal && modalOpener?.isConnected) modalOpener.focus({ preventScroll: true });
  modalOpener = null;
}
function closeSheet() {
  const hadSheet = Boolean($('#sheet-root [role="dialog"]'));
  $('#sheet-root').innerHTML = '';
  updateBackgroundInert();
  if (hadSheet && sheetOpener?.isConnected) sheetOpener.focus({ preventScroll: true });
  sheetOpener = null;
}

function openSideDrawer() {
  const drawer = $('#side-drawer');
  if (!drawer) return;
  drawer.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  refreshIcons();
}
function closeSideDrawer() {
  const drawer = $('#side-drawer');
  if (!drawer) return;
  drawer.classList.add('is-hidden');
  document.body.style.overflow = '';
}

function openMoreSheet() {
  const extra = navItems.filter(([screen]) => !['home','book','trips','wallet'].includes(screen));
  sheetOpener = document.activeElement;
  $('#sheet-root').innerHTML = `<div class="sheet-backdrop" data-action="close-sheet"><section class="bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="more-sheet-title" tabindex="-1"><div class="bottom-sheet__grabber"></div><div class="card-head"><div><p class="section-kicker">More services</p><h2 id="more-sheet-title">Fly Express Passenger App</h2></div><button class="icon-button icon-button--plain" type="button" data-action="close-sheet" aria-label="Close services menu"><i data-lucide="x"></i></button></div><div class="grid grid--2">${extra.map(([screen,label,icon]) => `<button class="card card--compact card--hover" style="text-align:left;cursor:pointer" type="button" data-screen="${screen}"><span class="quick-action__icon"><i data-lucide="${icon}"></i></span><strong style="display:block;margin-top:9px">${label}</strong></button>`).join('')}</div></section></div>`;
  updateBackgroundInert();
  refreshIcons();
  setTimeout(() => $('#sheet-root button[data-action="close-sheet"]')?.focus(), 20);
}

function showSearchFilters() {
  openModal('Search filters', `<div class="form-grid"><div class="field"><label>Approximate travel time</label><select><option>Any duration</option><option>Up to 60 minutes</option><option>Up to 90 minutes</option></select></div><div class="field"><label>Vehicle type</label><select><option>All vehicles</option><option>14-seat high-roof van</option><option>18-seat high-roof van</option></select></div><div class="field"><label>Capacity</label><select><option>Any availability</option><option>5+ spaces</option><option>10+ spaces</option></select></div><div class="field"><label>Traffic condition</label><select><option>All conditions</option><option>Light</option><option>Moderate</option></select></div></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="apply-filters">Apply Filters</button>`);
}

function showShareModal(title = 'Share ticket') {
  openModal(title, `<p class="muted">Choose a visual sharing destination. Nothing will leave this browser.</p><div class="grid grid--2"><button class="card card--compact card--hover" type="button" data-action="close-modal"><i data-lucide="message-circle"></i><strong style="display:block;margin-top:8px">WhatsApp preview</strong></button><button class="card card--compact card--hover" type="button" data-action="close-modal"><i data-lucide="mail"></i><strong style="display:block;margin-top:8px">Email preview</strong></button><button class="card card--compact card--hover" type="button" data-action="copy-code"><i data-lucide="copy"></i><strong style="display:block;margin-top:8px">Copy reference</strong></button><button class="card card--compact card--hover" type="button" data-action="close-modal"><i data-lucide="share-2"></i><strong style="display:block;margin-top:8px">More options</strong></button></div>`);
}

function showTicketStates() {
  const states = [['Active','status-chip--success'],['Used','status-chip--info'],['Expired','status-chip--warning'],['Cancelled','status-chip--danger'],['Payment Pending','status-chip--warning']];
  openModal('Ticket state preview', `<p class="muted">Review how the passenger ticket communicates each lifecycle state without relying on color alone.</p><div class="grid">${states.map(([label,cls]) => `<button class="card card--compact card--hover" type="button" data-action="demo-state" data-value="ticket-${label.toLowerCase().replaceAll(' ','-')}"><span class="status-chip ${cls}">${label}</span><strong style="display:block;margin-top:9px">${label} ticket</strong><span class="muted text-small">Trigger the ${label.toLowerCase()} ticket demonstration.</span></button>`).join('')}</div>`);
}

function showCancelBooking() {
  openModal('Cancel booking?', `<div class="notice"><i data-lucide="triangle-alert"></i><div><strong>This changes only the prototype state.</strong><div>No real booking or refund will be created.</div></div></div><div class="field" style="margin-top:15px"><label>Cancellation reason</label><select><option>Change of travel plans</option><option>Booked wrong time</option><option>Prefer another departure</option></select></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Keep Booking</button><button class="button button--soft-red" type="button" data-action="confirm-cancel">Cancel Demo Booking</button>`);
}

function showReturnDateModal() {
  openModal('Change return date', `<div class="field"><label for="return-date-modal">New return date</label><input id="return-date-modal" type="date" min="${state.bookingDate}" value="${state.returnDate}"></div><div class="field" style="margin-top:12px"><label for="return-period-modal">Preferred period</label><select id="return-period-modal"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div><div class="notice" style="margin-top:14px"><i data-lucide="info"></i><div>Open return availability remains subject to eligible departures.</div></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="save-return-date">Save Date</button>`);
}

function showRatingModal() {
  openModal('Rate your trip', `<p class="muted">How was your completed journey?</p><div class="choice-pills">${[1,2,3,4,5].map(n => `<button class="choice-pill ${n === 5 ? 'is-selected' : ''}" type="button">${n} / 5</button>`).join('')}</div><div class="field" style="margin-top:14px"><label>Feedback</label><textarea>The vehicle departed on time and the crew was professional.</textarea></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="submit-rating">Submit Rating</button>`);
}

function openLostPropertyModal() {
  openModal('Report lost property', `<div class="form-grid"><div class="field"><label>Related trip</label><select><option>16 Jul · Kampala → Entebbe</option></select></div><div class="field"><label>Item category</label><select><option>Bag</option><option>Phone</option><option>Documents</option><option>Clothing</option></select></div><div class="field field--full"><label>Item description</label><textarea>Black notebook left near the rear seat.</textarea></div><div class="field field--full"><label>Contact number</label><input value="+256 772 345 678"></div></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="submit-lost-item">Submit Report</button>`);
}

function showEmergencyModal() {
  openModal('Emergency and safety contact', `<div class="payment-state"><div class="payment-state__icon payment-state__icon--failed"><i data-lucide="siren"></i></div><h3>Fly Express emergency assistance</h3><p class="muted">In a production app this would offer verified emergency calling and trip context. This prototype does not place calls.</p></div><div class="detail-list"><div class="detail-row"><span>Vehicle</span><strong>${state.activeTrip.plate}</strong></div><div class="detail-row"><span>Route</span><strong>${state.activeTrip.boarding} → ${state.activeTrip.destination}</strong></div><div class="detail-row"><span>Demonstration number</span><strong>+256 700 000 099</strong></div></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Close</button><button class="button button--soft-red" type="button" data-action="close-modal">Call Preview</button>`);
}

function openAddFunds() {
  openModal('Add wallet funds', `<div class="notice"><i data-lucide="info"></i><div>This preview does not process or store real money.</div></div><div class="field" style="margin-top:14px"><label for="wallet-funding-method">Funding method</label><select id="wallet-funding-method"><option>MTN Mobile Money</option><option>Airtel Money</option><option>Voucher</option><option>Stage Agent</option></select></div><p class="field-label" style="margin-top:14px">Choose amount</p><div class="amount-presets">${[5000,10000,20000,50000,100000].map(amount => `<button class="amount-preset ${state.walletDepositAmount === amount ? 'is-selected' : ''}" type="button" data-action="amount-preset" data-amount="${amount}" aria-pressed="${state.walletDepositAmount === amount}">${formatUGX(amount)}</button>`).join('')}<button class="amount-preset" type="button" data-action="amount-preset" data-amount="custom" aria-pressed="false">Custom</button></div><div class="field"><label for="wallet-custom-amount">Custom amount</label><input id="wallet-custom-amount" inputmode="numeric" value="${state.walletDepositAmount}"></div><div class="button-row" style="margin-top:15px"><button class="button button--secondary button--small" type="button" data-action="deposit-state" data-value="pending">Pending</button><button class="button button--success button--small" type="button" data-action="deposit-state" data-value="success">Success</button><button class="button button--soft-red button--small" type="button" data-action="deposit-state" data-value="failed">Failure</button></div>`, '', true);
}

function selectAmountPreset(button) {
  const amount = button.dataset.amount === 'custom' ? Number(String($('#wallet-custom-amount')?.value || '').replace(/\D/g, '')) : Number(button.dataset.amount);
  if (Number.isFinite(amount) && amount > 0) state.walletDepositAmount = amount;
  $$('.amount-preset').forEach(item => { item.classList.remove('is-selected'); item.setAttribute('aria-pressed', 'false'); });
  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
  const custom = $('#wallet-custom-amount');
  if (custom && button.dataset.amount !== 'custom') custom.value = state.walletDepositAmount;
}

function showDepositState(type) {
  const custom = Number(String($('#wallet-custom-amount')?.value || '').replace(/\D/g, ''));
  if (custom > 0) state.walletDepositAmount = custom;
  const title = type === 'pending' ? 'Deposit pending' : type === 'success' ? 'Wallet deposit successful' : 'Wallet deposit failed';
  const copy = type === 'pending' ? `The simulated ${formatUGX(state.walletDepositAmount)} authorization is awaiting approval.` : type === 'success' ? `${formatUGX(state.walletDepositAmount)} was added to the demonstration wallet.` : 'The simulated authorization was declined.';
  if (type === 'success') state.walletBalance += state.walletDepositAmount;
  openModal(title, `<div class="payment-state"><div class="payment-state__icon payment-state__icon--${type}"><i data-lucide="${type === 'pending' ? 'loader-circle' : type === 'success' ? 'circle-check-big' : 'circle-x'}"></i></div><h3>${title}</h3><p class="muted">${copy}</p><p class="privacy-note">All balances reset when the page refreshes.</p></div>`, `<button class="button button--primary" type="button" data-action="close-modal">Done</button>`);
  if (type === 'success') toast('Wallet deposit successful — demonstration state.', 'success');
}

function showSendPassenger() {
  openModal('Send to another passenger', `<div class="form-grid"><div class="field field--full"><label>Passenger telephone number</label><input value="+256 700 555 018"></div><div class="field field--full"><label>Amount</label><input value="UGX 5,000"></div><div class="field field--full"><label>Wallet PIN</label><input type="password" value="2580"></div></div><div class="notice" style="margin-top:14px"><i data-lucide="info"></i><div>No funds will move. This is a visual workflow only.</div></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="send-wallet-demo">Continue</button>`);
}

function showWalletPin() {
  openModal('Wallet PIN settings', `<div class="field"><label>Current PIN</label><input type="password" value="2580"></div><div class="field" style="margin-top:12px"><label>New four-digit PIN</label><input type="password" value="4829"></div><div class="field" style="margin-top:12px"><label>Confirm new PIN</label><input type="password" value="4829"></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="set-wallet-pin">Update PIN</button>`);
}

function showInvalidTracking() {
  openModal('No parcel found', `<div class="payment-state"><div class="payment-state__icon payment-state__icon--failed"><i data-lucide="package-x"></i></div><h3>Tracking number not recognized</h3><p class="muted">Check the number and try <strong>FXP-260718-0842</strong> for the demonstration result.</p></div>`, `<button class="button button--primary" type="button" data-action="close-modal">Try Again</button>`);
}

function showOfferDetails() {
  openModal('Offer conditions', `<div class="detail-list"><div class="detail-row"><span>Eligibility</span><strong>Selected passenger accounts</strong></div><div class="detail-row"><span>Validity</span><strong>Presentation period only</strong></div><div class="detail-row"><span>Redemption</span><strong>Automatic at checkout preview</strong></div></div><div class="notice" style="margin-top:14px"><i data-lucide="badge-info"></i><div>All offers are fictional demonstration content and have no monetary value.</div></div>`);
}

function showSponsoredDetails() {
  openModal('Sponsored advertisement', `<span class="sponsored-label" style="background:var(--charcoal);color:white">Sponsored</span><h3 style="margin-top:14px">Fictional local business advertisement</h3><p class="muted">This area demonstrates how Fly Express could present approved advertiser content without confusing it with transport operations.</p><div class="detail-list"><div class="detail-row"><span>Advertiser</span><strong>Demonstration partner</strong></div><div class="detail-row"><span>Placement</span><strong>Passenger offers</strong></div><div class="detail-row"><span>External action</span><strong>Disabled in prototype</strong></div></div>`);
}

function showNotificationDetail(id) {
  const item = appData.notifications.find(n => n.id === id);
  if (!item) return;
  if (item.unread) {
    item.unread = false;
    state.unreadNotifications = Math.max(0, state.unreadNotifications - 1);
    renderNavigation();
    const row = $(`[data-action="notification-detail"][data-id="${id}"]`);
    row?.classList.remove('is-unread');
    row?.querySelector('.unread-dot')?.remove();
  }
  openModal(item.title, `<span class="status-chip status-chip--info">${item.category}</span><p style="margin-top:14px">${item.body}</p><p class="muted text-small">${item.time}</p>`, `<button class="button button--primary" type="button" data-action="close-modal">Done</button>`);
}

function showNotificationPreferences() {
  const categories = ['Trip alerts','Payment updates','Wallet activity','Parcel updates','Luggage notices','Promotions','Service notices','Support messages'];
  openModal('Notification preferences', `<div class="settings-list">${categories.map((label,index) => `<div class="settings-row"><span class="settings-row__icon"><i data-lucide="bell-ring"></i></span><span class="settings-row__copy"><strong>${label}</strong><span>${index === 5 ? 'Optional marketing messages' : 'Recommended operational alerts'}</span></span><button class="switch ${index !== 5 ? 'is-on' : ''}" type="button" data-action="toggle-switch"><span></span></button></div>`).join('')}</div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="save-preferences">Save Preferences</button>`);
}

function showCallSupport() {
  openModal('Call Fly Express', `<div class="payment-state"><div class="payment-state__icon payment-state__icon--success"><i data-lucide="phone-call"></i></div><h3>+256 700 000 000</h3><p class="muted">Demonstration passenger support number. The prototype does not initiate telephone calls.</p></div>`, `<button class="button button--primary" type="button" data-action="close-modal">Close</button>`);
}

function showChatSupport() {
  openModal('Chat Support preview', `<div class="card card--soft"><p><strong>Fly Express Support</strong><br><span class="muted text-small">Hello Sarah. How can we assist with your trip today?</span></p></div><div class="card" style="margin-top:10px;margin-left:18%;background:var(--brand-blue);color:white"><p style="margin:0">I would like to confirm my boarding time.</p></div><div class="field" style="margin-top:14px"><label>Message</label><div class="input-group"><input placeholder="Type a message…"><button class="button button--primary" type="button" data-action="close-modal">Send</button></div></div><p class="privacy-note">Chat messages are not sent or stored.</p>`, '', true);
}

function showSupportStatuses() {
  openModal('Support request SUP-44720', `<div class="timeline">${[['Submitted','Your request was received.'],['Under Review','A support agent is reviewing the request.'],['Waiting for Passenger','Used when more information is needed.'],['Resolved','A resolution has been provided.'],['Closed','The request lifecycle is complete.']].map((item,index) => `<div class="timeline-item ${index < 2 ? 'is-complete' : index === 2 ? 'is-current' : ''}"><span class="timeline-dot"><i data-lucide="${index < 2 ? 'check' : index === 2 ? 'clock-3' : 'circle'}"></i></span><span class="timeline-copy"><strong>${item[0]}</strong><span>${item[1]}</span></span></div>`).join('')}</div>`);
}

function showEditProfile() {
  openModal('Edit passenger profile', `<div class="form-grid"><div class="field field--full"><label>Full name</label><input value="Sarah Nabirye"></div><div class="field"><label>Telephone</label><input value="+256 772 345 678"></div><div class="field"><label>Email</label><input value="sarah.nabirye@example.com"></div><div class="field field--full"><label>Preferred route</label><select><option>Entebbe → Kampala</option><option>Kampala → Entebbe</option></select></div><div class="field field--full"><label>Emergency contact</label><input value="+256 700 123 456"></div></div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="save-profile">Save Changes</button>`);
}

function showSavedPassengers() {
  openModal('Saved passengers', `<div class="grid"><article class="card card--compact"><div class="card-head"><div><strong>Sarah Nabirye</strong><div class="muted text-small">Primary passenger · +256 772 345 678</div></div><span class="status-chip status-chip--success">You</span></div></article><article class="card card--compact"><div class="card-head"><div><strong>Amina Nabirye</strong><div class="muted text-small">Child passenger · Emergency contact linked</div></div><button class="button button--ghost button--tiny" type="button">Edit</button></div></article><button class="button button--primary" type="button" data-action="close-modal"><i data-lucide="user-plus"></i>Add Passenger Preview</button></div>`);
}

function showSavedPickups() {
  openModal('Saved pickup points', `<div class="grid"><article class="card card--compact"><strong>Entebbe Main Stage</strong><p class="muted text-small">Primary boarding point</p></article><article class="card card--compact"><strong>Kitooro</strong><p class="muted text-small">Approved route pickup point</p></article><button class="button button--primary" type="button" data-action="close-modal"><i data-lucide="map-pin-plus"></i>Add Pickup Preview</button></div>`);
}

function showLanguageModal() {
  openModal('Language preview', `<p class="muted">The complete prototype remains in English, but selecting another language demonstrates a sample interface message.</p><div class="radio-cards">${['English','Luganda','Swahili'].map(lang => `<label class="radio-card ${state.language === lang ? 'is-selected' : ''}"><input type="radio" name="language-choice" value="${lang}" ${state.language === lang ? 'checked' : ''}><span class="radio-card__icon"><i data-lucide="languages"></i></span><span class="radio-card__body"><strong>${lang}</strong><span>${lang === 'English' ? 'Travel Smart. Move Faster.' : lang === 'Luganda' ? 'Tambula bulungi, otuuke mangu.' : 'Safiri kwa akili, fika haraka.'}</span></span></label>`).join('')}</div><div class="language-preview">Sample: ${state.language === 'Luganda' ? 'Oli mwetegefu okutambula?' : state.language === 'Swahili' ? 'Uko tayari kusafiri?' : 'Are you ready to travel?'}</div>`, `<button class="button button--ghost" type="button" data-action="close-modal">Cancel</button><button class="button button--primary" type="button" data-action="save-language">Apply Preview</button>`);
}

function saveLanguage() {
  const selected = $('input[name="language-choice"]:checked');
  if (selected) state.language = selected.value;
  closeModal(); renderCurrentScreen(); toast(`${state.language} language preview selected.`, 'success');
}

function showPrivacy() {
  openModal('Privacy preview', `<p>The Fly Express Passenger App mockup does not transmit, persist or process the information entered into its forms. All state is held temporarily in browser memory and resets when the page refreshes.</p><div class="detail-list"><div class="detail-row"><span>Backend connection</span><strong>None</strong></div><div class="detail-row"><span>Database storage</span><strong>None</strong></div><div class="detail-row"><span>Location access</span><strong>Not requested</strong></div><div class="detail-row"><span>Payment processing</span><strong>Not connected</strong></div></div>`);
}

function showTerms() {
  openModal('Terms and conditions preview', `<p>This presentation prototype demonstrates proposed passenger journeys and interface states. It does not create transport contracts, tickets, payments, parcel custody, refunds or service guarantees.</p><ul class="muted"><li>All names and references are fictional demonstration data.</li><li>Fares and times are illustrative and subject to operational validation.</li><li>Buttons demonstrate interface behavior only.</li><li>Refresh the page to reset all session changes.</li></ul>`);
}

function openDemoPanel() {
  const demoStates = ['loading','no-internet','connection-restored','empty-trips','no-parcel','payment-pending','payment-successful','payment-failed','booking-successful','booking-cancelled','wallet-deposit-successful','wallet-insufficient','vehicle-delayed','vehicle-arrived','ticket-expired','ticket-used','parcel-delayed','parcel-ready','support-submitted','session-timeout'];
  openModal('Prototype Demo States', `<p class="muted">Trigger common loading, empty, success, warning and error demonstrations.</p><div class="demo-state-grid">${demoStates.map(label => `<button class="demo-state-button" type="button" data-action="demo-state" data-value="${label}">${label.split('-').map(word => word[0].toUpperCase()+word.slice(1)).join(' ')}</button>`).join('')}</div>`, '', true);
}

function triggerDemoState(value) {
  closeModal();
  const simpleStates = {
    'no-internet': ['No internet connection','The prototype is showing an offline state. No data has been lost.','wifi-off','warning'],
    'connection-restored': ['Connection restored','The passenger experience is back online.','wifi','success'],
    'no-parcel': ['No parcel found','Check the tracking number and try again.','package-x','danger'],
    'payment-pending': ['Payment pending','A mobile-money authorization is awaiting approval.','loader-circle','warning'],
    'payment-successful': ['Payment successful','The demonstration payment was approved.','circle-check-big','success'],
    'payment-failed': ['Payment failed','The demonstration authorization was declined.','circle-x','danger'],
    'booking-cancelled': ['Booking cancelled','Refund status: Pending. Support reference SUP-44720.','calendar-x','warning'],
    'wallet-deposit-successful': ['Wallet deposit successful','UGX 20,000 was added to the preview balance.','wallet-cards','success'],
    'wallet-insufficient': ['Insufficient wallet balance','Add funds or choose another payment method.','wallet-minimal','danger'],
    'vehicle-delayed': ['Vehicle delayed','Traffic has added approximately 15 minutes.','traffic-cone','warning'],
    'vehicle-arrived': ['Vehicle arrived','UBM 245K is ready for boarding.','bus-front','success'],
    'ticket-expired': ['Ticket expired','This ticket is outside its validity window.','ticket-x','warning'],
    'ticket-used': ['Ticket already used','Verification code 482915 has already been validated.','ticket-check','warning'],
    'parcel-delayed': ['Parcel delayed','Expected arrival has changed to 11:10 AM.','package-x','warning'],
    'parcel-ready': ['Parcel ready for collection','Present collection PIN 742915 at Kampala Main Stage.','package-check','success'],
    'support-submitted': ['Support request submitted','Reference SUP-44720 is under review.','messages-square','success'],
    'session-timeout': ['Session timeout','The production app would ask the passenger to sign in again.','timer-off','warning']
  };
  if (value === 'loading') { showLoading('Loading demonstration state…', () => toast('Loading state completed.', 'success'), 1200); return; }
  if (value === 'empty-trips') { state.tripTab = 'cancelled'; navigate('trips'); toast('Empty trip-history state is displayed below the sample cancellation.', 'warning'); return; }
  if (value === 'booking-successful') { navigate('success'); return; }
  if (value === 'parcel-delayed') { state.parcelTrackingState = 'delayed'; navigate('trackparcel'); return; }
  if (value === 'parcel-ready') { state.parcelTrackingState = 'ready'; navigate('trackparcel'); return; }
  if (value.startsWith('ticket-')) {
    state.ticketStatus = value.replace('ticket-', '');
    navigate('ticket');
    toast(`${state.ticketStatus.replace('-', ' ')} ticket state displayed.`, state.ticketStatus === 'active' ? 'success' : 'warning');
    return;
  }
  const item = simpleStates[value];
  if (item) showStateModal(item[0],item[1],item[2],item[3]);
}

function showStateModal(title, copy, icon, type = 'info') {
  const style = type === 'success' ? 'success' : type === 'danger' ? 'failed' : 'pending';
  openModal(title, `<div class="payment-state"><div class="payment-state__icon payment-state__icon--${style}"><i data-lucide="${icon}"></i></div><h3>${title}</h3><p class="muted">${copy}</p></div>`, `<button class="button button--primary" type="button" data-action="close-modal">Done</button>`);
}

function signOut() {
  $('#app-shell').classList.add('is-hidden');
  $('#auth-layer').classList.remove('is-hidden');
  state.authView = 'signin'; state.history = []; state.screen = 'home';
  renderAuth();
  toast('Signed out of the demonstration session.', 'success');
}
