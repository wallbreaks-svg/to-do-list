import React from 'react';
import { Note } from '../types/Note';

export interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <article className="tahap1-card">
      <div className="tahap1-card-header">
        <h4 className="tahap1-card-title">{note.title}</h4>
        <span className="tahap1-badge">{note.category}</span>
      </div>
      <p className="tahap1-card-content">{note.content}</p>
      <div className="tahap1-card-footer">
        <button
          type="button"
          className="tahap1-btn-delete"
          onClick={() => onDelete(note.id)}
          aria-label={`Hapus catatan ${note.title}`}
        >
          Hapus
        </button>
      </div>
    </article>
  );
};
