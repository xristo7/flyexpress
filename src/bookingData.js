const ONE_WAY_FARE = 5000;
const RETURN_LEG_FARE = 4000;

export const demoLocations = [
  {
    id: "entebbe-main-stage",
    name: "Entebbe Main Stage",
    shortName: "Entebbe",
    coordinates: [0.0521, 32.4637],
  },
  {
    id: "kitooro",
    name: "Kitooro",
    shortName: "Kitooro",
    coordinates: [0.0642, 32.4753],
  },
  {
    id: "abayita-ababiri",
    name: "Abayita Ababiri",
    shortName: "Abayita",
    coordinates: [0.1283, 32.5289],
  },
  {
    id: "kajjansi",
    name: "Kajjansi",
    shortName: "Kajjansi",
    coordinates: [0.2087, 32.535],
  },
  {
    id: "clock-tower",
    name: "Clock Tower",
    shortName: "Clock Tower",
    coordinates: [0.3056, 32.575],
  },
  {
    id: "kampala-main-stage",
    name: "Kampala Main Stage",
    shortName: "Kampala",
    coordinates: [0.3136, 32.5785],
  },
];

export const departuresByDirection = {
  entebbeToKampala: [
    {
      id: "ent-kla-0830",
      departureTime: "08:30 AM",
      arrivalTime: "09:35 AM",
      durationMinutes: 65,
      durationLabel: "1h 05m",
      service: "Express Direct",
      seatsLeft: 4,
      fare: ONE_WAY_FARE,
      vehicle: "High-roof van",
      plate: "UBM 245K",
      traffic: "Moderate",
    },
    {
      id: "ent-kla-0900",
      departureTime: "09:00 AM",
      arrivalTime: "11:15 AM",
      durationMinutes: 135,
      durationLabel: "2h 15m",
      service: "Express Direct",
      seatsLeft: 12,
      fare: ONE_WAY_FARE,
      vehicle: "18-seat van",
      plate: "UBP 318F",
      traffic: "Light",
    },
    {
      id: "ent-kla-0930",
      departureTime: "09:30 AM",
      arrivalTime: "10:45 AM",
      durationMinutes: 75,
      durationLabel: "1h 15m",
      service: "Fly Express",
      seatsLeft: 2,
      fare: ONE_WAY_FARE,
      vehicle: "14-seat van",
      plate: "UBN 742D",
      traffic: "Heavy",
    },
    {
      id: "ent-kla-1000",
      departureTime: "10:00 AM",
      arrivalTime: "11:00 AM",
      durationMinutes: 60,
      durationLabel: "1h",
      service: "Express Direct",
      seatsLeft: 11,
      fare: ONE_WAY_FARE,
      vehicle: "High-roof van",
      plate: "UBM 245K",
      traffic: "Moderate",
    },
  ],
  kampalaToEntebbe: [
    {
      id: "kla-ent-1300",
      departureTime: "01:00 PM",
      arrivalTime: "02:05 PM",
      durationMinutes: 65,
      durationLabel: "1h 05m",
      service: "Express Direct",
      seatsLeft: 10,
      fare: ONE_WAY_FARE,
      vehicle: "18-seat van",
      plate: "UBP 318F",
      traffic: "Moderate",
    },
    {
      id: "kla-ent-1430",
      departureTime: "02:30 PM",
      arrivalTime: "03:30 PM",
      durationMinutes: 60,
      durationLabel: "1h",
      service: "Express Direct",
      seatsLeft: 5,
      fare: ONE_WAY_FARE,
      vehicle: "High-roof van",
      plate: "UBM 245K",
      traffic: "Light",
    },
    {
      id: "kla-ent-1600",
      departureTime: "04:00 PM",
      arrivalTime: "05:10 PM",
      durationMinutes: 70,
      durationLabel: "1h 10m",
      service: "Fly Express",
      seatsLeft: 7,
      fare: ONE_WAY_FARE,
      vehicle: "14-seat van",
      plate: "UBN 742D",
      traffic: "Moderate",
    },
    {
      id: "kla-ent-1800",
      departureTime: "06:00 PM",
      arrivalTime: "07:20 PM",
      durationMinutes: 80,
      durationLabel: "1h 20m",
      service: "Fly Express",
      seatsLeft: 3,
      fare: ONE_WAY_FARE,
      vehicle: "14-seat van",
      plate: "UBN 742D",
      traffic: "Heavy",
    },
  ],
};

