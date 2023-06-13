import React,{useState} from 'react'
import { useGlobalContext } from '../context/context'
import TruckItem from "./TruckItem";

const ControlPanel = () => {
  const [collectionCenter, setCollectionCenter] = useState("");
  const [collectionPoint, setCollectionPoint] = useState("");
  const [collecionQuantity, setCollectionQuantity] = useState("");
  const [truckColor, setTruckColor] = useState("#af5f58");
  const [truckQuantity, setTruckQuantity] = useState("");

  const {moveCollectionCenter,addRecollectionPoint,trucks,addTruck} = useGlobalContext();



  return (
    <div className="control-panel">
      <div className="control-panel-center">
        <div className="item-form">
            <label htmlFor="#CollectionCenter">Move Collection Center</label>
            <div className="item">
                <input 
                type="text" 
                id='CollectionCenter' 
                placeholder='streetId eg 1011' 
                value={collectionCenter} 
                onChange={(e : any) => setCollectionCenter(e.target.value)}
                />
                <button onClick={() => moveCollectionCenter(collectionCenter)}>Move</button>
            </div>
        </div>
        <div className="item-form">
            <p>Add Collection Point</p>
            <div className="item-double">
              <div className="items">
                <div className="item-form">
                    <label htmlFor="street">Streed ID</label>
                    <input type="text" id='street' placeholder='streetId eg 2101' value={collectionPoint} onChange={(e) => setCollectionPoint(e.target.value)}/>
                </div>
                <div className="item-form">
                  <label htmlFor="quantity">Quantity </label>
                  <input type='number' id='quantity' placeholder='Quantity eg 20' value={collecionQuantity} onChange={(e) => setCollectionQuantity(e.target.value)}/>
                </div>
              </div>
             
              <button onClick={() => addRecollectionPoint(collectionPoint,Number(collecionQuantity))}>Add</button>
            </div>
        </div>
        
        <div className="item-form">
            <p>Add Garbage Truck</p>
            <div className="item-double">
              <div className="items">
                <div className="item-form">
                  <label htmlFor="quantityC">Quantity </label>
                  <input type='number' id='quantityC' placeholder='Quantity eg 20' value={truckQuantity} onChange={(e) => setTruckQuantity(e.target.value)}/>
                </div>
                <div className="item-form">
                    <label htmlFor="color">Color</label>
                    <input type="color" id='color' value={truckColor} onChange={(e) => setTruckColor(e.target.value) }/>
                </div>
              </div>
              <button onClick={() => addTruck(Number(truckQuantity), truckColor)}>Add</button>
            </div>
        </div>
      </div>
      <div className="truck-center">
        <h4>Truck List</h4>
        {trucks.length ? 
          trucks.map((t : any) => <TruckItem {...t}/>)
        : <div className='truck-message'>
            <p>No trucks working</p>
          </div>}
      </div>
    </div>
  )
}

export default ControlPanel
