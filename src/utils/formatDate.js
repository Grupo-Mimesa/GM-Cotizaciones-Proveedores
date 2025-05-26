const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,         // true para formato AM/PM, false para 24h
  };
  return date.toLocaleString('es-ES', options);
};

export default formatDate;