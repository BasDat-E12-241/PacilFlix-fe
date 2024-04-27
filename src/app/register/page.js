export default function Register() {
  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-semibold">Form Registrasi</h1>
      <form className="flex flex-col items-center gap-6">
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Username</span>
          <input 
            type="text"
            placeholder="Username"
            className="border-4 transition-all border-solid rounded-lg px-3 py-2 w-64 bg-white text-black focus:border-red-primary"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Password</span>
          <input 
            type="password"
            placeholder="Password"
            className="border-4 transition-all border-solid rounded-lg px-3 py-2 w-64 bg-white text-black focus:border-red-primary"
          />
        </label>
        <button type="submit" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-red-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
          Daftar
        </button>
      </form>
    </section>
  );
}