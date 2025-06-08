import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  Tag
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'exercise';
  category: string;
  duration?: number; // in minutes
  rating: number;
  author: string;
  thumbnail: string;
  tags: string[];
  isFavorite: boolean;
  publishedDate: string;
}

export const ContentLibrary: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Comprehensive Guide',
      description: 'Learn about the science behind anxiety and practical strategies for managing anxious thoughts and feelings.',
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
      description: 'A guided video session teaching effective breathing techniques to reduce stress and promote relaxation.',
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
      description: 'Calming audio meditation designed to help you fall asleep faster and improve sleep quality.',
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
      description: 'Practical exercises and techniques to boost confidence and develop a healthier relationship with yourself.',
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
      description: 'Understanding depression and evidence-based strategies for recovery and maintaining mental wellness.',
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
      description: 'Learn this powerful technique to release physical tension and achieve deep relaxation.',
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

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
          <p className="text-gray-600">
            Explore our curated collection of articles, videos, and exercises for mental wellness.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Search articles, videos, exercises..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {contentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <Library className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              
              return (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Play button for videos/audio */}
                    {(item.type === 'video' || item.type === 'audio') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Play className="h-6 w-6 text-gray-700 ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Type badge */}
                    <div className="absolute top-3 left-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {item.type}
                      </div>
                    </div>

                    {/* Favorite button */}
                    <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200">
                      <Heart className={`h-4 w-4 ${item.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-200 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>

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
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Author */}
                    <p className="text-sm text-gray-600 mb-4">By {item.author}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 mr-2">
                        {item.type === 'article' ? 'Read Article' : 
                         item.type === 'video' ? 'Watch Video' :
                         item.type === 'audio' ? 'Listen Now' : 'Start Exercise'}
                      </button>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured This Week</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex space-x-4">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Featured content"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Understanding Anxiety</h3>
                <p className="text-sm text-gray-600 mb-2">A comprehensive guide to managing anxiety in daily life.</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <BookOpen className="h-3 w-3" />
                  <span>Article</span>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <img
                src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Featured content"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Mindful Breathing</h3>
                <p className="text-sm text-gray-600 mb-2">Guided breathing exercises for stress relief and relaxation.</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Video className="h-3 w-3" />
                  <span>Video</span>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>12 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};