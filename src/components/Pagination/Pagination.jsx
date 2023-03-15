// import React from 'react';

// function Pagination(props) {
//     const {
//         currentPage,
//         setCurrentPage,
//         filteredCosmetics,
//         itemsPerPage,
//         visiblePages,
//     } = props;

//     let pageNumbers = [];
//     for (
//         let i = 1;
//         i <= Math.ceil(filteredCosmetics.length / itemsPerPage);
//         i++
//     ) {
//         pageNumbers.push(i);
//     }

//     let renderPageNumbers = null;

//     if (pageNumbers.length > 0) {
//         let firstPageToShow = currentPage - Math.floor(visiblePages / 2);
//         let lastPageToShow = currentPage + Math.floor(visiblePages / 2);

//         if (firstPageToShow < 1) {
//             firstPageToShow = 1;
//             lastPageToShow = visiblePages;
//         } else if (lastPageToShow > pageNumbers.length) {
//             lastPageToShow = pageNumbers.length;
//             firstPageToShow = lastPageToShow - visiblePages + 1;
//         }

//         pageNumbers = pageNumbers.slice(firstPageToShow - 1, lastPageToShow);

//         renderPageNumbers = (
//             <ul id="page-numbers">
//                 {currentPage > 1 && (
//                     <li onClick={() => setCurrentPage(currentPage - 1)}>&lt;</li>
//                 )}
//                 {pageNumbers.map(number => {
//                     return (
//                         <li
//                             key={number}
//                             id={number}
//                             onClick={e => setCurrentPage(Number(e.target.id))}
//                             className={currentPage === number ? 'active' : ''}
//                         >
//                             {number}
//                         </li>
//                     );
//                 })}
//                 {currentPage < pageNumbers.length && (
//                     <li onClick={() => setCurrentPage(currentPage + 1)}>&gt;</li>
//                 )}
//             </ul>
//         );
//     }

//     return <>{renderPageNumbers}</>;
// }

// export default Pagination;
