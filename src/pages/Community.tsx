import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Search,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Clock,
  TrendingUp,
  Filter,
  Flag,
  User,
  ThumbsUp,
  Reply
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format, subDays, subHours } from 'date-fns';

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  title: string;
  content: string;
  category: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

export const Community: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=100',
        isVerified: true
      },
      title: 'How I overcame my morning anxiety',
      content: 'I wanted to share my journey with morning anxiety and the techniques that have helped me start my days more peacefully. For months, I would wake up with this overwhelming sense of dread...',
      category: 'anxiety',
      timestamp: subHours(new Date(), 2),
      likes: 24,
      comments: 8,
      isLiked: false,
      tags: ['anxiety', 'morning routine', 'coping strategies']
    },
    {
      id: '2',
      author: {
        name: 'Marcus Johnson',
        avatar: 'https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      title: 'Meditation changed my life - 30 day challenge results',
      content: 'Just completed a 30-day meditation challenge and wanted to share the incredible changes I\'ve experienced. When I started, I could barely sit still for 2 minutes...',
      category: 'mindfulness',
      timestamp: subHours(new Date(), 5),
      likes: 42,
      comments: 15,
      isLiked: true,
      tags: ['meditation', 'mindfulness', 'challenge']
    },
    {
      id: '3',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      title: 'Support needed: Dealing with work stress',
      content: 'Hi everyone, I\'m going through a particularly stressful period at work and could use some advice. The workload has increased significantly and I\'m struggling to maintain balance...',
      category: 'support',
      timestamp: subHours(new Date(), 8),
      likes: 18,
      comments: 12,
      isLiked: false,
      tags: ['work stress', 'support', 'balance']
    },
    {
      id: '4',
      author: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      title: 'Weekly check-in: How is everyone doing?',
      content: 'It\'s been a week since our last community check-in. I thought it would be nice to see how everyone is feeling and what victories, big or small, we\'ve had this week...',
      category: 'general',
      timestamp: subDays(new Date(), 1),
      likes: 35,
      comments: 23,
      isLiked: true,
      tags: ['check-in', 'community', 'support']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Posts', count: posts.length },
    { value: 'general', label: 'General', count: posts.filter(p => p.category === 'general').length },
    { value: 'anxiety', label: 'Anxiety', count: posts.filter(p => p.category === 'anxiety').length },
    { value: 'depression', label: 'Depression', count: posts.filter(p => p.category === 'depression').length },
    { value: 'mindfulness', label: 'Mindfulness', count: posts.filter(p => p.category === 'mindfulness').length },
    { value: 'support', label: 'Support', count: posts.filter(p => p.category === 'support').length }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes + b.comments) - (a.likes + a.comments);
      case 'recent':
      default:
        return b.timestamp.getTime() - a.timestamp.getTime();
    }
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    // Here you would typically send to backend
    console.log('Creating post:', newPost);
    setNewPost({ title: '', content: '', category: 'general' });
    setShowNewPostModal(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anxiety': return 'bg-red-100 text-red-700';
      case 'depression': return 'bg-blue-100 text-blue-700';
      case 'mindfulness': return 'bg-green-100 text-green-700';
      case 'support': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
            <p className="text-gray-600">
              Connect, share, and support each other on your mental wellness journey.
            </p>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.label}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <Heart className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Be kind and supportive to all members</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Respect privacy and confidentiality</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Flag className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Report inappropriate content</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MessageCircle className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Share experiences, not medical advice</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Search posts..."
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {sortedPosts.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Try adjusting your search terms.' : 'Be the first to start a conversation!'}
                  </p>
                </div>
              ) : (
                sortedPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                            {post.author.isVerified && (
                              <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{format(post.timestamp, 'MMM dd, yyyy • h:mm a')}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-6">
                        <button className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${
                          post.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                        }`}>
                          <ThumbsUp className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
                        View Discussion
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
                  <button
                    onClick={() => setShowNewPostModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="general">General</option>
                    <option value="anxiety">Anxiety</option>
                    <option value="depression">Depression</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="support">Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={6}
                    placeholder="Share your thoughts, experiences, or ask for support..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};