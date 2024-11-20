export function getPagination(currentPage, maxPage = 30) {
    const range = 7; // 보여줄 페이지 범위
    const halfRange = Math.floor(range / 2);

    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(maxPage, currentPage + halfRange);

    // Adjust start and end if the range is less than 7
    if (end - start < range - 1) {
        if (start === 1) {
            end = Math.min(maxPage, start + range - 1);
        } else if (end === maxPage) {
            start = Math.max(1, end - range + 1);
        }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}