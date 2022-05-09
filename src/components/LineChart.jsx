import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

var randomHex = require("random-hex");

export default function Chart(props) {
  const scooters = [];

  const monday = {
    name: "Monday",
  };
  const tuesday = {
    name: "Tuesday",
  };
  const wednesday = {
    name: "Wednesday",
  };
  const thursday = {
    name: "Thursday",
  };
  const friday = {
    name: "Friday",
  };

  props.sensors.map((sensor) => {
    let key = "Scooter " + sensor.sensorID;
    let distance = Math.round((sensor.distance / 1000) * 10) / 10;
    switch (sensor.dateRegistered) {
      case new Date("09 May 2022").toISOString():
        if (props.type === "distance") monday[key] = distance;
        else if (props.type === "battery") monday[key] = sensor.batteryEnd;
        else monday[key] = sensor.averageSpeed;
        return true;
      case new Date("10 May 2022").toISOString():
        if (props.type === "distance") tuesday[key] = distance;
        else if (props.type === "battery") tuesday[key] = sensor.batteryEnd;
        else tuesday[key] = sensor.averageSpeed;
        return true;
      case new Date("11 May 2022").toISOString():
        if (props.type === "distance") wednesday[key] = distance;
        else if (props.type === "battery") wednesday[key] = sensor.batteryEnd;
        else wednesday[key] = sensor.averageSpeed;
        return true;
      case new Date("12 May 2022").toISOString():
        if (props.type === "distance") thursday[key] = distance;
        else if (props.type === "battery") thursday[key] = sensor.batteryEnd;
        else thursday[key] = sensor.averageSpeed;
        return true;
      case new Date("13 May 2022").toISOString():
        if (props.type === "distance") friday[key] = distance;
        else if (props.type === "battery") friday[key] = sensor.batteryEnd;
        else friday[key] = sensor.averageSpeed;
        return true;
      default:
        return false;
    }
  });

  const chartData = [monday, tuesday, wednesday, thursday, friday];

  return (
    <LineChart
      width={1200}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        type="number"
        domain={
          props.type === "distance"
            ? [0, 100]
            : props.type === "battery"
            ? [0, 100]
            : [0, 20]
        }
        tickCount={10}
        tickFormatter={
          props.type === "distance"
            ? (tick) => `${tick}km`
            : props.type === "battery"
            ? (tick) => `${tick}%`
            : (tick) => `${tick}km/h`
        }
      />
      <Tooltip />
      <Legend />
      {props.sensors.map((sensorData) => {
        if (!scooters.includes(sensorData.sensorID)) {
          scooters.push(sensorData.sensorID);
          return (
            <Line
              type="monotone"
              dataKey={"Scooter " + sensorData.sensorID}
              stroke={randomHex.generate()}
              key={sensorData.sensorID}
            />
          );
        } else return null;
      })}
    </LineChart>
  );
}
