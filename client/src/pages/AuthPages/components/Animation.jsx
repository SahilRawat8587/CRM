import './Login.css'

const Animation = () => {
  return (
    <div>
      <ul className="absolute w-full h-full z-0">
          {[...Array(30)].map((_, index) => (
            <li
              key={index}
              className="absolute list-none bg-white/20 rounded-xl animate-floating"
              style={{
                left: `${Math.random() * 90}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                bottom: `-${Math.random() * 150}px`,
                animationDelay: `${Math.random() * 20}s`,
              }}
            ></li>
          ))}
        </ul>
    </div>
  )
}

export default Animation
