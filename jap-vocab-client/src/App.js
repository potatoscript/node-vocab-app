import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VocabList from './components/VocabList';
import AddVocabForm from './components/AddVocabForm';

function App() {
  const [vocabs, setVocabs] = useState([]);
  const [search, setSearch] = useState('');
  const [editingVocab, setEditingVocab] = useState(null);

  const fetchVocabs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/vocab');
      setVocabs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addVocabToList = (vocab) => {
    setVocabs([vocab, ...vocabs]);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (vocab) => {
    setEditingVocab(vocab);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vocab/${id}`);
      setVocabs(vocabs.filter((vocab) => vocab._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateVocab = (updatedVocab) => {
    setVocabs(vocabs.map((vocab) => (vocab._id === updatedVocab._id ? updatedVocab : vocab)));
  };

  const filteredVocabs = vocabs.filter(
    (vocab) =>
      vocab.word.toLowerCase().includes(search.toLowerCase()) ||
      vocab.meaning.toLowerCase().includes(search.toLowerCase()) ||
      vocab.example.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchVocabs();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 Japanese Vocabulary Tracker</h1>
      <input
        type="text"
        placeholder="Search for vocab..."
        value={search}
        onChange={handleSearchChange}
        style={{ padding: '8px', width: '100%', marginBottom: '20px' }}
      />
      <AddVocabForm
        onAdd={addVocabToList}
        editingVocab={editingVocab}
        setEditingVocab={setEditingVocab}
        onUpdate={handleUpdateVocab}  // Add this line to pass the update function
      />
      <VocabList vocabs={filteredVocabs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
