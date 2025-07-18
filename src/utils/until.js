export function formatCurrenCy(currency) {
  return Intl.NumberFormat("de-DE").format(currency);
}
export function formatNumberToSocialStyle(value) {
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}
