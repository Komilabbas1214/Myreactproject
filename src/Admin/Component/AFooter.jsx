import React from "react";

function AFooter() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-0 small text-muted">
          &copy; {new Date().getFullYear()} Akart Admin Panel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default AFooter;