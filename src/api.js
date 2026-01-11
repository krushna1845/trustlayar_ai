const BASE_URL = "https://trustlayer-backend-1.onrender.com";

export default BASE_URL;
fetch("https://trustlayer-backend-1.onrender.com/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
import BASE_URL from "../config/api";

fetch(`${BASE_URL}/analyze`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
