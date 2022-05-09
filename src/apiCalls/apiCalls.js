import axios from "axios";

const getScooterInfo = () => axios.get(`https://cloud-tech-api.herokuapp.com/client`);

export { getScooterInfo };