export const returnModes = [
  {
    id: "same-day",
    label: "Same-day return",
    description: "Return on an eligible departure today.",
    returnFarePerPassenger: RETURN_LEG_FARE,
    requiresDate: false,
  },
  {
    id: "date-specific",
    label: "Date-specific",
    description: "Reserve a return date now.",
    returnFarePerPassenger: RETURN_LEG_FARE,
    requiresDate: true,
  },
  {
    id: "open",
    label: "Open return",
    description: "Choose an eligible departure before the ticket expires.",
    returnFarePerPassenger: RETURN_LEG_FARE,
    requiresDate: false,
  },
  {
    id: "promotional",
    label: "Promotional return",
    description: "Use a return journey within the campaign validity period.",
    returnFarePerPassenger: RETURN_LEG_FARE,
    requiresDate: false,
  },
];

export const assistanceChoices = [
  { id: "none", label: "No assistance", description: "No travel assistance needed." },
  { id: "boarding", label: "Boarding assistance", description: "Help when entering or leaving the vehicle." },
  { id: "priority-seating", label: "Priority seating", description: "Request a priority seat near the entrance." },
  { id: "mobility", label: "Mobility support", description: "Allow the crew extra time and assistance." },
];

export const languages = [
  { id: "en", code: "en", label: "English", sample: "You are ready to travel." },
  { id: "lg", code: "lg", label: "Luganda", sample: "Oli mwetegefu okutambula." },
  { id: "sw", code: "sw", label: "Swahili", sample: "Uko tayari kusafiri." },
];

export const luggageCategories = [
  {
    id: "personal",
    label: "Small personal item",
    description: "Handbag or compact backpack",
    allowance: "Fits on your lap",
    price: 0,
    included: true,
    assessedAtStage: false,
  },
  {
    id: "standard",
    label: "Standard bag",
    description: "Regular travel suitcase",
    allowance: "Up to 15 kg",
    price: 2000,
    included: false,
    assessedAtStage: false,
  },
  {
    id: "large",
    label: "Large bag",
    description: "Large suitcase or sack",
    allowance: "Up to 25 kg",
    price: 4000,
    included: false,
    assessedAtStage: false,
  },
  {
    id: "excess",
    label: "Excess luggage",
    description: "Additional bulky luggage",
    allowance: "Stage approval required",
    price: 6000,
    included: false,
    assessedAtStage: false,
  },
  {
    id: "fragile",
    label: "Fragile item",
    description: "Careful handling requested",
    allowance: "Must be securely packed",
    price: 7000,
    included: false,
    assessedAtStage: false,
  },
  {
    id: "commercial",
    label: "Commercial luggage",
    description: "Business or resale goods",
    allowance: "Price confirmed by a stage agent",
    price: null,
    included: false,
    assessedAtStage: true,
  },
];

export const paymentMethods = [
  {
    id: "wallet",
    label: "Fly Express Wallet",
    description: "Pay instantly from your passenger balance.",
    icon: "WalletCards",
    bookingStatus: "paid",
  },
  {
    id: "mtn",
    label: "MTN Mobile Money",
    description: "Approve a prompt on your MTN telephone number.",
    icon: "Smartphone",
    bookingStatus: "authorization-required",
  },
  {
    id: "airtel",
    label: "Airtel Money",
    description: "Approve a prompt on your Airtel telephone number.",
    icon: "Smartphone",
    bookingStatus: "authorization-required",
  },
  {
    id: "cash",
    label: "Cash at Stage",
    description: "Reserve now and pay the dispatcher before boarding.",
    icon: "Banknote",
    bookingStatus: "payment-pending",
  },
  {
    id: "corporate",
    label: "Corporate Travel Account",
    description: "Use an approved organization account.",
    icon: "Building2",
    bookingStatus: "awaiting-approval",
  },
  {
    id: "voucher",
    label: "Promotional Voucher",
    description: "Apply an eligible campaign code.",
    icon: "TicketPercent",
    bookingStatus: "validation-required",
  },
];

const occupiedSeats = new Set(["1A", "1B", "2A", "2D", "3B", "4A"]);
const prioritySeats = new Set(["1C", "1D"]);

export const seatInventory = ["1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", "3A", "3B", "3C", "3D", "4A", "4B", "4C", "4D"].map(
  (id) => ({
    id,
    status: occupiedSeats.has(id) ? "occupied" : "available",
    isPriority: prioritySeats.has(id),
  }),
);

export const bookingDefaults = {
  fromId: "entebbe-main-stage",
  toId: "kampala-main-stage",
  travelDate: "2026-07-18",
  tripType: "oneway",
  returnMode: null,
  passengerCount: 1,
  assistanceId: "none",
  languageId: "en",
  luggageQuantities: {
    personal: 1,
    standard: 0,
    large: 0,
    excess: 0,
    fragile: 0,
    commercial: 0,
  },
  seatPreference: "auto",
  selectedSeats: [],
  paymentMethodId: "wallet",
};

