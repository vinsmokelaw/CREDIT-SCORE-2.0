import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  FileText,
  Search,
  Filter,
  Download,
  Building,
  Shield,
  Target,
  DollarSign
} from 'lucide-react';

export function BankDashboard() {
  const [stats] = useState({
    totalClients: 2847,
    avgCreditScore: 685,
    approvalRate: 78.5,
    portfolioValue: 45600000
  });

  const [recentApplications] = useState([
    { id: 1, name: 'John Mukamuri', score: 720, amount: 50000, status: 'approved', risk: 'low' },
    { id: 2, name: 'Sarah Chikomo', score: 650, amount: 25000, status: 'pending', risk: 'medium' },
    { id: 3, name: 'David Moyo', score: 580, amount: 75000, status: 'declined', risk: 'high' },
    { id: 4, name: 'Grace Mpofu', score: 780, amount: 100000, status: 'approved', risk: 'low' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'declined': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Bank Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Comprehensive credit analytics and risk management
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50" hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalClients.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-white to-green-50" hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Credit Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.avgCreditScore}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8 points
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-3">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-white to-purple-50" hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Approval Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.approvalRate}%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +3.2%
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-white to-yellow-50" hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Portfolio Value</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ${(stats.portfolioValue / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15% growth
                </p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Applications */}
          <Card className="lg:col-span-2 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Applications</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Applicant</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Score</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Amount</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Risk</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((application) => (
                    <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-2 sm:px-4">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-white text-xs sm:text-sm font-semibold">
                              {application.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{application.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 sm:px-4">
                        <span className={`font-semibold ${
                          application.score >= 700 ? 'text-green-600' :
                          application.score >= 600 ? 'text-yellow-600' : 'text-red-600'
                        } text-sm sm:text-base`}>
                          {application.score}
                        </span>
                      </td>
                      <td className="py-4 px-2 sm:px-4 font-medium text-gray-900 text-sm sm:text-base">
                        ${application.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-2 sm:px-4">
                        <span className={`font-semibold text-sm sm:text-base ${getRiskColor(application.risk)}`}>
                          {application.risk.charAt(0).toUpperCase() + application.risk.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-2 sm:px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Risk Analysis */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Risk Distribution</h3>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm sm:text-base font-semibold text-green-800">Low Risk</p>
                  <p className="text-xs sm:text-sm text-green-600">1,847 clients</p>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">65%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm sm:text-base font-semibold text-yellow-800">Medium Risk</p>
                  <p className="text-xs sm:text-sm text-yellow-600">712 clients</p>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">25%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm sm:text-base font-semibold text-red-800">High Risk</p>
                  <p className="text-xs sm:text-sm text-red-600">288 clients</p>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-red-600">10%</div>
              </div>
            </div>

            <Button className="w-full mt-6" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
          </Card>
        </div>

        {/* Analytics Section */}
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold">Advanced Analytics</h3>
              </div>
              <p className="text-indigo-100 mb-6 text-base sm:text-lg">
                Access comprehensive reporting, predictive models, and risk assessment tools to optimize your lending decisions.
              </p>
              <Button variant="secondary" size="lg">
                Open Analytics Suite
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="hidden md:block mt-6 md:mt-0">
              <div className="bg-white/10 rounded-2xl p-6">
                <BarChart3 className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}