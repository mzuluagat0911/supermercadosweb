export function formatWhatsAppLink(phone: string, message?: string) {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
