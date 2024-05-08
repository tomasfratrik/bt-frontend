/**
 * My Vue Component
 * 
 * This View that displays information about the project.
 * 
 * @author Tomas Fratrik
 */
<template>
  <div class="about">
    <div class="wrapper">
      <h1>Real Estate Fraud Helper</h1>
      <p>This project is a work of bachelor thesis</p>
      <p>Documentation, demo videos, implementation details can be all
          found in the github repository
          <a class="link" href="https://github.com/tomasfratrik/bachelor-thesis">github</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.wrapper {
  max-width: var(--max-width);
  background-color: white;
  border-radius: 25px;
  padding: 20px;
  font-family: Arial, Helvetica, monospace;
  font-size: 1.2em;
  color: var(--grey-color-font);
  margin: 0 auto;
  margin-top: 20px;
}
</style>
