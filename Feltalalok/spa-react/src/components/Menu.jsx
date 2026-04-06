function Menu({ setPage }) {
  return (
    <nav>
      <button onClick={() => setPage("rps")}>
        Kő-papír-olló játék
      </button>

      <button onClick={() => setPage("typing")}>
        Gyors író teszt
      </button>
    </nav>
  );
}

export default Menu;