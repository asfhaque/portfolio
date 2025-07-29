// Application Data
const appData = {
  "sampleTracks": [
    {
      "id": "track_1",
      "title": "Digital Dreams",
      "artist": "Synthwave Collective",
      "album": "Neon Nights",
      "duration": 195,
      "genre": "Electronic",
      "albumArt": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      "audioUrl": "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      "isDownloaded": false,
      "downloadProgress": 0,
      "plays": 15420,
      "likes": 1205
    },
    {
      "id": "track_2", 
      "title": "Ocean Waves",
      "artist": "Ambient Nature",
      "album": "Peaceful Sounds",
      "duration": 240,
      "genre": "Ambient",
      "albumArt": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop",
      "audioUrl": "https://www.soundjay.com/nature/sounds/ocean-wave-1.wav",
      "isDownloaded": false,
      "downloadProgress": 0,
      "plays": 8934,
      "likes": 567
    },
    {
      "id": "track_3",
      "title": "City Lights",
      "artist": "Urban Beats",
      "album": "Metropolitan",
      "duration": 178,
      "genre": "Hip Hop",
      "albumArt": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      "audioUrl": "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      "isDownloaded": false,
      "downloadProgress": 0,
      "plays": 22156,
      "likes": 1876
    },
    {
      "id": "track_4",
      "title": "Mountain Echo",
      "artist": "Folk Harmony",
      "album": "Natural Sounds",
      "duration": 205,
      "genre": "Folk",
      "albumArt": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      "audioUrl": "https://www.soundjay.com/nature/sounds/forest-with-small-river-1.wav",
      "isDownloaded": false,
      "downloadProgress": 0,
      "plays": 5678,
      "likes": 423
    },
    {
      "id": "track_5",
      "title": "Jazzy Afternoon",
      "artist": "Smooth Jazz Trio",
      "album": "Coffee House",
      "duration": 267,
      "genre": "Jazz",
      "albumArt": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      "audioUrl": "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      "isDownloaded": false,
      "downloadProgress": 0,
      "plays": 12043,
      "likes": 934
    },
    {
      "id": "track_6",
      "title": "Rock Anthem",
      "artist": "Thunder Strike",
      "album": "Electric Power",
      "duration": 198,
      "genre": "Rock",
      "albumArt": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      "audioUrl": "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      "isDownloaded": false,
      "downloadProgress": 0,
      "plays": 18567,
      "likes": 1456
    }
  ],
  "genres": [
    {
      "id": "electronic",
      "name": "Electronic",
      "color": "#ff6b6b",
      "gradient": "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)"
    },
    {
      "id": "ambient", 
      "name": "Ambient",
      "color": "#4ecdc4",
      "gradient": "linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%)"
    },
    {
      "id": "hiphop",
      "name": "Hip Hop", 
      "color": "#45b7d1",
      "gradient": "linear-gradient(135deg, #45b7d1 0%, #96ceb4 100%)"
    },
    {
      "id": "folk",
      "name": "Folk",
      "color": "#96ceb4",
      "gradient": "linear-gradient(135deg, #96ceb4 0%, #ffeaa7 100%)"
    },
    {
      "id": "jazz",
      "name": "Jazz",
      "color": "#ffeaa7", 
      "gradient": "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)"
    },
    {
      "id": "rock",
      "name": "Rock",
      "color": "#fab1a0",
      "gradient": "linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)"
    }
  ],
  "playlists": [
    {
      "id": "playlist_1",
      "name": "My Favorites",
      "description": "Songs I love the most",
      "trackIds": ["track_1", "track_3", "track_5"],
      "coverImage": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      "createdAt": "2024-01-15"
    },
    {
      "id": "playlist_2", 
      "name": "Chill Vibes",
      "description": "Perfect for relaxation",
      "trackIds": ["track_2", "track_4"],
      "coverImage": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop",
      "createdAt": "2024-01-20"
    }
  ],
  "featuredContent": {
    "heroTrack": "track_1",
    "trendingTracks": ["track_3", "track_6", "track_1"],
    "recentlyPlayed": ["track_2", "track_5", "track_4"],
    "recommendations": ["track_4", "track_6", "track_2"]
  }
};

// Application State
class MusicApp {
  constructor() {
    this.currentTrack = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 1;
    this.queue = [];
    this.currentQueueIndex = -1;
    this.isShuffled = false;
    this.repeatMode = 'none'; // none, one, all
    this.searchResults = [];
    this.downloadQueue = [];
    
    this.audioPlayer = document.getElementById('audio-player');
    this.initializeApp();
  }

