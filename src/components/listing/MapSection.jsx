function MapSection({ location }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.02},${location.lat - 0.015},${location.lng + 0.02},${location.lat + 0.015}&layer=mapnik&marker=${location.lat},${location.lng}`;

  return (
    <div className="py-8" id="map-section">
      <h2 className="text-xl font-semibold text-ink-primary mb-2">Where you'll be</h2>
      <p className="text-ink-secondary text-sm mb-6">
        {location.city}, {location.state}, {location.country}
      </p>
      <div className="rounded-card overflow-hidden border border-border-light" style={{ height: '480px' }}>
        <iframe
          src={mapUrl}
          title={`Map of ${location.city}, ${location.state}`}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={`Map showing location in ${location.city}, ${location.state}`}
        />
      </div>
      <div className="mt-4">
        <p className="font-semibold text-ink-primary text-sm">
          {location.city}, {location.state}
        </p>
        <p className="text-ink-secondary text-sm mt-1 leading-relaxed">
          The apartment is located in the heart of the old city, steps away from the City Palace and Jagdish Temple. Lake Pichola and Fateh Sagar Lake are both within walking distance.
        </p>
      </div>
    </div>
  );
}

export default MapSection;
