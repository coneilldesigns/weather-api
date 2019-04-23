import Axios from "axios";

export default Axios.create({
  baseURL: "https://secure.geonames.org/timezone"
});
