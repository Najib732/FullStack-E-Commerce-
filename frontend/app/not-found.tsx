export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <img
        src="/loadinggif.webp"
        alt="Not Found GIF"
        className="w-64 h-64"
      />
      <h1 className="text-2xl font-bold mt-4">Not Found</h1>
      <p>Your URL is wrong</p>
    </div>
  );
}
