import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Smile, 
  Frown, 
  Meh, 
  Heart, 
  Zap,
  Calendar,
  TrendingUp,
  Plus,
  Save,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { format, subDays } from 'date-fns';

export const MoodTracker: React.FC = () => {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [viewPeriod, setViewPeriod] = useState<'7' | '30'>('7');

  if (!user) {
    return <Navigate to="/auth\" replace />;
  }

  const moodOptions = [
    { 
      value: 5, 
      label: 'Excellent', 
      emoji: '😄', 
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-100 hover:bg-green-200',
      textColor: 'text-green-700'
    },
    { 
      value: 4, 
      label: 'Good', 
      emoji: '😊', 
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-100 hover:bg-blue-200',
      textColor: 'text-blue-700'
    },
    { 
      value: 3, 
      label: 'Okay', 
      emoji: '😐', 
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-100 hover:bg-yellow-200',
      textColor: 'text-yellow-700'
    },
    { 
      value: 2, 
      label: 'Not Great', 
      emoji: '😕', 
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-100 hover:bg-orange-200',
      textColor: 'text-orange-700'
    },
    { 
      value: 1, 
      label: 'Difficult', 
      emoji: '😢', 
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-100 hover:bg-red-200',
      textColor: 'text-red-700'
    }
  ];

  // Mock data for mood trends
  const moodData7Days = [
    { date: format(subDays(new Date(), 6), 'MMM dd'), mood: 3, day: 'Mon' },
    { date: format(subDays(new Date(), 5), 'MMM dd'), mood: 4, day: 'Tue' },
    { date: format(subDays(new Date(), 4), 'MMM dd'), mood: 2, day: 'Wed' },
    { date: format(subDays(new Date(), 3), 'MMM dd'), mood: 4, day: 'Thu' },
    { date: format(subDays(new Date(), 2), 'MMM dd'), mood: 5, day: 'Fri' },
    { date: format(subDays(new Date(), 1), 'MMM dd'), mood: 3, day: 'Sat' },
    { date: format(new Date(), 'MMM dd'), mood: 4, day: 'Sun' }
  ];

  const moodData30Days = [
    { date: 'Week 1', mood: 3.2 },
    { date: 'Week 2', mood: 3.8 },
    { date: 'Week 3', mood: 2.9 },
    { date: 'Week 4', mood: 4.1 }
  ];

  const currentData = viewPeriod === '7' ? moodData7Days : moodData30Days;

  const handleSaveMood = () => {
    if (selectedMood) {
      // Here you would typically save to backend
      console.log('Saving mood:', selectedMood, moodNote);
      setSelectedMood(null);
      setMoodNote('');
      // Show success message
    }
  };

  const averageMood = currentData.reduce((sum, day) => sum + day.mood, 0) / currentData.length;
  const moodTrend = currentData[currentData.length - 1].mood > currentData[0].mood ? 'up' : 'down';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
          <p className="text-gray-600">
            Track your daily emotions and discover patterns in your mental wellness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Log Today's Mood */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="h-6 w-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-gray-900">How are you feeling?</h2>
              </div>

              <div className="space-y-4 mb-6">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedMood === mood.value
                        ? `border-primary-300 ${mood.bgColor} scale-105`
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{mood.emoji}</span>
                      <div>
                        <p className={`font-medium ${
                          selectedMood === mood.value ? mood.textColor : 'text-gray-700'
                        }`}>
                          {mood.label}
                        </p>
                        <p className="text-sm text-gray-500">Mood level: {mood.value}/5</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedMood && (
                <div className="space-y-4 animate-slide-up">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add a note (optional)
                    </label>
                    <textarea
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      rows={3}
                      placeholder="What's influencing your mood today?"
                    />
                  </div>
                  <button
                    onClick={handleSaveMood}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Mood Entry</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Mood</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      {averageMood.toFixed(1)}/5
                    </span>
                    <span className="text-xl">
                      {moodOptions.find(m => Math.round(averageMood) === m.value)?.emoji}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trend</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`h-4 w-4 ${
                      moodTrend === 'up' ? 'text-success-500 rotate-0' : 'text-error-500 rotate-180'
                    }`} />
                    <span className={`text-sm font-medium ${
                      moodTrend === 'up' ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {moodTrend === 'up' ? 'Improving' : 'Declining'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Entries This Week</span>
                  <span className="text-lg font-bold text-gray-900">7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mood Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-primary-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Mood Trends</h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewPeriod('7')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      viewPeriod === '7'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => setViewPeriod('30')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      viewPeriod === '30'
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    30 Days
                  </button>
                </div>
              </div>

              {/* Line Chart */}
              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey={viewPeriod === '7' ? 'day' : 'date'} 
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis 
                      domain={[1, 5]} 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => `${value}/5`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value}/5`, 'Mood']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="url(#moodGradient)" 
                      strokeWidth={3}
                      dot={{ fill: '#14b8a6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#0d9488' }}
                    />
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart for Weekly Overview */}
              {viewPeriod === '7' && (
                <div className="h-48">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Breakdown</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[1, 5]} stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        formatter={(value: number) => [`${value}/5`, 'Mood']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="mood" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Recent Entries */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
              <div className="space-y-4">
                {[
                  {
                    date: 'Today, 2:30 PM',
                    mood: 4,
                    note: 'Had a great morning workout and productive work session.',
                    emoji: '😊'
                  },
                  {
                    date: 'Yesterday, 6:45 PM',
                    mood: 3,
                    note: 'Feeling okay, had some stress at work but managed it well.',
                    emoji: '😐'
                  },
                  {
                    date: '2 days ago, 9:15 AM',
                    mood: 5,
                    note: 'Excellent day! Completed all my goals and felt very positive.',
                    emoji: '😄'
                  }
                ].map((entry, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{entry.emoji}</span>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              Mood: {entry.mood}/5
                            </span>
                            <span className="text-xs text-gray-500">{entry.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">{entry.note}</p>
                        </div>
                      </div>
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