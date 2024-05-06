import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`making request to ${API_URL}/values`)
        const response = await axios.get(`${API_URL}/values`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 250); // fetch data every second

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   const ctx = document.getElementById('myChart').getContext('2d');
  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: data.map((_, index) => index),
  //       datasets: [{
  //         label: 'Values',
  //         data: data,
  //         fill: false,
  //         borderColor: 'rgb(75, 192, 192)',
  //         tension: 0.1
  //       }]
  //     }
  //   });
  // }, [data]);

  return (
    <div className="App">
      <h2>Chart Application</h2>
      <ul>
        {data.map(item => {
          return (<li>
            {item.value}
          </li>)
        })}
      </ul>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

export default App;
