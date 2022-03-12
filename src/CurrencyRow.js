import React from 'react'

export default function CurrencyRow(props) {

    const {currencyOptions, selectedCurrency, choosenCurrency, onChangeAmount, amount } = props



    return (
        <div>
           <input type="number" className='input' value={amount} onChange={onChangeAmount}/>

            <select value={selectedCurrency} onChange={choosenCurrency}>

                {currencyOptions.map(option => (

                    <option key={option} value={option}>{option}</option>
                ))}
                
            </select>

        </div>
    )
}