  initializeApp() {
    // Ensure all modals are hidden on startup
    this.hideAllModals();
    this.setupEventListeners();
    this.loadHomePage();
    this.setupAudioPlayer();
    this.initIndexedDB();
  }

  hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('hidden');
    });
  }

  // IndexedDB Setup
  async initIndexedDB() {
    try {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('SoundWaveDB', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          this.db = request.result;
          resolve(this.db);
        };
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('tracks')) {
            const store = db.createObjectStore('tracks', { keyPath: 'id' });
            store.createIndex('isDownloaded', 'isDownloaded', { unique: false });
          }
        };
      });
    } catch (error) {
      console.warn('IndexedDB not available:', error);
    }
  }

  // Navigation
  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.closest('.nav-link').dataset.page;
        this.navigateToPage(page);
      });
    });

    // Mini player controls
    const miniPlayBtn = document.getElementById('mini-play-btn');
    const miniPrevBtn = document.getElementById('mini-prev-btn');
    const miniNextBtn = document.getElementById('mini-next-btn');
    const expandBtn = document.getElementById('expand-player-btn');

    if (miniPlayBtn) miniPlayBtn.addEventListener('click', (e) => { e.preventDefault(); this.togglePlay(); });
    if (miniPrevBtn) miniPrevBtn.addEventListener('click', (e) => { e.preventDefault(); this.previousTrack(); });
    if (miniNextBtn) miniNextBtn.addEventListener('click', (e) => { e.preventDefault(); this.nextTrack(); });
    if (expandBtn) expandBtn.addEventListener('click', (e) => { e.preventDefault(); this.openFullPlayer(); });

    // Full player controls
    const fullPlayBtn = document.getElementById('full-play-btn');
    const fullPrevBtn = document.getElementById('full-prev-btn');
    const fullNextBtn = document.getElementById('full-next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const closePlayerBtn = document.getElementById('close-player-btn');
    const playerDownloadBtn = document.getElementById('player-download-btn');

    if (fullPlayBtn) fullPlayBtn.addEventListener('click', (e) => { e.preventDefault(); this.togglePlay(); });
    if (fullPrevBtn) fullPrevBtn.addEventListener('click', (e) => { e.preventDefault(); this.previousTrack(); });
    if (fullNextBtn) fullNextBtn.addEventListener('click', (e) => { e.preventDefault(); this.nextTrack(); });
    if (shuffleBtn) shuffleBtn.addEventListener('click', (e) => { e.preventDefault(); this.toggleShuffle(); });
    if (repeatBtn) repeatBtn.addEventListener('click', (e) => { e.preventDefault(); this.toggleRepeat(); });
    if (closePlayerBtn) closePlayerBtn.addEventListener('click', (e) => { e.preventDefault(); this.closeFullPlayer(); });
    if (playerDownloadBtn) playerDownloadBtn.addEventListener('click', (e) => { e.preventDefault(); this.downloadCurrentTrack(); });

    // Volume control
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        this.setVolume(e.target.value / 100);
      });
    }

    // Progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.seekTo(percent * this.duration);
      });
    }

    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTracks(e.target.value);
      });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.filterSearchResults(e.target.dataset.filter);
      });
    });

    // Playlist creation - Fixed event handlers
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const closePlaylistModalBtn = document.getElementById('close-playlist-modal');
    const cancelPlaylistBtn = document.getElementById('cancel-playlist-btn');
    const savePlaylistBtn = document.getElementById('save-playlist-btn');

    if (createPlaylistBtn) {
      createPlaylistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCreatePlaylistModal();
      });
    }

    if (closePlaylistModalBtn) {
      closePlaylistModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeCreatePlaylistModal();
      });
    }

    if (cancelPlaylistBtn) {
      cancelPlaylistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeCreatePlaylistModal();
      });
    }

    if (savePlaylistBtn) {
      savePlaylistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.createPlaylist();
      });
    }

    // Modal backdrop clicks - Fixed
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
          modal.classList.add('hidden');
        }
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideAllModals();
      }
    });
  }

  navigateToPage(page) {
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navLink = document.querySelector(`[data-page="${page}"]`);
    if (navLink) navLink.classList.add('active');

    // Show page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) targetPage.classList.add('active');

    // Load page content
    switch(page) {
      case 'home':
        this.loadHomePage();
        break;
      case 'search':
        this.loadSearchPage();
        break;
      case 'library':
        this.loadLibraryPage();
        break;
    }
  }

  // Page Loading
  loadHomePage() {
    this.renderHeroSection();
    this.renderTrendingTracks();
    this.renderGenres();
    this.renderRecentTracks();
  }

  renderHeroSection() {
    const heroTrack = appData.sampleTracks.find(t => t.id === appData.featuredContent.heroTrack);
    const heroContainer = document.getElementById('hero-track');
    
    if (!heroContainer || !heroTrack) return;

    heroContainer.innerHTML = `
      <img class="hero-album-art" src="${heroTrack.albumArt}" alt="${heroTrack.album}">
      <div class="hero-info">
        <h2 class="hero-title">${heroTrack.title}</h2>
        <p class="hero-artist">${heroTrack.artist} • ${heroTrack.album}</p>
        <div class="hero-stats">
          <span class="hero-stat">👁️ ${heroTrack.plays.toLocaleString()} plays</span>
          <span class="hero-stat">❤️ ${heroTrack.likes.toLocaleString()} likes</span>
          <span class="hero-stat">⏱️ ${this.formatDuration(heroTrack.duration)}</span>
        </div>
        <div class="hero-actions">
          <button class="btn btn--primary" onclick="app.playTrack('${heroTrack.id}')">▶️ Play Now</button>
          <button class="btn btn--secondary" onclick="app.downloadTrack('${heroTrack.id}')">⬇️ Download</button>
        </div>
      </div>
    `;
  }

  renderTrendingTracks() {
    const trendingContainer = document.getElementById('trending-tracks');
    if (!trendingContainer) return;

    const trendingTracks = appData.featuredContent.trendingTracks.map(id => 
      appData.sampleTracks.find(t => t.id === id)
    ).filter(Boolean);

    trendingContainer.innerHTML = trendingTracks.map(track => `
      <div class="track-card" onclick="app.playTrack('${track.id}')">
        <img class="track-album-art" src="${track.albumArt}" alt="${track.album}">
        <div class="track-title">${track.title}</div>
        <div class="track-artist">${track.artist}</div>
        <div class="track-actions">
          <button class="track-play-btn" onclick="event.stopPropagation(); app.playTrack('${track.id}')">▶️</button>
          <button class="track-download-btn ${track.isDownloaded ? 'downloaded' : ''}" 
                  onclick="event.stopPropagation(); app.downloadTrack('${track.id}')">
            ${track.isDownloaded ? '✅' : '⬇️'}
          </button>
        </div>
      </div>
    `).join('');
  }

  renderGenres() {
    const genreContainer = document.getElementById('genre-grid');
    if (!genreContainer) return;

    genreContainer.innerHTML = appData.genres.map(genre => `
      <div class="genre-card" style="background: ${genre.gradient}" onclick="app.filterByGenre('${genre.id}')">
        <span>${genre.name}</span>
      </div>
    `).join('');
  }

  renderRecentTracks() {
    const recentContainer = document.getElementById('recent-tracks');
    if (!recentContainer) return;

    const recentTracks = appData.featuredContent.recentlyPlayed.map(id => 
      appData.sampleTracks.find(t => t.id === id)
    ).filter(Boolean);

    recentContainer.innerHTML = recentTracks.map(track => `
      <div class="track-item" onclick="app.playTrack('${track.id}')">
        <img class="track-item-art" src="${track.albumArt}" alt="${track.album}">
        <div class="track-item-info">
          <div class="track-item-title">${track.title}</div>
          <div class="track-item-artist">${track.artist}</div>
        </div>
        <div class="track-item-duration">${this.formatDuration(track.duration)}</div>
        <button class="track-download-btn ${track.isDownloaded ? 'downloaded' : ''}" 
                onclick="event.stopPropagation(); app.downloadTrack('${track.id}')">
          ${track.isDownloaded ? '✅' : '⬇️'}
        </button>
      </div>
    `).join('');
  }

  loadSearchPage() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    this.searchResults = [];
    this.renderSearchResults();
  }

  loadLibraryPage() {
    this.renderDownloadedTracks();
    this.renderPlaylists();
  }

  renderDownloadedTracks() {
    const downloadedTracks = appData.sampleTracks.filter(t => t.isDownloaded);
    const container = document.getElementById('downloaded-tracks');
    if (!container) return;
    
    if (downloadedTracks.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⬇️</div>
          <h3>No Downloaded Songs</h3>
          <p>Download songs to listen offline</p>
        </div>
      `;
      return;
    }

    container.innerHTML = downloadedTracks.map(track => `
      <div class="track-item" onclick="app.playTrack('${track.id}')">
        <img class="track-item-art" src="${track.albumArt}" alt="${track.album}">
        <div class="track-item-info">
          <div class="track-item-title">${track.title}</div>
          <div class="track-item-artist">${track.artist}</div>
        </div>
        <div class="track-item-duration">${this.formatDuration(track.duration)}</div>
        <button class="track-download-btn downloaded" 
                onclick="event.stopPropagation(); app.removeDownload('${track.id}')">
          🗑️
        </button>
      </div>
    `).join('');
  }

  renderPlaylists() {
    const container = document.getElementById('playlist-grid');
    if (!container) return;

    container.innerHTML = appData.playlists.map(playlist => `
      <div class="playlist-card" onclick="app.openPlaylist('${playlist.id}')">
        <img class="playlist-cover" src="${playlist.coverImage}" alt="${playlist.name}">
        <div class="playlist-name">${playlist.name}</div>
        <div class="playlist-description">${playlist.description}</div>
        <div class="playlist-track-count">${playlist.trackIds.length} songs</div>
      </div>
    `).join('');
  }

  // Audio Player
  setupAudioPlayer() {
    if (!this.audioPlayer) return;

    this.audioPlayer.addEventListener('loadedmetadata', () => {
      this.duration = this.audioPlayer.duration;
      this.updateDurationDisplay();
    });

    this.audioPlayer.addEventListener('timeupdate', () => {
      this.currentTime = this.audioPlayer.currentTime;
      this.updateProgressBar();
    });

    this.audioPlayer.addEventListener('ended', () => {
      this.nextTrack();
    });

    this.audioPlayer.addEventListener('play', () => {
      this.isPlaying = true;
      this.updatePlayButtons();
    });

    this.audioPlayer.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updatePlayButtons();
    });
  }

  playTrack(trackId) {
    const track = appData.sampleTracks.find(t => t.id === trackId);
    if (!track || !this.audioPlayer) return;

    this.currentTrack = track;
    this.audioPlayer.src = track.audioUrl;
    this.audioPlayer.load();
    this.audioPlayer.play().catch(e => console.warn('Audio play failed:', e));

    this.showMiniPlayer();
    this.updatePlayerUI();
  }

  togglePlay() {
    if (!this.audioPlayer) return;

    if (this.isPlaying) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.play().catch(e => console.warn('Audio play failed:', e));
    }
  }

  previousTrack() {
    if (this.queue.length === 0) return;
    
    this.currentQueueIndex = Math.max(0, this.currentQueueIndex - 1);
    const trackId = this.queue[this.currentQueueIndex];
    this.playTrack(trackId);
  }

  nextTrack() {
    if (this.queue.length === 0) {
      if (this.repeatMode === 'one' && this.audioPlayer) {
        this.audioPlayer.currentTime = 0;
        this.audioPlayer.play().catch(e => console.warn('Audio play failed:', e));
        return;
      }
      return;
    }

    if (this.repeatMode === 'all' && this.currentQueueIndex >= this.queue.length - 1) {
      this.currentQueueIndex = 0;
    } else {
      this.currentQueueIndex = Math.min(this.queue.length - 1, this.currentQueueIndex + 1);
    }

    const trackId = this.queue[this.currentQueueIndex];
    this.playTrack(trackId);
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.audioPlayer) this.audioPlayer.volume = volume;
    const volumeDisplay = document.getElementById('volume-display');
    if (volumeDisplay) volumeDisplay.textContent = Math.round(volume * 100) + '%';
  }

  seekTo(time) {
    if (this.audioPlayer) this.audioPlayer.currentTime = time;
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
    const btn = document.getElementById('shuffle-btn');
    if (btn) btn.style.color = this.isShuffled ? 'var(--color-primary)' : 'var(--color-text-secondary)';
  }

  toggleRepeat() {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentIndex + 1) % modes.length];
    
    const btn = document.getElementById('repeat-btn');
    if (btn) {
      const icons = { none: '🔁', all: '🔂', one: '🔂' };
      btn.textContent = icons[this.repeatMode];
      btn.style.color = this.repeatMode !== 'none' ? 'var(--color-primary)' : 'var(--color-text-secondary)';
    }
  }

  updatePlayButtons() {
    const playIcon = this.isPlaying ? '⏸️' : '▶️';
    const miniPlayBtn = document.getElementById('mini-play-btn');
    const fullPlayBtn = document.getElementById('full-play-btn');
    
    if (miniPlayBtn) miniPlayBtn.textContent = playIcon;
    if (fullPlayBtn) fullPlayBtn.textContent = playIcon;
  }

  updateProgressBar() {
    if (this.duration === 0) return;
    
    const percent = (this.currentTime / this.duration) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressHandle = document.getElementById('progress-handle');
    
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressHandle) progressHandle.style.left = percent + '%';
    
    const currentTime = document.getElementById('current-time');
    if (currentTime) currentTime.textContent = this.formatDuration(Math.floor(this.currentTime));
  }

  updateDurationDisplay() {
    const totalTime = document.getElementById('total-time');
    if (totalTime) totalTime.textContent = this.formatDuration(Math.floor(this.duration));
  }

  updatePlayerUI() {
    if (!this.currentTrack) return;

    // Update mini player
    const miniAlbumArt = document.getElementById('mini-album-art');
    const miniTrackTitle = document.getElementById('mini-track-title');
    const miniTrackArtist = document.getElementById('mini-track-artist');

    if (miniAlbumArt) miniAlbumArt.src = this.currentTrack.albumArt;
    if (miniTrackTitle) miniTrackTitle.textContent = this.currentTrack.title;
    if (miniTrackArtist) miniTrackArtist.textContent = this.currentTrack.artist;

    // Update full player
    const fullAlbumArt = document.getElementById('full-album-art');
    const fullTrackTitle = document.getElementById('full-track-title');
    const fullTrackArtist = document.getElementById('full-track-artist');
    const fullTrackAlbum = document.getElementById('full-track-album');

    if (fullAlbumArt) fullAlbumArt.src = this.currentTrack.albumArt;
    if (fullTrackTitle) fullTrackTitle.textContent = this.currentTrack.title;
    if (fullTrackArtist) fullTrackArtist.textContent = this.currentTrack.artist;
    if (fullTrackAlbum) fullTrackAlbum.textContent = this.currentTrack.album;
  }

  showMiniPlayer() {
    const miniPlayer = document.getElementById('mini-player');
    if (miniPlayer) miniPlayer.classList.remove('hidden');
  }

  openFullPlayer() {
    const fullPlayerModal = document.getElementById('full-player-modal');
    if (fullPlayerModal) fullPlayerModal.classList.remove('hidden');
  }

  closeFullPlayer() {
    const fullPlayerModal = document.getElementById('full-player-modal');
    if (fullPlayerModal) fullPlayerModal.classList.add('hidden');
  }

  // Download functionality
  async downloadTrack(trackId) {
    const track = appData.sampleTracks.find(t => t.id === trackId);
    if (!track || track.isDownloaded) return;

    this.showDownloadToast(track.title);
    
    try {
      // Simulate download progress
      for (let progress = 0; progress <= 100; progress += 10) {
        track.downloadProgress = progress;
        this.updateDownloadProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Mark as downloaded
      track.isDownloaded = true;
      track.downloadProgress = 100;
      
      // Store in IndexedDB if available
      if (this.db) {
        try {
          const transaction = this.db.transaction(['tracks'], 'readwrite');
          const store = transaction.objectStore('tracks');
          store.put(track);
        } catch (error) {
          console.warn('Failed to store in IndexedDB:', error);
        }
      }

      this.hideDownloadToast();
      this.refreshUI();
      
    } catch (error) {
      console.error('Download failed:', error);
      this.hideDownloadToast();
    }
  }

  downloadCurrentTrack() {
    if (this.currentTrack) {
      this.downloadTrack(this.currentTrack.id);
    }
  }

  async removeDownload(trackId) {
    const track = appData.sampleTracks.find(t => t.id === trackId);
    if (!track) return;

    track.isDownloaded = false;
    track.downloadProgress = 0;

    if (this.db) {
      try {
        const transaction = this.db.transaction(['tracks'], 'readwrite');
        const store = transaction.objectStore('tracks');
        store.delete(trackId);
      } catch (error) {
        console.warn('Failed to remove from IndexedDB:', error);
      }
    }

    this.refreshUI();
  }

  showDownloadToast(title) {
    const toast = document.getElementById('download-toast');
    if (toast) toast.classList.remove('hidden');
  }

  hideDownloadToast() {
    const toast = document.getElementById('download-toast');
    if (toast) toast.classList.add('hidden');
  }

  updateDownloadProgress(progress) {
    const progressFill = document.getElementById('download-progress-fill');
    const progressText = document.getElementById('download-progress-text');
    
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressText) progressText.textContent = progress + '%';
  }

  // Search functionality
  searchTracks(query) {
    if (!query.trim()) {
      this.searchResults = [];
      this.renderSearchResults();
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    this.searchResults = appData.sampleTracks.filter(track => {
      const searchText = `${track.title} ${track.artist} ${track.album} ${track.genre}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    });

    this.renderSearchResults();
  }

  filterSearchResults(filter) {
    // For demo purposes, we'll just show all results
    this.renderSearchResults();
  }

  renderSearchResults() {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    if (this.searchResults.length === 0) {
      container.innerHTML = `
        <div class="search-placeholder">
          <div class="placeholder-icon">🎵</div>
          <h3>Search for your favorite music</h3>
          <p>Find songs, artists, albums and more</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="track-list">
        ${this.searchResults.map(track => `
          <div class="track-item" onclick="app.playTrack('${track.id}')">
            <img class="track-item-art" src="${track.albumArt}" alt="${track.album}">
            <div class="track-item-info">
              <div class="track-item-title">${track.title}</div>
              <div class="track-item-artist">${track.artist} • ${track.album}</div>
            </div>
            <div class="track-item-duration">${this.formatDuration(track.duration)}</div>
            <button class="track-download-btn ${track.isDownloaded ? 'downloaded' : ''}" 
                    onclick="event.stopPropagation(); app.downloadTrack('${track.id}')">
              ${track.isDownloaded ? '✅' : '⬇️'}
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Playlist functionality - Fixed
  openCreatePlaylistModal() {
    const modal = document.getElementById('create-playlist-modal');
    if (modal) {
      modal.classList.remove('hidden');
      // Clear form
      const nameInput = document.getElementById('playlist-name-input');
      const descInput = document.getElementById('playlist-description-input');
      if (nameInput) nameInput.value = '';
      if (descInput) descInput.value = '';
      // Focus on name input
      if (nameInput) setTimeout(() => nameInput.focus(), 100);
    }
  }

  closeCreatePlaylistModal() {
    const modal = document.getElementById('create-playlist-modal');
    if (modal) {
      modal.classList.add('hidden');
      // Clear form
      const nameInput = document.getElementById('playlist-name-input');
      const descInput = document.getElementById('playlist-description-input');
      if (nameInput) nameInput.value = '';
      if (descInput) descInput.value = '';
    }
  }

  createPlaylist() {
    const nameInput = document.getElementById('playlist-name-input');
    const descInput = document.getElementById('playlist-description-input');
    
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    const description = descInput ? descInput.value.trim() : '';
    
    if (!name) {
      alert('Please enter a playlist name');
      return;
    }

    const newPlaylist = {
      id: 'playlist_' + Date.now(),
      name: name,
      description: description,
      trackIds: [],
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      createdAt: new Date().toISOString().split('T')[0]
    };

    appData.playlists.push(newPlaylist);
    this.closeCreatePlaylistModal();
    this.renderPlaylists();
  }

  openPlaylist(playlistId) {
    const playlist = appData.playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    // For demo, just play the first track
    if (playlist.trackIds.length > 0) {
      this.playTrack(playlist.trackIds[0]);
    }
  }

  filterByGenre(genreId) {
    const genre = appData.genres.find(g => g.id === genreId);
    if (!genre) return;

    // Navigate to search and filter by genre
    this.navigateToPage('search');
    
    const filteredTracks = appData.sampleTracks.filter(track => 
      track.genre.toLowerCase().includes(genre.name.toLowerCase())
    );
    
    this.searchResults = filteredTracks;
    this.renderSearchResults();
  }

  // Utility functions
  formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  refreshUI() {
    // Refresh current page
    const activeNavLink = document.querySelector('.nav-link.active');
    if (activeNavLink) {
      const activePage = activeNavLink.dataset.page;
      this.navigateToPage(activePage);
    }
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MusicApp();
});

// Global functions for onclick handlers
window.app = window.app || {};