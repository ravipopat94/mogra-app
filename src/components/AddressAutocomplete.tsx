"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Tracks whether the Maps script is already injected
let scriptLoaded = false;
let scriptLoading = false;
const callbacks: Array<() => void> = [];

function loadMapsScript(apiKey: string, onReady: () => void) {
  if (scriptLoaded) { onReady(); return; }
  callbacks.push(onReady);
  if (scriptLoading) return;
  scriptLoading = true;
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    scriptLoaded = true;
    callbacks.forEach((cb) => cb());
    callbacks.length = 0;
  };
  document.head.appendChild(script);
}

export default function AddressAutocomplete({ value, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === "YOUR_KEY_HERE") return; // graceful fallback

    loadMapsScript(apiKey, () => {
      if (!inputRef.current || autocompleteRef.current) return;
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        fields: ["formatted_address"],
      });
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address) onChange(place.formatted_address);
      });
    });

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Shipping address"
      maxLength={300}
      autoComplete="off"
      className={className}
    />
  );
}
