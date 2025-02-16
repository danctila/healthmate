const Button = ({ children, onClick, className = "" }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  