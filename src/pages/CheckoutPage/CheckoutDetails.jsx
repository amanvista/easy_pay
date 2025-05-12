import React, { useEffect, useState } from 'react';
import Select from '../../components/Select/Select';
import { calculateFromGSTPercent } from '../../utility/utility';
import APISelect from '../../components/Select/ApiSelect';

const CheckoutDetails = ({total,restaurant}) => {
    const [day,setDay] = useState('today');
    const [slotUrl,setSlotUrl] = useState('');
    const [selectedSlotId,setSelectedSlotId] = useState('');
    const [basePrice,setBasePrice] = useState();
    const [gstAmount, setGstAmount] = useState();
    useEffect(()=>{
            const result = calculateFromGSTPercent(total, 18);
            setBasePrice(result?.basePrice)
            setGstAmount(result?.gstAmount)
    },[total])

    useEffect(() => {
        if (day) {
          setSlotUrl(`restaurants/slots?id=${restaurant?.id}&day=${day}`);
        }
      }, [day]);
      const onSlotSelect=(id,name)=>{
        setSelectedSlotId(id)
      }

    return (
  <div className="left-panel">
    <div className="section">
      <div className="section-header">
        <span className="icon">👤</span>
        <p>Aman | 7292048622</p>
        <span className="status success">✔</span>
      </div>
    </div>

    <div className="section">
      <div className="section-header">
        <span className="icon">📍</span>
        <h3>Pickup address</h3>
        <span className="status success">✔</span>
      </div>
      {/* <p><strong>Home</strong></p> */}
      <p>{restaurant?.address}</p>
    </div>

    <div className="section">
      <div className="section-header">
        <span className="icon">📅</span>
        <h3>Pickup Time</h3>
      </div>
      <div className="pickup-row">
        <div className="pickup-select">
          <Select
            options={[{id:'today',name:"Today"},{id:'tomorrow',name: "Tomorrow"}]}
            placeholder="Select Day"
            value={day}
            onChange={(e)=>setDay(e.target.value)}
          />
        </div>
        <div className="pickup-select">
          <APISelect
          url={slotUrl}
          value={selectedSlotId}
          onChange={onSlotSelect}
          placeholder="Select a Time Slot"
        />
        </div>
      </div>
    </div>

    <div className="bill-details">
      <div className="bill-row">
        <span>Item Total</span>
        <span className="price">₹{basePrice}</span>
      </div>
      <div className="bill-row">
        <span>GST & Other Charges</span>
        <span className="price">₹{gstAmount}</span>
      </div>
    </div>

    <div className="total-pay">
      <h3>TO PAY</h3>
      <h3>₹{total}</h3>
    </div>

    <div className="section">
      <button className="pay-btn">Pay Now</button>
    </div>
  </div>
);
}

export default CheckoutDetails;