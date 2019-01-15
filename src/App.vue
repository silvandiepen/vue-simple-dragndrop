<template>
  <div id="app">

    <div class="container">
      <div class="content">
        <h1>Simple Vue list drag'n drop without dependencies. </h1>
        <p>So I came by this <a href="https://medium.freecodecamp.org/how-to-make-and-test-your-own-react-drag-and-drop-list-with-0-dependencies-6fb461603780">article</a> called "How to make and test your own React drag and drop list with 0 dependencies" by <a href="https://medium.freecodecamp.org/@siffogh3">Seif Ghezala</a> and thought, but.. this could easily done with Vue too! So I gave it a try. Here's the result:</p>
      </div>
      <div class="content">
        <section>
          <h3>List of items</h3>
          <div class="dragndrop">
            <ul class="dragndrop__list">
              <li
                class="dragndrop__item"
                v-for="(item,idx) in items"
                :key="item"
                @dragover="onDragOver(idx)"
                :class="{'is-dragging': item == draggedItem }"
              >
                <div
                  class="dragndrop__icon"
                  draggable
                  @dragstart="onDragStart(idx, $event)"
                  @dragend="onDragEnd"
                >
                  <span></span>
                </div>
                {{item}}
              </li>
            </ul>
          </div>
        </section>

      </div>
    </div>
    <div class="row">

      <div class="column small-full medium-third background--dark">
        <div class="content">
          <h3>Template</h3>
          <pre v-highlightjs="code.html"><code class="scss"></code></pre>
        </div>
      </div>
      <div class="column small-full medium-third background--yellow">
        <div class="content">
          <h3>SCSS</h3>
          <pre v-highlightjs="code.scss"><code class="scss"></code></pre>
        </div>
      </div>

      <div class="column small-full medium-third background--green">
        <div class="content">
          <h3>Script</h3>
          <pre v-highlightjs="code.vue"><code class="scss"></code></pre>
        </div>
      </div>
    </div>
    <sil-footer></sil-footer>
  </div>

</template>

<script>
import silFooter from "./components/footer.vue";

export default {
  name: "app",
  components: {
    silFooter
  },
  data() {
    return {
      code: {
        scss: `
.dragndrop {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &__item {
    padding: 10px 20px;
    position: relative;
    display: flex;
    align-items: flex-start;
    line-height: 1;
    &.is-dragging {
      opacity: 0;
    }
  }
  &__icon {
    margin-right: 15px;
    cursor: move;
    span {
      position: relative;
      display: block;
      width: 1rem;
      height: 1rem;
      background-image: linear-gradient(
        to bottom,
        var(--color-blue),
        var(--color-blue) 2px,
        transparent 2px,
        transparent
      );
      background-size: 100% 6px;
      background-position: top left;
    }
  }
}
        `,
        html: `
<div class="dragndrop">
    <ul
      class="dragndrop__list"
    >
      <li
        class="dragndrop__item"
        v-for="(item,idx) in items"
        :key="item"
        @dragover="onDragOver(idx)"
        :class="{'is-dragging': item == draggedItem }"
      >
        <div
          class="dragndrop__icon"
          draggable
          @dragstart="onDragStart(idx, $event)"
          @dragend="onDragEnd"
        >
          <span></span>
        </div>
        {{item}}
      </li>
    </ul>
  </div>`,
        vue: `
export default {
  name: "app",
  data() {
    return {
      draggedItem: null,
      items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
    };
  },
  methods: {
    onDragStart(index, e) {
      this.draggedItem = this.items[index];
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.parentNode);
      e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    },
    onDragOver(index) {
      const draggedOverItem = this.items[index];

      // if the item is dragged over itself, ignore
      if (this.draggedItem === draggedOverItem) {
        return;
      }

      // filter out the currently dragged item
      let items = this.items.filter(item => item !== this.draggedItem);

      // add the dragged item after the dragged over item
      items.splice(index, 0, this.draggedItem);

      this.items = items;
    },

    onDragEnd() {
      this.draggedItem = null;
    }
  }
};`
      },
      draggedItem: null,
      items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
    };
  },
  methods: {
    onDragStart(index, e) {
      this.draggedItem = this.items[index];
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.parentNode);
      e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    },
    onDragOver(index) {
      const draggedOverItem = this.items[index];

      // if the item is dragged over itself, ignore
      if (this.draggedItem === draggedOverItem) {
        return;
      }

      // filter out the currently dragged item
      let items = this.items.filter(item => item !== this.draggedItem);

      // add the dragged item after the dragged over item
      items.splice(index, 0, this.draggedItem);

      this.items = items;
    },

    onDragEnd() {
      this.draggedItem = null;
    }
  }
};
</script>

<style lang="scss">
@import "~@sil/base-style/src/scss/index.full";
body {
  font-family: $system-fonts;
}

.container.code {
}
.transition-item {
  display: inline-block;
  margin-right: 10px;
}
.transition-enter-active,
.transition-leave-active {
  transition: all 1s;
}
.transition-enter, .transition-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  border: 2px solid green;
  transform: translateY(30px);
}
.dragndrop {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &__item {
    padding: 10px 20px;
    position: relative;
    display: flex;
    align-items: flex-start;
    line-height: 1;
    &.is-dragging {
      opacity: 0;
    }
  }
  &__icon {
    margin-right: 15px;
    cursor: move;
    span {
      position: relative;
      display: block;
      width: 1rem;
      height: 1rem;
      background-image: linear-gradient(
        to bottom,
        var(--color-blue),
        var(--color-blue) 2px,
        transparent 2px,
        transparent
      );
      background-size: 100% 6px;
      background-position: top left;
    }
  }
}
.content {
  .column {
    overflow: hidden;
  }
  code,
  .code {
    background-color: transparent;
  }
  pre {
    height: 100%;
    width: 100%;
    margin-left: -grid(1);
    @include min-(null, 1, 60) {
      margin-left: -60px;
    }
    code {
      width: calc(100% + #{grid(2)});
      @include min-(null, 1, 60) {
        width: calc(100% + 120px);
      }
      overflow: scroll;
    }
  }
}
</style>
