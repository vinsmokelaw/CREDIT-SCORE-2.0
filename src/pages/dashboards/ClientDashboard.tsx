import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  BookOpen, 
  Calculator, 
  Bell,
  CreditCard,
  Target,
  Award,
  ChevronRight
} from 'lucide-react';

export function ClientDashboard() {
  const [creditScore] = useState(720);
  const [scoreChange] = useState(15);
  const [notifications] = useState([
    { id: 1, type: 'positive', message: 'Your credit score increased by 15 points this month!', time: '2 hours ago' },
    { id: 2, type: 'reminder', message: 'Credit card payment due in 3 days', time: '1 day ago' },
    { id: 3, type: 'tip', message: 'Tip: Keep your credit utilization below 30%', time: '2 days ago' }
  ]);

  const creditFactors = [
    { name: 'Payment History', score: 85, impact: 'high', trend: 'up' },
    { name: 'Credit Utilization', score: 72, impact: 'high', trend: 'down' },
    { name: 'Credit History Length', score: 78, impact: 'medium', trend: 'stable' },
    { name: 'Credit Mix', score: 65, impact: 'low', trend: 'up' },
    { name: 'New Credit', score: 90, impact: 'low', trend: 'stable' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 750) return 'from-green-500 to-green-600';
    if (score >= 650) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Here's your credit health overview
          </p>
        </div>

        {/* Credit Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6 sm:p-8 bg-gradient-to-br from-white to-purple-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Credit Score</h2>
              <div className="flex items-center space-x-2">
                {scoreChange > 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : scoreChange < 0 ? (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                ) : null}
                <span className={`font-semibold ${scoreChange > 0 ? 'text-green-600' : scoreChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {scoreChange > 0 ? '+' : ''}{scoreChange} this month
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg className="w-32 h-32 sm:w-48 sm:h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(creditScore / 850) * 251.2} 251.2`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className="stop-color-purple-500" />
                      <stop offset="100%" className="stop-color-indigo-500" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-2xl sm:text-4xl font-bold ${getScoreColor(creditScore)}`}>
                      {creditScore}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">out of 850</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Poor</div>
                <div className="text-xs text-gray-500">300-579</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Good</div>
                <div className="text-xs text-gray-500">580-749</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Excellent</div>
                <div className="text-xs text-gray-500">750-850</div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between text-sm sm:text-base">
                <div className="flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  Credit Simulator
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between text-sm sm:text-base">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learning Center
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between text-sm sm:text-base">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Set Goals
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="outline" className="w-full justify-between text-sm sm:text-base">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Credit Report
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Credit Factors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Credit Score Factors</h3>
            <div className="space-y-4">
              {creditFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base font-medium text-gray-900">{factor.name}</span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">{factor.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          factor.score >= 80 ? 'from-green-500 to-green-600' :
                          factor.score >= 60 ? 'from-yellow-500 to-orange-500' :
                          'from-red-500 to-red-600'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {factor.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {factor.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                    {factor.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Activity</h3>
              <Bell className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'positive' ? 'bg-green-100' :
                    notification.type === 'reminder' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {notification.type === 'positive' && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {notification.type === 'reminder' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                    {notification.type === 'tip' && <BookOpen className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Educational Section */}
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold">Improve Your Score</h3>
              </div>
              <p className="text-purple-100 mb-6 text-base sm:text-lg">
                Get personalized tips and strategies to boost your credit score by up to 100 points.
              </p>
              <Button variant="secondary" size="lg">
                Start Learning
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="hidden md:block mt-6 md:mt-0">
              <div className="bg-white/10 rounded-2xl p-6">
                <TrendingUp className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}