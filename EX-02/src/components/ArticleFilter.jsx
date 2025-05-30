import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    const res = await axios.get('http://localhost:3000/articles');
    setArticles(res.data);
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    const res = await axios.get('http://localhost:3000/journalists');
    setJournalists(res.data);
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    const res = await axios.get('http://localhost:3000/categories');
    setCategories(res.data);
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter"
          value={selectedJournalist}
          onChange={e => setSelectedJournalist(e.target.value)}
        >
          {/* Default option for all journalists */}
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name || `Journalist #${j.id}`}</option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {/* Default option for all categories */}
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name || `Category #${c.id}`}</option>
          ))}
        </select>

        <button
          onClick={ async () => {
            // Logic to apply filters
            const res = await axios.get('http://localhost:3000/articles');
            let filtered = res.data;
            if (selectedJournalist) {
              filtered = filtered.filter(a => String(a.journalistId) === String(selectedJournalist));
            }
            if (selectedCategory) {
              filtered = filtered.filter(a => String(a.categoryId) === String(selectedCategory));
            }
            setArticles(filtered);
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            setSelectedJournalist('');
            setSelectedCategory('');
            fetchArticles();
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}