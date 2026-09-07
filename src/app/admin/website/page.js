"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

function WebsiteManagementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const tabParam = searchParams.get('tab');
  const validTabs = ['landing', 'stories', 'photography', 'films', 'services', 'albums', 'blog', 'about', 'contact'];
  const initialTab = validTabs.includes(tabParam) ? tabParam : 'landing';
  
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    router.push(`?tab=${tabId}`, { scroll: false });
  };

  const [saveAlert, setSaveAlert] = useState(false);

  const [mediaType, setMediaType] = useState('image');
  const [sourceMethod, setSourceMethod] = useState('upload');
  const [heroMediaSrc, setHeroMediaSrc] = useState('https://ik.imagekit.io/weddingpur/hero-cover.jpg');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

  // 1. Landing Page State
  const [landingConfig, setLandingConfig] = useState({
    badge: "WEDDINGPUR — BESPOKE WEDDING CINEMA & STILLS",
    titleLine1: "Best Wedding Photographers",
    titleLine2: "In Patna, Bihar",
    subtitle: "We capture timeless weddings for modern couples who want their story told beautifully.",
    bgImage: "[https://ik.imagekit.io/weddingpur/hero-cover.jpg](https://ik.imagekit.io/weddingpur/hero-cover.jpg)",
    ctaPrimaryText: "CONTACT US",
    ctaSecondaryText: "EXPLORE PORTFOLIO",
    serviceCities: "PATNA • VARANASI • JAIPUR • GOA"
  });

  // 2. Stories State
  const [stories, setStories] = useState([]);

  React.useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setStories(data);
      })
      .catch(err => console.error("Error fetching stories:", err));
  }, []);

  // Modal State
  const [editingStory, setEditingStory] = useState(null); // story object or null
  const [isNewStoryModal, setIsNewStoryModal] = useState(false);
  const [storyFormData, setStoryFormData] = useState({
    couple: '',
    tagline: '',
    desc: '',
    mainImage: '',
    thumb0: '',
    thumb1: '',
    thumb2: '',
    thumb3: ''
  });

  const openStoryModal = (story = null) => {
    if (story) {
      setEditingStory(story);
      setIsNewStoryModal(false);
      setStoryFormData({
        couple: story.couple,
        tagline: story.tagline,
        desc: story.desc,
        mainImage: story.mainImage,
        thumb0: story.thumbnails[0],
        thumb1: story.thumbnails[1],
        thumb2: story.thumbnails[2],
        thumb3: story.thumbnails[3]
      });
    } else {
      setEditingStory(null);
      setIsNewStoryModal(true);
      setStoryFormData({ couple: '', tagline: '', desc: '', mainImage: '', thumb0: '', thumb1: '', thumb2: '', thumb3: '' });
    }
  };

  const closeStoryModal = () => {
    setEditingStory(null);
    setIsNewStoryModal(false);
  };

  const saveStory = async () => {
    const payload = {
      couple: storyFormData.couple,
      tagline: storyFormData.tagline,
      desc: storyFormData.desc,
      mainImage: storyFormData.mainImage,
      thumbnails: [
        storyFormData.thumb0,
        storyFormData.thumb1,
        storyFormData.thumb2,
        storyFormData.thumb3
      ].filter(Boolean)
    };

    try {
      if (editingStory) {
        // Edit existing
        payload.id = editingStory.id;
        const res = await fetch('/api/stories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setStories(stories.map(s => s.id === editingStory.id ? { ...s, ...payload } : s));
        }
      } else {
        // Create new
        const res = await fetch('/api/stories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          setStories([result.story, ...stories]);
        }
      }
    } catch (err) {
      console.error("Failed to save story", err);
    }

    closeStoryModal();
    triggerSave();
  };

  const deleteStory = async (id) => {
    // 1. Instantly remove from Admin Screen (No confirm dialog, zero lag)
    setStories((prevStories) => prevStories.filter((s) => s.id !== id));

    // 2. Broadcast event to other open tabs (Public Website Auto-Sync)
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_story_deleted', JSON.stringify({ id, timestamp: Date.now() }));
    }

    // 3. Execute backend persistent deletion silently
    try {
      await fetch(`/api/stories?id=${id}`, {
        method: 'DELETE',
        headers: { 'Cache-Control': 'no-cache' }
      });
    } catch (err) {
      console.error("Silent delete error:", err);
    }
  };

  // 3. Photography Stills State
  const [photos, setPhotos] = useState([]);
  
  React.useEffect(() => {
    fetch('/api/photography')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPhotos(data);
      })
      .catch(err => console.error("Error fetching photography:", err));
  }, []);

  const [editingPhoto, setEditingPhoto] = useState(null);
  const [isNewPhotoModal, setIsNewPhotoModal] = useState(false);
  const [photoFormData, setPhotoFormData] = useState({
    title: '',
    venue: '',
    category: 'Wedding',
    imageUrl: ''
  });

  const openPhotoModal = (photo = null) => {
    if (photo) {
      setEditingPhoto(photo);
      setIsNewPhotoModal(false);
      setPhotoFormData({
        title: photo.title,
        venue: photo.venue,
        category: photo.category,
        imageUrl: photo.imageUrl
      });
    } else {
      setEditingPhoto(null);
      setIsNewPhotoModal(true);
      setPhotoFormData({ title: '', venue: '', category: 'Wedding', imageUrl: '' });
    }
  };

  const closePhotoModal = () => {
    setEditingPhoto(null);
    setIsNewPhotoModal(false);
  };

  const savePhoto = async () => {
    const payload = { ...photoFormData };
    try {
      if (editingPhoto) {
        payload.id = editingPhoto.id;
        const res = await fetch('/api/photography', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setPhotos(photos.map(p => p.id === editingPhoto.id ? { ...p, ...payload } : p));
        }
      } else {
        const res = await fetch('/api/photography', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          setPhotos([result.photo, ...photos]);
        }
      }
    } catch (err) {
      console.error("Failed to save photo", err);
    }
    closePhotoModal();
    triggerSave();
  };

  const deletePhoto = async (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_photo_deleted', JSON.stringify({ id, timestamp: Date.now() }));
    }
    try {
      await fetch(`/api/photography?id=${id}`, { method: 'DELETE', headers: { 'Cache-Control': 'no-cache' } });
    } catch (err) {
      console.error("Silent delete error:", err);
    }
  };

  // 4. Films State
  const [films, setFilms] = useState([]);
  
  React.useEffect(() => {
    fetch('/api/films')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFilms(data);
      })
      .catch(err => console.error("Error fetching films:", err));
  }, []);

  const [editingFilm, setEditingFilm] = useState(null);
  const [isNewFilmModal, setIsNewFilmModal] = useState(false);
  const [filmFormData, setFilmFormData] = useState({
    title: '',
    couple: '',
    venue: '',
    runtime: '',
    videoUrl: '',
    posterUrl: '',
    description: ''
  });

  const openFilmModal = (film = null) => {
    if (film) {
      setEditingFilm(film);
      setIsNewFilmModal(false);
      setFilmFormData({
        title: film.title,
        couple: film.couple,
        venue: film.venue,
        runtime: film.runtime,
        videoUrl: film.videoUrl,
        posterUrl: film.posterUrl,
        description: film.description
      });
    } else {
      setEditingFilm(null);
      setIsNewFilmModal(true);
      setFilmFormData({ title: '', couple: '', venue: '', runtime: '', videoUrl: '', posterUrl: '', description: '' });
    }
  };

  const closeFilmModal = () => {
    setEditingFilm(null);
    setIsNewFilmModal(false);
  };

  const saveFilm = async () => {
    const payload = { ...filmFormData };
    try {
      if (editingFilm) {
        payload.id = editingFilm.id;
        const res = await fetch('/api/films', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setFilms(films.map(f => f.id === editingFilm.id ? { ...f, ...payload } : f));
        }
      } else {
        const res = await fetch('/api/films', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          setFilms([result.film, ...films]);
        }
      }
    } catch (err) {
      console.error("Failed to save film", err);
    }
    closeFilmModal();
    triggerSave();
  };

  const deleteFilm = async (id) => {
    setFilms((prev) => prev.filter((f) => f.id !== id));
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_film_deleted', JSON.stringify({ id, timestamp: Date.now() }));
    }
    try {
      await fetch(`/api/films?id=${id}`, { method: 'DELETE', headers: { 'Cache-Control': 'no-cache' } });
    } catch (err) {
      console.error("Silent delete error:", err);
    }
  };

  // 5. Services State
  const [services, setServices] = useState([]);
  
  React.useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(err => console.error("Error fetching services:", err));
  }, []);

  const [editingService, setEditingService] = useState(null);
  const [isNewServiceModal, setIsNewServiceModal] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    title: '', subtitle: '', badge: '', regularPrice: '', offerPrice: '', savings: '',
    schedule: '', timeline: '', deliverables: '', experience: '', whyChooseTitle: '', whyChooseFeatures: ''
  });

  const openServiceModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setIsNewServiceModal(false);
      setServiceFormData({
        title: service.title || '',
        subtitle: service.subtitle || '',
        badge: service.badge || '',
        regularPrice: service.regularPrice || '',
        offerPrice: service.offerPrice || '',
        savings: service.savings || '',
        schedule: JSON.stringify(service.schedule || [], null, 2),
        timeline: JSON.stringify(service.timeline || [], null, 2),
        deliverables: (service.deliverables || []).join('\n'),
        experience: (service.experience || []).join('\n'),
        whyChooseTitle: service.whyChooseTitle || '',
        whyChooseFeatures: (service.whyChooseFeatures || []).join('\n')
      });
    } else {
      setEditingService(null);
      setIsNewServiceModal(true);
      setServiceFormData({
        title: '', subtitle: '', badge: '', regularPrice: '', offerPrice: '', savings: '',
        schedule: '[\n  {\n    "day": "Day 1 – Event Coverage",\n    "crew": ["1 Photographer"]\n  }\n]', timeline: '[]', deliverables: '', experience: '', whyChooseTitle: 'WHY CHOOSE LENSLOOM?', whyChooseFeatures: ''
      });
    }
  };

  const closeServiceModal = () => {
    setEditingService(null);
    setIsNewServiceModal(false);
  };

  const saveService = async () => {
    try {
      let parsedSchedule = [];
      let parsedTimeline = [];
      try { parsedSchedule = JSON.parse(serviceFormData.schedule || '[]'); } catch(e){}
      try { parsedTimeline = JSON.parse(serviceFormData.timeline || '[]'); } catch(e){}

      const payload = { 
        ...serviceFormData,
        schedule: parsedSchedule,
        timeline: parsedTimeline,
        deliverables: serviceFormData.deliverables.split('\n').map(s => s.trim()).filter(Boolean),
        experience: serviceFormData.experience.split('\n').map(s => s.trim()).filter(Boolean),
        whyChooseFeatures: serviceFormData.whyChooseFeatures.split('\n').map(s => s.trim()).filter(Boolean)
      };
      if (editingService) {
        payload.id = editingService.id;
        const res = await fetch('/api/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setServices(services.map(s => s.id === editingService.id ? { ...s, ...payload } : s));
        }
      } else {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          setServices([result.service, ...services]);
        }
      }
    } catch (err) {
      console.error("Failed to save service", err);
    }
    closeServiceModal();
    triggerSave();
  };

  const deleteService = async (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_service_deleted', JSON.stringify({ id, timestamp: Date.now() }));
    }
    try {
      await fetch(`/api/services?id=${id}`, { method: 'DELETE', headers: { 'Cache-Control': 'no-cache' } });
    } catch (err) {
      console.error("Silent delete error:", err);
    }
  };

  const [albums, setAlbums] = useState([]);
  const [albumFeature, setAlbumFeature] = useState({ badge: '', title: '', description: '', ctaText: '', imageLeft: '', imageRight: '' });
  
  React.useEffect(() => {
    fetch('/api/albums')
      .then(res => res.json())
      .then(data => {
        setAlbums(data.editions || []);
        setAlbumFeature(data.featureSection || {});
      })
      .catch(err => console.error("Error fetching albums:", err));
  }, []);

  const [editingAlbum, setEditingAlbum] = useState(null);
  const [isNewAlbumModal, setIsNewAlbumModal] = useState(false);
  const [albumFormData, setAlbumFormData] = useState({ title: '', subtitle: '', material: '', specs: '', coverImage: '' });

  const openAlbumModal = (album = null) => {
    if (album) {
      setEditingAlbum(album);
      setIsNewAlbumModal(false);
      setAlbumFormData({ title: album.title, subtitle: album.subtitle, material: album.material, specs: album.specs, coverImage: album.coverImage });
    } else {
      setEditingAlbum(null);
      setIsNewAlbumModal(true);
      setAlbumFormData({ title: '', subtitle: '', material: '', specs: '', coverImage: '' });
    }
  };

  const closeAlbumModal = () => {
    setEditingAlbum(null);
    setIsNewAlbumModal(false);
  };

  const saveAlbumFeature = async () => {
    try {
      await fetch('/api/albums', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'featureSection', payload: albumFeature })
      });
      triggerSave();
    } catch (err) {
      console.error("Failed to save album feature", err);
    }
  };

  const saveAlbum = async () => {
    const payload = { ...albumFormData };
    try {
      if (editingAlbum) {
        payload.id = editingAlbum.id;
        const res = await fetch('/api/albums', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) setAlbums(albums.map(a => a.id === editingAlbum.id ? { ...a, ...payload } : a));
      } else {
        const res = await fetch('/api/albums', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          setAlbums([result.album, ...albums]);
        }
      }
    } catch (err) {
      console.error("Failed to save album", err);
    }
    closeAlbumModal();
    triggerSave();
  };

  const deleteAlbum = async (id) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_album_deleted', JSON.stringify({ id, timestamp: Date.now() }));
    }
    try {
      await fetch(`/api/albums?id=${id}`, { method: 'DELETE' });
    } catch (err) {}
  };

  // 7. Blog State
  const [blogs, setBlogs] = useState([]);

  React.useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBlogs(data);
      })
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  const [editingBlog, setEditingBlog] = useState(null);
  const [isNewBlogModal, setIsNewBlogModal] = useState(false);
  const [blogFormData, setBlogFormData] = useState({ title: '', readTime: '', date: '', img: '' });

  const openBlogModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setIsNewBlogModal(false);
      setBlogFormData({ title: blog.title, readTime: blog.readTime, date: blog.date, img: blog.img || '' });
    } else {
      setEditingBlog(null);
      setIsNewBlogModal(true);
      setBlogFormData({ title: '', readTime: '', date: '', img: '' });
    }
  };

  const closeBlogModal = () => {
    setEditingBlog(null);
    setIsNewBlogModal(false);
  };

  const saveBlog = async () => {
    const payload = { ...blogFormData };
    try {
      if (editingBlog) {
        payload.id = editingBlog.id;
        const res = await fetch('/api/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...b, ...payload } : b));
      } else {
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          setBlogs([result.blog, ...blogs]);
        }
      }
    } catch (err) {
      console.error("Failed to save blog", err);
    }
    closeBlogModal();
    triggerSave();
  };

  const deleteBlog = async (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    if (typeof window !== 'undefined') {
      localStorage.setItem('weddingpur_blog_deleted', JSON.stringify({ id, timestamp: Date.now() }));
    }
    try {
      await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
    } catch (err) {}
  };

  // 8. About State
  const [aboutConfig, setAboutConfig] = useState({
    directorName: "",
    directorRole: "",
    bio: "",
    directorPhoto: "",
    awards: ""
  });

  React.useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => {
        if (data) setAboutConfig(data);
      })
      .catch(err => console.error("Error fetching about:", err));
  }, []);

  const [isEditAboutModal, setIsEditAboutModal] = useState(false);
  const [aboutFormData, setAboutFormData] = useState({ ...aboutConfig });

  const openAboutModal = () => {
    setAboutFormData({ ...aboutConfig });
    setIsEditAboutModal(true);
  };

  const closeAboutModal = () => {
    setIsEditAboutModal(false);
  };

  const saveAbout = async () => {
    const payload = { ...aboutFormData };
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setAboutConfig(payload);
        if (typeof window !== 'undefined') {
          localStorage.setItem('weddingpur_about_updated', Date.now().toString());
        }
      }
    } catch (err) {
      console.error("Failed to save about config", err);
    }
    closeAboutModal();
    triggerSave();
  };

  // 9. Contact State
  const [contactConfig, setContactConfig] = useState({
    hqAddress: "Boring Road & Bailey Road, Patna, Bihar — 800001",
    branchAddress: "Zero Mile & Adampur, Bhagalpur, Bihar",
    directPhone: "+91 98350 12345",
    conciergeEmail: "concierge@weddingpur.com",
    instagramHandle: "@weddingpur",
    youtubeHandle: "@weddingpurcinema"
  });

  // Universal Save Trigger
  const triggerSave = () => {
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  const navTabs = [
    { id: 'landing', label: 'Landing Page' },
    { id: 'stories', label: 'Stories' },
    { id: 'photography', label: 'Photography' },
    { id: 'films', label: 'Films' },
    { id: 'services', label: 'Services' },
    { id: 'albums', label: 'Albums' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F5F5F5] font-sans antialiased p-6 lg:p-10 space-y-8 selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. TOP HEADER & QUICK PREVIEW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F242D]">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
            WEBSITE MANAGEMENT SUITE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Full Site Content Controller
          </h1>
          <p className="text-xs text-[#8A7D5C] mt-1 font-sans">
            Centrally edit live media, publish new articles, change hero copy, and update studio portfolio assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link className="px-4 py-2.5 rounded-xl border border-[#2B2519] bg-[#121518] hover:border-[#D4AF37] text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5" href="/" target="_blank">
            <span>Live Site</span>
            <span>↗</span>
          </Link>
          <button
            onClick={triggerSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer"
          >
            {saveAlert ? "✓ Published Live!" : "Save All Changes"}
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (ALL 9 SECTIONS) */}
      <div className="flex items-center gap-2 p-1.5 bg-[#121518] border border-[#2B2519] rounded-2xl overflow-x-auto scrollbar-none">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabSwitch(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black shadow-md shadow-[#D4AF37]/20'
                : 'text-[#C5B388] hover:text-white hover:bg-[#181B20]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT WORKSPACES */}
      <div className="bg-[#121518] border border-[#2B2519] rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        
        {/* ==================== 1. LANDING PAGE ==================== */}
        {activeTab === 'landing' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-white">Homepage Hero & Visual Banner</h2>
              <p className="text-xs text-[#8A7D5C] mt-0.5">Control main title, golden accents, subtext, and background visuals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="md:col-span-2">
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Top Badge Tagline</label>
                <input
                  type="text"
                  value={landingConfig.badge}
                  onChange={e => setLandingConfig({ ...landingConfig, badge: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Headline Line 1 (White)</label>
                <input
                  type="text"
                  value={landingConfig.titleLine1}
                  onChange={e => setLandingConfig({ ...landingConfig, titleLine1: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white font-extrabold text-base focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Headline Line 2 (Gold Accent)</label>
                <input
                  type="text"
                  value={landingConfig.titleLine2}
                  onChange={e => setLandingConfig({ ...landingConfig, titleLine2: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-extrabold text-base focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Supporting Narrative Subtitle</label>
                <textarea
                  rows={2}
                  value={landingConfig.subtitle}
                  onChange={e => setLandingConfig({ ...landingConfig, subtitle: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="md:col-span-2 border border-[#2B2519] rounded-2xl p-5 bg-[#121518] space-y-4">
                <div className="flex items-center justify-between border-b border-[#2B2519] pb-4">
                  <h3 className="text-sm font-extrabold text-white">Hero Background Media</h3>
                  <div className="flex bg-[#181B20] rounded-lg p-1 border border-[#2B2519]">
                    <button 
                      onClick={() => setMediaType('image')} 
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mediaType === 'image' ? 'bg-[#2B2519] text-[#D4AF37]' : 'text-[#8A7D5C]'}`}
                    >
                      High-Res Image
                    </button>
                    <button 
                      onClick={() => setMediaType('video')} 
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mediaType === 'video' ? 'bg-[#2B2519] text-[#D4AF37]' : 'text-[#8A7D5C]'}`}
                    >
                      4K Cinema Video
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSourceMethod('upload')} 
                    className={`flex-1 py-2 text-[10px] uppercase font-black tracking-wider rounded-xl border transition-all ${sourceMethod === 'upload' ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#2B2519] text-[#8A7D5C] hover:border-[#8A7D5C]'}`}
                  >
                    💻 Upload from PC
                  </button>
                  <button 
                    onClick={() => setSourceMethod('url')} 
                    className={`flex-1 py-2 text-[10px] uppercase font-black tracking-wider rounded-xl border transition-all ${sourceMethod === 'url' ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#2B2519] text-[#8A7D5C] hover:border-[#8A7D5C]'}`}
                  >
                    🌐 CDN / Web URL
                  </button>
                  <button 
                    onClick={() => setSourceMethod('instagram')} 
                    className={`flex-1 py-2 text-[10px] uppercase font-black tracking-wider rounded-xl border transition-all ${sourceMethod === 'instagram' ? 'border-pink-500 text-pink-400 bg-pink-500/5' : 'border-[#2B2519] text-[#8A7D5C] hover:border-[#8A7D5C]'}`}
                  >
                    📱 Instagram Embed
                  </button>
                </div>

                <div className="pt-2">
                  {sourceMethod === 'upload' && (
                    <div className="border-2 border-dashed border-[#2B2519] rounded-xl p-6 text-center hover:border-[#D4AF37] transition-all cursor-pointer bg-[#0B0D0E]">
                      <span className="text-2xl block mb-2">☁️</span>
                      <p className="text-[#A89D84] font-bold text-xs mb-1">Click to upload {mediaType === 'image' ? '.jpg, .png, .webp' : '.mp4, .webm'}</p>
                      <p className="text-[#8A7D5C] text-[10px]">Maximum file size: {mediaType === 'image' ? '5MB' : '50MB'}</p>
                    </div>
                  )}
                  {sourceMethod === 'url' && (
                    <div>
                      <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Direct CDN Link</label>
                      <input
                        type="text"
                        value={heroMediaSrc}
                        onChange={e => setHeroMediaSrc(e.target.value)}
                        placeholder="https://ik.imagekit.io/..."
                        className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  )}
                  {sourceMethod === 'instagram' && (
                    <div>
                      <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Instagram Post or Reel URL</label>
                      <input
                        type="text"
                        value={instagramUrl}
                        onChange={e => setInstagramUrl(e.target.value)}
                        placeholder="https://www.instagram.com/p/..."
                        className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  )}
                </div>

                {/* Live Preview Box */}
                <div className="mt-4 border border-[#2B2519] rounded-xl bg-[#0B0D0E] overflow-hidden flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 bg-[#181B20] flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[#2B2519]">
                    <span className="text-4xl text-[#2B2519]">
                      {mediaType === 'image' ? '🖼️' : '🎬'}
                    </span>
                  </div>
                  <div className="w-full md:w-2/3 p-4 flex flex-col justify-center">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#D4AF37] mb-1">Live Media Preview</span>
                    <p className="text-xs text-white font-mono break-all line-clamp-2">
                      {sourceMethod === 'instagram' ? (instagramUrl || 'No URL Provided') : heroMediaSrc}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="bg-[#181B20] text-[#8A7D5C] px-2 py-0.5 rounded text-[10px] font-bold border border-[#2B2519]">
                        {mediaType.toUpperCase()}
                      </span>
                      <span className="bg-[#181B20] text-[#8A7D5C] px-2 py-0.5 rounded text-[10px] font-bold border border-[#2B2519]">
                        {sourceMethod.toUpperCase()} SOURCE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Footer Cities Tag</label>
                <input
                  type="text"
                  value={landingConfig.serviceCities}
                  onChange={e => setLandingConfig({ ...landingConfig, serviceCities: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#8A7D5C] font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. STORIES ==================== */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Couple Narratives & Stories</h2>
                <p className="text-xs text-[#8A7D5C]">Published long-form couple journeys.</p>
              </div>
              <button 
                onClick={() => openStoryModal()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider"
              >
                + Add New Story
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {stories.map(s => (
                <div key={s.id} className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-[#D4AF37] font-mono uppercase font-bold tracking-wider">{s.tagline}</span>
                      <h4 className="text-2xl font-extrabold text-white mt-1">{s.couple}</h4>
                    </div>
                    <button 
                      onClick={() => openStoryModal(s)}
                      className="text-xs px-4 py-2 rounded-lg border border-[#2B2519] bg-[#121518] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold transition-all"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteStory(s.id)}
                      className="text-xs px-4 py-2 rounded-lg border border-red-900 bg-[#121518] text-red-400 hover:bg-red-900 hover:text-white font-bold transition-all ml-2"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-[#A89D84] leading-relaxed">{s.desc}</p>
                  
                  <div className="grid grid-cols-5 gap-2 h-32">
                    <div className="col-span-2 rounded-xl overflow-hidden border border-[#2B2519]">
                      <img src={s.mainImage} alt={s.couple} className="w-full h-full object-cover" />
                    </div>
                    {s.thumbnails.map((thumb, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-[#2B2519]">
                        <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 3. PHOTOGRAPHY ==================== */}
        {activeTab === 'photography' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Photography Gallery Stills</h2>
                <p className="text-xs text-[#8A7D5C]">Curated high-res imagery across Candid, Traditional, and Portraits.</p>
              </div>
              <button 
                onClick={() => openPhotoModal()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider"
              >
                + Add New Photo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {photos.map(p => (
                <div key={p.id} className="bg-[#181B20] border border-[#2B2519] rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all flex flex-col group">
                  <div className="aspect-square w-full relative overflow-hidden bg-[#0B0D0E]">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 left-2">
                      <span className="text-[9px] font-mono font-bold px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[#D4AF37] border border-[#2B2519]">{p.category}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-white leading-snug truncate">{p.title}</h4>
                      <p className="text-[10px] text-[#A89D84] font-mono tracking-widest uppercase mt-1">{p.venue}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-[#2B2519]">
                      <button onClick={() => openPhotoModal(p)} className="text-[#D4AF37] text-xs font-bold hover:underline">Edit</button>
                      <button onClick={() => deletePhoto(p.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 4. FILMS ==================== */}
        {activeTab === 'films' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">4K Wedding Cinema & Teasers</h2>
                <p className="text-xs text-[#8A7D5C]">Video embeds, runtime lengths, and thumbnail posters.</p>
              </div>
              <button 
                onClick={() => openFilmModal()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider"
              >
                + Add New Cinema Film
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {films.map(f => (
                <div key={f.id} className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-5 space-y-4 hover:border-[#D4AF37] transition-all flex flex-col">
                  <div className="aspect-video w-full relative overflow-hidden rounded-xl bg-[#0B0D0E] border border-[#2B2519]">
                    <img src={f.posterUrl} alt={f.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-[#D4AF37]">
                        <span className="text-[#D4AF37] text-xl ml-1">▶</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] font-mono font-bold rounded">
                      {f.runtime}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-white">{f.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-[#A89D84] font-mono uppercase tracking-widest">{f.venue}</span>
                        <span className="text-[10px] text-emerald-400 font-bold">{f.couple}</span>
                      </div>
                      <p className="text-xs text-[#8A7D5C] mt-2 line-clamp-2">{f.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-[#2B2519]">
                      <button onClick={() => openFilmModal(f)} className="text-[#D4AF37] text-xs font-bold hover:underline">Edit Film</button>
                      <button onClick={() => deleteFilm(f.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 5. SERVICES ==================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Services & Investment Tiers</h2>
                <p className="text-xs text-[#8A7D5C]">Pricing models and deliverables shown on public services catalog.</p>
              </div>
              <button 
                onClick={() => openServiceModal()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider"
              >
                + Add Package Tier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map(srv => (
                <div key={srv.id} className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-6 space-y-4 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] text-[#A89D84] font-mono tracking-widest uppercase">{srv.badge || "PACKAGE"}</span>
                      <span className="text-sm font-mono font-black text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">{srv.offerPrice}</span>
                    </div>
                    <h4 className="text-lg font-extrabold text-white">{srv.title}</h4>
                    <p className="text-xs text-[#D1C7A5] mt-1 font-mono">{srv.subtitle}</p>
                    <p className="text-xs text-[#8A7D5C] mt-3 line-through">{srv.regularPrice} <span className="text-emerald-400 no-underline ml-2 font-bold">{srv.savings}</span></p>
                  </div>
                  
                  <div className="pt-4 border-t border-[#2B2519] flex justify-between items-center mt-4">
                    <span className="text-[10px] text-[#D4AF37] font-mono font-bold">{(srv.deliverables && srv.deliverables.length) || 0} Deliverables</span>
                    <div className="space-x-3">
                      <button onClick={() => openServiceModal(srv)} className="text-[#D4AF37] text-xs font-bold hover:underline">Edit</button>
                      <button onClick={() => deleteService(srv.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 6. ALBUMS ==================== */}
        {activeTab === 'albums' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Fine-Art Wedding Albums</h2>
                <p className="text-xs text-[#8A7D5C]">Physical luxury book offerings and specs.</p>
              </div>
              <button onClick={() => openAlbumModal()} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider">
                + Add Album Edition
              </button>
            </div>

            {/* Feature Section Editor */}
            <div className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">"Why Albums Matter" Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8A7D5C] mb-1">Badge</label>
                  <input type="text" value={albumFeature.badge || ''} onChange={e => setAlbumFeature({...albumFeature, badge: e.target.value})} className="w-full bg-[#121518] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. THE TANGIBLE LEGACY" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8A7D5C] mb-1">Title</label>
                  <input type="text" value={albumFeature.title || ''} onChange={e => setAlbumFeature({...albumFeature, title: e.target.value})} className="w-full bg-[#121518] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Why Wedding Albums Matter?" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8A7D5C] mb-1">Description Narrative</label>
                <textarea rows={3} value={albumFeature.description || ''} onChange={e => setAlbumFeature({...albumFeature, description: e.target.value})} className="w-full bg-[#121518] border border-[#2B2519] rounded-xl p-4 text-[#A89D84] focus:outline-none focus:border-[#D4AF37]" placeholder="Narrative..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8A7D5C] mb-1">Image Left URL</label>
                  <input type="text" value={albumFeature.imageLeft || ''} onChange={e => setAlbumFeature({...albumFeature, imageLeft: e.target.value})} className="w-full bg-[#121518] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] focus:outline-none focus:border-[#D4AF37] text-xs font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8A7D5C] mb-1">Image Right URL</label>
                  <input type="text" value={albumFeature.imageRight || ''} onChange={e => setAlbumFeature({...albumFeature, imageRight: e.target.value})} className="w-full bg-[#121518] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] focus:outline-none focus:border-[#D4AF37] text-xs font-mono" />
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={saveAlbumFeature} className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase text-xs tracking-wider transition-all">Save Feature Section</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {albums.map(a => (
                <div key={a.id} className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-5 space-y-4 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex gap-4">
                      {a.coverImage && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-[#2B2519]">
                          <img src={a.coverImage.replace('[', '').replace(']', '').split('(')[0].trim()} alt={a.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-extrabold text-white leading-snug">{a.title}</h4>
                        <p className="text-[10px] text-[#A89D84] tracking-widest uppercase mt-1">{a.subtitle}</p>
                        <div className="text-[10px] text-[#D4AF37] font-mono mt-2 space-y-1">
                          <p>MATERIAL: {a.material}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#C5B388] mt-3 leading-relaxed">{a.specs}</p>
                  </div>
                  <div className="pt-4 border-t border-[#2B2519] flex justify-end items-center mt-2 space-x-3">
                    <button onClick={() => openAlbumModal(a)} className="text-[#D4AF37] text-xs font-bold hover:underline">Edit</button>
                    <button onClick={() => deleteAlbum(a.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 7. BLOG ==================== */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Editorial Blog & Insights</h2>
                <p className="text-xs text-[#8A7D5C]">Wedding planning guides and real-wedding highlights.</p>
              </div>
              <button onClick={() => openBlogModal()} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider">
                + Add Blog Post
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {blogs.map(b => (
                <div key={b.id} className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-5 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37]">{b.date}</span>
                      <span className="text-[10px] text-[#A89D84] uppercase tracking-widest">{b.readTime}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white mt-2 leading-snug">{b.title}</h4>
                    {b.img && (
                      <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-[#2B2519]">
                        <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-[#2B2519] flex justify-end items-center mt-4 space-x-3">
                    <button onClick={() => openBlogModal(b)} className="text-[#D4AF37] text-xs font-bold hover:underline">Edit</button>
                    <button onClick={() => deleteBlog(b.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 8. ABOUT ==================== */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">About the Director</h2>
                <p className="text-xs text-[#8A7D5C]">Bio, vision, and personal branding.</p>
              </div>
              <button onClick={() => openAboutModal()} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] text-black text-xs font-black uppercase tracking-wider">
                Edit About Profile
              </button>
            </div>

            <div className="bg-[#181B20] border border-[#2B2519] rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0 bg-[#121518]">
                  {aboutConfig.directorPhoto && (
                    <img src={aboutConfig.directorPhoto.replace('[', '').replace(']', '').split('(')[0].trim()} alt="Director" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{aboutConfig.directorName || "N/A"}</h3>
                    <p className="text-sm font-mono text-[#D4AF37] mt-1">{aboutConfig.directorRole || "N/A"}</p>
                  </div>
                  <p className="text-sm text-[#A89D84] leading-relaxed max-w-3xl">{aboutConfig.bio || "N/A"}</p>
                  <div className="inline-block px-4 py-2 rounded-lg bg-[#121518] border border-[#2B2519]">
                    <span className="text-[10px] text-[#A89D84] uppercase tracking-widest block mb-1">Awards & Recognition</span>
                    <span className="text-xs text-white font-bold">{aboutConfig.awards || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 9. CONTACT ==================== */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-white">Studio Physical Concierge & Channels</h2>
              <p className="text-xs text-[#8A7D5C]">Addresses in Bihar and official direct channels.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Patna Headquarters</label>
                <input
                  type="text"
                  value={contactConfig.hqAddress}
                  onChange={e => setContactConfig({ ...contactConfig, hqAddress: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Bhagalpur Hub</label>
                <input
                  type="text"
                  value={contactConfig.branchAddress}
                  onChange={e => setContactConfig({ ...contactConfig, branchAddress: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Direct Phone</label>
                <input
                  type="text"
                  value={contactConfig.directPhone}
                  onChange={e => setContactConfig({ ...contactConfig, directPhone: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Official Email</label>
                <input
                  type="email"
                  value={contactConfig.conciergeEmail}
                  onChange={e => setContactConfig({ ...contactConfig, conciergeEmail: e.target.value })}
                  className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM GLOBAL ACTION BAR */}
        <div className="pt-4 border-t border-[#1C1F24] flex items-center justify-between">
          <span className="text-xs text-[#8A7D5C]">
            Live sync enabled. Updating any field immediately updates public visitors on weddingpur.com.
          </span>
          <button
            onClick={triggerSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89018] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-black text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            {saveAlert ? "✓ Published!" : "Save & Publish Changes"}
          </button>
        </div>

      </div>

      {/* MODAL: EDIT / ADD STORY */}
      {(editingStory || isNewStoryModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2B2519] pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {isNewStoryModal ? "Add New Couple Story" : `Edit Story: ${storyFormData.couple}`}
              </h2>
              <button onClick={closeStoryModal} className="text-[#8A7D5C] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Couple Name</label>
                  <input type="text" value={storyFormData.couple} onChange={e => setStoryFormData({...storyFormData, couple: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Rahul & Priya" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Tagline & Location</label>
                  <input type="text" value={storyFormData.tagline} onChange={e => setStoryFormData({...storyFormData, tagline: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. A ROYAL UNION • JAIPUR" />
                </div>
              </div>
              
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Story Narrative (Description)</label>
                <textarea rows={4} value={storyFormData.desc} onChange={e => setStoryFormData({...storyFormData, desc: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#A89D84] focus:outline-none focus:border-[#D4AF37]" placeholder="Write their beautiful story..." />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Main Cover Image URL</label>
                <input type="text" value={storyFormData.mainImage} onChange={e => setStoryFormData({...storyFormData, mainImage: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Thumbnail 1 URL</label>
                  <input type="text" value={storyFormData.thumb0} onChange={e => setStoryFormData({...storyFormData, thumb0: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Thumbnail 2 URL</label>
                  <input type="text" value={storyFormData.thumb1} onChange={e => setStoryFormData({...storyFormData, thumb1: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Thumbnail 3 URL</label>
                  <input type="text" value={storyFormData.thumb2} onChange={e => setStoryFormData({...storyFormData, thumb2: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Thumbnail 4 URL</label>
                  <input type="text" value={storyFormData.thumb3} onChange={e => setStoryFormData({...storyFormData, thumb3: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#2B2519]">
              <button onClick={closeStoryModal} className="px-5 py-2.5 rounded-xl border border-[#2B2519] text-[#8A7D5C] hover:text-white font-bold transition-all">Cancel</button>
              <button onClick={saveStory} className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase tracking-wider transition-all">Save Story</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD PHOTO */}
      {(editingPhoto || isNewPhotoModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2B2519] pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {isNewPhotoModal ? "Add New Photo" : "Edit Photo Details"}
              </h2>
              <button onClick={closePhotoModal} className="text-[#8A7D5C] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Photo Title / Caption</label>
                <input type="text" value={photoFormData.title} onChange={e => setPhotoFormData({...photoFormData, title: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Heirloom Bridal Jewelry" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Venue / Location</label>
                  <input type="text" value={photoFormData.venue} onChange={e => setPhotoFormData({...photoFormData, venue: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. JAIPUR PALACE" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Category Filter</label>
                  <select value={photoFormData.category} onChange={e => setPhotoFormData({...photoFormData, category: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] appearance-none">
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Haldi & Sangeet">Haldi & Sangeet</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">High-Res Image URL</label>
                <input type="text" value={photoFormData.imageUrl} onChange={e => setPhotoFormData({...photoFormData, imageUrl: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#2B2519]">
              <button onClick={closePhotoModal} className="px-5 py-2.5 rounded-xl border border-[#2B2519] text-[#8A7D5C] hover:text-white font-bold transition-all">Cancel</button>
              <button onClick={savePhoto} className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase tracking-wider transition-all">Save Photo</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD FILM */}
      {(editingFilm || isNewFilmModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2B2519] pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {isNewFilmModal ? "Add New Cinema Film" : "Edit Film Details"}
              </h2>
              <button onClick={closeFilmModal} className="text-[#8A7D5C] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Film Title</label>
                <input type="text" value={filmFormData.title} onChange={e => setFilmFormData({...filmFormData, title: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. The Royal Symphony..." />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Couple Name</label>
                  <input type="text" value={filmFormData.couple} onChange={e => setFilmFormData({...filmFormData, couple: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Ahmed & Farheen" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Venue / Location</label>
                  <input type="text" value={filmFormData.venue} onChange={e => setFilmFormData({...filmFormData, venue: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Patna Grand Palace" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Runtime</label>
                  <input type="text" value={filmFormData.runtime} onChange={e => setFilmFormData({...filmFormData, runtime: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="04:15" />
                </div>
              </div>
              
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Description</label>
                <textarea rows={2} value={filmFormData.description} onChange={e => setFilmFormData({...filmFormData, description: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#A89D84] focus:outline-none focus:border-[#D4AF37]" placeholder="A short descriptive text..." />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">YouTube / Vimeo Embed URL</label>
                <input type="text" value={filmFormData.videoUrl} onChange={e => setFilmFormData({...filmFormData, videoUrl: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
              </div>
              
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Poster Image URL (Thumbnail)</label>
                <input type="text" value={filmFormData.posterUrl} onChange={e => setFilmFormData({...filmFormData, posterUrl: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#2B2519]">
              <button onClick={closeFilmModal} className="px-5 py-2.5 rounded-xl border border-[#2B2519] text-[#8A7D5C] hover:text-white font-bold transition-all">Cancel</button>
              <button onClick={saveFilm} className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase tracking-wider transition-all">Save Film</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD SERVICE */}
      {(editingService || isNewServiceModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2B2519] pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {isNewServiceModal ? "Add New Package Tier" : "Edit Package Details"}
              </h2>
              <button onClick={closeServiceModal} className="text-[#8A7D5C] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Package Title</label>
                  <input type="text" value={serviceFormData.title} onChange={e => setServiceFormData({...serviceFormData, title: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. LUXURY WEDDING PACKAGE (3 DAYS)" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Subtitle</label>
                  <input type="text" value={serviceFormData.subtitle} onChange={e => setServiceFormData({...serviceFormData, subtitle: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. 3 DAYS EVENT COVERAGE QUOTATION" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Badge (Optional)</label>
                  <input type="text" value={serviceFormData.badge} onChange={e => setServiceFormData({...serviceFormData, badge: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. LUXURY EXPERIENCE" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Savings Text</label>
                  <input type="text" value={serviceFormData.savings} onChange={e => setServiceFormData({...serviceFormData, savings: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-emerald-400 font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. SAVE ₹45,000" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Regular Price</label>
                  <input type="text" value={serviceFormData.regularPrice} onChange={e => setServiceFormData({...serviceFormData, regularPrice: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#A89D84] line-through focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. ₹1,95,000" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Offer Price</label>
                  <input type="text" value={serviceFormData.offerPrice} onChange={e => setServiceFormData({...serviceFormData, offerPrice: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white font-black text-lg focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. ₹1,50,000/-" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Schedule Array (JSON)</label>
                  <textarea rows={6} value={serviceFormData.schedule} onChange={e => setServiceFormData({...serviceFormData, schedule: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37] text-[10px]" placeholder='[ { "day": "...", "crew": ["..."] } ]' />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Timeline Array (JSON)</label>
                  <textarea rows={6} value={serviceFormData.timeline} onChange={e => setServiceFormData({...serviceFormData, timeline: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl p-4 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37] text-[10px]" placeholder='[ { "item": "...", "time": "..." } ]' />
                </div>
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Deliverables (One per line)</label>
                <textarea rows={4} value={serviceFormData.deliverables} onChange={e => setServiceFormData({...serviceFormData, deliverables: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="1 E-Invitation Video&#10;2 Cinematic Reels" />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Experience Highlights (One per line)</label>
                <textarea rows={3} value={serviceFormData.experience} onChange={e => setServiceFormData({...serviceFormData, experience: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#D4AF37] font-medium focus:outline-none focus:border-[#D4AF37]" placeholder="Full Cinematic Experience..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Why Choose Title</label>
                  <input type="text" value={serviceFormData.whyChooseTitle} onChange={e => setServiceFormData({...serviceFormData, whyChooseTitle: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="WHY CHOOSE LENSLOOM?" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Why Choose Features (One per line)</label>
                  <textarea rows={3} value={serviceFormData.whyChooseFeatures} onChange={e => setServiceFormData({...serviceFormData, whyChooseFeatures: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#A89D84] focus:outline-none focus:border-[#D4AF37]" placeholder="Maximum Coverage&#10;Priority Delivery" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#2B2519]">
              <button onClick={closeServiceModal} className="px-5 py-2.5 rounded-xl border border-[#2B2519] text-[#8A7D5C] hover:text-white font-bold transition-all">Cancel</button>
              <button onClick={saveService} className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase tracking-wider transition-all">Save Service</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD ALBUM */}
      {(editingAlbum || isNewAlbumModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2B2519] pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {isNewAlbumModal ? "Add New Album Spec" : "Edit Album Details"}
              </h2>
              <button onClick={closeAlbumModal} className="text-[#8A7D5C] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Edition Title</label>
                  <input type="text" value={albumFormData.title} onChange={e => setAlbumFormData({...albumFormData, title: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. ACRYLIC FABRIC" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Subtitle</label>
                  <input type="text" value={albumFormData.subtitle} onChange={e => setAlbumFormData({...albumFormData, subtitle: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. CRIMSON VELVET & GOLD EMBOSSING" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Cover Image URL</label>
                  <input type="text" value={albumFormData.coverImage} onChange={e => setAlbumFormData({...albumFormData, coverImage: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Material</label>
                  <input type="text" value={albumFormData.material} onChange={e => setAlbumFormData({...albumFormData, material: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Acrylic Glass & Velvet" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Specs Description</label>
                  <textarea rows={2} value={albumFormData.specs} onChange={e => setAlbumFormData({...albumFormData, specs: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#A89D84] focus:outline-none focus:border-[#D4AF37]" placeholder="Seamless lay-flat..." />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#2B2519]">
              <button onClick={closeAlbumModal} className="px-5 py-2.5 rounded-xl border border-[#2B2519] text-[#8A7D5C] hover:text-white font-bold transition-all">Cancel</button>
              <button onClick={saveAlbum} className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase tracking-wider transition-all">Save Album</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD BLOG */}
      {(editingBlog || isNewBlogModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2B2519] pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {isNewBlogModal ? "Add New Blog Post" : "Edit Blog Details"}
              </h2>
              <button onClick={closeBlogModal} className="text-[#8A7D5C] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Blog Title</label>
                <input type="text" value={blogFormData.title} onChange={e => setBlogFormData({...blogFormData, title: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Top 10 Luxury Wedding Venues" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Read Time</label>
                  <input type="text" value={blogFormData.readTime} onChange={e => setBlogFormData({...blogFormData, readTime: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. 5 min read" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Date</label>
                  <input type="text" value={blogFormData.date} onChange={e => setBlogFormData({...blogFormData, date: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Sept 2026" />
                </div>
              </div>
              
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Cover Image URL</label>
                <input type="text" value={blogFormData.img} onChange={e => setBlogFormData({...blogFormData, img: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#2B2519]">
              <button onClick={closeBlogModal} className="px-5 py-2.5 rounded-xl border border-[#2B2519] text-[#8A7D5C] hover:text-white font-bold transition-all">Cancel</button>
              <button onClick={saveBlog} className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase tracking-wider transition-all">Save Blog</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ABOUT PROFILE */}
      {isEditAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121518] border border-[#2B2519] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2B2519] pb-4">
              <h2 className="text-xl font-extrabold text-white">
                Edit About Profile
              </h2>
              <button onClick={closeAboutModal} className="text-[#8A7D5C] hover:text-white text-2xl leading-none">&times;</button>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Director Name</label>
                  <input type="text" value={aboutFormData.directorName} onChange={e => setAboutFormData({...aboutFormData, directorName: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Director Role</label>
                  <input type="text" value={aboutFormData.directorRole} onChange={e => setAboutFormData({...aboutFormData, directorRole: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
              
              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Bio</label>
                <textarea rows={4} value={aboutFormData.bio} onChange={e => setAboutFormData({...aboutFormData, bio: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl p-4 text-[#A89D84] focus:outline-none focus:border-[#D4AF37]" />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Awards & Recognition</label>
                <input type="text" value={aboutFormData.awards} onChange={e => setAboutFormData({...aboutFormData, awards: e.target.value})} className="w-full bg-[#181B20] border border-[#2B2519] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>

              <div>
                <label className="block text-[#8A7D5C] uppercase font-bold mb-1">Director Photo URL</label>
                <input type="text" value={aboutFormData.directorPhoto} onChange={e => setAboutFormData({...aboutFormData, directorPhoto: e.target.value})} className="w-full bg-[#0B0D0E] border border-[#2B2519] rounded-xl px-4 py-3 text-[#D1C7A5] font-mono focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#2B2519]">
              <button onClick={closeAboutModal} className="px-5 py-2.5 rounded-xl border border-[#2B2519] text-[#8A7D5C] hover:text-white font-bold transition-all">Cancel</button>
              <button onClick={saveAbout} className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-black uppercase tracking-wider transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function WebsiteManagementStudio() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D0E] flex items-center justify-center text-[#D4AF37] font-bold">Loading Studio...</div>}>
      <WebsiteManagementContent />
    </Suspense>
  );
}
