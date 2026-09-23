# themes

This themes are desineg to follow a basic convencion in color names, to easily 
change the theme in the web.

My purpose is not to discover the world, but have a self-standar for 
my own desings, if you would like to contribute, or have an opinion 
I am open to discuss.

> [!note]
> for the full breakdown of the fields provided by the theme, 
> enter to [feraxjs/themes](https://feraxjs.github.io/themes/)

## why _OKLCH_?

I think it looks better.

---
## Codemirror pluggin

The codemirror pluggin is just a helper/_wrapper_ to manage the themes dynamicly on a 
full compatible maner with this API.

**fast and simple use.**
~~~js
import { EditorView, minimalSetup } from "codemirror";
import { dynamicTheme, reconfig } from "@feraxjs/themes-codemirror";

const view = new EditorView({
  doc: initialContent,
  extensions: [
    minimalSetup,
    dynamicTheme(),
  ],
  parent: document.querySelector(".editor")!,
});

const unsubscribe = reconfig(view);
~~~
