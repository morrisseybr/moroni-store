import LoginForm from "./components/login-form";

export default function LoginPage() {
  return (
    <main>
      <h1 className="">Moroni Store</h1>
      <span className="muted small">Área administrativa</span>
      <hr className="mt-3 mb-8" />
      <LoginForm />
    </main>
  );
}
