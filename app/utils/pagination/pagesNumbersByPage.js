/**
 * Return the previous 4 and next 4 pages numbers.
 *
 * @param int size Size of the list
 * @param int page Actual page
 *
 */
export default function pagesNumberByPage(size, page) {
  return Array.from(Array(size + 1).keys()).slice(
    page > 4 ? page - 4 : 1,
    page + 5
  );
}
