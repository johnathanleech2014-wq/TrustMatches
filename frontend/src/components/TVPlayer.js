import React, { useState, useEffect } from 'react';
import './TVPlayer.css';

const TVPlayer = () => {
  const [channels, setChannels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch groups on component mount
  useEffect(() => {
    fetchGroups();
    fetchChannels();
  }, []);

  // Fetch all groups
  const fetchGroups = async () => {
    try {
      const response = await fetch(`${API_URL}/api/groups`);
      const data = await response.json();
      if (data.success) {
        setGroups(data.groups);
        if (data.groups.length > 0) {
          setSelectedGroup(data.groups[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching groups:', err);
      setError('Failed to fetch groups');
    }
  };

  // Fetch all channels
  const fetchChannels = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/channels`);
      const data = await response.json();
      if (data.success) {
        setChannels(data.channels);
        setLoading(false);
      } else {
        setError('Failed to fetch channels');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching channels:', err);
      setError('Failed to connect to API');
      setLoading(false);
    }
  };

  // Filter channels by group
  useEffect(() => {
    if (selectedGroup) {
      const filtered = channels.filter(ch => ch.group === selectedGroup);
      setFilteredChannels(filtered);
      if (filtered.length > 0) {
        setSelectedChannel(filtered[0]);
      }
    }
  }, [selectedGroup, channels]);

  // Search channels
  useEffect(() => {
    if (searchTerm.trim() === '') {
      if (selectedGroup) {
        const filtered = channels.filter(ch => ch.group === selectedGroup);
        setFilteredChannels(filtered);
      }
    } else {
      const searched = filteredChannels.filter(ch =>
        ch.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChannels(searched);
    }
  }, [searchTerm]);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  if (loading) {
    return (
      <div className="tv-player-container loading">
        <div className="spinner"></div>
        <p>Loading channels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tv-player-container error">
        <p>⚠️ {error}</p>
        <p>Make sure the backend API is running on {API_URL}</p>
      </div>
    );
  }

  return (
    <div className="tv-player-container">
      <div className="tv-player">
        {/* Header */}
        <div className="player-header">
          <h1>📺 TrustMatches TV</h1>
          <p className="channel-count">{channels.length} Channels Available</p>
        </div>

        {/* Main Content */}
        <div className="player-main">
          {/* Video Player Section */}
          <div className="video-section">
            {selectedChannel ? (
              <>
                <div className="video-player">
                  <video
                    key={selectedChannel.id}
                    controls
                    autoPlay
                    controlsList="nodownload"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#000'
                    }}
                  >
                    <source src={selectedChannel.url} type="application/x-mpegURL" />
                    Your browser doesn't support HLS video playback.
                  </video>
                </div>
                <div className="now-playing">
                  {selectedChannel.logo && (
                    <img src={selectedChannel.logo} alt={selectedChannel.name} className="channel-logo" />
                  )}
                  <div className="channel-info">
                    <h2>{selectedChannel.name}</h2>
                    <p className="channel-group">{selectedChannel.group}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-channel">
                <p>Select a channel to start watching</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Groups */}
            <div className="groups-section">
              <h3>Categories</h3>
              <div className="groups-list">
                {groups.map(group => (
                  <button
                    key={group}
                    className={`group-btn ${selectedGroup === group ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedGroup(group);
                      setSearchTerm('');
                    }}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="search-section">
              <input
                type="text"
                placeholder="Search channels..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Channels List */}
            <div className="channels-section">
              <h3>Channels ({filteredChannels.length})</h3>
              <div className="channels-list">
                {filteredChannels.map(channel => (
                  <div
                    key={channel.id}
                    className={`channel-item ${selectedChannel?.id === channel.id ? 'active' : ''}`}
                    onClick={() => handleChannelSelect(channel)}
                  >
                    {channel.logo && (
                      <img src={channel.logo} alt={channel.name} className="channel-item-logo" />
                    )}
                    <div className="channel-item-info">
                      <p className="channel-item-name">{channel.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVPlayer;
