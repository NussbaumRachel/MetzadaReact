import React, { useState, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateLimit, DeleteOneLimit, fetchLimits } from './PossibleValuesSlice';
import Modal from '../Modals/Modal';


const ManagePossibleValuesButton = ({type}) => {
  const dispatch = useDispatch();
  const possibleValues = useSelector((state) => state.possibleValues.possibleValues);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedField, setSelectedField] = useState('');
  const [newValue, setNewValue] = useState('');

    const [fields, setFields] = useState([]); // הגדרת שדות מקומית
  const doorsFields = useSelector((state) => state.doors.doorsFields);
  const framesFields = useSelector((state) => state.frames.framesFields);
  const openModal = (field) => {
    console.log("field", field);
    
    setSelectedField(field);
    setIsModalOpen(true);
  };

  const handleAddValue = () => {
    // כאן תוכל להוסיף את הלוגיקה להוסיף ערך חדש או לעדכן את הערך
    console.log(`Adding value ${newValue} to ${selectedField}`);
    // עליך להוסיף פעולה או API לאחסון הערכים החדשים
    dispatch(CreateLimit({key:selectedField.field,values:[{id:0,key:selectedField.field,value:newValue}]}))
    setNewValue('');
    setIsModalOpen(false);
  };
 useEffect(() => {
        if (type === '1') {
            setFields(doorsFields); // מגדיר את השדות לדלתות
        } else if (type === '2') {
            setFields(framesFields); // מגדיר את השדות למסגרות
        }
    }, [type, doorsFields, framesFields]);
  const handleDeleteValue = (value) => {
    console.log(`Deleting value: ${value}`);
dispatch(DeleteOneLimit(value))  };
  // useEffect(() => {
  //   dispatch(fetchLimits());
  // }, [dispatch]);
  return (
    <div>
      {/* <button onClick={() => setIsModalOpen(true)}>ניהול ערכים מוגבלים</button>
      {isModalOpen && ( */}
        {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> */}
          <div className="modal-header">
            <h2>ניהול ערכים מוגבלים</h2>
          </div>
          <div className="modal-body">
            <h3>בחר שדה לעריכה</h3>
            <ul>
              {fields.map((fieldData) => (
                <li key={fieldData.field} >
                  <button onClick={() => openModal(fieldData)}>{fieldData.hebrow}</button>
                </li>
              ))}
            </ul>
            {selectedField && (
              <div>
                <h4>ערכים מוגבלים לשדה {selectedField.hebrow}</h4>
                <ul>
                  {possibleValues
                    .find((fieldData) => fieldData.key === selectedField.field)
                    ?.values.map((value) => (
                      <li key={value.key}>
                        {value.value}
                        <button onClick={() => handleDeleteValue(value.id)}>מחק</button>
                      </li>
                    ))}
                </ul>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="הוסף ערך חדש"
                />
                <button onClick={handleAddValue}>הוסף ערך</button>
              </div>
            )}
          </div>
        {/* </Modal> */}
      {/* ) */}
      {/* } */}
    </div>
  );
};

export default ManagePossibleValuesButton;