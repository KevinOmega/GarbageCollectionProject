import React from 'react'

const ControlPanel = () => {
  return (
    <div className="control-panel">
      <div className="control-panel-center">
        <div className="item-form">
            <label htmlFor="#CollectionPoint">Add Collection Points</label>
            <div className="item">
                <input type="text" id='' placeholder='streetId eg 2101'/>
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
                <input type="text" id='GarbageTruck' placeholder='streetId eg 2101'/>
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
