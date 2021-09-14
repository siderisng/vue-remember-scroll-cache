// Copyright Giorgos Sideris 2021
// github.com/siderisng

// const defaultOptions = {}

const linkAction = (el, binding, vnode, Vue, selector) => {
  const itemsName = binding.value.itemsName;

  const links = el.querySelectorAll(selector);
  links.forEach(link => {
    link.addEventListener("click", () => {
      Vue.prototype[`$${itemsName}`] = vnode.context[itemsName];

      localStorage.setItem("v-remember-scroll-position", window.scrollY);
      localStorage.setItem("v-remember-scroll-page", window.location.pathname);
    });
  });
};

export default {
  // called by Vue.use(FirstPlugin)
  install(Vue, options) {
    // merge default options with arg options
    // const userOptions = { ...defaultOptions, ...options }
    // console.log(userOptions)

    // create a mixin
    Vue.mixin({
      created() {},
    });

    Vue.directive("remember-scroll-cache", {
      // When the bound element is inserted into the DOM...
      bind: (el, binding, vnode) => {
        // binding.value: contains the object passed inside the directive in json format
        // binding.expression: contains the expression (as string) inside the custom directive
        // vnode.context: internal state of component where the directive is used in

        const scrollPosition = localStorage.getItem(
          "v-remember-scroll-position"
        );
        const itemsName = binding.value.itemsName;
        const selector = binding.value.selector;

        // console.log('scrollPosition', scrollPosition)
        if (scrollPosition) {
          setTimeout(() => {
            localStorage.removeItem("v-remember-scroll-position");
            localStorage.removeItem("v-remember-scroll-page");
            Vue.prototype[`$${itemsName}`] = null;
          }, 2000);
          //   console.log('moving to ', scrollPosition)
          setTimeout(() => {
            if (
              localStorage.getItem("v-remember-scroll-page") ===
              window.location.pathname
            )
              window.scrollTo(0, scrollPosition);
          }, 1500);
        }
        linkAction(el, binding, vnode, Vue, selector);
      },
      componentUpdated: (el, binding, vnode) => {
        const selector = binding.value.selector;
        // REPEAT ACTION FOR CREATING LISTENERS AFTER COMPONENT UPDATE
        linkAction(el, binding, vnode, Vue, selector);
      },
    });
  },
};
