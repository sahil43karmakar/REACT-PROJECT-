// import React, {useId} from 'react'

// function InputBox({
//     label,
//     amount,
//     //to change the amount/currency
//     onAmountChange,
//     onCurrencyChange,
//     currencyOptions = [],
//     //by default currency wi ll be usd 
//     selectCurrency = "usd",
//     //below if user don't want to change the amount /currency
//     amountDisable = false,
//     currencyDisable = false,
//     //if user want to inject thier own css so they can change their style

//     className = "",
// }) {
//     //we get unique value
//    const amountInputId = useId();

//     return (
//         <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
//             <div className="w-1/2">
//                 <label htmlFor={amountInputId}  className="text-black/40 mb-2 inline-block">
//                     {label}
//                 </label>
//                 <input
//                 // we bind with useid
//                     id={amountInputId}
//                     className="outline-none w-full bg-transparent py-1.5"
//                     type="number"
//                     placeholder="Amount"
//                     //if it is disabled then it would not take any input
//                     disabled={amountDisable}
//                     value={amount}
//                     //if onamountchange is available the we use onamountchange will be used
//                     //e.target.avlue gives in string ,so we convert it to number 
//                     onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
//                 />
//             </div>
//             <div className="w-1/2 flex flex-wrap justify-end text-right">
//                 <p className="text-black/40 mb-2 w-full">Currency Type</p>
//                 {/* dropdown,so when dropdwon change,then currency also change so onchange value comes from oncurrencychange */}
//                 <select
//                     className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
//                     value={selectCurrency}
//                     onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}
//                     disabled={currencyDisable}

//                 >
                    
//                         {currencyOptions.map((currencytype)=>( 
//                             <option key={currencytype} value={currencytype}>
//                                 {currencytype }
//                             </option>
//                         ))}
                
//                 </select>
//             </div>
//         </div>
//     );
// }

// export default InputBox;
import React from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
}) {
  return (
    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
      
      {/* 🏷️ Label dikhane ke liye (From / To) */}
      <div className="w-1/2">
        <label className="text-gray-700 mb-2 block">{label}</label>
        
        {/* 🔢 Input box jisme user amount enter karega */}
        <input
          type="number"
          className="rounded-lg border border-gray-300 p-2 w-full"
          placeholder="Enter amount"
          disabled={amountDisable} // agar true hai toh input disable ho jaayega
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      {/* 🌍 Currency dropdown jisme user currency select karega */}
      <div className="w-1/3">
        <label className="text-gray-700 mb-2 block">Currency</label>
        <select
          className="rounded-lg border border-gray-300 p-2 w-full"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {/* 🧾 Sare currency options ko dropdown mein dikhana */}
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;