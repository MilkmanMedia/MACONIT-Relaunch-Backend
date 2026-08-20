// Minimal Lexical richtext renderer for Payload's default editor output.
// Handles the common node types (paragraph, headings, lists, links, bold/italic).
// For anything more elaborate, swap in @payloadcms/richtext-lexical/react's
// official <RichText> serializer once `npm install` can run — this hand-rolled
// version exists only because that package can't be pulled into this sandbox.

type LexicalNode = {
  type: string;
  tag?: string;
  text?: string;
  format?: number;
  children?: LexicalNode[];
  url?: string;
  listType?: string;
};

function renderText(node: LexicalNode, key: number) {
  let el: React.ReactNode = node.text ?? "";
  const format = node.format ?? 0;
  if (format & 1) el = <strong key={key}>{el}</strong>; // bold
  if (format & 2) el = <em key={key}>{el}</em>; // italic
  return <span key={key}>{el}</span>;
}

function renderChildren(children: LexicalNode[] = []) {
  return children.map((child, i) => renderNode(child, i));
}

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  if (node.type === "text") return renderText(node, key);

  switch (node.type) {
    case "paragraph":
      return <p key={key}>{renderChildren(node.children)}</p>;
    case "heading": {
      const Tag = (node.tag || "h2") as keyof React.JSX.IntrinsicElements;
      return <Tag key={key}>{renderChildren(node.children)}</Tag>;
    }
    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return <Tag key={key}>{renderChildren(node.children)}</Tag>;
    }
    case "listitem":
      return <li key={key}>{renderChildren(node.children)}</li>;
    case "link":
      return (
        <a key={key} href={node.url} className="text-primary underline">
          {renderChildren(node.children)}
        </a>
      );
    case "linebreak":
      return <br key={key} />;
    default:
      return node.children ? <span key={key}>{renderChildren(node.children)}</span> : null;
  }
}

export function RichText({ content }: { content: unknown }) {
  const root = (content as { root?: { children?: LexicalNode[] } } | null)?.root;
  if (!root?.children?.length) return null;
  return <>{renderChildren(root.children)}</>;
}
