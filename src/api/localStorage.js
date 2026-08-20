// src/api/localStorage.js

export const getWishlist = () => JSON.parse(localStorage.getItem('wishlist') || '[]');
export const saveToWishlist = (id) => {
  const list = getWishlist();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem('wishlist', JSON.stringify(list));
  }
};
export const removeFromWishlist = (id) => {
  const list = getWishlist().filter(i => i !== id);
  localStorage.setItem('wishlist', JSON.stringify(list));
};
export const isInWishlist = (id) => getWishlist().includes(id);
export const toggleWishlist = (id) => {
  if (isInWishlist(id)) {
    removeFromWishlist(id);
    return false;
  } else {
    saveToWishlist(id);
    return true;
  }
};

export const getTrips = () => JSON.parse(localStorage.getItem('trips') || '[]');
export const addTrip = (trip) => {
  const trips = getTrips();
  trips.push(trip);
  localStorage.setItem('trips', JSON.stringify(trips));
};
