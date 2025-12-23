export function getDisplayRange(
  page: number,
  pageSize: number,
  totalResults: number
) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalResults);
  return { start, end };
}
