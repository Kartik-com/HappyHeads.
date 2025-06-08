import React, { useState, useMemo } from 'react';
import { 
  Library, 
  Search, 
  Filter,
  BookOpen,
  Video,
  Headphones,
  Clock,
  Star,
  Play,
  Download,
  Heart,
  Share2,
  Tag,
  User,
  Calendar
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'exercise';
  category: string;
  duration?: number;
  rating: number;
  author: string;
  thumbnail: string;
  tags: string[];
  isFavorite: boolean;
  publishedDate: string;
}

// Mock auth hook for demo
const useAuth = () => ({ user: { name: 'Demo User' } });

export default function ContentLibrary() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '3', '6']));

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Comprehensive Guide',
      description: 'Learn about the science behind anxiety and practical strategies for managing anxious thoughts and feelings in your daily life.',
      type: 'article',
      category: 'anxiety',
      duration: 8,
      rating: 4.8,
      author: 'Dr. Sarah Mitchell',
      thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['anxiety', 'coping', 'mental health'],
      isFavorite: true,
      publishedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Mindful Breathing for Stress Relief',
      description: 'A guided video session teaching effective breathing techniques to reduce stress and promote relaxation throughout your day.',
      type: 'video',
      category: 'mindfulness',
      duration: 12,
      rating: 4.9,
      author: 'Mark Thompson',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['breathing', 'stress relief', 'mindfulness'],
      isFavorite: false,
      publishedDate: '2024-01-20'
    },
    {
      id: '3',
      title: 'Sleep Meditation for Better Rest',
      description: 'Calming audio meditation designed to help you fall asleep faster and improve sleep quality with guided relaxation.',
      type: 'audio',
      category: 'sleep',
      duration: 25,
      rating: 4.7,
      author: 'Luna Williams',
      thumbnail: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['sleep', 'meditation', 'relaxation'],
      isFavorite: true,
      publishedDate: '2024-01-18'
    },
    {
      id: '4',
      title: 'Building Self-Esteem Through Daily Practices',
      description: 'Practical exercises and techniques to boost confidence and develop a healthier relationship with yourself and others.',
      type: 'exercise',
      category: 'self-esteem',
      duration: 15,
      rating: 4.6,
      author: 'Dr. James Rodriguez',
      thumbnail: 'https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['self-esteem', 'confidence', 'personal growth'],
      isFavorite: false,
      publishedDate: '2024-01-22'
    },
    {
      id: '5',
      title: 'Managing Depression: Hope and Healing',
      description: 'Understanding depression and evidence-based strategies for recovery and maintaining mental wellness in your journey.',
      type: 'article',
      category: 'depression',
      duration: 12,
      rating: 4.9,
      author: 'Dr. Emily Chen',
      thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['depression', 'recovery', 'therapy'],
      isFavorite: false,
      publishedDate: '2024-01-25'
    },
    {
      id: '6',
      title: 'Progressive Muscle Relaxation',
      description: 'Learn this powerful technique to release physical tension and achieve deep relaxation through systematic muscle groups.',
      type: 'video',
      category: 'relaxation',
      duration: 18,
      rating: 4.8,
      author: 'Rachel Green',
      thumbnail: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['relaxation', 'muscle tension', 'stress'],
      isFavorite: true,
      publishedDate: '2024-01-28'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'depression', label: 'Depression' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'self-esteem', label: 'Self-Esteem' },
    { value: 'relaxation', label: 'Relaxation' }
  ];

  const contentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'exercise', label: 'Exercises' }
  ];

  // Memoized filtered content for better performance
  const filteredContent = useMemo(() => {
    return contentItems.map(item => ({
      ...item,
      isFavorite: favorites.has(item.id)
    })).filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesType = selectedType === 'all' || item.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'exercise': return Heart;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'audio': return 'bg-purple-100 text-purple-700';
      case 'exercise': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActionText = (type: string) => {
    switch (type) {
      case 'article': return 'Read Article';
      case 'video': return 'Watch Video';
      case 'audio': return 'Listen Now';
      case 'exercise': return 'Start Exercise';
      default: return 'View Content';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please sign in to access the content library</h2>
          <p className="text-gray-600">You need to be authenticated to view this content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Content Library</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our curated collection of articles, videos, and exercises designed to support your mental wellness journey.
          </p>
        </header>

        {/* Search and Filters */}
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg mb-8" aria-label="Search and filter content">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search content</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search articles, videos, exercises..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-56">
              <label htmlFor="category" className="sr-only">Select category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="lg:w-48">
              <label htmlFor="type" className="sr-only">Select content type</label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {contentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredContent.length === contentItems.length 
              ? `Showing all ${contentItems.length} items`
              : `Showing ${filteredContent.length} of ${contentItems.length} items`
            }
          </div>
        </section>

        {/* Content Grid */}
        <main>
          {filteredContent.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <Library className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No content found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for. We're constantly adding new content to help you on your wellness journey.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContent.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type);
                
                return (
                  <article
                    key={item.id}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease forwards'
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={`Thumbnail for ${item.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Play button for videos/audio */}
                      {(item.type === 'video' || item.type === 'audio') && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Play className="h-7 w-7 text-gray-700 ml-1" />
                          </div>
                        </div>
                      )}

                      {/* Type badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getTypeColor(item.type)} shadow-sm`}>
                          <TypeIcon className="h-4 w-4 mr-1.5" />
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </div>
                      </div>

                      {/* Favorite button */}
                      <button 
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute top-4 right-4 p-2.5 bg-white/95 rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                        aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`h-5 w-5 transition-colors duration-200 ${
                          item.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-400'
                        }`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          {item.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{item.duration} min</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-amber-400 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Author and date */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>By {item.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(item.publishedDate)}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                          {getActionText(item.type)}
                        </button>
                        
                        <div className="flex space-x-2">
                          <button 
                            className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                            aria-label="Download content"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                          <button 
                            className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                            aria-label="Share content"
                          >
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>

        {/* Featured Section */}
        <section className="mt-16 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured This Week</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Understanding Anxiety featured content"
                className="w-20 h-20 rounded-xl object-cover shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Understanding Anxiety</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">A comprehensive guide to managing anxiety in daily life with practical strategies.</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-3 w-3" />
                    <span>Article</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <img
                src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Mindful Breathing featured content"
                className="w-20 h-20 rounded-xl object-cover shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Mindful Breathing</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">Guided breathing exercises for stress relief and deep relaxation techniques.</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Video className="h-3 w-3" />
                    <span>Video</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>12 min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
