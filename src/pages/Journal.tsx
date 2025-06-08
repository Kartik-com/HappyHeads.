import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Calendar,
  Heart,
  Smile,
  Edit,
  Trash2,
  Save,
  X,
  Filter,
  Tag
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format, subDays } from 'date-fns';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: number;
  tags: string[];
}

export const Journal: React.FC = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'A Productive Monday',
      content: 'Today was surprisingly productive. I managed to complete all my work tasks and even had time for a 30-minute walk. The fresh air really helped clear my mind and I feel more energized than I have in weeks. I think establishing a morning routine is really starting to pay off.',
      date: new Date(),
      mood: 4,
      tags: ['productivity', 'wellness', 'exercise']
    },
    {
      id: '2',
      title: 'Weekend Reflections',
      content: 'Spent the weekend with family and friends. It was wonderful to disconnect from work and just enjoy being present. We had a barbecue in the backyard and played some board games. Simple moments like these remind me what really matters in life.',
      date: subDays(new Date(), 2),
      mood: 5,
      tags: ['family', 'gratitude', 'relaxation']
    },
    {
      id: '3',  
      title: 'Challenging Day at Work',
      content: 'Work was particularly stressful today. Had to deal with a difficult client and felt overwhelmed by my workload. However, I practiced some breathing exercises during my lunch break which helped me regain my composure. I\'m learning that it\'s okay to have tough days.',
      date: subDays(new Date(), 4),
      mood: 2,
      tags: ['work', 'stress', 'mindfulness']
    }
  ]);

  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: undefined as number | undefined,
    tags: [] as string[]
  });

  if (!user) {
    return <Navigate to="/auth\" replace />;
  }

  const moodEmojis = {
    1: '😢',
    2: '😕',
    3: '😐',
    4: '😊',
    5: '😄'
  };

  const allTags = Array.from(new Set(entries.flatMap(entry => entry.tags)));

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || entry.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: editingId || Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date(),
      mood: newEntry.mood,
      tags: newEntry.tags
    };

    if (editingId) {
      setEntries(prev => prev.map(e => e.id === editingId ? entry : e));
      setEditingId(null);
    } else {
      setEntries(prev => [entry, ...prev]);
    }

    setNewEntry({ title: '', content: '', mood: undefined, tags: [] });
    setIsWriting(false);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setNewEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags
    });
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleAddTag = (tag: string) => {
    if (tag && !newEntry.tags.includes(tag)) {
      setNewEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Journal</h1>
            <p className="text-gray-600">
              Reflect on your thoughts, track your growth, and document your journey.
            </p>
          </div>
          <button
            onClick={() => setIsWriting(true)}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>New Entry</span>
          </button>
        </div>

        {/* Writing Interface */}
        {isWriting && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Edit className="h-6 w-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId ? 'Edit Entry' : 'New Journal Entry'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsWriting(false);
                  setEditingId(null);
                  setNewEntry({ title: '', content: '', mood: undefined, tags: [] });
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Title
                </label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Give your entry a title..."
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Thoughts
                </label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={8}
                  placeholder="What's on your mind today? Write about your experiences, feelings, or reflections..."
                />
              </div>

              {/* Mood Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling? (Optional)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(mood => (
                    <button
                      key={mood}
                      onClick={() => setNewEntry(prev => ({ 
                        ...prev, 
                        mood: prev.mood === mood ? undefined : mood 
                      }))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        newEntry.mood === mood
                          ? 'border-primary-300 bg-primary-50 scale-110'
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {newEntry.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-primary-500 hover:text-primary-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Add a tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const target = e.target as HTMLInputElement;
                        handleAddTag(target.value.trim());
                        target.value = '';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setIsWriting(false);
                    setEditingId(null);
                    setNewEntry({ title: '', content: '', mood: undefined, tags: [] });
                  }}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEntry}
                  disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingId ? 'Update Entry' : 'Save Entry'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Search your entries..."
                />
              </div>
            </div>

            {/* Tag Filter */}
            <div className="sm:w-48">
              <select
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedTag ? 'No entries found' : 'No journal entries yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedTag 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start documenting your thoughts and experiences today.'
                }
              </p>
              {!searchTerm && !selectedTag && (
                <button
                  onClick={() => setIsWriting(true)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  <span>Write Your First Entry</span>
                </button>
              )}
            </div>
          ) : (
            filteredEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                      {entry.mood && (
                        <span className="text-2xl">
                          {moodEmojis[entry.mood as keyof typeof moodEmojis]}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(entry.date, 'MMM dd, yyyy • h:mm a')}</span>
                      </div>
                      {entry.mood && (
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>Mood: {entry.mood}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditEntry(entry)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {entry.content}
                </p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs cursor-pointer hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                        onClick={() => setSelectedTag(tag)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};