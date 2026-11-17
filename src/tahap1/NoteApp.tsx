import React, { useState, useEffect } from 'react';
import { Note } from './types/Note';
import { NoteForm } from './components/NoteForm';
import { NoteCard } from './components/NoteCard';
import './NoteApp.css';

const LOCAL_STORAGE_KEY = 'modul2-notes';

export const NoteApp: React.FC = () => {
  // 1 & 4. State daftar catatan, ambil dari localStorage saat aplikasi pertama kali dimuat.
  // Jika belum ada data tersimpan, gunakan array kosong.
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as Note[];
      }
    } catch (error) {
      console.error('Gagal membaca data dari localStorage:', error);
    }
    return [];
  });

  // 5. State untuk menyimpan keyword pencarian
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 2. useEffect untuk menyimpan perubahan daftar catatan ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage:', error);
    }
  }, [notes]);

  // Fungsi untuk menambah catatan baru dengan ID unik
  const handleAddNote = (newNoteData: Omit<Note, 'id'>) => {
    const newNote: Note = {
      id: Date.now(),
      title: newNoteData.title,
      content: newNoteData.content,
      category: newNoteData.category,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  // Fungsi untuk menghapus catatan berdasarkan ID
  const handleDeleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Method .filter() untuk mencari catatan berdasarkan judul secara case-insensitive
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="tahap1-app">
      <header className="tahap1-header">
        <h1 className="tahap1-app-title">Papan Catatan Lokal</h1>
        <p className="tahap1-app-subtitle">
          Kelola dan simpan catatan harian Anda langsung di browser secara lokal.
        </p>
      </header>

      {/* Form Tambah Catatan */}
      <section className="tahap1-form-container">
        <NoteForm onAddNote={handleAddNote} />
      </section>

      {/* Bagian Daftar Catatan dan Pencarian */}
      <section className="tahap1-notes-section">
        <div className="tahap1-section-header">
          <h2 className="tahap1-section-title">
            Daftar Catatan ({notes.length})
          </h2>

          {/* Input Pencarian Judul */}
          <div className="tahap1-search-box">
            <span className="tahap1-search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              className="tahap1-search-input"
              placeholder="Cari berdasarkan judul..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              aria-label="Cari catatan berdasarkan judul"
            />
          </div>
        </div>

        {/* Kondisi Tampilan: Kosong / Tidak Ditemukan / Ada Catatan */}
        {notes.length === 0 ? (
          <div className="tahap1-empty-state">
            <div className="tahap1-empty-icon">📝</div>
            <p className="tahap1-empty-text">
              Belum ada catatan yang tersimpan. Silakan tambahkan catatan baru melalui formulir di atas.
            </p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="tahap1-empty-state">
            <div className="tahap1-empty-icon">🔎</div>
            <p className="tahap1-empty-text">Catatan tidak ditemukan</p>
          </div>
        ) : (
          <div className="tahap1-notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default NoteApp;
