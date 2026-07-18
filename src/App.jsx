import { useEffect, useMemo, useRef, useState } from "react";
import {
  Accessibility,
  AlertCircle,
  Armchair,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  Building2,
  BusFront,
  CalendarDays,
  CalendarPlus,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  CreditCard,
  Edit3,
  Headphones,
  Home,
  LoaderCircle,
  LockKeyhole,
  Luggage,
  MapPin,
  Minus,
  Phone,
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
  Smartphone,
  Star,
  Ticket,
  TicketPercent,
  UserCircle,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { MapPreview } from "./MapPreview.jsx";
import { Modal } from "./Modal.jsx";
import {
  assistanceChoices,
  demoLocations as locations,
  formatUGX,
  getAvailableTrips,
  languages,
  luggageCategories as luggageTypes,
  paymentMethods,
  returnModes,
  seatInventory,
} from "./bookingData.js";
import logo from "./assets/fly-express-logo.jpg";

const DEFAULT_DATE = "2026-07-18";
const BOOKING_REFERENCE = "FXP-260718-0947";
const WALLET_BALANCE = 32500;

const iconForSection = {
  return: RefreshCw,
  passengers: Users,
  assistance: Headphones,
  luggage: Luggage,
  seats: Armchair,
};

const paymentIcons = {
  wallet: WalletCards,
  mtn: Smartphone,
  airtel: Smartphone,
  cash: Banknote,
  corporate: Building2,
  voucher: TicketPercent,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function locationName(location) {
  return typeof location === "string" ? location : location.name;
}

function formatTripDate(value, options = {}) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: options.weekday ? "short" : undefined,
    day: "numeric",
    month: options.shortMonth ? "short" : "long",
    year: "numeric",
  });
}

