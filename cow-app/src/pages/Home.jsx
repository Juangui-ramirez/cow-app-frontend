function Home() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-amarello mb-8">Welcome to the COW Expense App!</h1>
      <p className="text-brownppal font-semibold text-center mb-12">
        Keep track of shared expenses with your friends. Ready to get started?
      </p>
      <div className="w-full max-w-lg">
        <p className="text-center text-lg font-bold text-brownppal mb-4">Explore recent expenses.</p>
        <p className="text-center text-lg font-bold text-brownppal">Create a new group.</p>
      </div>
    </section>
  );
}

export default Home;