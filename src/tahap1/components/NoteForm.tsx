import React, { useState } from 'react';
import { Note } from '../types/Note';

export interface NoteFormProps {
  onAddNote: (note: Omit<Note, 'id'>) => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Kuliah');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // Validasi: judul dan isi catatan wajib diisi
    if (!trimmedTitle || !trimmedContent) {
      setErrorMessage('Judul dan isi catatan wajib diisi!');
      return;
    }

    // Mengirimkan data catatan baru melalui callback dari parent
    onAddNote({
      title: trimmedTitle,
      content: trimmedContent,
      category: category.trim() || 'Umum',
    });

    // Kosongkan form setelah submit berhasil
    setTitle('');
    setContent('');
    setCategory('Kuliah');
    setErrorMessage('');
  };

  return (
    <form className="tahap1-form" onSubmit={handleSubmit}>
      <h3 className="tahap1-form-title">Tambah Catatan Baru</h3>

      {errorMessage && (
        <div className="tahap1-error-message" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="tahap1-form-group">
        <label htmlFor="note-title" className="tahap1-label">
          Judul Catatan <span className="tahap1-required">*</span>
        </label>
        <input
          id="note-title"
          type="text"
          className="tahap1-input"
          placeholder="Masukkan judul catatan..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          required
        />
      </div>

      <div className="tahap1-form-group">
        <label htmlFor="note-category" className="tahap1-label">
          Kategori
        </label>
        <select
          id="note-category"
          className="tahap1-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Kuliah">Kuliah</option>
          <option value="Tugas">Tugas</option>
          <option value="Pekerjaan">Pekerjaan</option>
          <option value="Pribadi">Pribadi</option>
          <option value="Ide">Ide</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div className="tahap1-form-group">
        <label htmlFor="note-content" className="tahap1-label">
          Isi Catatan <span className="tahap1-required">*</span>
        </label>
        <textarea
          id="note-content"
          className="tahap1-textarea"
          placeholder="Tuliskan isi catatan di sini..."
          rows={4}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          required
        />
      </div>

      <button type="submit" className="tahap1-btn-submit">
        Simpan Catatan
      </button>
    </form>
  );
};
