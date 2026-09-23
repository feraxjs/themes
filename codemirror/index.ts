import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { Compartment, type Extension } from "@codemirror/state";


const themeConfig = new Compartment();

const spec = {
  "&": {
    color: "var(--fg-brigth)",
  },

  ".cm-content": {
    caretColor: "var(--ge-cursor)",
  },

  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--ge-cursor)",
  },

  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: `var(--ge-selection)`,
  },

  // ".cm-panels": {
  //   backgroundColor: "var(--ce-keyword)",
  //   color: "var(--fg-brigth)",
  // },
  
  ".cm-panels.cm-panels-top": {
    borderBottom: `1px solid var(--bd-dark)`,
  },
  ".cm-panels.cm-panels-bottom": {
    borderTop: `1px solid var(--bd-dark)`,
  },

  ".cm-searchMatch": {
    backgroundColor: `hls(from var(--search-bg) h s l / .59)`,
    outline: `1px solid var(--ge-normal-links)`,
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: `hls(from var(--search-active-bg) h s l / .8)`,
  },

  ".cm-activeLine": { backgroundColor: "var(--ge-cursor-line)" },
  ".cm-selectionMatch": {
    backgroundColor: "hls(from var(--search-active-bg) h s l / .59)",
  },

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: `hls(from var(--search-active-bg) h s l / .59)`,
    color: "var(--fg-brigth)",
  },

  ".cm-gutters": {
    backgroundColor: "var(--bg-light)",
    color: "var(--ge-line-numbers)",
    border: "none",
  },

  ".cm-activeLineGutter": {
    backgroundColor: "var(--ge-cursor-line)",
    color: "var(--ge-active-line-number)",
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "var(--ce-comments)",
  },

  // ".cm-placeholder": {
  //   color: colors.overlay1.hex,
  // },

  ".cm-tooltip": {
    color: `var(--tooltip-fg)`,
    border: "2px var(--tooltip-bd) solid",
    backgroundColor: `var(--tooltip-bg)`,
  },
  // ".cm-tooltip .cm-tooltip-arrow:before": {
  //   borderTopColor: "red",
  //   borderBottomColor: "red",
  // },
  // ".cm-tooltip .cm-tooltip-arrow:after": {
  //   borderTopColor: "green",
  //   borderBottomColor: "green",
  // },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: "var(--tooltip-active-bg)",
      color: "var(--tooltip-active-fg)",
    },
  },
}
const highlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: "var(--ce-keyword)" },
  {
    tag: [t.name, t.definition(t.name), t.deleted, t.character, t.macroName],
    color: "var(--fg-brigth)",
  },
  {
    tag: [
      t.function(t.variableName),
      t.function(t.propertyName),
      t.propertyName,
      t.labelName,
    ],
    color: "var(--ce-property)",
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: "var(--ce-constants)",
  },
  { tag: [t.self, t.atom], color: "var(--ce-atoms)" },
  {
    tag: [t.typeName, t.className, t.changed, t.annotation, t.namespace],
    color: "var(--ce-classes)",
  },
  { tag: [t.operator], color: "var(--ce-operators)" },
  { tag: [t.url], color: "var(--ge-normal-links)" },
  { tag: [t.escape, t.regexp], color: "var(--ce-escape-sequences-regex)" },
  {
    tag: [t.meta, t.punctuation, t.separator, t.comment],
    color: "var(--ce-braces)",
  },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: "var(--ge-normal-links)" /*, textDecoration: "underline" */ },
  // { tag: t.heading, fontWeight: "bold", color: colors.blue.hex },
  {
    tag: [t.special(t.variableName)],
    color: "var(--ge-on-hover-links)",
  },
  { tag: [t.bool, t.number], color: "var(--ce-numbers)" },
  {
    tag: [t.processingInstruction, t.string, t.inserted],
    color: "var(--ce-strings)",
  },
  { tag: t.invalid, color: "var(--sm-fg-error)" },
]);


export const dynamicTheme = (): Extension[] => {
  const current = (document.documentElement.getAttribute('theme') ?? "ligth") === "dark";
  
  return [  
    themeConfig.of(EditorView.theme(spec, { dark: current })),
    syntaxHighlighting(highlightStyle)
  ];
}
export const reconfig = (view: EditorView) => {
  const callback = (e: Event) => {
    const current = (document.documentElement.getAttribute('theme') ?? "ligth") === "dark";
    
    view.dispatch({
      // @ts-ignore
      effects: themeConfig.reconfigure(EditorView.theme(spec, { dark: current }))
    })
  }
  document.addEventListener('th-changed', callback);
  
  return () => document.removeEventListener('th-changed', callback);
}
