<script lang="ts">
  import Lazy from 'svelte-lazy';
</script>

<div>
  <Lazy>
    <video playsinline muted autoplay loop>
      <slot />
    </video>
  </Lazy>
</div>

<style>
  div {
    line-height: 0;
    margin: 1.5rem 0;
  }

</style>
