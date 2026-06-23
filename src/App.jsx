import { useState } from 'react'
import './App.css'

function App() {
  const [assignments, setAssignment] = useState([

    { id: 1, title: 'Calculus Problem Set', subject: 'Mathematics', dueDate: '2026-06-25', status: 'Pending' },
    { id: 2, title: 'History Essay', subject: 'History', dueDate: '2026-06-12', status: 'Late' },
    { id: 3, title: 'React UI Assignment', subject: 'Computer Science', dueDate: '2026-06-20', status: 'Submitted' },
  ]);

    const [newAssignment, setNewAssignment] = useState({ title: '', subject: '', dueDate: '', status: 'Pending' });
  const [filterSubject, setFilterSubject] = useState('All');

  const addAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) return;
    setAssignments([...assignments, { ...newAssignment, id: Date.now() }]);
    setNewAssignment({ title: '', subject: '', dueDate: '', status: 'Pending' });
  };

  const updateStatus = (id, newStatus) => {
    setAssignments(assignments.map(att => att.id === id ? { ...att, status: newStatus } : att));
  };

  const filteredAssignments = filterSubject === 'All' 
    ? assignments 
    : assignments.filter(att => att.subject === filterSubject);

  const counts = {
    Submitted: assignments.filter(a => a.status === 'Submitted').length,
    Pending: assignments.filter(a => a.status === 'Pending').length,
    Late: assignments.filter(a => a.status === 'Late').length,
  };

  const subjects = ['All', ...new Set(assignments.map(a => a.subject))];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Assignment Submission Tracker</h1>

      {/* Dashboard Summary */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#d4edda', padding: '20px', borderRadius: '5px', flex: '1' }}>
          <h3>Submitted</h3>
          <h2>{counts.Submitted}</h2>
        </div>
        <div style={{ background: '#cce5ff', padding: '20px', borderRadius: '5px', flex: '1' }}>
          <h3>Pending</h3>
          <h2>{counts.Pending}</h2>
        </div>
        <div style={{ background: '#f8d7da', padding: '20px', borderRadius: '5px', flex: '1' }}>
          <h3>Late</h3>
          <h2>{counts.Late}</h2>
        </div>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label>Filter by Subject: </label>
        <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
          {subjects.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      {/* Add Form */}
      <form onSubmit={addAssignment} style={{ marginBottom: '30px', background: '#f9f9f9', padding: '20px', borderRadius: '5px' }}>
        <h3>Add New Assignment</h3>
        <input placeholder="Title" value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} required style={{ marginRight: '10px' }}/>
        <input placeholder="Subject" value={newAssignment.subject} onChange={e => setNewAssignment({...newAssignment, subject: e.target.value})} required style={{ marginRight: '10px' }}/>
        <input type="date" value={newAssignment.dueDate} onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} required style={{ marginRight: '10px' }}/>
        <button type="submit">Add Assignment</button>
      </form>

      {/* Assignments Table */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
          <th>Title</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map(att => (
            <tr key={att.id}>
              <td>{att.title}</td>
              <td>{att.subject}</td>
              <td>{att.dueDate}</td>
              <td>{att.status}</td>
              <td>
                <select value={att.status} onChange={(e) => updateStatus(att.id, e.target.value)}>
                  <option value="Submitted">Submitted</option>
                  <option value="Pending">Pending</option>
                  <option value="Late">Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App
