import React, { useState, useEffect, useMemo } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { 
  Heart, 
  BookOpen, 
  BarChart3, 
  Users, 
  Calendar,
  TrendingUp,
  Smile,
  Target,
  Clock,
  Award,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format, subDays, isToday, startOfDay } from 'date-fns';

interface MoodEntry {
  id: string;
  date: Date;
  mood: number;
  note: string;
  timestamp: Date;
}

interface Activity {
  id: string;
  type: 'mood' | 'journal' | 'meditation' | 'community';
  message: string;
  time: string;
  timestamp: Date;
  icon: React.ComponentType<any>;
  color: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Initialize with sample data and listen for changes
  useEffect(() => {
    // Sample mood entries
    const sampleMoodEntries: MoodEntry[] = [
      {
        id: '1',
        date: subDays(new Date(), 6),
        mood: 3,
        note: 'Starting the week feeling okay',
        timestamp: subDays(new Date(), 6)
      },
      {
        id: '2',
        date: subDays(new Date(), 5),
        mood: 4,
        note: 'Good productive day at work',
        timestamp: subDays(new Date(), 5)
      },
      {
        id: '3',
        date: subDays(new Date(), 4),
        mood: 2,
        note: 'Feeling stressed about deadlines',
        timestamp: subDays(new Date(), 4)
      },
      {
        id: '4',
        date: subDays(new Date(), 3),
        mood: 4,
        note: 'Great workout session, feeling energized',
        timestamp: subDays(new Date(), 3)
      },
      {
        id: '5',
        date: subDays(new Date(), 2),
        mood: 5,
        note: 'Excellent day! Completed all goals',
        timestamp: subDays(new Date(), 2)
      },
      {
        id: '6',
        date: subDays(new Date(), 1),
        mood: 3,
        note: 'Weekend relaxation, feeling balanced',
        timestamp: subDays(new Date(), 1)
      }
    ];

    setMoodEntries(sampleMoodEntries);

    // Sample activities
    const sampleActivities: Activity[] = [
      {
        id: '1',
        type: 'mood',
        message: 'You logged a Happy mood',
        time: '2 hours ago',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: Smile,
        color: 'bg-success-100 text-success-600'
      },
      {
        id: '2',
        type: 'journal',
        message: 'New journal entry added',
        time: '1 day ago',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        icon: BookOpen,
        color: 'bg-primary-100 text-primary-600'
      },
      {
        id: '3',
        type: 'meditation',
        message: 'Completed 10-minute meditation',
        time: '2 days ago',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        icon: Heart,
        color: 'bg-pink-100 text-pink-600'
      },
      {
        id: '4',
        type: 'community',
        message: 'Replied to community post',
        time: '3 days ago',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        icon: Users,
        color: 'bg-purple-100 text-purple-600'
      }
    ];

    setActivities(sampleActivities);

    // Listen for mood entries from localStorage or other components
    const handleStorageChange = () => {
      const stored = localStorage.getItem('moodEntries');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMoodEntries(parsed.map((entry: any) => ({
            ...entry,
            date: new Date(entry.date),
            timestamp: new Date(entry.timestamp)
          })));
        } catch (error) {
          console.error('Error parsing stored mood entries:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update localStorage when mood entries change
  useEffect(() => {
    if (moodEntries.length > 0) {
      localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
    }
  }, [moodEntries]);

  // Calculate statistics
  const stats = useMemo(() => {
    const thisWeek = moodEntries.filter(entry => 
      entry.date >= subDays(new Date(), 7)
    );
