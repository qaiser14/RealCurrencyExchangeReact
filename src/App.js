import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=1c062daae67cb21d25aa050131e83539'

console.log(BASE_URL, "BASE")

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountFrom, setAmountFrom] = useState(true)

  let toAmount, fromAmount
  if(amountFrom){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount/exchangeRate
  }

  console.log(exchangeRate, "exchangeRate")


  // console.log(currencyOptions, "Currency Options")
  

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  useEffect(()=> {
    console.log(fromCurrency,toCurrency);
    if(fromCurrency !=null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountFrom(true)
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountFrom(false)
  }

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency = {fromCurrency} 
      choosenCurrency = {e => setFromCurrency(e.target.value)} amount={fromAmount}
      onChangeAmount={handleFromAmountChange}
      />

        <div className='equals'>=</div>

      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency = {toCurrency} 
      choosenCurrency = {e => setToCurrency(e.target.value)} amount={toAmount}
      onChangeAmount = {handleToAmountChange}
      />
    </div>
  )
}

export default App;
