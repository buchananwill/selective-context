"use client";
import { PropsWithChildren } from "react";
import SelectiveContextManagerGeneric from "./selective-context-manager-generic";
import { SelectiveContextGlobal } from "../creators/selective-context-creator-global";

export default function SelectiveContextManagerGlobal({
  children,
}: PropsWithChildren) {
  return (
    <SelectiveContextManagerGeneric {...SelectiveContextGlobal}>
      {children}
    </SelectiveContextManagerGeneric>
  );
}

