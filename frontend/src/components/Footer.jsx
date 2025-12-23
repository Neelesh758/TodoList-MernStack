function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-4 mt-10">
      <div className="text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} TodoApp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
