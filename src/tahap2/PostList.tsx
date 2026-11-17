import React, { useState, useEffect } from 'react';

export interface Post {
  id: number;
  title: string;
  body?: string;
  content?: string;
}


const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = search.trim()
          ? `${API_URL}?search=${encodeURIComponent(search.trim())}`
          : API_URL;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();
        const list: Post[] = Array.isArray(data) ? data : data.data || [];

        
        const filtered = search.trim()
          ? list.filter((p) =>
              p.title.toLowerCase().includes(search.trim().toLowerCase())
            )
          : list;

        setPosts(filtered.slice(0, 15));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal mengambil data');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPosts, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Daftar Post (API)</h2>

      <input
        type="text"
        placeholder="Cari judul post..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && posts.length === 0 && <p>Data tidak ditemukan.</p>}

      {!loading &&
        !error &&
        posts.map((post) => (
          <div
            key={post.id}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px' }}
          >
            <h3>{post.title}</h3>
            <p>{post.content || post.body}</p>
          </div>
        ))}
    </div>
  );
}