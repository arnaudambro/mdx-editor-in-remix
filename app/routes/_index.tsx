import React from "react";
import { ClientOnly } from "remix-utils/client-only";
import MDXFullEditor from "~/components/MDXFullEditor";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <ClientOnly fallback={<p>Loading...</p>}>
      {() => <MDXFullEditor markdown="Hello world" />}
    </ClientOnly>
  );
}
