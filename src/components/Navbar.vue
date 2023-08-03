<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <img src="../assets/images/dtt_logo.png" alt="Logo" />
      </div>

      <!-- mobile -->
      <button class="navbar-toggle" @click="toggleMenu">
        <span class="burger"></span>
        <span class="burger"></span>
        <span class="burger"></span>
      </button>

      <nav class="navbar-links" :class="{ open: isMenuOpen }">
        <RouterLink
          to="/"
          class="navbar-item"
          :class="{ active: activeLink === 'houses' }"
        >
          Houses
        </RouterLink>
        <RouterLink
          to="/about"
          class="navbar-item"
          :class="{ active: activeLink === 'about' }"
          >About</RouterLink
        >
      </nav>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      activeLink: null,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  watch: {
    $route(to) {
      this.activeLink = to.name;
    },
  },
};
</script>

<style>
.navbar {
  background-color: #ffffff;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo img {
  height: 40px;
}

/* mobile menu */
.navbar-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
}

.burger {
  display: block;
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 5px 0;
}

/* links */
.navbar-links {
  display: flex;
  margin-left: 2rem;
}

.navbar-item {
  text-decoration: none;
  font-size: 18px;
  color: #4a4b4c;
  list-style: none;
  padding: 0 13px;
  font-family: "Montserrat";
  font-weight: normal;
}

.navbar-links .navbar-item.active {
  font-family: "Montserrat";
  color: #000000;
  font-weight: 800;
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #333;
  }

  .navbar-links.open {
    display: flex;
  }

  .navbar-item {
    padding: 15px;
    border-bottom: 1px solid #fff;
  }

  .navbar-toggle {
    display: block;
  }
}
</style>
