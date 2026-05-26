import React, { useState, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateLimit, DeleteOneLimit, checkAllLimits } from './PossibleValuesSlice';
import Modal from '../Modals/Modal';


const ManagePossibleValuesButton = ({type}) => {
  const dispatch = useDispatch();
  const possibleValues = useSelector((state) => state.possibleValues.possibleValues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [newValue, setNewValue] = useState('');

    const [fields, setFields] = useState([]); // הגדרת שדות מקומית
  const doorsFields = useSelector((state) => state.doors.doorsFields);
  const framesFields = useSelector((state) => state.frames.framesFields);
  const openModal = (field) => {
    setSelectedField(field);
    setNewValue('');
    setIsModalOpen(true);
  };

  const handleAddValue = async () => {
    // כאן תוכל להוסיף את הלוגיקה להוסיף ערך חדש או לעדכן את הערך
    console.log(`Adding value ${newValue} to ${selectedField}`);
    // עליך להוסיף פעולה או API לאחסון הערכים החדשים
    await dispatch(CreateLimit({key:selectedField.field,values:[{id:0,key:selectedField.field,value:newValue}]}));
    setNewValue('');
    await dispatch(checkAllLimits()); // רענון הערכים
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
    dispatch(DeleteOneLimit(value)).then(async () => {
      alert('הערך נמחק בהצלחה');
      setIsModalOpen(false);
      await dispatch(checkAllLimits()); // רענון הערכים
    });
  };
  // useEffect(() => {
  //   dispatch(fetchLimits());
  // }, [dispatch]);
  return (
    <div>
      <h3>בחר שדה לעריכה</h3>
      <ul>
        {fields.map((fieldData) => (
          <li key={fieldData.field}>
            <button onClick={() => openModal(fieldData)}>{fieldData.hebrow}</button>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedField && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="modal-header">
            <h2>ערכים מוגבלים לשדה {selectedField.hebrow}</h2>
          </div>
          <div className="modal-body">
            <ul>
              {possibleValues
                .find((fieldData) => fieldData.key === selectedField.field)
                ?.values.map((value) => (
                  <li key={value.id}>
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
        </Modal>
      )}
    </div>
  );
};

export default ManagePossibleValuesButton;