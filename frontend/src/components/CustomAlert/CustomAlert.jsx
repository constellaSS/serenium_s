import React, { useState } from 'react';
import "./CustomAlert.css"

const CustomAlert = ({ isOpen, onClose, onConfirm }) => {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const handleConfirm = () => {
        onConfirm(inputValue1, inputValue2);
        onClose();
    };

    return isOpen ? (
      <div className="customAlert">
          <div className="customAlertContent">
              <h2>New Post</h2>
              <input
                type="text"
                placeholder="Title"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Content"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
              />
              <button type="button" onClick={handleConfirm}>OK</button>
              <button type="button" onClick={onClose}>Cancel</button>
          </div>
      </div>
    ) : null;
};

export default CustomAlert;
