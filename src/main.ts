import {
  Editor,
  MarkdownView,
  Notice,
  Plugin,
} from "obsidian";

import { formatMarkdown } from "./formatter";

export default class PanguMDPlugin extends Plugin {
  async onload() {
    console.log("Loading PanguMD");

    this.addCommand({
      id: "format-chinese-spacing",
      name: "Format Chinese-English spacing",

      hotkeys: [
        {
          modifiers: ["Mod", "Shift"],
          key: "S",
        },
      ],

      editorCallback: (editor: Editor) => {
        this.formatEditor(editor);
      },
    });
  }

  onunload() {
    new Notice("PanguMD onload() called");
    console.log("Unloading PanguMD");
  }

  private formatEditor(editor: Editor) {
    const original = editor.getValue();

    const formatted = formatMarkdown(original);

    if (formatted === original) {
      new Notice("No changes needed");
      return;
    }

    const cursor = editor.getCursor();

    editor.setValue(formatted);

    editor.setCursor(cursor);

    new Notice("Pangu formatting applied");
  }
}