import Axios from "axios";

export default Axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID 079ef04603a4771b40c5c9a0baee045792f203b2295d437fb1c723a79567e7d7"
  }
});
