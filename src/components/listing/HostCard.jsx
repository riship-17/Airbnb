function HostCard({ host, listing }) {
  return (
    <div className="flex items-start justify-between py-6">
      <div>
        <h2 className="text-xl font-semibold text-ink-primary mb-1">
          {listing.type} hosted by {host.name}
        </h2>
        <p className="text-ink-secondary text-sm">
          {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} baths
        </p>

        {/* Highlights */}
        <div className="mt-6 flex flex-col gap-5">
          {listing.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="material-symbols-outlined text-ink-primary text-2xl mt-0.5 flex-shrink-0">{h.icon}</span>
              <div>
                <p className="font-semibold text-ink-primary text-sm leading-5">{h.title}</p>
                <p className="text-ink-secondary text-sm leading-5">{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#host-section"
        className="flex-shrink-0 ml-4"
        aria-label={`View host ${host.name}'s profile`}
      >
        <div className="relative">
          <img
            src={host.avatar}
            alt={`Host ${host.name}`}
            className="w-14 h-14 rounded-full object-cover"
          />
          {host.superhost && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-ink-primary rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 fill-white" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
              </svg>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default HostCard;
