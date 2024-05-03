import "@mdxeditor/editor/style.css";
import {
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  KitchenSinkToolbar,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  AdmonitionDirectiveDescriptor,
} from "@mdxeditor/editor";
import type { SandpackConfig } from "@mdxeditor/editor";
// import type { LeafDirective } from "mdast-util-directive";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
    // {
    //   label: "Virtuoso",
    //   name: "virtuoso",
    //   meta: "live virtuoso",
    //   sandpackTemplate: "react-ts",
    //   sandpackTheme: "light",
    //   snippetFileName: "/App.tsx",
    //   initialSnippetContent: defaultSnippetContent,
    //   dependencies: {
    //     "react-virtuoso": "latest",
    //     "@ngneat/falso": "latest",
    //   },
    //   files: {
    //     "/data.ts": dataCode,
    //   },
    // },
  ],
};

// interface YoutubeDirectiveNode extends LeafDirective {
//   name: "youtube";
//   attributes: { id: string };
// }

export const YoutubeDirectiveDescriptor: DirectiveDescriptor<YoutubeDirectiveNode> = {
  name: "youtube",
  type: "leafDirective",
  testNode(node) {
    return node.name === "youtube";
  },
  attributes: ["id"],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}>
        <button
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}>
          delete
        </button>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${mdastNode.attributes?.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </div>
    );
  },
};
function plugins(readOnly = false) {
  const allPlugins = [
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
      imageAutocompleteSuggestions: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      imageUploadHandler: async () => Promise.resolve("https://picsum.photos/200/300"),
    }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
    sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
    codeMirrorPlugin({
      codeBlockLanguages: {
        js: "JavaScript",
        css: "CSS",
        txt: "Plain Text",
        tsx: "TypeScript",
        "": "Unspecified",
      },
    }),
    directivesPlugin({
      directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor],
    }),
    diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
    markdownShortcutPlugin(),
  ];
  if (!readOnly) {
    allPlugins.push(toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }));
  }
  return allPlugins;
}

export default function MDXFullEditor({ markdown, onChange = null, readOnly = false }) {
  return (
    <MDXEditor
      markdown={markdown}
      onChange={onChange}
      plugins={plugins(readOnly)}
      readOnly={readOnly}
      // className="border-4 min-h-screen"
    />
  );
}