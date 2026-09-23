import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { api } from './api';

const Details = () => {
  const { bookId, filteredTitle } = useParams();
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await api.getEpisodes(bookId, filteredTitle);
        if (data && data.episodes) {
          setEpisodes(data.episodes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [bookId, filteredTitle]);

  const handleEpisodeClick = (ep) => {
    navigate(`/play/${bookId}/${ep.episode}/${filteredTitle}/${ep.chapter_id}`);
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="details-header">
            <div className="details-info">
              <h1 className="details-title">{filteredTitle.replace(/-/g, ' ').toUpperCase()}</h1>
              <p className="card-meta" style={{fontSize: '1.1rem', marginBottom: '1rem'}}>
                {episodes.length} Episódios Disponíveis
              </p>
              
              {episodes.length > 0 && (
                <button 
                  className="btn-primary"
                  onClick={() => handleEpisodeClick(episodes[0])}
                >
                  <Play size={20} fill="currentColor" /> Assistir Ep. 1
                </button>
              )}
            </div>
          </div>

          <h2 className="section-title">Episódios</h2>
          <div className="episodes-grid">
            {episodes.map((ep) => (
              <button 
                key={ep.episode} 
                className="episode-btn"
                onClick={() => handleEpisodeClick(ep)}
              >
                Ep {ep.episode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
