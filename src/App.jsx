import React, { useState, useEffect } from "react";
import { getScooterInfo } from "./apiCalls/apiCalls";
import Chart from "./components/LineChart";
import "./App.css";
import logo from "./assets/logo.svg";

const App = () => {
  const [scooterData, setScooterData] = useState([]);
  const [distance, setDistance] = useState([]);
  const [speed, setSpeed] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScooterInfo().then((data) => {
      setScooterData(data.data);
      setFetched(true);
    });
    fetched && setTotalDistance();
    fetched && setAverageSpeed();
    fetched && setLoading(false);
  }, [fetched]);

  const setTotalDistance = () => {
    let totalDist = [];
    scooterData.map((scooter) => totalDist.push(scooter.distance));
    setDistance(totalDist);
  };

  const setAverageSpeed = () => {
    let averageSpeed = [];
    scooterData.map((scooter) => averageSpeed.push(scooter.averageSpeed));
    setSpeed(averageSpeed);
  };

  // Total driven kilometers
  const totalDrivenKm = (arr) => {
    let sum = 0;
    arr.map((number) => (sum = sum + number));
    return Math.floor(sum / 1000);
  };

  // Calculate average max speed
  const averageMaxSpeed = (arr) => {
    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
    const result = average(arr); // 5
    return result;
  };

  const totalKM = totalDrivenKm(distance);
  const averageSpeed = averageMaxSpeed(speed);

  return (
    <div className="app-container">
      <header>
        <div className="logo-container">
          <img src={logo} alt="El-Scooter Logo" className="logo" />
        </div>
      </header>

      <main>
        <div className="content-box">
          <h2>Kilometers (Week 19 2022)</h2>
          <p>The scooters sent data at the end of each day.</p>
          <p>
            The following diagram displays the total driven kilometers for each
            of the scooters each day.
          </p>
          <Chart sensors={scooterData} type="distance" />
        </div>

        <div className="content-box">
          <h2>Battery Percentage (Week 19 2022)</h2>
          <p>The scooters sent data at the end of each day.</p>
          <p>
            The following diagram displays the battery-level at the end of each
            day for each scooter.
          </p>
          <Chart sensors={scooterData} type="battery" />
        </div>

        <div className="content-box">
          <h2>Average Speed (Week 19 2022)</h2>
          <p>The scooters sent data at the end of each day.</p>
          <p>
            The following diagram displays the average speed of each scooter
            from each day.
          </p>
          <Chart sensors={scooterData} type="speed" />
        </div>

        <div className="content-box-two">
          <div className="content-box-min">
            <h2>Minimum distance driven</h2>
            <span className="big">
              {!loading ? `${Math.min(...distance) / 1000} km` : "Loading..."}
            </span>
          </div>

          <div className="content-box-max">
            <h2>Maximum distance driven</h2>
            <span className="big">
              {!loading ? `${Math.max(...distance) / 1000} km` : "Loading..."}
            </span>
          </div>
        </div>

        <div className="content-box">
          <h2>Total driven kilometers</h2>
          <p>
            This is the total amount of kilometers the 10 scooters drove all
            together.
          </p>
          <span className="big">
            {!loading ? `${totalKM} km` : "Loading..."}
          </span>
        </div>

        <div className="content-box">
          <h2>Average max speed</h2>
          <p>This is the average of the max speeds registered.</p>
          <span className="big">
            {!loading ? `${averageSpeed} km/h` : "Loading..."}
          </span>
        </div>
      </main>
    </div>
  );
};

export default App;