function calendarClock(value = "09:00 AM") {
  const [clock, period = ""] = value.trim().split(/\s+/);
  let [hours, minutes] = clock.split(":").map(Number);
  if (period.toUpperCase() === "PM" && hours < 12) hours += 12;
  if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}00`;
}

function Stepper({ label, value, min, max, onChange, helper }) {
  return (
    <div className="stepper-row">
      <div>
        <strong>{label}</strong>
        {helper ? <span>{helper}</span> : null}
      </div>
      <div className="stepper" aria-label={`${label} quantity`}>
        <button
          type="button"
          aria-label={`Remove one ${label.toLowerCase()}`}
          onClick={() => onChange(clamp(value - 1, min, max))}
          disabled={value <= min}
        >
          <Minus size={17} />
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          aria-label={`Add one ${label.toLowerCase()}`}
          onClick={() => onChange(clamp(value + 1, min, max))}
          disabled={value >= max}
        >
          <Plus size={17} />
        </button>
      </div>
    </div>
  );
}

function AccordionSection({ id, label, summary, expanded, onToggle, children }) {
  const Icon = iconForSection[id];
  return (
    <section className={`booking-option ${expanded ? "is-open" : ""}`}>
      <button
        className="booking-option-trigger"
        type="button"
        aria-expanded={expanded}
        aria-controls={`booking-panel-${id}`}
        onClick={onToggle}
      >
        <span className="option-icon" aria-hidden="true">
          <Icon size={23} />
        </span>
        <span className="option-copy">
          <strong>{label}</strong>
          <span>{summary}</span>
        </span>
        <ChevronDown className="option-chevron" size={20} aria-hidden="true" />
      </button>
      <div id={`booking-panel-${id}`} className="booking-option-panel" hidden={!expanded}>
        {children}
      </div>
    </section>
  );
}

function Choice({ selected, onClick, children, ariaLabel, disabled = false }) {
  return (
    <button
      type="button"
      className={`choice ${selected ? "is-selected" : ""}`}
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {selected ? <Check size={17} aria-hidden="true" /> : null}
    </button>
  );
}

function BottomNav({ view, onNavigate }) {
  const items = [
    ["home", Home, "Home"],
    ["trips", Ticket, "Trips"],
    ["booking", CircleDot, "Book"],
    ["wallet", CreditCard, "Wallet"],
    ["account", UserCircle, "Account"],
  ];
  return (
    <nav className="floating-nav" aria-label="Mobile navigation">
      {items.map(([id, Icon, label]) => (
        <button
          key={id}
          type="button"
          className={view === id ? "is-active" : ""}
          aria-current={view === id ? "page" : undefined}
          onClick={() => onNavigate(id)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function AppHeader({ title }) {
  return (
    <header className="standard-header">
      <img src={logo} alt="Fly Express Travellers Association logo" />
      <strong>{title}</strong>
      <span className="header-avatar" aria-label="Passenger profile">SN</span>
    </header>
  );
}

function HomeView({ onStart, onOpenReturn, onNavigate, notify }) {
  return (
    <div className="standard-view">
      <AppHeader title="Fly Express" />
      <main className="standard-content">
        <p className="eyebrow">SATURDAY, 18 JULY</p>
        <h1>Good morning, Sarah.</h1>
        <p className="lead">Where are you travelling today?</p>

        <section className="home-book-card">
          <span className="card-kicker">QUICK BOOKING</span>
          <h2>Move with confidence.</h2>
          <p>One passenger and one way are ready by default.</p>
          <div className="home-route">
            <MapPin size={20} />
            <span><small>From</small><strong>Entebbe Main Stage</strong></span>
            <ArrowRight size={18} />
            <span><small>To</small><strong>Kampala Main Stage</strong></span>
          </div>
          <button className="primary-button" type="button" onClick={onStart}>
            Book a trip <ArrowRight size={19} />
          </button>
        </section>

        <div className="quick-actions" aria-label="Quick actions">
          <button type="button" onClick={onOpenReturn}><RefreshCw size={21} /><span>Return ticket</span></button>
          <button type="button" onClick={() => notify("Parcel request opened in preview.")}><Luggage size={21} /><span>Send parcel</span></button>
          <button type="button" onClick={() => onNavigate("wallet")}><WalletCards size={21} /><span>Add funds</span></button>
        </div>

        <article className="upcoming-card">
          <div><span className="card-kicker">UPCOMING TRIP</span><strong>Entebbe → Kampala</strong></div>
          <span className="status-pill">Confirmed</span>
          <p>Today · 09:00 AM · Position 04</p>
          <button type="button" className="text-button" onClick={onStart}>View trip <ArrowRight size={16} /></button>
        </article>
      </main>
    </div>
  );
}

function SimpleView({ view, notify, onStart, onEditPassenger }) {
  if (view === "trips") {
    return (
      <div className="standard-view">
        <AppHeader title="Trips" />
        <main className="standard-content">
          <p className="eyebrow">YOUR JOURNEYS</p>
          <h1>Trips</h1>
          <article className="plain-card">
            <span className="status-pill">Confirmed</span>
            <h2>Entebbe → Kampala</h2>
            <p>Today · 09:00 AM · Express Direct</p>
            <button className="primary-button" type="button" onClick={onStart}>Review trip</button>
          </article>
          <article className="plain-card rating-card">
            <h2>How was your last trip?</h2>
            <div aria-label="Rate your last trip" className="rating-row">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button key={rating} type="button" aria-label={`Rate ${rating} out of 5`} onClick={() => notify(`Thanks — ${rating}/5 saved.`)}>
                  <Star size={22} />
                </button>
              ))}
            </div>
          </article>
        </main>
      </div>
    );
  }
  if (view === "wallet") {
    return (
      <div className="standard-view">
        <AppHeader title="Wallet" />
        <main className="standard-content">
          <section className="wallet-card">
            <span>Available balance</span>
            <strong>UGX 32,500</strong>
            <p>Includes UGX 2,000 promotional credit.</p>
            <button type="button" onClick={() => notify("Wallet top-up preview opened.")}><Plus size={18} /> Add funds</button>
          </section>
          <article className="plain-card"><h2>Recent activity</h2><p>Trip payment · -UGX 5,000</p><p>Wallet deposit · +UGX 20,000</p></article>
        </main>
      </div>
    );
  }
  return (
    <div className="standard-view">
      <AppHeader title="Account" />
      <main className="standard-content">
        <p className="eyebrow">PASSENGER PROFILE</p>
        <h1>Sarah Namusoke</h1>
        <article className="plain-card saved-passenger">
          <div><UserRound size={24} /><span><strong>Saved passenger</strong><small>Sarah Namusoke · 0772 345 678</small></span></div>
          <button type="button" onClick={onEditPassenger}><Edit3 size={17} /> Edit</button>
        </article>
      </main>
    </div>
  );
}

export function App() {
  const [view, setView] = useState("booking");
  const [from, setFrom] = useState("Entebbe Main Stage");
  const [to, setTo] = useState("Kampala Main Stage");
  const [draftFrom, setDraftFrom] = useState("Entebbe Main Stage");
  const [draftTo, setDraftTo] = useState("Kampala Main Stage");
  const [travelDate, setTravelDate] = useState(DEFAULT_DATE);
  const [draftDate, setDraftDate] = useState(DEFAULT_DATE);
  const [selectedDepartureId, setSelectedDepartureId] = useState("ent-kla-0900");
  const [expandedSection, setExpandedSection] = useState(null);
  const [returnTrip, setReturnTrip] = useState(false);
  const [returnMode, setReturnMode] = useState("open");
  const [returnDate, setReturnDate] = useState("2026-07-19");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [passengerNames, setPassengerNames] = useState(["Sarah Namusoke"]);
  const [language, setLanguage] = useState("English");
  const [assistance, setAssistance] = useState([]);
  const [luggage, setLuggage] = useState(() => Object.fromEntries(luggageTypes.map((item) => [item.id, item.included ? 1 : 0])));
  const [seatMode, setSeatMode] = useState("auto");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modal, setModal] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [paymentPhone, setPaymentPhone] = useState("0772 345 678");
  const [walletPin, setWalletPin] = useState("");
  const [corporateRef, setCorporateRef] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingPaymentStatus, setBookingPaymentStatus] = useState("Paid");
  const [toast, setToast] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [passengerEditorOpen, setPassengerEditorOpen] = useState(false);
  const [ticketExpanded, setTicketExpanded] = useState(false);
  const scrollRef = useRef(null);
  const successHeadingRef = useRef(null);

  const locationNames = useMemo(() => locations.map(locationName), []);
  const passengerTotal = adults + children;
  const availableTrips = useMemo(
    () => {
      const trips = getAvailableTrips({ from, to, travelDate, passengerCount: passengerTotal }).map((trip) => {
        const [time, period] = trip.departureTime.split(" ");
        return {
          ...trip,
          time,
          period,
          label: trip.service,
          duration: trip.durationLabel,
          seats: trip.seatsLeft,
        };
      });
      return trips.sort((a, b) => (a.id === selectedDepartureId ? -1 : b.id === selectedDepartureId ? 1 : 0));
    },
    [from, to, travelDate, passengerTotal, selectedDepartureId],
  );
  const selectedTrip = availableTrips.find((trip) => trip.id === selectedDepartureId) ?? availableTrips[0] ?? null;

  useEffect(() => {
    if (!availableTrips.some((trip) => trip.id === selectedDepartureId) && availableTrips[0]) {
      setSelectedDepartureId(availableTrips[0].id);
    }
  }, [availableTrips, selectedDepartureId]);

  useEffect(() => {
    setPassengerNames((current) => Array.from({ length: passengerTotal }, (_, index) => current[index] ?? `Passenger ${index + 1}`));
    setSelectedSeats((current) => current.slice(0, passengerTotal));
  }, [passengerTotal]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (view !== "success") return undefined;
    const frame = window.requestAnimationFrame(() => successHeadingRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [view]);

  const luggageTotal = useMemo(
    () => luggageTypes.reduce((total, item) => total + (item.price ?? 0) * (luggage[item.id] ?? 0), 0),
    [luggage],
  );
  const hasCommercialLuggage = (luggage.commercial ?? 0) > 0;
  const baseFare = (selectedTrip?.fare ?? 5000) * passengerTotal;
  const returnFare = returnTrip ? 4000 * passengerTotal : 0;
  const discount = voucherApplied ? Math.min(2000, baseFare + returnFare + luggageTotal) : 0;
  const fareTotal = baseFare + returnFare + luggageTotal - discount;

  const summaries = {
    return: returnTrip ? (returnModes.find((item) => item.id === returnMode)?.label ?? "Return trip") : "Add return date",
    passengers: passengerTotal === 1 ? "Add children or more travellers" : `${passengerTotal} travellers`,
    assistance: assistance.length || language !== "English" ? `${assistance.length ? `${assistance.length} assistance request${assistance.length > 1 ? "s" : ""}` : "No assistance"} · ${language}` : "Travel assistance, language preference",
    luggage: luggageTotal > 0 ? `${formatUGX(luggageTotal)} extra luggage` : "Add extra luggage",
    seats: seatMode === "specific" && selectedSeats.length ? selectedSeats.join(", ") : "Choose your seat",
  };

  const notify = (message) => setToast(message);

  function toggleSection(section) {
    setExpandedSection((current) => (current === section ? null : section));
  }

  function startBooking(section = null) {
    setView("booking");
    setExpandedSection(section);
    setScrollProgress(0);
    setPaymentMethod("wallet");
    setShowPaymentOptions(false);
    setPaymentStatus("idle");
    setWalletPin("");
    setCorporateRef("");
    setVoucherCode("");
    setVoucherApplied(false);
    setConditionsAccepted(false);
    setCheckoutError("");
    window.requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = section ? 420 : 0;
    });
  }

  function swapRoute() {
    setFrom(to);
    setTo(from);
    const reverseTrips = getAvailableTrips(to, from, travelDate);
    setSelectedDepartureId(reverseTrips[0]?.id ?? "");
    notify("Route direction swapped.");
  }

  function openRouteEditor() {
    setDraftFrom(from);
    setDraftTo(to);
    setModal("route");
  }

  function swapDraftRoute() {
    setDraftFrom(draftTo);
    setDraftTo(draftFrom);
  }

  function chooseSeat(seat) {
    if (seat.status === "occupied") return;
    setSelectedSeats((current) => {
      if (current.includes(seat.id)) return current.filter((id) => id !== seat.id);
      if (current.length >= passengerTotal) {
        notify(`Choose up to ${passengerTotal} seat${passengerTotal > 1 ? "s" : ""}.`);
        return current;
      }
      return [...current, seat.id];
    });
  }

  function handleScroll(event) {
    setScrollProgress(clamp(event.currentTarget.scrollTop / 155, 0, 1));
  }

  function openCheckout() {
    if (!selectedTrip) {
      notify("Choose a departure first.");
      return;
    }
    setCheckoutError("");
    setShowPaymentOptions(false);
    setModal("checkout");
  }

  function paymentNeedsApproval() {
    return paymentMethod === "mtn" || paymentMethod === "airtel";
  }

  function confirmBooking() {
    setCheckoutError("");
    if (passengerNames.some((name) => !name.trim())) {
      setCheckoutError("Add a name for every traveller before continuing.");
      return;
    }
    if (seatMode === "specific" && selectedSeats.length !== passengerTotal) {
      setCheckoutError(`Choose ${passengerTotal} seat${passengerTotal > 1 ? "s" : ""}, or use best available.`);
      return;
    }
    if (returnTrip && returnMode === "date-specific" && (!returnDate || returnDate < travelDate)) {
      setCheckoutError("Choose a return date on or after the outbound trip.");
      return;
    }
    if (!conditionsAccepted) {
      setCheckoutError("Please accept the booking conditions before continuing.");
      return;
    }
    if (paymentMethod === "wallet" && !/^\d{4}$/.test(walletPin)) {
      setCheckoutError("Enter the four-digit wallet PIN. Use 1234 for this preview.");
      return;
    }
    if (paymentMethod === "wallet" && walletPin !== "1234") {
      setCheckoutError("That preview PIN is not correct. Use 1234.");
      return;
    }
    if (paymentMethod === "wallet" && fareTotal > WALLET_BALANCE) {
      setCheckoutError("Your wallet balance is too low for this booking. Choose another payment method.");
      return;
    }
    if (paymentNeedsApproval() && paymentStatus !== "success") {
      setCheckoutError("Approve the mobile-money prompt before buying the ticket.");
      return;
    }
    if (paymentMethod === "corporate" && corporateRef.trim().length < 4) {
      setCheckoutError("Enter a valid corporate travel reference.");
      return;
    }
    if (paymentMethod === "voucher") {
      setCheckoutError(voucherApplied ? "Voucher applied. Choose a payment method for the remaining balance." : "Apply a valid promotional voucher, then choose how to pay the remaining balance.");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const baseStatus = paymentMethod === "cash" ? "Payment pending" : paymentMethod === "corporate" ? "Awaiting approval" : "Paid";
      const nextStatus = hasCommercialLuggage ? `${baseStatus} · luggage fee pending` : baseStatus;
      setBookingPaymentStatus(nextStatus);
      setSubmitting(false);
      setModal(null);
      setView("success");
    }, 700);
  }

  function applyVoucher() {
    if (voucherCode.trim().toUpperCase() === "FLY2000") {
      setVoucherApplied(true);
      setCheckoutError("");
      setShowPaymentOptions(true);
      notify("UGX 2,000 voucher applied. Choose how to pay the balance.");
    } else {
      setVoucherApplied(false);
      setCheckoutError("Try the preview code FLY2000.");
    }
  }

  function downloadCalendar() {
    const calendarDate = travelDate.replaceAll("-", "");
    const departureClock = calendarClock(selectedTrip?.departureTime);
    const arrivalClock = calendarClock(selectedTrip?.arrivalTime);
    const body = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "UID:FXP-260718-0947@flyexpress.example",
      `DTSTART:${calendarDate}T${departureClock}`,
      `DTEND:${calendarDate}T${arrivalClock}`,
      `SUMMARY:Fly Express — ${from} to ${to}`,
      `DESCRIPTION:Booking ${BOOKING_REFERENCE}`,
      "END:VEVENT",
      ...(returnTrip && returnMode === "date-specific" ? [
        "BEGIN:VEVENT",
        `UID:${BOOKING_REFERENCE}-return@flyexpress.example`,
        `DTSTART;VALUE=DATE:${returnDate.replaceAll("-", "")}`,
        `SUMMARY:Fly Express return — choose departure`,
        `DESCRIPTION:Return journey for booking ${BOOKING_REFERENCE}`,
        "END:VEVENT",
      ] : []),
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${BOOKING_REFERENCE}.ics`;
    link.click();
    URL.revokeObjectURL(url);
    notify("Calendar file created.");
  }

  async function shareTicket() {
    const returnText = returnTrip ? ` Return: ${returnModes.find((item) => item.id === returnMode)?.label ?? "Open return"}${returnMode === "date-specific" ? ` on ${returnDate}` : ""}.` : "";
    const text = `${BOOKING_REFERENCE}: ${from} to ${to}, ${travelDate} at ${selectedTrip?.time ?? "09:00"}.${returnText}`;
    try {
      if (navigator.share) await navigator.share({ title: "Fly Express ticket", text });
      else await navigator.clipboard.writeText(text);
      notify(navigator.share ? "Share menu opened." : "Ticket details copied.");
    } catch {
      notify("Sharing was cancelled.");
    }
  }

  const collapsed = scrollProgress > 0.34;

  const returnPanel = (
    <div className="option-inner">
      <div className="choice-grid two">
        <Choice selected={!returnTrip} onClick={() => setReturnTrip(false)}>One way</Choice>
        <Choice selected={returnTrip} onClick={() => setReturnTrip(true)}>Add return</Choice>
      </div>
      {returnTrip ? (
        <>
          <div className="choice-grid two return-modes">
            {returnModes.map((mode) => (
              <Choice key={mode.id} selected={returnMode === mode.id} onClick={() => setReturnMode(mode.id)}>{mode.label}</Choice>
            ))}
          </div>
          {returnMode === "date-specific" ? (
            <label className="field-label">Return date<input type="date" min={travelDate} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} /></label>
          ) : null}
          <p className="inline-notice">Return fares are discounted to UGX 4,000 per traveller.</p>
        </>
      ) : null}
      <button type="button" className="use-default" onClick={() => setReturnTrip(false)}>Use one-way default</button>
    </div>
  );

  const passengersPanel = (
    <div className="option-inner">
      <Stepper label="Adults" value={adults} min={1} max={4} onChange={setAdults} helper="Ages 13+" />
      <Stepper label="Children" value={children} min={0} max={2} onChange={setChildren} helper="Ages 2–12" />
      {passengerNames.map((name, index) => (
        <label className="field-label" key={index}>
          {index === 0 ? "Lead passenger" : `Passenger ${index + 1}`}
          <input
            type="text"
            value={name}
            onChange={(event) => setPassengerNames((current) => current.map((item, itemIndex) => (itemIndex === index ? event.target.value : item)))}
          />
        </label>
      ))}
      <label className="field-label">Emergency contact<input type="tel" inputMode="tel" defaultValue="0772 345 678" /></label>
      <button type="button" className="use-default" onClick={() => { setAdults(1); setChildren(0); }}>Use one-passenger default</button>
    </div>
  );

  const assistancePanel = (
    <div className="option-inner">
      <label className="field-label">Preferred language
        <select value={language} onChange={(event) => setLanguage(event.target.value)}>
          {languages.map((item) => <option key={item.id} value={item.label}>{item.label}</option>)}
        </select>
      </label>
      <div className="check-list">
        {assistanceChoices.filter((item) => item.id !== "none").map((item) => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={assistance.includes(item.id)}
              onChange={() => setAssistance((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}
            />
            <span><Accessibility size={19} /><strong>{item.label}</strong><small>{item.description}</small></span>
          </label>
        ))}
      </div>
      <button type="button" className="use-default" onClick={() => { setAssistance([]); setLanguage("English"); }}>Clear assistance preferences</button>
    </div>
  );

  const luggagePanel = (
    <div className="option-inner">
      {luggageTypes.map((item) => (
        <div className="luggage-row" key={item.id}>
          <div><strong>{item.label}</strong><span>{item.included ? "Included" : item.price == null ? "Assessed at stage" : formatUGX(item.price)}</span></div>
          {item.included ? <span className="included-badge"><Check size={15} /> 1</span> : (
            <div className="mini-stepper">
              <button type="button" aria-label={`Remove ${item.label}`} onClick={() => setLuggage((current) => ({ ...current, [item.id]: clamp((current[item.id] ?? 0) - 1, 0, 5) }))} disabled={!luggage[item.id]}><Minus size={15} /></button>
              <output>{luggage[item.id] ?? 0}</output>
              <button type="button" aria-label={`Add ${item.label}`} onClick={() => setLuggage((current) => ({ ...current, [item.id]: clamp((current[item.id] ?? 0) + 1, 0, 5) }))} disabled={(luggage[item.id] ?? 0) >= 5}><Plus size={15} /></button>
            </div>
          )}
        </div>
      ))}
      <button type="button" className="use-default" onClick={() => setLuggage(Object.fromEntries(luggageTypes.map((item) => [item.id, item.included ? 1 : 0])))}>Remove paid luggage</button>
    </div>
  );

  const seatsPanel = (
    <div className="option-inner">
      <div className="choice-grid two">
        <Choice selected={seatMode === "auto"} onClick={() => { setSeatMode("auto"); setSelectedSeats([]); }}>Best available</Choice>
        <Choice selected={seatMode === "specific"} onClick={() => setSeatMode("specific")}>Choose seats</Choice>
      </div>
      {seatMode === "specific" ? (
        <div className="seat-map" aria-label="Select seats">
          <span className="driver-label"><BusFront size={18} /> Driver</span>
          <div className="seat-grid">
            {seatInventory.map((seat) => (
              <button
                key={seat.id}
                type="button"
                disabled={seat.status === "occupied"}
                className={selectedSeats.includes(seat.id) ? "is-selected" : ""}
                aria-pressed={selectedSeats.includes(seat.id)}
                aria-label={`Seat ${seat.id}${seat.status === "occupied" ? ", occupied" : ""}`}
                onClick={() => chooseSeat(seat)}
              >{seat.id}</button>
            ))}
          </div>
        </div>
      ) : <p className="inline-notice">We will assign the best available capacity position at no extra charge.</p>}
      <button type="button" className="use-default" onClick={() => { setSeatMode("auto"); setSelectedSeats([]); }}>Use best available</button>
    </div>
  );

  const bookingScreen = (
    <div className="mobile-prototype booking-shell">
      <div ref={scrollRef} className="booking-scroll" onScroll={handleScroll}>
        <section
          className={`booking-hero ${collapsed ? "is-collapsed" : ""}`}
          style={{ "--map-progress": scrollProgress }}
          aria-label="Trip route map preview"
        >
          <MapPreview from={from} to={to} collapsed={collapsed} />
          <div className="map-tone" aria-hidden="true" />
          <div className="hero-brand-row">
            <div className="hero-brand"><img src={logo} alt="" /><strong>Fly Express</strong></div>
            <span className="hero-avatar" aria-label="Passenger profile">SN</span>
          </div>
          <button className="hero-close" type="button" aria-label="Close trip booking" onClick={() => setView("home")}>
            <span><ArrowLeft size={22} /></span> Close
          </button>
          <div className="hero-copy">
            <p>SATURDAY, 18 JULY 2026</p>
            <h1>Review your trip</h1>
            <span>You’re almost ready to fly.</span>
          </div>
        </section>

        <main className="review-sheet">
          <div className="sheet-handle" aria-hidden="true" />
          <section className="route-summary" aria-label="Selected route">
            <button type="button" onClick={openRouteEditor} aria-label={`Change departure, currently ${from}`}>
              <span className="route-icon origin"><MapPin size={20} /></span>
              <span><small>From</small><strong>{from}</strong></span>
            </button>
            <button className="swap-button" type="button" aria-label="Swap departure and destination" onClick={swapRoute}><ArrowLeftRight size={21} /></button>
            <button type="button" onClick={openRouteEditor} aria-label={`Change destination, currently ${to}`}>
              <span><small>To</small><strong>{to}</strong></span>
              <span className="route-icon destination"><MapPin size={20} /></span>
            </button>
          </section>

          <button className="date-row" type="button" onClick={() => { setDraftDate(travelDate); setModal("date"); }}>
            <span className="route-icon origin"><CalendarDays size={20} /></span>
            <span><small>Date</small><strong>{travelDate === DEFAULT_DATE ? "Today, Sat 18 July 2026" : formatTripDate(travelDate, { weekday: true })}</strong></span>
            <em>Change</em>
          </button>

          <div className="section-label">NEXT DEPARTURE</div>
          <div className="departure-list" role="radiogroup" aria-label="Available departures">
            {availableTrips.length ? availableTrips.map((trip) => (
              <button
                key={trip.id}
                type="button"
                role="radio"
                aria-checked={selectedTrip?.id === trip.id}
                className={`departure-card ${selectedTrip?.id === trip.id ? "is-selected" : ""}`}
                onClick={() => setSelectedDepartureId(trip.id)}
              >
                <span className="departure-time"><strong>{trip.time}</strong><small>{trip.period ?? "AM"}</small></span>
                <span className="departure-vehicle"><BusFront size={20} /></span>
                <span className="departure-details"><strong>{trip.label ?? "Express Direct"}</strong><small>{trip.duration} <b>•</b> Direct</small></span>
                <span className="departure-price"><small>{trip.seats} seats left</small><strong>{formatUGX(trip.fare)}</strong></span>
                {selectedTrip?.id === trip.id ? <span className="selected-check"><Check size={18} /></span> : null}
              </button>
            )) : <div className="empty-state"><AlertCircle size={22} /><strong>No departures found</strong><span>Try the reverse route or another date.</span></div>}
          </div>

          <div className="booking-options">
            <AccordionSection id="return" label="Return trip" summary={summaries.return} expanded={expandedSection === "return"} onToggle={() => toggleSection("return")}>{returnPanel}</AccordionSection>
            <AccordionSection id="passengers" label="Passengers" summary={summaries.passengers} expanded={expandedSection === "passengers"} onToggle={() => toggleSection("passengers")}>{passengersPanel}</AccordionSection>
            <AccordionSection id="assistance" label="Assistance & language" summary={summaries.assistance} expanded={expandedSection === "assistance"} onToggle={() => toggleSection("assistance")}>{assistancePanel}</AccordionSection>
            <AccordionSection id="luggage" label="Luggage" summary={summaries.luggage} expanded={expandedSection === "luggage"} onToggle={() => toggleSection("luggage")}>{luggagePanel}</AccordionSection>
            <AccordionSection id="seats" label="Seat preference" summary={summaries.seats} expanded={expandedSection === "seats"} onToggle={() => toggleSection("seats")}>{seatsPanel}</AccordionSection>
          </div>

          <div className="reassurance"><ShieldCheck size={22} /><span>Personal item included <b>•</b> Change anything before payment.</span></div>
        </main>
      </div>
      <div className="sticky-cta">
        <button
          type="button"
          className={`return-cta-toggle ${returnTrip ? "is-active" : ""}`}
          aria-pressed={returnTrip}
          aria-label={returnTrip ? "Remove return trip" : "Add return trip"}
          onClick={() => setReturnTrip((current) => !current)}
        >
          <RefreshCw size={17} aria-hidden="true" />
          <span><small>Return</small><strong>{returnTrip ? "On" : "Add"}</strong></span>
          <span className="return-switch" aria-hidden="true"><i /></span>
        </button>
        <button className="booking-continue" type="button" onClick={openCheckout} disabled={!selectedTrip} aria-label={selectedTrip ? `Continue to checkout, ${formatUGX(fareTotal)}` : "Select a departure"}>
          {selectedTrip ? <><span className="cta-label">Continue</span><b className="cta-divider">•</b> {formatUGX(fareTotal)} <ArrowRight size={20} /></> : "Select a departure"}
        </button>
      </div>
    </div>
  );

  const checkoutContent = (
    <div className="checkout-content">
      <div className="checkout-route">
        <div><span>{from}</span><ArrowRight size={16} /><span>{to}</span></div>
        <strong>{selectedTrip?.time ?? "09:00"} · {travelDate === DEFAULT_DATE ? "Today" : travelDate}</strong>
        {returnTrip ? <small>Return: {returnModes.find((item) => item.id === returnMode)?.label ?? "Open return"}{returnMode === "date-specific" ? ` · ${formatTripDate(returnDate, { shortMonth: true })}` : ""}</small> : null}
      </div>
      <div className="fare-breakdown">
        <div><span>Trip fare × {passengerTotal}</span><strong>{formatUGX(baseFare)}</strong></div>
        {returnTrip ? <div><span>Discounted return × {passengerTotal}</span><strong>{formatUGX(returnFare)}</strong></div> : null}
        {luggageTotal ? <div><span>Extra luggage</span><strong>{formatUGX(luggageTotal)}</strong></div> : null}
        {hasCommercialLuggage ? <div><span>Commercial luggage</span><strong>Assessed at stage</strong></div> : null}
        {discount ? <div className="discount-line"><span>Promotional voucher</span><strong>−{formatUGX(discount)}</strong></div> : null}
        <div className="fare-total"><span>Total</span><strong>{formatUGX(fareTotal)}</strong></div>
      </div>

      <h3>Choose payment</h3>
      <div className="payment-current">
        <span>{(() => { const Icon = paymentIcons[paymentMethod] ?? CreditCard; return <Icon size={20} />; })()}</span>
        <div><small>Payment method</small><strong>{paymentMethods.find((method) => method.id === paymentMethod)?.label}</strong></div>
        <button type="button" onClick={() => setShowPaymentOptions((current) => !current)}>{showPaymentOptions ? "Done" : "Change"}</button>
      </div>
      {showPaymentOptions ? (
        <div className="payment-list" role="radiogroup" aria-label="Payment method">
          {paymentMethods.map((method) => {
            const Icon = paymentIcons[method.id] ?? CreditCard;
            return (
              <button key={method.id} type="button" role="radio" aria-checked={paymentMethod === method.id} className={paymentMethod === method.id ? "is-selected" : ""} onClick={() => { setPaymentMethod(method.id); setPaymentStatus("idle"); setCheckoutError(""); setShowPaymentOptions(false); }}>
                <span><Icon size={20} /></span><strong>{method.label}</strong>{paymentMethod === method.id ? <CheckCircle2 size={19} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {paymentMethod === "wallet" ? (
        <div className="payment-panel">
          <div className="wallet-balance"><span>Wallet balance</span><strong>{formatUGX(WALLET_BALANCE)}</strong></div>
          <label className="field-label">Four-digit wallet PIN<input type="password" inputMode="numeric" maxLength={4} value={walletPin} onChange={(event) => setWalletPin(event.target.value.replace(/\D/g, ""))} placeholder="••••" /></label>
          <p>Preview PIN: <strong>1234</strong></p>
        </div>
      ) : null}
      {paymentNeedsApproval() ? (
        <div className="payment-panel">
          <label className="field-label">Mobile-money number<input type="tel" value={paymentPhone} onChange={(event) => setPaymentPhone(event.target.value)} /></label>
          {paymentStatus === "idle" ? <button type="button" className="secondary-button" onClick={() => setPaymentStatus("pending")}>Send payment prompt</button> : null}
          {paymentStatus === "pending" ? (
            <div className="demo-state"><LoaderCircle className="spin" size={19} /><strong>Waiting for approval</strong><span>Complete the prompt on {paymentPhone}.</span><div><button type="button" onClick={() => setPaymentStatus("success")}>Mark approved</button><button type="button" onClick={() => setPaymentStatus("failed")}>Mark failed</button></div></div>
          ) : null}
          {paymentStatus === "success" ? <div className="success-notice"><CheckCircle2 size={19} /> Payment approved</div> : null}
          {paymentStatus === "failed" ? <div className="error-notice"><AlertCircle size={19} /> Payment failed <button type="button" onClick={() => setPaymentStatus("idle")}>Try again</button></div> : null}
        </div>
      ) : null}
      {paymentMethod === "cash" ? <div className="payment-panel"><p>Reserve now and pay at the departure stage. Your ticket will show <strong>Payment pending</strong>.</p></div> : null}
      {paymentMethod === "corporate" ? <div className="payment-panel"><label className="field-label">Corporate travel reference<input value={corporateRef} onChange={(event) => setCorporateRef(event.target.value)} placeholder="COMP-2048" /></label><p>The booking will show Awaiting approval.</p></div> : null}
      {paymentMethod === "voucher" ? <div className="payment-panel"><label className="field-label">Promotional code<input value={voucherCode} onChange={(event) => setVoucherCode(event.target.value)} placeholder="FLY2000" /></label><button type="button" className="secondary-button" onClick={applyVoucher}>{voucherApplied ? "Voucher applied" : "Apply voucher"}</button></div> : null}

      <label className="conditions-check">
        <input type="checkbox" checked={conditionsAccepted} onChange={(event) => setConditionsAccepted(event.target.checked)} />
        <span>I accept the Fly Express booking and luggage conditions.</span>
      </label>
      {checkoutError ? <div className="checkout-error" role="alert"><AlertCircle size={18} /> {checkoutError}</div> : null}
      <button className="checkout-pay" type="button" onClick={confirmBooking} disabled={submitting}>
        {submitting ? <><LoaderCircle className="spin" size={19} /> Creating ticket…</> : paymentMethod === "cash" ? <>Reserve · pay at stage <ArrowRight size={19} /></> : <><LockKeyhole size={19} /> Pay {formatUGX(fareTotal)}</>}
      </button>
    </div>
  );

  const ticketContent = (
    <div className="digital-ticket">
      <div className="ticket-top"><img src={logo} alt="Fly Express" /><span>{bookingPaymentStatus}</span></div>
      <div className="ticket-route"><strong>{from}</strong><ArrowRight size={18} /><strong>{to}</strong></div>
      <div className="ticket-grid"><span><small>Date</small><strong>{formatTripDate(travelDate, { shortMonth: true })}</strong></span><span><small>Departure</small><strong>{selectedTrip?.time ?? "09:00"}</strong></span><span><small>Passengers</small><strong>{passengerTotal}</strong></span><span><small>Seat</small><strong>{seatMode === "specific" ? selectedSeats.join(", ") : "Best available"}</strong></span></div>
      <QRCodeSVG value={`${BOOKING_REFERENCE}|${from}|${to}|${travelDate}|${selectedTrip?.time ?? "09:00"}`} size={152} level="M" />
      <strong className="ticket-reference">{BOOKING_REFERENCE}</strong>
      <p>Show this ticket when boarding.</p>
      {ticketExpanded ? <div className="ticket-extra"><span>Passenger: {passengerNames[0]}</span><span>Luggage: Personal item included{hasCommercialLuggage ? " · commercial luggage assessed at stage" : ""}</span>{returnTrip ? <span>Return: {returnModes.find((item) => item.id === returnMode)?.label ?? "Open return"}{returnMode === "date-specific" ? ` · ${formatTripDate(returnDate, { shortMonth: true })}` : ""}</span> : null}<span>Payment: {bookingPaymentStatus}</span></div> : null}
      <button type="button" className="text-button" onClick={() => setTicketExpanded((value) => !value)}>{ticketExpanded ? "Hide details" : "Show ticket details"}</button>
    </div>
  );

  let content;
  if (view === "booking") content = bookingScreen;
  else if (view === "success") {
    content = (
      <div className="mobile-prototype success-screen">
        <div className="success-hero" role="status"><CheckCircle2 size={48} /><p>BOOKING CONFIRMED</p><h1 ref={successHeadingRef} tabIndex={-1}>You’re ready to fly.</h1><span>Your ticket has been created.</span></div>
        <main className="success-content">
          <div className="success-reference"><span>Booking reference</span><strong>{BOOKING_REFERENCE}</strong><em>{bookingPaymentStatus}</em></div>
          <div className="success-route"><strong>{from}</strong><ArrowRight size={17} /><strong>{to}</strong><span>{formatTripDate(travelDate, { shortMonth: true })} · {selectedTrip?.time ?? "09:00"}{returnTrip ? ` · ${returnModes.find((item) => item.id === returnMode)?.label ?? "Return"}${returnMode === "date-specific" ? ` ${formatTripDate(returnDate, { shortMonth: true })}` : ""}` : ""}</span></div>
          <button type="button" className="primary-button" onClick={() => setModal("ticket")}><Ticket size={18} /> View ticket</button>
          <div className="success-actions"><button type="button" onClick={downloadCalendar}><CalendarPlus size={19} /> Add to calendar</button><button type="button" onClick={shareTicket}><Share2 size={19} /> Share ticket</button></div>
          <div className="success-rating"><strong>How was booking?</strong><div>{[1,2,3,4,5].map((number) => <button key={number} type="button" aria-label={`Rate booking ${number} out of 5`} onClick={() => notify(`Thanks — ${number}/5 saved.`)}><Star size={21} /></button>)}</div></div>
          <button type="button" className="secondary-button" onClick={() => setView("home")}>Return home</button>
        </main>
      </div>
    );
  } else if (view === "home") content = <div className="mobile-prototype"><HomeView onStart={() => startBooking()} onOpenReturn={() => { setReturnTrip(true); startBooking("return"); }} onNavigate={setView} notify={notify} /><BottomNav view={view} onNavigate={(next) => next === "booking" ? startBooking() : setView(next)} /></div>;
  else content = <div className="mobile-prototype"><SimpleView view={view} notify={notify} onStart={() => startBooking()} onEditPassenger={() => setPassengerEditorOpen(true)} /><BottomNav view={view} onNavigate={(next) => next === "booking" ? startBooking() : setView(next)} /></div>;

  const hasOpenModal = Boolean(modal) || passengerEditorOpen;

  return (
    <div className="prototype-stage">
      <div className="app-surface" inert={hasOpenModal ? true : undefined} aria-hidden={hasOpenModal ? "true" : undefined}>{content}</div>

      <Modal open={modal === "date"} title="Change travel date" onClose={() => setModal(null)}>
        <div className="modal-form"><label className="field-label">Travel date<input type="date" min={DEFAULT_DATE} value={draftDate} onChange={(event) => setDraftDate(event.target.value)} /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModal(null)}>Cancel</button><button type="button" className="primary-button" onClick={() => { setTravelDate(draftDate); setModal(null); notify("Travel date updated."); }}>Save date</button></div></div>
      </Modal>

      <Modal open={modal === "route"} title="Change route" onClose={() => setModal(null)}>
        <div className="modal-form">
          <label className="field-label">From<select value={draftFrom} onChange={(event) => setDraftFrom(event.target.value)}>{locationNames.map((name) => <option key={name} value={name} disabled={name === draftTo}>{name}</option>)}</select></label>
          <button type="button" className="swap-route-modal" onClick={swapDraftRoute}><ArrowLeftRight size={18} /> Swap route</button>
          <label className="field-label">To<select value={draftTo} onChange={(event) => setDraftTo(event.target.value)}>{locationNames.map((name) => <option key={name} value={name} disabled={name === draftFrom}>{name}</option>)}</select></label>
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModal(null)}>Cancel</button><button type="button" className="primary-button" onClick={() => { const trips = getAvailableTrips({ from: draftFrom, to: draftTo, travelDate, passengerCount: passengerTotal }); setFrom(draftFrom); setTo(draftTo); setSelectedDepartureId(trips[0]?.id ?? ""); setModal(null); notify("Route updated."); }}>Show departures</button></div>
        </div>
      </Modal>

      <Modal open={modal === "checkout"} title="Checkout" onClose={() => { if (!submitting) setModal(null); }} size="full">
        {checkoutContent}
      </Modal>

      <Modal open={modal === "ticket"} title="Digital ticket" onClose={() => setModal(null)} size="full">
        {ticketContent}
      </Modal>

      <Modal open={passengerEditorOpen} title="Edit saved passenger" onClose={() => setPassengerEditorOpen(false)}>
        <div className="modal-form"><label className="field-label">Passenger name<input value={passengerNames[0]} onChange={(event) => setPassengerNames((current) => [event.target.value, ...current.slice(1)])} /></label><label className="field-label">Telephone<input defaultValue="0772 345 678" /></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setPassengerEditorOpen(false)}>Cancel</button><button type="button" className="primary-button" onClick={() => { setPassengerEditorOpen(false); notify("Saved passenger updated."); }}>Save passenger</button></div></div>
      </Modal>

      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </div>
  );
}
