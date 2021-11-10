function Landing() {
  return (
    <div class="flex min-h-screen">
    <div class="flex-grow-[2]">
      <div class="flex flex-col items-center justify-center h-full">
        <figure class="mb-5">
          <img src="/logo-white.png" alt="Convos Logo" class="mb-10 m-auto" />
          <figcaption class="text-8xl font-medium font-keep-calm">CONVOS</figcaption>
        </figure>
        <input type="text" class="input w-96" placeholder="Email/Username" />
        <input type="password" class="input w-96" placeholder="Password" />
        <button class="btn primary max-w-sm w-1/2 text-xl mt-3">Log In</button>
      </div>
    </div>
    <div class="bg-primary flex-grow shadow-2xl">
      <div class="flex flex-col items-center justify-center h-full w-5/6 m-auto pt-16">
        <figure>
          <img src="/speech-bubbles.png" alt="Speech bubbles" />
          <figcaption class="text-secondary font-keep-calm text-3xl text-center mt-4">Join the conversation!</figcaption>
        </figure>
        <button class="btn primary w-1/2 text-xl mt-24">Register</button>
      </div>
    </div>
  </div>
  );
}

export default Landing;
