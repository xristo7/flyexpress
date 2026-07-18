import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { demoLocations } from "./bookingData.js";
import van from "./assets/fly-express-van.png";

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function resolveLocation(value, fallbackIndex) {
  const candidate = typeof value === "string" ? value : value?.name ?? value?.label ?? "";
  return demoLocations.find((location) => location.name.toLowerCase() === candidate.toLowerCase()) ?? demoLocations[fallbackIndex];
}

function routeDetails(from, to) {
  const fromLocation = resolveLocation(from, 0);
  let toLocation = resolveLocation(to, demoLocations.length - 1);
  if (toLocation.id === fromLocation.id) {
    toLocation = fromLocation.id === demoLocations.at(-1).id ? demoLocations[0] : demoLocations.at(-1);
  }
  const fromIndex = demoLocations.findIndex((location) => location.id === fromLocation.id);
  const toIndex = demoLocations.findIndex((location) => location.id === toLocation.id);
  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);
  const corridor = demoLocations.slice(start, end + 1).map((location) => location.coordinates);
  const points = fromIndex <= toIndex ? corridor : corridor.reverse();
  return { from: fromLocation, to: toLocation, points, key: `${fromLocation.id}-${toLocation.id}` };
}

export function MapPreview({ from = "Entebbe Main Stage", to = "Kampala Main Stage", collapsed = false }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const boundsRef = useRef(null);
  const resizeFrameRef = useRef(0);
  const [tilesFailed, setTilesFailed] = useState(false);
  const route = useMemo(() => routeDetails(from, to), [from, to]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    setTilesFailed(false);
    let tileErrors = 0;
    let receivedTile = false;

    const map = L.map(container, {
      attributionControl: true,
      boxZoom: false,
      doubleClickZoom: false,
      dragging: false,
      keyboard: false,
      preferCanvas: true,
      scrollWheelZoom: false,
      touchZoom: false,
      zoomControl: false,
    });
    const tileLayer = L.tileLayer(TILE_URL, { attribution: OSM_ATTRIBUTION, crossOrigin: true, maxZoom: 19 });
    tileLayer.on("tileload", () => { receivedTile = true; setTilesFailed(false); });
    tileLayer.on("tileerror", () => { tileErrors += 1; if (!receivedTile && tileErrors >= 2) setTilesFailed(true); });
    tileLayer.addTo(map);

    L.polyline(route.points, { color: "#081b33", opacity: 0.55, weight: 8 }).addTo(map);
    L.polyline(route.points, { color: "#2878ff", dashArray: "8 9", lineCap: "round", lineJoin: "round", opacity: 1, weight: 4 }).addTo(map);
    L.circleMarker(route.from.coordinates, { color: "#ffffff", fillColor: "#2878ff", fillOpacity: 1, radius: 9, weight: 4 })
      .bindTooltip(route.from.name, { className: "route-tooltip", direction: "bottom", offset: [0, 14], permanent: true })
      .addTo(map);
    L.circleMarker(route.to.coordinates, { color: "#ffffff", fillColor: "#e53935", fillOpacity: 1, radius: 9, weight: 4 })
      .bindTooltip(route.to.name, { className: "route-tooltip", direction: "bottom", offset: [0, 14], permanent: true })
      .addTo(map);

    const bounds = L.latLngBounds(route.points);
    boundsRef.current = bounds;
    map.fitBounds(bounds, { animate: false, paddingBottomRight: [38, 58], paddingTopLeft: [38, 58] });
    mapRef.current = map;
    const loadTimeout = window.setTimeout(() => { if (!receivedTile) setTilesFailed(true); }, 8000);

    return () => {
      window.clearTimeout(loadTimeout);
      window.cancelAnimationFrame(resizeFrameRef.current);
      boundsRef.current = null;
      mapRef.current = null;
      map.remove();
    };
  }, [route]);

  useEffect(() => {
    const map = mapRef.current;
    const bounds = boundsRef.current;
    if (!map || !bounds) return undefined;
    resizeFrameRef.current = window.requestAnimationFrame(() => {
      map.invalidateSize({ animate: false, pan: false });
      map.fitBounds(bounds, {
        animate: false,
        paddingBottomRight: collapsed ? [28, 190] : [38, 58],
        paddingTopLeft: collapsed ? [28, 52] : [38, 58],
      });
    });
    return () => window.cancelAnimationFrame(resizeFrameRef.current);
  }, [collapsed, route.key]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current = window.requestAnimationFrame(() => mapRef.current?.invalidateSize({ animate: false, pan: false }));
    });
    observer.observe(container);
    return () => { observer.disconnect(); window.cancelAnimationFrame(resizeFrameRef.current); };
  }, []);

  return (
    <section className="booking-map" aria-label={`OpenStreetMap preview of the route from ${route.from.name} to ${route.to.name}.`}>
      <div ref={containerRef} className="booking-map-canvas" />
      {tilesFailed ? (
        <div className="booking-map-fallback" role="status" aria-live="polite">
          <img src={van} alt="" />
          <strong>Map preview unavailable</strong>
          <p>Your route from {route.from.name} to {route.to.name} is still selected.</p>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>
        </div>
      ) : null}
    </section>
  );
}
