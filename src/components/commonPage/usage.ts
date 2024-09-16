// import React, { useEffect, useState } from 'react';
// import { fetchDataIfEmpty } from './utils'; // Adjust the import path as needed

// const ExampleComponent = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const endpoint = 'https://example.com/api/data'; // Replace with your API endpoint
//     fetchDataIfEmpty(data, endpoint, setData, setLoading, setError);
//   }, [data]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error loading data: {error.message}</p>
//       ) : (
//         <div>
//           {data.length === 0 ? (
//             <p>No data available.</p>
//           ) : (
//             <ul>
//               {data.map(item => (
//                 <li key={item.id}>{item.name}</li> // Adjust according to your data structure
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExampleComponent;
