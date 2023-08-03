<template>
  <main class="about">
    <div class="aboutContainer">
      <!-- heading -->
      <div class="heading">
        <h2>About DTT Real Estate</h2>
      </div>

      <!-- info -->
      <div class="text">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          voluptatibus ipsum! Nesciunt fuga omnis, perspiciatis corrupti
          consectetur illo vel tenetur vero voluptatum aut? Dolores, maxime vel.
          Amet iusto maxime earum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Earum, voluptatibus ipsum! Nesciunt fuga omnis,
          perspiciatis corrupti consectetur illo vel tenetur vero voluptatum
          aut? Dolores, maxime vel. Amet iusto maxime earum. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Earum, voluptatibus ipsum!
          Nesciunt fuga omnis, perspiciatis corrupti consectetur illo vel
          tenetur vero voluptatum aut?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          voluptatibus ipsum! Nesciunt fuga omnis, perspiciatis corrupti
          consectetur illo vel tenetur vero voluptatum aut? Dolores, maxime vel.
          Amet iusto maxime earum.
        </p>
      </div>

      <div>
        <!-- design and development -->
        <div class="heading">
          <h2>Design and Development</h2>
        </div>

        <!-- logo -->

        <div class="logo">
          <img src="../assets/images/dtt_logo.png" />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.about {
  position: relative;
  top: 5rem;
}

.aboutContainer {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 746px) {
  .aboutContainer {
    margin: 2rem;
  }
}

/* tablet, landscape iPad, lo-res laptops ands desktops */
@media (max-width: 1200px) {
  .aboutContainer {
    max-width: 800px;
  }
}
</style>