const locationIndex = new Map(demoLocations.map((location, index) => [location.id, index]));
const locationById = new Map(demoLocations.map((location) => [location.id, location]));
const locationIdByName = new Map(demoLocations.map((location) => [location.name.toLocaleLowerCase(), location.id]));
const luggageById = new Map(luggageCategories.map((category) => [category.id, category]));

function resolveLocationId(value) {
  if (!value) return null;
  if (locationById.has(value)) return value;
  return locationIdByName.get(String(value).toLocaleLowerCase()) ?? null;
}

function safeQuantity(value, fallback = 0) {
  const quantity = Number(value);
  return Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : fallback;
}

function isReturnTrip(options) {
  if (typeof options.isReturn === "boolean") return options.isReturn;
  const tripType = String(options.tripType ?? "").toLocaleLowerCase();
  return ["return", "roundtrip", "round-trip", "round trip"].includes(tripType) || Boolean(options.returnMode);
}

function luggageCharge(quantities = {}) {
  if (Array.isArray(quantities)) {
    return quantities.reduce((total, item) => {
      const category = luggageById.get(typeof item === "string" ? item : item?.id);
      const quantity = typeof item === "string" ? 1 : safeQuantity(item?.quantity, 1);
      return total + (Number.isFinite(category?.price) ? category.price * quantity : 0);
    }, 0);
  }

  return Object.entries(quantities).reduce((total, [id, quantity]) => {
    const category = luggageById.get(id);
    return total + (Number.isFinite(category?.price) ? category.price * safeQuantity(quantity) : 0);
  }, 0);
}

export function formatUGX(value) {
  if (value === null || value === undefined) return "Assessed at stage";
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "UGX 0";
  return `UGX ${new Intl.NumberFormat("en-UG", { maximumFractionDigits: 0 }).format(amount)}`;
}

export function getAvailableTrips(fromOrOptions = bookingDefaults.fromId, toArg = bookingDefaults.toId, dateArg = bookingDefaults.travelDate) {
  const options =
    fromOrOptions && typeof fromOrOptions === "object"
      ? fromOrOptions
      : { fromId: fromOrOptions, toId: toArg, travelDate: dateArg };

  const fromId = resolveLocationId(options.fromId ?? options.from ?? bookingDefaults.fromId);
  const toId = resolveLocationId(options.toId ?? options.to ?? bookingDefaults.toId);
  if (!fromId || !toId || fromId === toId) return [];

  const fromPosition = locationIndex.get(fromId);
  const toPosition = locationIndex.get(toId);
  const direction = fromPosition < toPosition ? "entebbeToKampala" : "kampalaToEntebbe";
  const passengerCount = Math.max(1, safeQuantity(options.passengerCount ?? options.passengers, 1));
  const travelDate = options.travelDate ?? options.date ?? bookingDefaults.travelDate;
  const from = locationById.get(fromId);
  const to = locationById.get(toId);

  return departuresByDirection[direction]
    .filter((departure) => departure.seatsLeft >= passengerCount)
    .map((departure) => ({
      ...departure,
      direction,
      fromId,
      toId,
      from: from.name,
      to: to.name,
      travelDate,
    }));
}

export function computeFare(options = {}) {
  const passengerCount = Math.max(
    1,
    safeQuantity(
      Array.isArray(options.passengers)
        ? options.passengers.length
        : options.passengerCount ?? options.passengers ?? bookingDefaults.passengerCount,
      bookingDefaults.passengerCount,
    ),
  );
  const outboundFare = Number.isFinite(Number(options.oneWayFare ?? options.trip?.fare))
    ? Number(options.oneWayFare ?? options.trip?.fare)
    : ONE_WAY_FARE;
  const selectedReturnMode = returnModes.find((mode) => mode.id === options.returnMode);
  const returnFare = Number.isFinite(Number(options.returnFare))
    ? Number(options.returnFare)
    : selectedReturnMode?.returnFarePerPassenger ?? RETURN_LEG_FARE;
  const transportFare = passengerCount * (outboundFare + (isReturnTrip(options) ? returnFare : 0));
  const luggageFare = luggageCharge(options.luggageQuantities ?? options.luggage ?? bookingDefaults.luggageQuantities);
  const discount = Math.max(0, Number(options.discount) || 0);

  return Math.max(0, transportFare + luggageFare - discount);
}
