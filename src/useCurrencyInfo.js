// import { useState, useEffect } from "react";

// function useCurrencyInfo(currency) {
//   // 📦 API se aane wala data store karne ke liye state banaya
//   const [data_ofapi, setdata_ofapi] = useState(null);

//   // 🔁 Jab bhi currency change ho, tab API call karna hai
//   useEffect(() => {
//     async function getdata() {
//       try {
//         // 🌐 API call kar rahe hain selected currency ke liye
//         const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
//         if (!res.ok) throw new Error("API not found");

//         // ✅ Response ko JSON mein convert karo
//         const json = await res.json();

//         // 🧠 API se "conversion_rates" object nikaal rahe hain
//         setdata_ofapi(json.conversion_rates); // ✅ yahi object dropdown aur conversion ke liye chahiye
//       } catch (err) {
//         // ⚠️ Agar API fail ho jaaye toh error console mein dikhao
//         console.log("currency fetch failed", err.message);
//       }
//     }

//     // 🚀 Function ko call kar rahe hain jab component mount ho ya currency change ho
//     getdata();
//   }, [currency]);

//   // 🔙 Final result return kar rahe hain jise App.jsx use karega
//   return data_ofapi;
// }

// export default useCurrencyInfo;
// useCurrencyInfo.js
import { useState, useEffect } from "react";

// 👇 This custom hook will fetch currency rates for the selected base currency
function useCurrencyInfo(baseCurrency) {
  // 🧠 State to store fetched rates, loading status, and error message
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Whenever the base currency changes, fetch new data
  useEffect(() => {
    // ✅ Always use lowercase for the base (the API file names are lowercase)
    const base = baseCurrency.toLowerCase();

    // ⚙️ Start loading
    setLoading(true);
    setError(null);

    // 🌍 API URL example: .../currencies/usd.json
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`;

    // 📦 Fetch the data
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch currency data");
        }
        return res.json(); // convert response to JSON
      })
      .then((json) => {
        // 🧾 The API returns something like:
        // { "usd": { "inr": 83.2, "eur": 0.92, ... } }

        // 👉 So we extract that inner object (json[base])
        const rates = json[base];

        // ✅ Make sure it's an object
        if (rates && typeof rates === "object") {
          setData(rates);
        } else {
          setError("Invalid data format from API");
        }
      })
      .catch((err) => {
        // ❌ Handle any errors (network, JSON, etc.)
        setError(err.message);
      })
      .finally(() => {
        // ✅ Stop loading
        setLoading(false);
      });
  }, [baseCurrency]);

  // 🔙 Return all three so we can use them in App.jsx
  return { data, loading, error };
}

export default useCurrencyInfo;
