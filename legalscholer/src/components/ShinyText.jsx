// src/components/ShinyText.jsx
const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  return (
    <span className={`relative inline-block leading-none ${className}`}>
      {/* Base text (steady color) */}
      <span className="text-[#b5b5b5a4]">{text}</span>

      {/* Shimmer overlay (only shows the moving white band) */}
      <span
        aria-hidden="true"
        className={`${disabled ? 'hidden' : 'block'} absolute inset-0 text-transparent bg-clip-text animate-shine`}
        style={{
          /* narrow glossy stripe across transparent background */
          backgroundImage:
            'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 60%)',
          backgroundSize: '200% 100%',
          /* Tailwind v4 custom prop read by our @theme animation */
          ['--shine-speed']: `${speed}s`,
          /* Improve rendering on WebKit */
          WebkitBackgroundClip: 'text',
        }}
      >
        {text}
      </span>
    </span>
  );
};

export default ShinyText;
