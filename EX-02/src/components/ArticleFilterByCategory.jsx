import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    const res = await axios.get('http://localhost:3000/articles');
    setArticles(res.data);
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
          onClick={async () => {
            // Logic to apply filters
            if (selectedCategory) {
              const res = await axios.get(`http://localhost:3000/categories/${selectedCategory}/articles`);
              setArticles(res.data);
            } else {
              const res = await axios.get('http://localhost:3000/articles');
              setArticles(res.data);
            }
          }}
        >Apply Filters</button>
        <button
          onClick={ async () => {
            // Logic to reset filters
            setSelectedCategory('');
            const res = await axios.get('http://localhost:3000/articles');
            setArticles(res.data);
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