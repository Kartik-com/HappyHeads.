import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Heart, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2,
  VolumeX,
  Timer,
  Waves,
  Brain,
  Leaf,
  Sun,
  Moon,
  Cloud,
  Mountain
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'breathing' | 'meditation' | 'sleep' | 'focus' | 'anxiety';
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
}

export const Mindfulness: React.FC = () => {
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!user) {
    return <Navigate to="/auth\" replace />;
  }

  const sessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Deep Breathing Exercise',
      description: 'Simple breathing technique to reduce stress and anxiety',
      duration: 5,
      category: 'breathing',
      icon: Waves,
      color: 'text-blue-600',
      bgGradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      title: 'Morning Meditation',
      description: 'Start your day with mindful awareness and positive intention',
      duration: 10,
      category: 'meditation',
      icon: Sun,
      color: 'text-yellow-600',
      bgGradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: '3',
      title: 'Sleep Preparation',
      description: 'Gentle meditation to prepare your mind and body for rest',
      duration: 15,
      category: 'sleep',
      icon: Moon,
      color: 'text-purple-600',
      bgGradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: '4',
      title: 'Focus Enhancement',
      description: 'Improve concentration and mental clarity for work or study',
      duration: 12,
      category: 'focus',
      icon: Brain,
      color: 'text-emerald-600',
      bgGradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: '5',
      title: 'Anxiety Relief',
      description: 'Calming techniques to manage worry and overwhelm',
      duration: 8,
      category: 'anxiety',
      icon: Cloud,
      color: 'text-gray-600',
      bgGradient: 'from-gray-500 to-slate-500'
    },
    {
      id: '6',
      title: 'Nature Connection',
      description: 'Connect with the healing power of nature through visualization',
      duration: 20,
      category: 'meditation',
      icon: Leaf,
      color: 'text-green-600',
      bgGradient: 'from-green-500 to-emerald-500'
    },
    {
      id: '7',
      title: 'Mountain Visualization',
      description: 'Find strength and stability through mountain meditation',
      duration: 15,
      category: 'meditation',
      icon: Mountain,
      color: 'text-stone-600',
      bgGradient: 'from-stone-500 to-gray-500'
    },
    {
      id: '8',
      title: '4-7-8 Breathing',
      description: 'Powerful breathing pattern for instant relaxation',
      duration: 3,
      category: 'breathing',
      icon: Waves,
      color: 'text-cyan-600',
      bgGradient: 'from-cyan-500 to-blue-500'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Sessions', count: sessions.length },
    { value: 'breathing', label: 'Breathing', count: sessions.filter(s => s.category === 'breathing').length },
    { value: 'meditation', label: 'Meditation', count: sessions.filter(s => s.category === 'meditation').length },
    { value: 'sleep', label: 'Sleep', count: sessions.filter(s => s.category === 'sleep').length },
    { value: 'focus', label: 'Focus', count: sessions.filter(s => s.category === 'focus').length },
    { value: 'anxiety', label: 'Anxiety Relief', count: sessions.filter(s => s.category === 'anxiety').length }
  ];

  const filteredSessions = selectedCategory === 'all' 
    ? sessions 
    : sessions.filter(session => session.category === selectedCategory);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedSession && currentTime < selectedSession.duration * 60) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else if (currentTime >= (selectedSession?.duration ?? 0) * 60) {
      setIsPlaying(false);
      // Session completed
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, selectedSession]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetSession = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleSessionSelect = (session: MeditationSession) => {
    setSelectedSession(session);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const progress = selectedSession ? (currentTime / (selectedSession.duration * 60)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mindfulness & Meditation</h1>
          <p className="text-gray-600">
            Find peace, reduce stress, and cultivate mindfulness through guided exercises.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Session Player */}
          <div className="lg:col-span-1">
            {selectedSession ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
                <div className={`w-full h-48 bg-gradient-to-br ${selectedSession.bgGradient} rounded-xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <selectedSession.icon className="h-16 w-16 text-white z-10" />
                  
                  {/* Animated circles for playing state */}
                  {isPlaying && (
                    <>
                      <div className="absolute inset-0 rounded-xl border-4 border-white/30 animate-pulse-soft"></div>
                      <div className="absolute inset-4 rounded-lg border-2 border-white/20 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
                    </>
                  )}
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedSession.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedSession.description}
                  </p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(selectedSession.duration * 60)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${selectedSession.bgGradient} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={resetSession}
                    className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`p-4 bg-gradient-to-r ${selectedSession.bgGradient} text-white rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 ml-1" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Session completion */}
                {currentTime >= selectedSession.duration * 60 && (
                  <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg text-center">
                    <div className="text-success-600 mb-2">
                      <Heart className="h-6 w-6 mx-auto" />
                    </div>
                    <p className="text-success-800 font-medium">Session Complete!</p>
                    <p className="text-success-700 text-sm">
                      Great job taking time for your mental wellness.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Choose a Session
                </h3>
                <p className="text-gray-600">
                  Select a mindfulness exercise from the collection to begin.
                </p>
              </div>
            )}

            {/* Today's Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Minutes Practiced</span>
                  <span className="text-lg font-bold text-primary-600">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sessions Completed</span>
                  <span className="text-lg font-bold text-secondary-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="text-lg font-bold text-accent-600">7 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Library */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-primary-100 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredSessions.map((session, index) => {
                const Icon = session.icon;
                const isActive = selectedSession?.id === session.id;
                
                return (
                  <div
                    key={session.id}
                    onClick={() => handleSessionSelect(session)}
                    className={`group cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up ${
                      isActive ? 'ring-2 ring-primary-300 bg-primary-50/50' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 bg-gradient-to-r ${session.bgGradient} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-200">
                          {session.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {session.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Timer className="h-4 w-4" />
                            <span className="text-sm">{session.duration} min</span>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            session.category === 'breathing' ? 'bg-blue-100 text-blue-700' :
                            session.category === 'meditation' ? 'bg-green-100 text-green-700' :
                            session.category === 'sleep' ? 'bg-purple-100 text-purple-700' :
                            session.category === 'focus' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {session.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="mt-4 flex items-center justify-center">
                        <div className="flex items-center space-x-2 text-primary-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Currently Selected</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tips Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Mindfulness Tips
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Start Small</h4>
                  <p className="text-sm text-gray-600">
                    Begin with just 3-5 minutes daily and gradually increase duration.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Be Consistent</h4>
                  <p className="text-sm text-gray-600">
                    Regular practice is more beneficial than occasional long sessions.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-accent-50 to-success-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Find Quiet Space</h4>
                  <p className="text-sm text-gray-600">
                    Choose a peaceful environment where you won't be interrupted.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-success-50 to-primary-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Be Patient</h4>
                  <p className="text-sm text-gray-600">
                    Don't judge your practice. Every session is valuable progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};