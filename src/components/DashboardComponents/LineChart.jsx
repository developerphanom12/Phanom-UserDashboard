import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HiCalendar, HiChevronDown } from 'react-icons/hi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: true,
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          callback: function(value) {
            return value.toFixed(2);
          },
        },
        min: 29,
        max: 40,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hoverRadius: 4,
        hoverBorderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const data = {
    labels: [
      'Mar \'12', 'Apr \'12', 'May \'12', 'Jun \'12', 'Jul \'12', 'Aug \'12', 
      'Sep \'12', 'Oct \'12', 'Nov \'12', 'Dec \'12', '2013', 'Feb \'13'
    ],
    datasets: [
      {
        label: 'Overview',
        data: [
          33.5, 34.2, 33.8, 32.1, 31.5, 32.8, 33.9, 32.5, 33.2, 34.8, 
          37.2, 38.9
        ],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#3b82f6',
        pointHoverBorderColor: '#ffffff',
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
          <HiChevronDown className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <HiCalendar className="w-4 h-4" />
          <span>27-07-2025</span>
        </div>
      </div>
      <div className="h-80">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;
