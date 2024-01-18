import React from 'react';

function Container({ children }) {
  return (
    <section className="px-2 sm:px-3 min-h-screen md:px-4 lg:px-5 xl:px-6 max-w-bodyxl mx-auto">
      {children}
    </section>
  );
}

export default Container;
