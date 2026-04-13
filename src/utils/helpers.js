export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function isDueSoon(dateString) {
  const today = new Date();
  const deadline = new Date(dateString);
  const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  return diff >= 0 && diff <= 2;
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}
