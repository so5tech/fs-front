// import axios from 'axios';

// /**
//  * Checks if the given array is empty and fetches data from the provided endpoint if it is.
//  * @param {Array} dataArray - The array to check.
//  * @param {string} endpoint - The API endpoint to fetch data from.
//  * @param {Function} setData - Function to set the data state.
//  * @param {Function} setLoading - Function to set the loading state.
//  * @param {Function} setError - Function to set the error state.
//  */
// export const fetchDataIfEmpty = async (dataArray, endpoint, setData, setLoading, setError) => {
//   if (dataArray.length === 0) {
//     setLoading(true);
//     try {
//       const response = await axios.get(endpoint);
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error); // Set error state if needed
//     } finally {
//       setLoading(false);
//     }
//   }
// };
// import axios from 'axios';

// /**
//  * Checks if the given array is empty and fetches data from the provided endpoint if it is.
//  * @param {Array} dataArray - The array to check.
//  * @param {string} endpoint - The API endpoint to fetch data from.
//  * @param {Function} setData - Function to set the data state.
//  * @param {Function} setLoading - Function to set the loading state.
//  * @param {Function} setError - Function to set the error state.
//  */
// export const fetchDataIfEmpty = async (dataArray, endpoint, setData, setLoading, setError) => {
//   if (dataArray.length === 0) {
//     setLoading(true);
//     try {
//       const response = await axios.get(endpoint);
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error); // Set error state if needed
//     } finally {
//       setLoading(false);
//     }
//   }
// };
