import React from 'react';

const VocabList = ({ vocabs, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Vocab List</h2>
      <ul>
        {vocabs.map((vocab) => (
          <li key={vocab._id} style={{ marginBottom: '10px', cursor: 'pointer' }}>
            <div onClick={() => onEdit(vocab)}>
              <strong>{vocab.word}</strong>: {vocab.meaning}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();  // Prevent triggering onEdit when clicking on delete
                onDelete(vocab._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabList;
