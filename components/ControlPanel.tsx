import React from 'react'

const ControlPanel = () => {
  return (
    <div className="control-panel">
      <div className="control-panel-center">
        <div className="item-form">
            <p>Add Collection Point</p>
            <div className="item">
              <input type="text" id='street' placeholder='streetId eg 2101'/>
              <input type='number' id='quantity' placeholder='Quantity eg 20'/>
              <button>Add</button>
            </div>
        </div>
        <div className="item-form">
            <label htmlFor="#CollectionCenter">Move Collection Center</label>
            <div className="item">
                <input type="text" id='CollectionCenter' placeholder='streetId eg 1011'/>
                <button>Move</button>
            </div>
        </div>
        <div className="item-form">
            <label htmlFor="GarbageTruck">Add Garbage Truck</label>
            <div className="item">
                <input type="number" id='GarbageTruck' placeholder='quantity eg 50'/>
                <button >Add</button>
            </div>
        </div>
        <div className="item-form">
            <label htmlFor="GarbageTruck">Add Block Point</label>
            <div className="item">
                <input type="text" id='GarbageTruck' placeholder='streetId eg 2101'/>
                <button>Add</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
