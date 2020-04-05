<template>
  <div class="modal modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <picture class="media-details">
          <source :srcset="`${val.imageSunnySideUp.url}?fm=webp&fit=crop&w=900&h=900`" type="image/webp">
          <img :src="`${val.imageSunnySideUp.url}?fit=crop&w=900&h=900`" alt="" width="570" height="570">
        </picture>

        <p class="date">{{ val.dateCreate | dateFormat }}</p>

        <button @click="$emit('close')" class="btn">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      val: Object
  },
  filters: {
    dateFormat: function (value) {
      if (!value) return '';
      const date = new Date(value);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      return `${y}.${m}.${d}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 2rem;
    box-sizing: border-box;
  }
  &-window {
    background: #fff;
    overflow: hidden;
    position: relative;
  }
  &-content {
    padding: 2rem;
    box-sizing: border-box;
  }
}
.media-details {
  display: block;
  text-align: center;
  img {
    max-width: 570px;
    max-height: 570px;
    width: 100%;
    height: 100%;
    object-fit: none;
    border: 1px solid #ccc;
  }
}
.btn {
  font-size: 0;
  width: 44px;
	height: 44px;
  background: none;
  border: 0;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  &::before,
  &::after{
    content: "";
    display: block;
    width: 22px;
    height: 3px;
    background: #333;
    transform: rotate(45deg);
    position: absolute;
    top: 10px;
    right: 0;
  }
  &::after{
      transform: rotate(-45deg);
  }
  &:focus {
    outline: none;
  }
}
.date {
  text-align: center;
  margin-bottom: 0;
}
</style>
