import './App.css';
import './index.css';
import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './useCurrencyInfo';

function App() {
  // 💰 User ne kitna amount likha hai
  const [amount, setAmount] = useState(0);

  // 🌍 From aur To currencies (lowercase rakho)
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");

  // 🔄 Converted amount store karne ke liye
  const [convertedAmt, setConvertedAmt] = useState(0);

  // 📦 API se currency rates la rahe hain (custom hook se)
  const { data } = useCurrencyInfo(from);

  // 🧠 Sab currencies nikaal lo dropdown ke liye
  const options = data ? Object.keys(data) : [];

  // 🔁 Swap button pe dono currencies aur amounts badal do
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmt(amount);
    setAmount(convertedAmt);
  };

  // 🧮 Convert button pe calculation
  const convert = () => {
    if (!data) return; // agar data load nahi hua hai to kuch mat karo
    const rate = data[to]; // jaise usd -> inr ka rate
    const result = amount * rate; // multiply karke converted value nikaalo
    setConvertedAmt(result); // aur set kar do
  };

  console.log("Currency data:", data);

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="max-w-md w-full border border-gray-300 p-5 rounded-lg backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // page reload mat hone do
            convert(); // conversion chalao
          }}
        >
          {/* 🧾 From currency input */}
          <div className="mb-3">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectCurrency={from}
            />
          </div>

          {/* 🔁 Swap button */}
          <div className="text-center mb-3">
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-1 rounded-md"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          {/* 📥 To currency input (converted value read-only) */}
          <div className="mb-3">
            <InputBox
              label="To"
              amount={convertedAmt}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          {/* 🚀 Convert button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
