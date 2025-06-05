import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { ChevronRight } from 'lucide-react';

// Mock activity data for chart
const activityData = [
  { name: 'Mon', minutes: 25 },
  { name: 'Tue', minutes: 15 },
  { name: 'Wed', minutes: 30 },
  { name: 'Thu', minutes: 22 },
  { name: 'Fri', minutes: 38 },
  { name: 'Sat', minutes: 15 },
  { name: 'Sun', minutes: 25 }
];

// Mock curriculum coverage data
const curriculumData = [
  { name: 'Numbers', value: 75 },
  { name: 'Shapes', value: 60 },
  { name: 'Measuring', value: 40 },
  { name: 'Other', value: 25 }
];

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    title: 'Addition to 10',
    score: '8/10',
    date: '2 hours ago'
  },
  {
    id: 2,
    title: 'Shapes Quiz',
    score: '5/5',
    date: 'Yesterday'
  },
  {
    id: 3,
    title: 'Counting Practice',
    score: '10/10',
    date: '3 days ago'
  }
];

// Mock areas for improvement
const areasForImprovement = [
  'Subtraction with borrowing',
  'Telling time',
  '3D shapes'
];

// Colors for pie chart
const COLORS = ['#1E88E5', '#FFD600', '#4CAF50', '#9C27B0'];

const ParentDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Child Progress Chart */}
        <div className="mm-dashboard-card">
          <h2 className="text-xl font-bold mb-4">Child Progress</h2>
          <div className="mm-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#1E88E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-2">Minutes spent learning per day</p>
        </div>
        
        {/* Curriculum Coverage */}
        <div className="mm-dashboard-card">
          <h2 className="text-xl font-bold mb-4">Curriculum Coverage</h2>
          <div className="mm-chart-container flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={curriculumData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {curriculumData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {curriculumData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="mm-dashboard-card">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <div className="divide-y">
            {recentActivities.map(activity => (
              <div key={activity.id} className="py-3 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">{activity.score}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center text-primary font-medium mt-4">
            View all activities
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Areas for Improvement */}
        <div className="mm-dashboard-card">
          <h2 className="text-xl font-bold mb-4">Areas for Improvement</h2>
          <ul className="space-y-3">
            {areasForImprovement.map((area, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <button className="flex items-center text-primary font-medium mt-4">
            View suggested activities
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;

