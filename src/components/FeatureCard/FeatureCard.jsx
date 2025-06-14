const FeatureCard = ({ title, description, Icon }) => (
    <div className="backdrop-blur-sm bg-orange-100/60 border border-white/20 p-6 rounded-2xl shadow-xl transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="w-12 h-12 bg-orange-200 flex items-center justify-center rounded-full mb-4">
        <Icon className="text-orange-600 w-6 h-6" />
      </div>
      <h3 className="font-semibold text-xl text-gray-900">{title}</h3>
      <p className="text-sm text-gray-700 mt-3">{description}</p>
    </div>
  );
  
  export default FeatureCard;
  