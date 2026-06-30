import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="mt-32 border-t border-white/10 py-10 text-center text-zinc-500">
        <p>
          Jahanara Khatun •{" "}
          <a
            href="https://github.com/zarakhatun58"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent font-semibold hover:opacity-80 transition"
          >
            GitHub
          </a>{" "}
          •{" "}
          <a
            href="https://www.linkedin.com/in/jahanara-khatun/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold hover:opacity-80 transition"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;