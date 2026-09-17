import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import type { Extension } from "@codemirror/state";


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
    // backgroundColor: `${colors.overlay2.hex}40`,
  },

  // ".cm-panels": {
  //   backgroundColor: "var(--ce-keyword)",
  //   color: "var(--fg-brigth)",
  // },
  // ".cm-panels.cm-panels-top": {
  //   borderBottom: `1px solid ${colors.overlay0.hex}`,
  // },
  // ".cm-panels.cm-panels-bottom": {
  //   borderTop: `1px solid ${colors.overlay0.hex}`,
  // },

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
    // backgroundColor: `${colors.surface2.hex}47`,
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

  // ".cm-tooltip": {
  //   border: "none",
  //   backgroundColor: colors.surface0.hex,
  // },
  // ".cm-tooltip .cm-tooltip-arrow:before": {
  //   borderTopColor: "transparent",
  //   borderBottomColor: "transparent",
  // },
  // ".cm-tooltip .cm-tooltip-arrow:after": {
  //   borderTopColor: colors.surface0.hex,
  //   borderBottomColor: colors.surface0.hex,
  // },
  // ".cm-tooltip-autocomplete": {
  //   "& > ul > li[aria-selected]": {
  //     backgroundColor: colors.surface1.hex,
  //     color: colors.text.hex,
  //   },
  // },
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
  // { tag: t.strong, fontWeight: "bold" },
  // { tag: t.emphasis, fontStyle: "italic" },
  // { tag: t.strikethrough, textDecoration: "line-through" },
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

export const dynamicTheme: Extension[] = [
  EditorView.baseTheme(spec),
  syntaxHighlighting(highlightStyle)
];
