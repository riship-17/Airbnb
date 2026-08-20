function StarRating({ rating, size = 'sm' }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`}
          viewBox="0 0 32 32"
          aria-hidden="true"
          fill={star <= fullStars ? '#222222' : star === fullStars + 1 && hasHalf ? 'url(#half)' : '#DDDDDD'}
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#222222" />
              <stop offset="50%" stopColor="#DDDDDD" />
            </linearGradient>
          </defs>
          <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ label, value }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-ink-primary w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1 bg-border-light rounded-full overflow-hidden">
        <div
          className="h-full bg-ink-primary rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={5}
          aria-label={`${label}: ${value} out of 5`}
        />
      </div>
      <span className="text-sm text-ink-primary w-6 text-right">{value}</span>
    </div>
  );
}

function ReviewsSection({ listing }) {
  const { reviews, rating, reviewCount, ratingBreakdown } = listing;

  return (
    <div className="py-8" id="reviews-section">
      {/* Overall rating */}
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-5 h-5 fill-ink-primary" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
        </svg>
        <h2 className="text-xl font-semibold text-ink-primary">
          {rating} · {reviewCount} reviews
        </h2>
      </div>

      {/* Rating breakdown */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-3 mb-10">
        <RatingBar label="Cleanliness" value={ratingBreakdown.cleanliness} />
        <RatingBar label="Accuracy" value={ratingBreakdown.accuracy} />
        <RatingBar label="Check-in" value={ratingBreakdown.checkIn} />
        <RatingBar label="Communication" value={ratingBreakdown.communication} />
        <RatingBar label="Location" value={ratingBreakdown.location} />
        <RatingBar label="Value" value={ratingBreakdown.value} />
      </div>

      {/* Individual reviews - 2 column grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={`${review.author}'s avatar`}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-ink-primary text-sm">{review.author}</p>
                <p className="text-ink-secondary text-xs">{review.date}</p>
              </div>
            </div>
            <p className="text-ink-primary text-sm leading-relaxed line-clamp-4">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
