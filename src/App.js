import React from 'react';
import './App.css';
async function searchNews(q) {
  q = encodeURIComponent(q);
  const response = await fetch(`https://google-news.p.rapidapi.com/v1/top_headlines?lang=pl&country=PL${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "google-news.p.rapidapi.com",
      "x-rapidapi-key": 'f226ca5405msh9516b95a617e234p104469jsnbbd3bcacf90e',
    }
  });
  const body = await response.json();
  return body.value;
}
function App() {
  const [query, setQuery] = React.useState("macos");
  const [list, setList] = React.useState(null);
  const search = (e) => {
    e.preventDefault();
    searchNews(query).then(setList);
  };
  return (
    <div className="app">
      <form onSubmit={search}>
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      {!list
        ? null
        : list.length === 0
          ? <p><i>No results</i></p>
          : <ul>
            {list.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </ul>
      }
    </div>
  );
}
export default App;