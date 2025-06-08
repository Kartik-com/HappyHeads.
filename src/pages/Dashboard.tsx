import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const quickActions = [
    {
      title: 'Track Your Mood',
      description: 'Log how you\'re feeling today',
      icon: Smile,
      color: 'from-blue-500 to-cyan-500',
      link: '/mood-tracker'
    },
    {
      title: 'Write in Journal',
      description: 'Reflect on your thoughts',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-500',
      link: '/journal'
    },
    {
      title: 'Practice Mindfulness',
      description: 'Start a guided meditation',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      link: '/mindfulness'
    },
    {
      title: 'Connect with Community',
      description: 'Join discussions and share',
      icon: Users,
      color: 'from-purple-500 to-violet-500',
      link: '/community'
    }
  ];

  const stats = [
    {
      label: 'Days Active',
      value: '14',
      change: '+3 this week',
      icon: Calendar,
      color: 'text-primary-600'
    },
    {
      label: 'Mood Entries',
      value: '28',
      change: '+5 this week',
      icon: BarChart3,
      color: 'text-success-600'
    },
    {
      label: 'Journal Entries',
      value: '12',
      change: '+2 this week',
      icon: BookOpen,
      color: 'text-secondary-600'
    },
    {
      label: 'Minutes Meditated',
      value: '180',
      change: '+45 this week',
      icon: Heart,
      color: 'text-accent-600'
    }
  ];

  const recentActivities = [
    {
      type: 'mood',
      message: 'You logged a Happy mood',
      time: '2 hours ago',
      icon: Smile,
      color: 'bg-success-100 text-success-600'
    },
    {
      type: 'journal',
      message: 'New journal entry added',
      time: '1 day ago',
      icon: BookOpen,
      color: 'bg-primary-100 text-primary-600'
    },
    {
      type: 'meditation',
      message: 'Completed 10-minute meditation',
      time: '2 days ago',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600'
    },
    {
      type: 'community',
      message: 'Replied to community post',
      time: '3 days ago',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const todayGoals = [
    { task: 'Log mood 3 times', completed: 2, total: 3 },
    { task: 'Write journal entry', completed: 0, total: 1 },
    { task: '10 minutes meditation', completed: 1, total: 1 },
    { task: 'Read wellness article', completed: 0, total: 1 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's how your wellness journey is progressing today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-success-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.link}
                      className="group p-4 rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Today's Goals */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Goals</h2>
                <Target className="h-5 w-5 text-primary-500" />
              </div>
              <div className="space-y-4">
                {todayGoals.map((goal, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {goal.task}
                        </span>
                        <span className="text-sm text-gray-600">
                          {goal.completed}/{goal.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(goal.completed / goal.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    {goal.completed === goal.total && (
                      <Award className="h-5 w-5 text-success-500 ml-3" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mood Trend Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Mood Trend</h2>
                <Link 
                  to="/mood-tracker"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Details
                </Link>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-success-500" />
                <span className="text-sm text-success-600 font-medium">
                  Improving this week
                </span>
              </div>
              <div className="h-24 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg flex items-end justify-center space-x-1 p-4">
                {[40, 60, 45, 80, 70, 85, 90].map((height, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-primary-400 to-secondary-400 rounded-sm w-4"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};