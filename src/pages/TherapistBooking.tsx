import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Star,
  MapPin,
  Phone,
  Video,
  MessageCircle,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';

interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  avatar: string;
  bio: string;
  experience: number;
  sessionTypes: ('video' | 'phone' | 'in-person')[];
  hourlyRate: number;
  location?: string;
  availability: {
    [key: string]: string[]; // day: available times
  };
}

interface Appointment {
  id: string;
  therapistId: string;
  date: Date;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const TherapistBooking: React.FC = () => {
  const { user } = useAuth();
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!user) {
    return <Navigate to="/auth\" replace />;
  }

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Mitchell',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'CBT', 'Trauma'],
      rating: 4.9,
      reviewCount: 127,
      avatar: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Dr. Mitchell specializes in cognitive behavioral therapy and has over 10 years of experience helping clients overcome anxiety and depression.',
      experience: 10,
      sessionTypes: ['video', 'phone', 'in-person'],
      hourlyRate: 120,
      location: 'San Francisco, CA',
      availability: {
        'Monday': ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
        'Tuesday': ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'],
        'Wednesday': ['10:00 AM', '2:00 PM', '3:00 PM'],
        'Thursday': ['9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'],
        'Friday': ['9:00 AM', '11:00 AM', '3:00 PM']
      }
    },
    {
      id: '2',
      name: 'Dr. Marcus Thompson',
      title: 'Licensed Marriage & Family Therapist',
      specialties: ['Relationships', 'Family Therapy', 'Communication', 'Stress'],
      rating: 4.8,
      reviewCount: 89,
      avatar: 'https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Dr. Thompson focuses on helping individuals and couples build stronger relationships and improve communication patterns.',
      experience: 8,
      sessionTypes: ['video', 'phone'],
      hourlyRate: 110,
      availability: {
        'Monday': ['10:00 AM', '2:00 PM', '4:00 PM'],
        'Tuesday': ['9:00 AM', '1:00 PM', '3:00 PM'],
        'Wednesday': ['11:00 AM', '2:00 PM', '5:00 PM'],
        'Thursday': ['9:00 AM', '12:00 PM', '3:00 PM'],
        'Friday': ['10:00 AM', '1:00 PM', '4:00 PM']
      }
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      title: 'Licensed Clinical Social Worker',
      specialties: ['Trauma', 'PTSD', 'Mindfulness', 'Self-Esteem'],
      rating: 4.9,
      reviewCount: 156,
      avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Dr. Rodriguez specializes in trauma-informed care and uses mindfulness-based approaches to help clients heal and grow.',
      experience: 12,
      sessionTypes: ['video', 'in-person'],
      hourlyRate: 130,
      location: 'Los Angeles, CA',
      availability: {
        'Monday': ['9:00 AM', '11:00 AM', '3:00 PM'],
        'Tuesday': ['10:00 AM', '2:00 PM', '4:00 PM'],
        'Wednesday': ['9:00 AM', '1:00 PM', '3:00 PM'],
        'Thursday': ['11:00 AM', '2:00 PM', '5:00 PM'],
        'Friday': ['9:00 AM', '12:00 PM', '2:00 PM']
      }
    }
  ];

  const appointments: Appointment[] = [
    {
      id: '1',
      therapistId: '1',
      date: addDays(new Date(), 2),
      time: '2:00 PM',
      type: 'video',
      status: 'upcoming'
    },
    {
      id: '2',
      therapistId: '2',
      date: addDays(new Date(), -3),
      time: '10:00 AM',
      type: 'video',
      status: 'completed'
    }
  ];

  const specialties = ['all', 'Anxiety', 'Depression', 'Trauma', 'Relationships', 'CBT', 'Mindfulness'];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'all' || therapist.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const handleBookAppointment = () => {
    if (!selectedTherapist || !selectedDate || !selectedTime) return;
    
    // Here you would typically send to backend
    console.log('Booking appointment:', {
      therapist: selectedTherapist.id,
      date: selectedDate,
      time: selectedTime,
      type: selectedType
    });
    
    setShowBookingModal(false);
    setSelectedTherapist(null);
    setSelectedDate(new Date());
    setSelectedTime('');
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'in-person': return MapPin;
      default: return Video;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Therapist</h1>
          <p className="text-gray-600">
            Connect with licensed mental health professionals for personalized support.
          </p>
        </div>

        {/* Upcoming Appointments */}
        {appointments.filter(apt => apt.status === 'upcoming').length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {appointments.filter(apt => apt.status === 'upcoming').map(appointment => {
                const therapist = therapists.find(t => t.id === appointment.therapistId);
                const TypeIcon = getSessionTypeIcon(appointment.type);
                
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <div className="flex items-center space-x-4">
                      <img
                        src={therapist?.avatar}
                        alt={therapist?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{therapist?.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(appointment.date, 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TypeIcon className="h-4 w-4" />
                            <span className="capitalize">{appointment.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">
                        Join Session
                      </button>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        Reschedule
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Search by name or specialty..."
                />
              </div>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Therapists Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist, index) => (
            <div
              key={therapist.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Therapist Header */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={therapist.avatar}
                  alt={therapist.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{therapist.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{therapist.title}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{therapist.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({therapist.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{therapist.bio}</p>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {therapist.specialties.map(specialty => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Session Types */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Available Sessions</h4>
                <div className="flex space-x-3">
                  {therapist.sessionTypes.map(type => {
                    const Icon = getSessionTypeIcon(type);
                    return (
                      <div key={type} className="flex items-center space-x-1 text-sm text-gray-600">
                        <Icon className="h-4 w-4" />
                        <span className="capitalize">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <span>{therapist.experience} years exp.</span>
                  {therapist.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{therapist.location}</span>
                    </div>
                  )}
                </div>
                <span className="font-medium text-gray-900">${therapist.hourlyRate}/hour</span>
              </div>

              {/* Book Button */}
              <button
                onClick={() => {
                  setSelectedTherapist(therapist);
                  setShowBookingModal(true);
                }}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedTherapist && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedTherapist.avatar}
                      alt={selectedTherapist.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedTherapist.name}</h2>
                      <p className="text-gray-600">{selectedTherapist.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Session Type Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Session Type</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedTherapist.sessionTypes.map(type => {
                      const Icon = getSessionTypeIcon(type);
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                            selectedType === type
                              ? 'border-primary-300 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                          <span className="text-sm font-medium capitalize">{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calendar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Select Date & Time</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map(day => {
                      const dayName = format(day, 'EEEE');
                      const availableTimes = selectedTherapist.availability[dayName] || [];
                      const isSelected = isSameDay(day, selectedDate);
                      
                      return (
                        <div key={day.toISOString()} className="text-center">
                          <div className="text-sm font-medium text-gray-900 mb-2">
                            {format(day, 'EEE')}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            {format(day, 'MMM dd')}
                          </div>
                          <div className="space-y-1">
                            {availableTimes.map(time => (
                              <button
                                key={time}
                                onClick={() => {
                                  setSelectedDate(day);
                                  setSelectedTime(time);
                                }}
                                className={`w-full text-xs py-2 px-1 rounded transition-all duration-200 ${
                                  isSelected && selectedTime === time
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Booking Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>Date: {format(selectedDate, 'EEEE, MMMM dd, yyyy')}</div>
                      <div>Time: {selectedTime}</div>
                      <div>Session Type: {selectedType}</div>
                      <div>Duration: 50 minutes</div>
                      <div className="font-medium text-gray-900">Total: ${selectedTherapist.hourlyRate}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTime}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};