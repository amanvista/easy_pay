import { useNavigate } from 'react-router-dom';
import { Package, CreditCard, History, ArrowLeft } from 'lucide-react';

/**
 * TestPage - Demo page to test various features
 */
const TestPage = () => {
  const navigate = useNavigate();

  const testFeatures = [
    {
      title: 'Order History',
      description: 'View past orders with filtering and sorting',
      icon: History,
      path: '/order-history',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Payment Success',
      description: 'Test successful payment screen',
      icon: CreditCard,
      path: '/payment-test',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Order Tracking',
      description: 'Live order tracking with timeline',
      icon: Package,
      path: '/order-tracking',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              BlinkFeast Test Features
            </h1>
            <p className="text-gray-600 text-sm">
              Test various features and components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={feature.path}
                  onClick={() => navigate(feature.path)}
                  className={`p-6 rounded-xl text-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform ${feature.color}`}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;